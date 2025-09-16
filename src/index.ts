import express from 'express';
import cors from 'cors';
import { upload } from './middlewares/multer.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from "uuid";
import { Pdf } from './models/schema.js';
dotenv.config();

const app = express();
app.use(express.static('public')); //to serve files from the public directory
app.use(cors());

const dbUrl = process.env.DB as string;

app.post("/upload", upload.single("file"), async(req, res) => {
  try {
    const uuid = uuidv4();

    const pdf = await Pdf.create({
      filename: req.file!.filename,
      uuid,
      userId: req.body.userId || "guest", // can be dynamic if logged in user
      path: req.file!.path,
    });

    res.json({
      message: "File uploaded successfully",
      uuid,
      filename: req.file!.filename,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File upload failed" });
  }
});


async function main(){
    try{
        await mongoose.connect(dbUrl);
        app.listen(8000, () => console.log(`Server is running on http://localhost:${8000}`));
    }
    catch(e){
       console.log("Database Connection Error");
    }
}

main();
