import { Router } from "express";
import * as offerRepo from "../repos/offerRepo";
import { Offer } from "@smartoffer/types";
import { sendError, sendSuccess } from "../utils/apiResponse";

type OfferInput = Omit<Offer, "id" | "createdAt" | "updatedAt" | "totalPrice">;

const router = Router();

// Get all offers
router.get("/", async (req, res) => {
    try {
        const offers: Offer[] = await offerRepo.getAll();
        sendSuccess(res, offers);
    } catch (error) {
        sendError(res, "Error retrieving offers", 500, error);
    }
});

// Get offer by ID
router.get("/:id", async (req, res) => {
    try {
        const offer: Offer | undefined = await offerRepo.getById(req.params.id);
        if (!offer) {
            return sendError(res, "Offer not found", 404);
        }
        sendSuccess(res, offer);
    } catch (error) {
        sendError(res, "Error retrieving offer", 500, error);
    }
});

// POST /offers
router.post("/", async (req, res) => {
    try {
        const body = req.body as OfferInput;

        // Einfache Validierung
        if (!body.title) {
            return sendError(res, "Title is required", 400);
        }

        const newOffer = await offerRepo.create(body);

        // Erfolgreiche Erstellung
        sendSuccess(res, newOffer, 201);
    } catch (error) {
        sendError(res, "Error creating offer", 500, error);
    }
});

// PUT /offers/:id
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body as Partial<OfferInput>; // Teil-Updates erlauben

        if (!id) {
            return sendError(res, "ID is required", 400);
        }

        const updated = await offerRepo.update(id, {
            ...body,
            updatedAt: new Date().toISOString(),
        });

        if (!updated) {
            return sendError(res, "Offer not found", 404);
        }

        sendSuccess(res, updated);
    } catch (error) {
        sendError(res, "Error updating offer", 500, error);
    }
});

// DELETE /offers/:id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return sendError(res, "ID is required", 400);
        }
        const success = await offerRepo.remove(id);

        if (!success) {
            return sendError(res, "Offer not found", 404);
        }

        sendSuccess(res, { message: "Offer deleted successfully" });
    } catch (error) {
        sendError(res, "Error deleting offer", 500, error);
    }
});

export default router;
