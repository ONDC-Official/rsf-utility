// MongoDB Initialization Script
// This script sets up the initial database structure for RSF Utility

print("Starting RSF Utility database initialization...");

// Switch to the rsf-utility database
db = db.getSiblingDB('rsf-utility');

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["user_id", "created_at"],
      properties: {
        user_id: { bsonType: "string" },
        bap_id: { bsonType: "string" },
        bpp_id: { bsonType: "string" },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["order_id", "user_id", "created_at"],
      properties: {
        order_id: { bsonType: "string" },
        user_id: { bsonType: "string" },
        settle_status: { 
          enum: ["READY", "RECON", "SETTLED", "DISPUTE"]
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("settlements", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["settle_id", "user_id", "created_at"],
      properties: {
        settle_id: { bsonType: "string" },
        user_id: { bsonType: "string" },
        status: { 
          enum: ["PENDING", "COMPLETED", "FAILED"]
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

db.createCollection("reconciliations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["recon_id", "user_id", "created_at"],
      properties: {
        recon_id: { bsonType: "string" },
        user_id: { bsonType: "string" },
        status: { 
          enum: ["PENDING", "COMPLETED", "FAILED"]
        },
        created_at: { bsonType: "date" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// Create indexes for performance
db.users.createIndex({ "user_id": 1 }, { unique: true });
db.users.createIndex({ "bap_id": 1 });
db.users.createIndex({ "bpp_id": 1 });

db.orders.createIndex({ "order_id": 1 }, { unique: true });
db.orders.createIndex({ "user_id": 1 });
db.orders.createIndex({ "settle_status": 1 });
db.orders.createIndex({ "created_at": -1 });

db.settlements.createIndex({ "settle_id": 1 }, { unique: true });
db.settlements.createIndex({ "user_id": 1 });
db.settlements.createIndex({ "status": 1 });
db.settlements.createIndex({ "created_at": -1 });

db.reconciliations.createIndex({ "recon_id": 1 }, { unique: true });
db.reconciliations.createIndex({ "user_id": 1 });
db.reconciliations.createIndex({ "status": 1 });
db.reconciliations.createIndex({ "created_at": -1 });

print("RSF Utility database initialization completed successfully!");
