import db from "../config/db.js";

const Auth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    try {
      const authToken = token.split(" ")[1];
      const { data, error } = await db.auth.getUser(authToken);
      if (error) {
        console.error("Error verifying token:", error.message);
        res.status(401).json({ message: "Unauthorized" });
      } else {
        req.user = data;
        next();
      }
    } catch (err) {
      console.error("Error verifying token:", err.message);
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const Admin = async (req, res, next) => {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    try {
      const { data, error } = await db.auth.getUser(authToken);

      if (error) {
        console.error("Error fetching user data:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (!data) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const role = data.user.user_metadata.role;
      if (role === "admin") {
        next();
      } else {
        res.status(403).json({ message: "Forbidden" });
      }
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { Auth, Admin };
