const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/artikel";
    require("fs").mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file gambar yang diizinkan!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

exports.uploadBerita = [
  upload.single("gambar"),
  (req, res) => {
    const { judul, isi } = req.body;
    const gambarPath = req.file ? `artikel/${req.file.filename}` : null;
    db.query(
      "INSERT INTO berita (judul, isi, gambar_path) VALUES (?, ?, ?)",
      [judul, isi, gambarPath],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Berita Terupload" });
      }
    );
  },
];

exports.getBerita = (req, res) => {
  db.query("SELECT * FROM berita ORDER BY uploaded_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBeritaTerbaru = (req, res) => {
  db.query(
    "SELECT * FROM berita ORDER BY uploaded_at DESC LIMIT 4",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getBeritaDetail = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM berita WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Berita Tidak Ditemukan" });
    res.json(results[0]);
  });
};

exports.deleteBerita = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM berita WHERE id =?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Berita berhasil dihapus" });
  });
};

exports.updateBerita = [
  upload.single("gambar"),
  (req, res) => {
    const { id } = req.params;
    const { judul, isi } = req.body;
    let gambarPath = null;

    if (req.file) {
      gambarPath = `artikel/${req.file.filename}`;
    }

    let query = "UPDATE berita SET judul = ?, isi = ?";
    let queryParams = [judul, isi];

    if (gambarPath) {
      query += ", gambar_path = ?";
      queryParams.push(gambarPath);
    }

    query += " WHERE id = ?";
    queryParams.push(id);

    db.query(query, queryParams, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Berita Tidak Ditemukan" });
      res.json({ message: "Berita berhasil diperbarui" });
    });
  },
];
