import { Email } from "@smartoffer/types";
import { create, getAll, getById, remove } from "./repos/offerRepo";

async function testOfferRepo() {
    console.log("Initial offers:", await getAll());

    // Create a new offer
    const newOffer = await create({
        title: "Luxury Cat Tower Deluxe",
        customer: {
            id: "customer-123",
            name: "The Fancy Feline Lounge",
            email: "contact@fancylounge.com" as Email,
            address: "Cat Street 42, Purr City",
        },
        positions: [
            {
                label: "Scratching post with integrated hammock",
                quantity: 1,
                unit: "stück",
                unitPrice: 199.99,
            },
            {
                label: "Modular climbing shelves (set of 3)",
                quantity: 1,
                unit: "stück",
                unitPrice: 129.99,
            },
        ],
        validUntil: new Date().toISOString(),
        footer: "Meow you later! 🐾",
    });
    console.log("Created offer:", newOffer);

    // Get all offers
    const offers = await getAll();
    console.log("All offers:", offers);

    // Get offer by ID
    const found = await getById(newOffer.id);
    console.log("Found offer by ID:", found);

    // Remove offer
    const deleted = await remove(newOffer.id);
    console.log("Offer deleted:", deleted);

    // Final offers
    console.log("Final offers:", await getAll());
}

testOfferRepo().catch(console.error);
