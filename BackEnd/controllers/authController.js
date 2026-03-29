const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerAdmin = (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error("Hashing Error:", err.message);
      return res.status(500).json({ error: "Failed to hash password" });
    }
    db.query(
      "INSERT INTO admin (username, password) VALUES (?, ?)",
      [username, hash],
      (err, result) => {
        if (err) {
          console.error("DB Insert Error:", err.message);
          return res.status(500).json({ error: "Failed to register admin" });
        }
        res.status(201).json({ message: "Admin Berhasil Didaftarkan" });
      }
    );
  });
};

exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.query(
    "SELECT id, username FROM admin WHERE id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("DB Query Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      const user = {
        id: results[0].id,
        name: results[0].username,
        email: `${results[0].username}@example.com`,
      };
      res.json(user);
    }
  );
};

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM admin WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("DB Query Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      if (results.length === 0)
        return res.status(401).json({ error: "Invalid credentials" });
      bcrypt.compare(password, results[0].password, (err, isMatch) => {
        if (err) {
          console.error("Compare Error:", err.message);
          return res.status(500).json({ error: "Authentication error" });
        }
        if (!isMatch)
          return res.status(401).json({ error: "Invalid credentials" });
        const user = {
          id: results[0].id,
          name: results[0].username,
          email: `${results[0].username}@example.com`,
        };
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.json({ token, user });
      });
    }
  );
};
