import mongoose from "mongoose";
import connectToDb from "./config/db.config.js";
import productModel from "./app/models/product.model.js";

const products = [
    {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with adjustable DPI.",
        price: { amount: 799, currency: "INR" }
    },
    {
        name: "Mechanical Keyboard",
        description: "Compact mechanical keyboard with tactile switches.",
        price: { amount: 2499, currency: "INR" }
    },
    {
        name: "USB-C Hub",
        description: "Multiport USB-C hub with HDMI and USB 3.0 ports.",
        price: { amount: 1599, currency: "INR" }
    },
    {
        name: "Bluetooth Headphones",
        description: "Over-ear Bluetooth headphones with up to 30 hours of battery life.",
        price: { amount: 3299, currency: "INR" }
    },
    {
        name: "Laptop Stand",
        description: "Adjustable aluminum stand for laptops up to 16 inches.",
        price: { amount: 1199, currency: "INR" }
    },
    {
        name: "Portable SSD",
        description: "1 TB portable solid-state drive with USB-C connectivity.",
        price: { amount: 6499, currency: "INR" }
    },
    {
        name: "Webcam",
        description: "1080p USB webcam with built-in microphone.",
        price: { amount: 1899, currency: "INR" }
    },
    {
        name: "Smartphone Charger",
        description: "30 W USB-C fast charger compatible with USB Power Delivery.",
        price: { amount: 999, currency: "INR" }
    },
    {
        name: "Desk Lamp",
        description: "Dimmable LED desk lamp with adjustable color temperature.",
        price: { amount: 1399, currency: "INR" }
    },
    {
        name: "Phone Stand",
        description: "Foldable adjustable stand for smartphones and small tablets.",
        price: { amount: 499, currency: "INR" }
    }
];

try {
    await connectToDb();
    const seededProducts = await productModel.insertMany(products);
    console.log(`Seeded ${seededProducts.length} products.`);
} catch (error) {
    console.error("Failed to seed products:", error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
