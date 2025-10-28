import { calcTotal } from "./utils/calc";
import type { Email, Offer } from "@smartoffer/types";

// Beispielangebot erstellen
const testOffer: Offer = {
    id: "test-001",
    title: "Testangebot für Treppengeländer",
    customer: {
        name: "Schlosserei Muster",
        email: "kontakt@schlosserei-muster.de" as Email,
        address: "Musterstraße 1, 12345 Musterstadt",
        phone: "01234 567890",
        contactPerson: "Herr Stahl",
    },
    positions: [
        {
            label: "Edelstahlgeländer",
            quantity: 2,
            unit: "stück",
            unitPrice: 750,
        },
        { label: "Montage", quantity: 1, unit: "h", unitPrice: 250 },
    ],
    createdAt: new Date().toISOString(),
};

const total = calcTotal(testOffer);
console.log(`Gesamtbetrag für das Angebot: ${total} EUR`);
