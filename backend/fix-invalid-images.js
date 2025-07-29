const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Connect to database
mongoose.connect("mongodb://localhost:27017/Gumroad");

const productSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },  
    products :[{
        productName : String,
        productDescription : String,
        productThumbnail : String,
        productFile : String,
        sales : Number,
        revenue : Number,
        price : Number,
        published : Boolean
    }]
});

const PublishedProductSchema = new mongoose.Schema({
    productId : String,
    productOwner : String,
    productName : String,
    productDescription : String,
    productThumbnail : String,
    sales : Number,
    price : Number
});

const Product = mongoose.model("Product", productSchema);
const PublishedProducts = mongoose.model("PublishedProducts", PublishedProductSchema);

async function fixInvalidImages() {
    try {
        console.log("🔍 Checking for invalid image references...");

        // Get all products
        const allProducts = await Product.find({});
        const uploadsDir = path.join(__dirname, "public/imageUploads");

        let removedCount = 0;

        for (const userProduct of allProducts) {
            let hasChanges = false;

            // Filter out products with invalid images
            const validProducts = userProduct.products.filter(product => {
                const imagePath = path.join(uploadsDir, product.productThumbnail);

                // Check if image file exists
                if (!fs.existsSync(imagePath) || product.productThumbnail.startsWith('INVALID_IMAGE_')) {
                    console.log(`❌ Removing invalid product: ${product.productName} -> ${product.productThumbnail}`);
                    removedCount++;
                    return false; // Remove this product
                } else {
                    console.log(`✅ Valid product: ${product.productName} -> ${product.productThumbnail}`);
                    return true; // Keep this product
                }
            });

            if (validProducts.length !== userProduct.products.length) {
                userProduct.products = validProducts;
                await userProduct.save();
                hasChanges = true;
            }
        }

        // Also clean up published products
        const publishedProducts = await PublishedProducts.find({});

        for (const product of publishedProducts) {
            const imagePath = path.join(uploadsDir, product.productThumbnail);

            if (!fs.existsSync(imagePath) || product.productThumbnail.startsWith('INVALID_IMAGE_')) {
                console.log(`❌ Removing invalid published product: ${product.productName} -> ${product.productThumbnail}`);
                await PublishedProducts.deleteOne({ _id: product._id });
                removedCount++;
            } else {
                console.log(`✅ Valid published product: ${product.productName} -> ${product.productThumbnail}`);
            }
        }

        console.log(`\n🎉 Removed ${removedCount} products with invalid images`);
        console.log("Your database is now clean. Create new products to test the upload system!");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

fixInvalidImages();
