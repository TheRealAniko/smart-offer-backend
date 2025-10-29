import path from "path";
import { readJson, writeJson } from "../utils/fileStore";
import type { Offer } from "@smartoffer/types";

const filePath = path.join(process.cwd(), "data", "offers.json");

export async function getAll(): Promise<Offer[]> {
    return await readJson<Offer[]>(filePath);
}

export async function getById(id: string): Promise<Offer | undefined> {
    const offers = await getAll();
    return offers.find((o) => o.id === id);
}

export async function create(
    data: Omit<Offer, "id" | "createdAt">
): Promise<Offer> {
    const offers = await getAll();
    const newOffer: Offer = {
        ...data,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
    };
    offers.push(newOffer);
    await writeJson(filePath, offers);
    return newOffer;
}

export async function update(
    id: string,
    data: Partial<Offer>
): Promise<Offer | undefined> {
    const offers = await getAll();
    const index = offers.findIndex((o) => o.id === id);
    if (index === -1) return undefined;

    offers[index] = { ...offers[index], ...data };
    await writeJson(filePath, offers);
    return offers[index];
}

export async function remove(id: string): Promise<boolean> {
    const offers = await getAll();
    const filtered = offers.filter((o) => o.id !== id);
    const changed = filtered.length !== offers.length;
    if (changed) await writeJson(filePath, filtered);
    return changed;
}
