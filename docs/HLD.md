## 1. Purpose & Scope

This document explains the current High Level Design (HLD) of the RSF Utility — a modular transaction processing system that:

* Ingests transaction payloads coming from a network,

* Manages settlement interactions with an external Settlement Agency,

* Performs reconciliation with the network,

* Provides a UI for operators and configuration,

* Persists operational and audit data in MongoDB,

* Exposes observability using Loki and Grafana,

* Secures UI ↔ API traffic with JWT and TLS.

  

The explanation follows the components shown in the diagram and maps them to an implementation stack: **Frontend: React** , **Backend: Node.js (TypeScript)** , **Database: MongoDB** , **Observability: Loki + Grafana** .

  

## **2. External Interfaces**
  
*  **Incoming Transaction Payloads** (`/on_confirm`, `/on_status`, `/on_update`, `/on_cancel`)

  
These hit the **Transaction Payload Ingestion** module, which validates them against a schema before processing.

*  **Settlement Agency** (via `/settle` and `/on_settle`)

  

Connected through the **Settlement Agency Interface** for pushing/receiving settlement-related events and instructions.

*  **Network** (via `/recon` and `/on_recon`)

  

Interfaced by the **Network Interface** for reconciliation processes.

  

---

  

## **2. High level System Architecture**

  
![RSF Utility High Level Design](HLD.jpg)

**components:**

  

*  **RSF Utility UI (React)**

* A single-page app for operators to view orders, settlements, recon results, and system config. It authenticates with the backend via JWT and communicates over HTTPS. Reads dynamic configuration from `Config DB`.

*  **API Gateway / Backend (Node.js, TypeScript)**

* Exposes REST endpoints (ingestion endpoints: `/on_confirm`, `/on_status`, `/on_update`, `/on_cancel`; settlement endpoints: `/settle`, `/on_settle`; recon `/recon`, `/on_recon`; plus UI endpoints).

* Contains modules/services: Transaction Payload Ingestion, Order Manager, Settle Manager, Recon Manager, Async Txn Manager, Network Interface, Settlement Agency Interface.

*  **Transaction Payload Ingestion**

* Validates incoming payloads against a schema and forwards valid payloads to the Order Manager. This is the front-line for network-originating messages.

*  **Order Manager**

* Handles creation and state transitions of order records. Persists to **Order DB** and kicks off asynchronous processes (settlement, events) by enqueuing work for the Async Txn Manager.

*  **Settle Manager** & **Settlement Agency Interface**

* The Settle Manager composes settlement requests, persists them to **Settle DB** , and uses the Settlement Agency Interface (SAI) to call the external Settlement Agency (via `/settle`) and handle callbacks (`/on_settle`).

*  **Recon Manager** & **Network Interface**

* Recon Manager manages reconciliation logic, persists records to **Recon DB** , and uses Network Interface to call external network endpoints (`/recon`) and receive callbacks (`/on_recon`).

*  **Async Txn Manager** & **Audit DB**

* Handles post-processing tasks (e.g., retries, background reconciliation, event publishing) and writes audit records to **Audit DB** . The diagram shows the Async Txn Manager receiving audit inputs and coordinating long-running tasks.

*  **Databases**

* Order DB, Settle DB, Recon DB, Config DB, Audit DB are modeled separately (logically separate collections or logical DBs). A central **MongoDB** aggregates backups/replicas for long-term storage and reporting.

*  **Observability**

* Application logs are structured and shipped to Loki. Metrics are collected (Prometheus) and visualized in Grafana. Dashboards track ingestion rate, error rates, queue depths, and latencies.

  

---

  

## 3. Major Endpoints & How They Are Used

  

* **Ingestion from Network Participant:**

*  `POST /on_confirm` — create/confirm orders

*  `POST /on_status` — status updates for transactions

*  `POST /on_update` — updates to transaction data

*  `POST /on_cancel` — cancellations

* Settlement:

*  `POST /settle` — RSF → Settlement Agency (initiates settlement)

*  `POST /on_settle` — Settlement Agency → RSF (callback with result)

* Reconciliation:

*  `POST /recon` — RSF → Network (recon request)

*  `POST /on_recon` — Network → RSF (recon data callback)

* UI/Ops:

* [swagger link staging](https://fis-staging.ondc.org/rsf-utility/api-docs/)

  

## 4. Data Model 

  

*  `orders` — core order documents (order_id, status, payload, events, timestamps).

*  `settlements` — settlement requests and responses (settle_id, order_id, amount, status, response).

*  `recon_records` — reconciliation items and match status.

*  `config` — system/configuration items (schemas, endpoints).

*  `audit` — immutable audit entries for actions across managers.

  

## **5. Infrastructure**

  

*  **RSF SDK Utility (Docker)** – A packaged developer tool for interacting with RSF services.

*  **Storage** – Docker/NP (Network Participant) hosted storage for persistent data.

*  **Observability** - Docker/NP (Network Participant) hosted observability stack app monitoring.

  

---

  

## **6. Data Flow Summary**

  

1. Transaction payload comes in → validated → stored in Order DB → processed by Order Manager.

2. Settlements triggered → Settle Manager updates Settle DB and Settlement Agency.

3. Reconciliation triggered → Recon Manager updates Recon DB and interacts with Network.

4. RSF UI orchestrates/administers processes.

5. All operational and audit data flows into a central Mongo DB for long-term storage.

  

## 7. Observability & Ops (what’s present)

  

*  **Logs:** structured JSON logs emitted by all backend services, collected by promtail/agent and shipped to Loki.

*  **Dashboards:** ingestion throughput, error rates, basic debugging