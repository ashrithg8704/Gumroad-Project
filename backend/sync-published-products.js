const mongoose = require("mongoose");

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

async function syncPublishedProducts() {
    try {
        console.log("🔄 Syncing published products with current products...");
        
        // Get all products
        const allProducts = await Product.find({});
        
        for (const userProduct of allProducts) {
            for (const product of userProduct.products) {
                if (product.published) {
                    // Find the corresponding published product
                    const publishedProduct = await PublishedProducts.findOne({
                        productId: product._id.toString()
                    });
                    
                    if (publishedProduct) {
                        // Update published product with current data
                        publishedProduct.productName = product.productName;
                        publishedProduct.productDescription = product.productDescription;
                        publishedProduct.productThumbnail = product.productThumbnail;
                        publishedProduct.price = product.price;
                        publishedProduct.sales = product.sales;
                        
                        await publishedProduct.save();
                        console.log(`✅ Updated published product: ${product.productName} -> ${product.productThumbnail}`);
                    }
                }
            }
        }
        
        console.log("🎉 Sync completed!");
        
    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

syncPublishedProducts();
