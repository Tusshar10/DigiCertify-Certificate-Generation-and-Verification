const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const OrganizationModel = require("./models/organization");
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/DigiCertify");

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Terminate the application on connection error
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const organization = await OrganizationModel.findOne({ email });
        if (!organization) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        if (password!==organization.password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        res.status(200).json({ message: "Login successful", organization });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/register', async (req, res) => {
    try {
        const newOrganization = new OrganizationModel(req.body);
        await newOrganization.save();
        res.status(201).json(newOrganization);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});