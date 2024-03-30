import express from "express";
import router from "./router/routes.js";

const app = express();
app.use(express.json());

// port running
const port = process.env.PORT || 3000;

app.use("/", router);

// app listen
app.listen(port, () => {
  console.log(`running on http://localhost:${port}`);
});

module.exports = app;