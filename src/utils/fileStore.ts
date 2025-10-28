import { promises as fs } from "fs";
import path from "path";

// Reads a JSON file and parses its content. If the file does not exist, returns an empty array.
export async function readJson<T>(filePath: string): Promise<T> {
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data) as T;
    } catch (err: any) {
        if (err.code === "ENOENT") {
            return [] as unknown as T;
        }
        throw err;
    }
}

// Writes data to a JSON file, creating directories as needed.
export async function writeJson<T>(filePath: string, data: T): Promise<void> {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, json, "utf-8");
}
