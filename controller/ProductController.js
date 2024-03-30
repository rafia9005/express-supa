import {
  getAllProducts,
  getProductById,
  createProduct,
  DeleteProductService,
} from "../service/ProductService.js";

async function IndexProduct(req, res) {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function ShowProduct(req, res) {
  const id = req.params.id;
  try {
    const product = await getProductById(id);
    res.status(200).json({ message: "success", data: product });
  } catch (error) {
    if (error.message === "Product not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

async function CreateProduct(req, res) {
  const { title, description, price } = req.body;
  const token = req.headers.authorization;
  let author;

  if (token && token.startsWith("Bearer ")) {
    const authToken = token.split(" ")[1];
    author = decodeTokenAndGetUserId(authToken);
  }

  try {
    await createProduct(title, description, price, author);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function DeleteProduct(req, res) {
  const id = req.params.id;
  try {
    await DeleteProductService(id);
    res.status(200).json({
      message: "Product berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus product: " + error.message,
    });
  }
}

export { IndexProduct, ShowProduct, CreateProduct, DeleteProduct };
