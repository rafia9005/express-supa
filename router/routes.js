import express from "express";

// middleware
import { Auth, Admin } from "../middleware/middleware.js";

// controller
import { Login, Register, Logout } from "../controller/auth/AuthController.js";
import {
  IndexProduct,
  ShowProduct,
  CreateProduct,
  DeleteProduct,
} from "../controller/ProductController.js";
import { getUser } from "../controller/controller.js";

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/logout", Logout);

// Auth dulu baru Admin
router.get("/user", Auth, getUser);

// product routing
router.get("/product", IndexProduct);
router.get("/product/:id", ShowProduct);
router.post("/product", CreateProduct);
router.delete("/product/:id", DeleteProduct)
export default router;
