import db from "../../config/db.js";

async function Login(req, res) {
  const { email, password } = req.body;
  try {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    res.json(data.session);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

async function Register(req, res) {
  const { name, email, password } = req.body;
  try {
    const { data, error } = await db.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          role: "users",
        },
      },
    });
    if (error) throw error;
    res.send(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function Logout(req, res) {
  const token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      const authToken = token.split(" ")[1];

      const { error } = await db.auth.signOut(authToken);

      if (error) {
        console.error("Error during logout:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        return;
      }

      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error during logout:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

export { Login, Register, Logout };
