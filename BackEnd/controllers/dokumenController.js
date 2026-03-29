const db = require("../config/db");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/dokumen/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

exports.uploadDocument = [
  upload.single("file"),
  (req, res) => {
    const { judul, kategori } = req.body;
    const filePath = req.file.path;
    db.query(
      "INSERT INTO dokumen (judul, kategori, file_path) VALUES (?, ?, ?)",
      [judul, kategori, filePath],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Dokumen Terupload" });
      }
    );
  },
];

exports.getDocuments = (req, res) => {
  const { pencarian, kategori, page = 1, limit = 5 } = req.query;
  const offset = (page - 1) * limit;
  let query = "SELECT * FROM dokumen";
  let countQuery = "SELECT COUNT(*) as total FROM dokumen";
  const params = [];
  const countParams = [];

  if (pencarian) {
    query += " WHERE judul LIKE ?";
    countQuery += " WHERE judul LIKE ?";
    params.push(`%${pencarian}%`);
    countParams.push(`%${pencarian}%`);
  }
  if (kategori) {
    query += pencarian
      ? " AND LOWER(kategori) = LOWER(?)"
      : " WHERE LOWER(kategori) = LOWER(?)";
    countQuery += pencarian
      ? " AND LOWER(kategori) = LOWER(?)"
      : " WHERE LOWER(kategori) = LOWER(?)";
    params.push(kategori);
    countParams.push(kategori);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  console.log("Query:", query, "Params:", params);

  db.query(countQuery, countParams, (err, countResults) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = countResults[0].total;

    db.query(query, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ documents: results, total });
    });
  });
};

exports.downloadDocument = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT file_path FROM dokumen WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0)
        return res.status(404).json({ error: "Dokumen Tidak Ditemukan" });
      const filePath = path.resolve(results[0].file_path);
      res.download(filePath, (err) => {
        if (err) {
          console.error("Download Error:", err.message);
          return res.status(500).json({ error: "Gagal mengunduh file" });
        }
      });
    }
  );
};

exports.deleteDocument = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM dokumen WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Dokumen berhasil dihapus" });
  });
};
