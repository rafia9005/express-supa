import db from "../config/db.js";

async function getUser(req, res) {
  const token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    const { data, error } = await db.auth.getUser(authToken);

    res.send(data)
  }
}

export { getUser };
