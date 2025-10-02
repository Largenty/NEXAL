#!/usr/bin/env node

/**
 * MongoDB Connection Test Script
 *
 * This script tests your MongoDB connection using the same configuration
 * as your application's mongoose.ts hook.
 */

const mongoose = require("mongoose");
require("dotenv").config();
const dns = require("dns");

// Test configuration
const MONGO_URI = process.env.MONGO_URI;
const isAtlas =
    (MONGO_URI && MONGO_URI.startsWith("mongodb+srv://")) ||
    /mongodb\.net/i.test(MONGO_URI || "");

async function diagnoseDns() {
    if (!isAtlas) return;
    try {
        const afterAt = (MONGO_URI.split("@")[1] || "").split("?")[0];
        const host = afterAt.split("/")[0];
        if (!host) return;
        console.log(`🔎 DNS SRV lookup for _mongodb._tcp.${host} ...`);
        await new Promise((resolve) => {
            dns.resolveSrv(`_mongodb._tcp.${host}`, (err, addrs) => {
                if (err) {
                    console.log("⚠️  SRV lookup failed:", err.message);
                    return resolve();
                }
                const list = (addrs || [])
                    .map((a) => `${a.name}:${a.port}`)
                    .join(", ");
                console.log(`✅ SRV records: ${list || "(none)"}`);
                resolve();
            });
        });
    } catch (e) {
        console.log("⚠️  DNS diagnostic error:", e.message);
    }
}

// Test schema for basic operations
const TestSchema = new mongoose.Schema({
    name: String,
    timestamp: { type: Date, default: Date.now },
    testData: String,
});

const TestModel = mongoose.model("ConnectionTest", TestSchema);

async function testConnection() {
    console.log("🔍 Starting MongoDB Connection Test...\n");

    // Step 1: Check environment variable
    console.log("1️⃣ Checking environment variables...");
    if (!MONGO_URI) {
        console.error("❌ MONGO_URI environment variable is not set!");
        console.log(
            "   Please create a .env file with your MongoDB connection string."
        );
        console.log(
            "   Example: MONGO_URI=mongodb://localhost:27017/your-database-name"
        );
        process.exit(1);
    }
    console.log("✅ MONGO_URI is set");
    console.log(
        `   Connection string: ${MONGO_URI.replace(/\/\/.*@/, "//***:***@")}\n`
    );
    console.log(`   Node: ${process.version}, Mongoose: ${mongoose.version}`);

    try {
        // Step 2: Test connection
        console.log("2️⃣ Testing MongoDB connection...");
        await diagnoseDns();

        const connectOptions = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            family: 4,
        };
        if (isAtlas) {
            connectOptions.tls = true;
        }

        await mongoose.connect(MONGO_URI, connectOptions);
        console.log("✅ Successfully connected to MongoDB!\n");

        // Step 3: Test database operations
        console.log("3️⃣ Testing database operations...");

        // Create a test document
        const testDoc = new TestModel({
            name: "Connection Test",
            testData:
                "This is a test document created during connection testing",
        });

        const savedDoc = await testDoc.save();
        console.log("✅ Document created successfully");
        console.log(`   Document ID: ${savedDoc._id}`);

        // Read the document
        const foundDoc = await TestModel.findById(savedDoc._id);
        if (foundDoc) {
            console.log("✅ Document read successfully");
            console.log(`   Document name: ${foundDoc.name}`);
        }

        // Update the document
        foundDoc.testData = "Updated test data";
        await foundDoc.save();
        console.log("✅ Document updated successfully");

        // Delete the test document
        await TestModel.findByIdAndDelete(savedDoc._id);
        console.log("✅ Test document cleaned up successfully\n");

        // Step 4: Test connection caching (like your hook)
        console.log("4️⃣ Testing connection caching...");
        const connectionState = mongoose.connection.readyState;
        const states = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting",
        };
        console.log(`✅ Connection state: ${states[connectionState]}`);

        // Step 5: Database info
        console.log("\n5️⃣ Database information...");
        const db = mongoose.connection.db;
        const admin = db.admin();
        const serverInfo = await admin.serverInfo();
        console.log(`✅ MongoDB version: ${serverInfo.version}`);
        console.log(`✅ Database name: ${db.databaseName}`);
        console.log(
            `✅ Host: ${mongoose.connection.host}:${mongoose.connection.port}`
        );

        console.log(
            "\n🎉 All tests passed! Your MongoDB connection is working perfectly.\n"
        );
    } catch (error) {
        console.error("\n❌ Connection test failed!");
        console.error("Error details:", error.message);
        if (error && error.reason) {
            console.error("Reason:", error.reason.message || error.reason);
        }
        if (error && (error.code || error.codeName)) {
            console.error("Code:", error.code, error.codeName || "");
        }

        if (error.name === "MongoServerSelectionError") {
            console.log("\n💡 Troubleshooting tips:");
            console.log("   - Check if MongoDB is running");
            console.log("   - Verify your connection string is correct");
            console.log("   - Check if the database server is accessible");
            console.log("   - Verify network connectivity");
        }

        process.exit(1);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("🔌 Connection closed.");
    }
}

// Handle process termination
process.on("SIGINT", async () => {
    console.log("\n\n⚠️  Test interrupted by user");
    await mongoose.connection.close();
    process.exit(0);
});

// Run the test
testConnection().catch(console.error);
