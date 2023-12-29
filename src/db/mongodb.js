const mongoose = require("mongoose");

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://omnathgana:3EmmPGjgfMeeSVpP@cluster0.kyxkhld.mongodb.net/?retryWrites=true&w=majority',{
        useUnifiedTopology:true,
        useNewUrlParser:true
      });
      console.log("Connection to MongoDB successful");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }
  
  connectToDatabase();
  