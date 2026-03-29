const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const multer = require("multer");
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/dokumen", require("./routes/dokumenRoutes"));
app.use("/api/berita", require("./routes/beritaRoutes"));
app.use("/api/berita_video", require("./routes/berita_vidioRoutes"));
app.use("/api/program", require("./routes/programRoutes"));
app.use("/api/kegiatan", require("./routes/kegiatanRoutes"));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

console.log("All routes registered.");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
