const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/kegiatan";
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
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

exports.createKegiatan = [
  upload.single("foto"),
  (req, res) => {
    const { nama, deskripsi } = req.body;
    const fotoPath = req.file ? `kegiatan/${req.file.filename}` : null;
    db.query(
      "INSERT INTO kegiatan (nama, deskripsi, foto) VALUES (?, ?, ?)",
      [nama, deskripsi, fotoPath],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res
          .status(201)
          .json({ message: "Kegiatan berhasil dibuat", id: result.insertId });
      }
    );
  },
];

exports.getKegiatans = (req, res) => {
  db.query(
    "SELECT id, nama, deskripsi, foto AS image, created_at AS date FROM kegiatan ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getKegiatanDetail = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM kegiatan WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Kegiatan Tidak Ditemukan" });
    res.json(results[0]);
  });
};

exports.updateKegiatan = [
  upload.single("foto"),
  (req, res) => {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;
    if (req.file) {
      const fotoPath = `kegiatan/${req.file.filename}`;
      db.query(
        "UPDATE kegiatan SET nama = ?, deskripsi = ?, foto = ? WHERE id = ?",
        [nama, deskripsi, fotoPath, id],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Kegiatan berhasil diupdate" });
        }
      );
    } else {
      db.query(
        "UPDATE kegiatan SET nama = ?, deskripsi = ? WHERE id = ?",
        [nama, deskripsi, id],
        (err, result) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "Kegiatan berhasil diupdate" });
        }
      );
    }
  },
];

exports.deleteKegiatan = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM kegiatan WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Kegiatan berhasil dihapus" });
  });
};
