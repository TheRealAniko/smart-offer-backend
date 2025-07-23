import { Offer } from "../data/offer";

export function calcTotal(offer: Offer): number {
    return offer.positions.reduce(
        (sum, pos) => sum + pos.quantity * pos.unitPrice,
        0
    );
}
