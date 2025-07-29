const express = require("express")
const path = require("path")
const fs = require("fs")

const rootRouter = require("./routes/RouteIndex")
const cors = require("cors")
const app = express();

// SIMPLE CORS - allow everything
app.use(cors())
app.use(express.json());

// DIRECT IMAGE SERVING - no middleware complications
app.get("/uploads/:filename", (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "public/imageUploads", filename);

    console.log("🖼️  IMAGE REQUEST:", filename);
    console.log("📁 FILE PATH:", filePath);
    console.log("✅ EXISTS:", fs.existsSync(filePath));

    if (fs.existsSync(filePath)) {
        // Set proper headers
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Send the file directly
        const imageBuffer = fs.readFileSync(filePath);
        res.send(imageBuffer);
        console.log("✅ IMAGE SENT SUCCESSFULLY");
    } else {
        console.log("❌ FILE NOT FOUND");
        res.status(404).json({ error: "Image not found", filename, path: filePath });
    }
});

// Debug route to check database
app.get("/debug/products", async (req, res) => {
    try {
        const { Product, PublishedProducts } = require("./db");
        const products = await Product.find({});
        const published = await PublishedProducts.find({});
        res.json({ products, published });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.use("/api/v1", rootRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});