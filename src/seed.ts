import * as customerRepo from "./repos/customerRepo";
import * as offerRepo from "./repos/offerRepo";
import { Customer, Email, Offer } from "@smartoffer/types";
import { writeJson } from "./utils/fileStore";

async function seed() {
  console.log("Srarting database seeding...");

  try {

    await writeJson("./data/customers.json", []);
    await writeJson("./data/offers.json", []);
    console.log("Cleared existing data.");

    const customers: Omit<Customer, "id" | "createdAt" | "updatedAt">[] = [
      {
        name: "Studio Morgenlicht",
        email: "hello@morgenlicht.studio" as Email,
        phone: "+49 761 9871123",
        address: "Moltkestraße 14, 79098 Freiburg",
      },
      {
        name: "Leonie Weber Coaching",
        email: "kontakt@leonieweber.de" as Email,
        phone: "+49 30 22567890",
        address: "Oderberger Str. 8, 10435 Berlin",
      },
      {
        name: "Katzenkultur Verlag",
        email: "info@katzenkultur.de" as Email,
        phone: "+49 89 44556677",
        address: "Klenzestraße 19, 80469 München",
      },
      {
        name: "The Content Corner",
        email: "hi@contentcorner.ch" as Email,
        phone: "+41 44 4567890",
        address: "Zürichbergstrasse 21, 8032 Zürich",
      },
    ];
    const createdCustomers: Customer[] = [];
    for (const c of customers) {
      const created = await customerRepo.create(c);
      createdCustomers.push(created);
      console.log(`Created customer: ${created.name}`);
    }

    const offers: Omit<Offer, "id" | "createdAt" | "totalPrice">[] = [
      {
        title: "Website-Relaunch für Studio Morgenlicht",
        customer: createdCustomers[0],
        positions: [
          { label: "Design & Konzept", quantity: 1, unit: "stück", unitPrice: 1200 },
          { label: "Umsetzung in React & Tailwind", quantity: 1, unit: "stück", unitPrice: 2800 },
        ],
        validUntil: new Date().toISOString(),
        footer: "Vielen Dank für das Vertrauen!",
      },
      {
        title: "Coaching-Website für Leonie Weber",
        customer: createdCustomers[1],
        positions: [
          { label: "Landingpage mit CMS-Anbindung", quantity: 1, unit: "stück", unitPrice: 1500 },
          { label: "SEO-Optimierung", quantity: 1, unit: "stück", unitPrice: 300 },
        ],
        validUntil: new Date().toISOString(),
      },
    ]
    for (const o of offers) {
      const created = await offerRepo.create(o);
      console.log(`Created offer: ${created.title}`);
    }

  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seed();