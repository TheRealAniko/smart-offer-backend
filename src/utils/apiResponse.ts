import { error } from "console";
import { Response } from "express";

export function sendError(
    res: Response,
    message: string,
    status = 500,
    details?: any
) {
    res.status(status).json({ error: message, details });
}

export function sendSuccess(res: Response, data: any, status = 200) {
    res.status(status).json(data);
}
