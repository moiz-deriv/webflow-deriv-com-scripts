const WebSocket = require("ws");
const fs = require("fs").promises;
const path = require("path");

// Function to read JSON file
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

// Function to write JSON file
async function writeJsonFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing JSON file:", error);
    return false;
  }
}

// Function to filter duplicate symbols
function filterDublicateSymbols(array, key) {
  return array.filter(
    (item, index, self) => index === self.findIndex((t) => t[key] === item[key])
  );
}

// WebSocket connection function
function establishWebSocketConnection() {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(
      `wss://green.derivws.com/websockets/v3?app_id=16929&l=en&brand=deriv`
    );
    ws.on("open", () => {
      console.log("WebSocket connection established");
      resolve(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket connection error:", error);
      reject(error);
    });
  });
}

// Function to send WebSocket message
function sendWebSocketMessage(ws, message) {
  return new Promise((resolve, reject) => {
    ws.send(JSON.stringify(message));

    ws.once("message", (response) => {
      try {
        const data = JSON.parse(response.toString());
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Main function
async function main() {
  try {
    // Establish WebSocket connection
    const ws = await establishWebSocketConnection();

    // Prepare WebSocket message
    const message = {
      trading_platform_asset_listing: 1,
      platform: "mt5",
      account_type: "real",
      landing_company_short: "svg",
      market_type: ["financial"],
      server: "p01_ts01",
      sub_account_category: "",
      sub_account_type: "financial",
      unique: true,
    };

    // Send request and get response
    const wsResponse = await sendWebSocketMessage(ws, message);
    console.log("WebSocket response received");

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    // Define file path
    const filePath = path.join(dataDir, "trading-specs.json");

    // Read existing data from JSON file if it exists
    const existingData = await readJsonFile(filePath);

    if (!existingData) {
      // If file doesn't exist or is empty, create it with the filtered WebSocket response
      const filteredData = filterDublicateSymbols(
        wsResponse.trading_platform_asset_listing.mt5.assets,
        "symbol"
      );
      await writeJsonFile(filePath, filteredData);
      console.log("Created new trading specs file with WebSocket data");
    } else {
      // Filter the new response data
      const filteredNewData = filterDublicateSymbols(
        wsResponse.trading_platform_asset_listing.mt5.assets,
        "symbol"
      );

      // Compare filtered WebSocket response with existing data
      const isDifferent =
        JSON.stringify(filteredNewData) !== JSON.stringify(existingData);

      if (isDifferent) {
        // Update file if data is different
        await writeJsonFile(filePath, filteredNewData);
        console.log("Updated trading specs file with new WebSocket data");
      } else {
        console.log("Trading specs file is up to date");
      }
    }

    // Close WebSocket connection
    ws.close();
  } catch (error) {
    console.error("Error in main function:", error);
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
