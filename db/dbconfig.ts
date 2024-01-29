import mongoose from "mongoose";

const URI = 'mongodb://127.0.0.1:27017/Buzz'

// async function ConnectDB(){
//     try{
//         await mongoose.connect(URI)
//         console.log("Connected to database successfully")
//         }catch(error){
//         console.log("connection error", error)
//         }
// }


// Connection URI (Uniform Resource Identifier)

// Connect to MongoDB
mongoose.connect(URI);

// Get the default connection
const db = mongoose.connection;

// Event handlers for the connection
db.on('connected', () => {
  console.log(`Mongoose connected to ${URI}`);
});

db.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Close the Mongoose connection when the Node process exits
// process.on('SIGINT', () => {
//     db.close(()=> {
//       console.log('Mongoose disconnected through app termination');
//       process.exit(0);
//   });
// });

export { db };