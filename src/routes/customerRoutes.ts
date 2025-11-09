import { Router } from "express";
import * as customerRepo from "../repos/customerRepo";
import { Customer } from "@smartoffer/types";
import { sendError, sendSuccess } from "../utils/apiResponse";

type CustomerInput = Omit<Customer, "id" | "createdAt" | "updatedAt">;

const router = Router();

// Get all customers
router.get("/", async (req, res) => {
    try {
        const customers: Customer[] = await customerRepo.getAll();
        sendSuccess(res, customers);
    } catch (error) {
        sendError(res, "Error retrieving customers", 500, error);
    }
});

// Get customer by ID
router.get("/:id", async (req, res) => {
    try {
        const customer: Customer | undefined = await customerRepo.getById(
            req.params.id
        );
        if (!customer) {
            return sendError(res, "Customer not found", 404);
        }
        sendSuccess(res, customer);
    } catch (error) {
        sendError(res, "Error retrieving customer", 500, error);
    }
});

// POST /customers
router.post("/", async (req, res) => {
    try {
        const body = req.body as CustomerInput;

        // Einfache Validierung
        if (!body.name) {
            return sendError(res, "Name is required", 400);
        }

        const newCustomer = await customerRepo.create(body);

        // Erfolgreiche Erstellung
        sendSuccess(res, newCustomer, 201);
    } catch (error) {
        sendError(res, "Error creating customer", 500, error);
    }
});

// PUT /customers/:id
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body as Partial<CustomerInput>; // Teil-Updates erlauben

        if (!id) {
            return sendError(res, "ID is required", 400);
        }

        const updatedCustomer = await customerRepo.update(id, body);
        if (!updatedCustomer) {
            return sendError(res, "Customer not found", 404);
        }

        sendSuccess(res, updatedCustomer);
    } catch (error) {
        sendError(res, "Error updating customer", 500, error);
    }
});

// DELETE /customers/:id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            return sendError(res, "ID is required", 400);
        }

        const deleted = await customerRepo.remove(id);
        if (!deleted) {
            return sendError(res, "Customer not found", 404);
        }

        sendSuccess(res, { message: "Customer deleted successfully" });
    } catch (error) {
        sendError(res, "Error deleting customer", 500, error);
    }
});

export default router;
