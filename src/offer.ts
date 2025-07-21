// Typ für Kundendaten
export type Customer = {
    name: string;
    email: string;
    phone?: string;
    address: string;
    contactPerson?: string;
};

// Typ für Angebotsdaten
export type Position = {
    label: string; // z. B. „Edelstahlgeländer gerade“
    quantity: number; // z. B. 5
    unit: "m" | "stück" | "h"; // Laufmeter, Stück, Stunden
    unitPrice: number; // Preis pro Einheit

    material?: string; // z. B. „Edelstahl“, „Aluminium“
    dimensions?: {
        length?: number; // in cm
        width?: number;
        height?: number;
    };

    type?: "product" | "service"; // z. B. Geländer = product, Montage = service
};

// Typ für das Angebot
export type Offer = {
    title: string;
    customer: Customer;
    positions: Position[];
    date: Date;
};
