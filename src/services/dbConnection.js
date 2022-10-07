import mongoose from 'mongoose';
const connection = {}

export async function dbConnection(){
    if(connection.isConnected) {
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })

    connection.isConnected = db.connections[0].readyState;
}