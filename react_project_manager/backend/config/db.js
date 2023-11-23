import mongoose from "mongoose";

const connectMongoose = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_DB,
            { useNewUrlParser: true, useUnifiedTopology: true }
          );

        console.log("Conectado a la base de datos");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
  
};

export default connectMongoose;