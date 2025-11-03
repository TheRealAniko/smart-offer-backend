import { Router } from "express";
import * as offerRepo from "../repos/offerRepo";
import { Offer } from "@smartoffer/types";

type OfferInput = Omit<Offer, "id" | "createdAt" | "updatedAt" | "totalPrice">;

const router = Router();

// Get all offers
router.get("/", async (req, res) => {
    try {
        const offers: Offer[] = await offerRepo.getAll();
        res.json(offers);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving offers" });
    }
});

// Get offer by ID
router.get("/:id", async (req, res) => {
    try {
        const offer: Offer | undefined = await offerRepo.getById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: "Offer not found" });
        }
        res.json(offer);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving offer" });
    }
});

// POST /offers
router.post("/", async (req, res) => {
    try {
        const body = req.body as OfferInput;

        if (!body.title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newOffer = await offerRepo.create(body);
        res.status(201).json(newOffer);
    } catch (error) {
        res.status(500).json({ message: "Error creating offer" });
    }
});

// PUT /offers/:id
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body as Partial<OfferInput>; // Teil-Updates erlauben

        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }

        const updated = await offerRepo.update(id, {
            ...body,
            updatedAt: new Date().toISOString(),
        });

        if (!updated) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Error updating offer" });
    }
});

// DELETE /offers/:id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ message: "ID is required" });
        }
        const success = await offerRepo.remove(id);

        if (!success) {
            return res.status(404).json({ message: "Offer not found" });
        }

        res.json({ message: "Offer deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting offer" });
    }
});

export default router;
