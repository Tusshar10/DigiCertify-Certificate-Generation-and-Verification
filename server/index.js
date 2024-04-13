const express = require("express");
const mongoose = require("mongoose");
const jwt=require("jsonwebtoken")
const secretkey="secretkey"
const cors = require("cors");
const OrganizationModel = require("./models/organization");
const app = express();
const { Web3 } = require('web3');

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
        jwt.sign({email,password},secretkey,(err,token)=>{
            res.status(200).json({ message: "Login successful",token:token});
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(400).json({ error: error.message });
    }
});
app.post('/register', async (req, res) => {
    try {
        const newOrganization = new OrganizationModel(req.body);
        await newOrganization.save();
        const formData=req.body;
        jwt.sign({formData},secretkey,(err,token)=>{
            res.status(201).json({ message: "Sigup successful",token:token});
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/addblock', async (req, res) => {
    try {
        const contractAbi = require('../truffle/build/contracts/Certificate.json').abi;
        const contractAddress = '0xd76FF6eca12698240c35E5e1dddf43a35B83471A';
        const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
        const contract = new web3.eth.Contract(contractAbi, contractAddress);

        const hash = req.body.hash;

        // Call a view or pure function
        const result = await contract.methods.checkIpfsHash(hash).call();
        console.log('Result:', result);

        // Send a transaction to a function that modifies state
        const transaction = await contract.methods.setIpfsHash(hash).send({ from: '0xE08f0562FcCe66a07FC5EDF081A7C45e06Ecdd9c'});

        // Convert BigInt values to strings in the transaction object
        const transactionObject = {
            ...transaction,
            transactionHash: transaction.transactionHash,
            blockHash: transaction.blockHash,
            blockNumber: transaction.blockNumber.toString(),
            transactionIndex: transaction.transactionIndex.toString(),
            cumulativeGasUsed: transaction.cumulativeGasUsed.toString(),
            gasUsed: transaction.gasUsed.toString(),
            status: transaction.status ? transaction.status.toString() : null,
        };
        console.log(transactionObject)
        // Respond with success message and transaction details
        res.status(200).json({
            success: true,
            message: 'Transaction successfully added to blockchain',
        });
    } catch (error) {
        console.error("Error during adding to blockchain:", error);
        res.status(400).json({ success: false, error: error.message });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});