BAP Instance (3000) BPP Instance (3001)
│ │
├─ Create BAP User ├─ Create BPP User
├─ Ingest Orders ├─ Ingest Same Orders
├─ Prepare Settlements ├─ Prepare Settlements
├─ Process on_settle ├─ Process on_settle
│ │
├─ Generate recon ──HTTP──→ ├─ Receive recon
│ ├─ Generate on_recon
├─ Receive on_recon ←──HTTP──┤─ Send on_recon
│ │
└─ Verify Final State └─ Verify Final State
