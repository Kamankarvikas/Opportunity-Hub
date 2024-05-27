import mongoose from 'mongoose';
const dbConnection=async () =>{
    try{
        const dbConnection = await mongoose.connect(process.env.MONGO)
        console.log("DB connection Successfully");
    }catch(error)
    {
        console.log("DB ERROR"+error)
    }
};
export default dbConnection;