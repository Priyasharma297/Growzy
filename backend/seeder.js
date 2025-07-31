const mongoose= require("mongoose");
const dotenv=require("dotenv");
const Product=require("./models/Product");
const User=require("./models/User");
const products=require("./data/products");
const Cart=require("./models/Cart");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData=async ()=>{
    try {
        //clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

     
        const createdUser=await User.create({
            name:"Admin User",
            email: "admin@example.com",
            password:"123456",
            role:"admin",
        });

        const userID=createdUser._id;

        const sampleProducts=products.map((product)=>{
            return {...product, user: userID};
        });

        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully");
        process.exit();

    } catch (error) {
        console.error("Error seeding the data",error);
process.exit();
    }
}
seedData();