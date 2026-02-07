import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const upload = multer({ dest: "uploads/" });

let proofs = [];

app.post("/login", (req, res) => {
  const { user, pass } = req.body;
  if (user === "admin" && pass === "admin123") {
    return res.json({ success: true });
  }
  res.json({ success: false });
});

app.post("/post", upload.single("image"), (req, res) => {
  const { message } = req.body;
  const imgPath = "/uploads/" + req.file.filename;

  proofs.unshift({
    message,
    image: imgPath,
    date: Date.now()
  });

  res.json({ success: true });
});

app.get("/proofs", (req, res) => {
  res.json(proofs);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log("JZOVV PROOFS running on http://localhost:" + PORT);
});