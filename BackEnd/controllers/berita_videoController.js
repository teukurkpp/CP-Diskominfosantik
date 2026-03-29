const db = require("../config/db");

exports.uploadVideo = (req, res) => {
  console.log("req.body:", req.body);

  const { judul, deskripsi, url_video } = req.body;

  if (!judul || !deskripsi || !url_video) {
    return res.status(400).json({
      error: "Semua field wajib diisi (judul, deskripsi, url_video)",
      received: req.body,
    });
  }

  const sql =
    "INSERT INTO berita_video (judul, deskripsi, url_video, created_at) VALUES (?, ?, ?, NOW())";
  const values = [judul, deskripsi, url_video];

  console.log("Executing SQL:", sql);
  console.log("With values:", values);

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Gagal mengupload video ke database.",
        details: err.message,
      });
    }
    res.status(201).json({
      message: "Video Berita Berhasil Terupload",
      id: result.insertId,
      data: {
        id: result.insertId,
        judul,
        deskripsi,
        url_video,
      },
    });
  });
};

exports.getVideos = (req, res) => {
  db.query(
    "SELECT * FROM berita_video ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

exports.getVideoDetail = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM berita_video WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Video Tidak Ditemukan" });
    res.json(results[0]);
  });
};

exports.deleteVideo = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM berita_video WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Video berhasil dihapus" });
  });
};
