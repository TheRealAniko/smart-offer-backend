import path from "path";
import { readJson, writeJson } from "./utils/fileStore";
import test from "node:test";

async function testFileStore() {
    // Define the file path
    const filePath = path.join(process.cwd(), "data", "test.json");

    // Read data from the JSON file
    const existingData = await readJson<any[]>(filePath);
    console.log("Existing Data:", existingData);

    // New data to write
    const newItem = { id: Date.now(), title: "Hello FileStore" };
    const update = [...existingData, newItem];

    // Write back to the JSON file
    await writeJson(filePath, update);
    console.log("Data written successfully.");

    // Verify by reading again
    const check = await readJson<any[]>(filePath);
    console.log("Updated Data:", check);
}

testFileStore().catch(console.error);
