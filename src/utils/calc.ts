import type { Offer } from "@smartoffer/types";

export function calcTotal(offer: Offer): number {
    return offer.positions.reduce(
        (sum, pos) => sum + pos.quantity * pos.unitPrice,
        0
    );
}
