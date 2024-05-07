import express from "express";
import cors from "cors";
import { config } from "dotenv";
import pdf from "html-pdf";
import { template } from "./documents/index.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { google } from "googleapis";
import { Certificate } from "./models/certificateSchema.js";
import apikey from "./config/Cred.json" assert { type: "json" };
import fs from "fs";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SCOPE = ["https://www.googleapis.com/auth/drive"];
let api = "";

config({ path: "./config/config.env" });

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const connectDB = async () => {
  const { connection } = await mongoose.connect(
    "mongodb+srv://chitreshgupta9876:9nMpYpsvTgkV2ed8@cluster0.gxjh460.mongodb.net"
  );
  console.log(`Mongodb is connected with ${connection.host}`);
};
connectDB();

const authorised = async () => {
  const jwtClient = new google.auth.JWT(
    apikey.client_email,
    null,
    apikey.private_key,
    SCOPE
  );
  await jwtClient.authorize();

  return jwtClient;
}

const uploadFile = async (authClient,res) => {
  new Promise((resolve, rejected) => {
    const drive = google.drive({ version: "v3", auth: authClient });
    var fileMetaData = {
      name: "certificate.pdf",
      parents: ["1qq1YZ5hgD-R7mYroaxIfNAVK1K2sHrep"],
    };

    drive.files.create(
      {
        resource: fileMetaData,
        media: {
          body: fs.createReadStream("certificate.pdf"),
          mimeType: "application/pdf",
        },
        fields: "id",
      },
      (err, file) => {
        if (err) return rejected(err);
        api = file?.data?.id;
        res.status(201).json({
          success: true,
          link: `https://drive.google.com/file/d/${api}`,
        });
          resolve(file?.data?.id);
      }
    );
  })
  return api;
}

app.post("/certificates/generate", (req, res) => {
    const { name, course, date, refID } = req.body;
    // Generate PDF
    pdf
      .create(template(name, course, date, refID), {})
      .toFile("certificate.pdf", (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                error: err,
            })
        }
        var id;
        authorised().then((resi) => {
          uploadFile(resi, res)
         }).catch();
      });
});

app.get("/save", async (req, res) => {
  const { name, course, date, refID, link } = req.body;
const newCertificate = new Certificate({
  name,
  course,
  date,
  refID,
  link,
});
await newCertificate.save();
res.json(newCertificate);

});



