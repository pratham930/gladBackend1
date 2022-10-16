import mongoose from "mongoose"

const connectDB = async(DATABASE_URL)=> {

try {
     const DB_OPTION = {

        dbName:'glad',
    }
await mongoose.connect(DATABASE_URL,DB_OPTION);

console.log("CONNECTED succefully");

} catch (err) {
    console.log(err);
}

}
export default connectDB;
