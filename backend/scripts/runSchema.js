require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function runSchema() {
  try {
    console.log("Connecting to the database...");
    await client.connect();
    console.log("Connected to the database.");

    const schema = fs.readFileSync(
      path.join(__dirname, "../db/schema.sql"),
      "utf8"
    );

    await client.query(schema);

    console.log("Schema executed successfully");
  } catch (err) {
    console.error("Error running schema:", err);
  } finally {
    await client.end();
  }
}

runSchema();