import path from "path";
import { readJson, writeJson } from "../utils/fileStore";
import type { Customer } from "@smartoffer/types";

const filePath = path.join(process.cwd(), "data", "customers.json");

export async function getAll(): Promise<Customer[]> {
    return await readJson<Customer[]>(filePath);
}

export async function getById(id: string): Promise<Customer | undefined> {
    const customers = await getAll();
    return customers.find((c) => c.id === id);
}

export async function create(
    data: Omit<Customer, "id" | "createdAt">
): Promise<Customer> {
    const customers = await getAll();
    const newCustomer: Customer = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    customers.push(newCustomer);
    await writeJson(filePath, customers);
    return newCustomer;
}

export async function update(
    id: string,
    data: Partial<Customer>
): Promise<Customer | undefined> {
    const customers = await getAll();
    const index = customers.findIndex((c) => c.id === id);
    if (index === -1) return undefined;

    customers[index] = { ...customers[index], ...data };
    await writeJson(filePath, customers);
    return customers[index];
}

export async function remove(id: string): Promise<boolean> {
    const customers = await getAll();
    const filtered = customers.filter((c) => c.id !== id);
    const changed = filtered.length !== customers.length;
    if (changed) await writeJson(filePath, filtered);
    return changed;
}
