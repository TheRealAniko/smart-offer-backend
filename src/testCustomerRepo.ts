import { create, getAll, getById, remove } from "./repos/customerRepo";
import { Email } from "@smartoffer/types";

async function testCustomerRepo() {
    console.log("Initial customers:", await getAll());

    // Create a new customer
    const newCustomer = await create({
        name: "Kitty Palace GmbH",
        email: "contact@kittypalace.com" as Email,
        address: "Catnip Alley 12, 79100 Freiburg",
    });
    console.log("✅ Created:", newCustomer);

    // Get all customers
    console.log("All customers:", await getAll());

    // Get customer by ID
    const found = await getById(newCustomer.id);
    console.log("✅ Found by ID:", found);

    // Remove customer
    const deleted = await remove(newCustomer.id);
    console.log("✅ Deleted:", deleted);

    // Final customers
    console.log("Final customers:", await getAll());
}

testCustomerRepo().catch(console.error);
