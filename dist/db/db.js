"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const URI = 'mongodb://127.0.0.1:27017/Buzz';
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
mongoose_1.default.connect(URI);
// Get the default connection
const db = mongoose_1.default.connection;
exports.db = db;
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
