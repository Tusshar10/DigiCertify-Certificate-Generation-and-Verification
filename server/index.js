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
const contractAbi = require('../truffle/build/contracts/Certificate.json').abi;
const contractAddress = '0xADfde7262EC1226Aa69d0d7CeB2381CD329BFb79';
const web3 = new Web3(new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545'));
const contract = new web3.eth.Contract(contractAbi, contractAddress);
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
                res.status(200).json({ message: "Login successful",token:token,name:organization.name});
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
        const hash = req.body.hash;
        // Call a view or pure function
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0]; // Use the first account for simplicity, you may choose a different account as needed
        // Call the smart contract function to add the IPFS hash to the latest block
        const transaction=await contract.methods.setIpfsHash(hash).send({ from: account,gas:3000000 });

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
        //console.log(transactionObject)
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
app.get("/checkhash/:hash", async (req, res) => {
    try {
        const hash = req.params.hash;

        // Call the checkIpfsHash function of the contract
        const isPresent = await contract.methods.checkIpfsHash(hash).call();
        res.status(200).json({ success: true, hash: hash, isPresent: isPresent });
    } catch (error) {
        console.error("Error checking IPFS hash:", error);
        res.status(500).json({ success: false, error: "Error checking IPFS hash" });
    }
});
app.get("/gethashes",async(req,res)=>{
    try {
        // Call the getAllIpfsHashes function of the contract
        const allHashes = await contract.methods.getAllIpfsHashes().call();
        res.status(200).json({ success: true, hashes: allHashes });
    } catch (error) {
        console.error("Error fetching IPFS hashes:", error);
        res.status(500).json({ success: false, error: "Error fetching IPFS hashes" });
    }
})
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});