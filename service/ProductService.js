import db from "../config/db.js";

async function getAllProducts() {
  try {
    const { data: products, error } = await db.from("product").select();
    if (error) {
      throw new Error("Failed to fetch products");
    }
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
}

async function getProductById(id) {
  try {
    const { data, error } = await db.from("product").select().eq("id", id);
    if (error) {
      throw new Error("Failed to fetch product by ID");
    }
    if (data.length === 0) {
      throw new Error("Product not found");
    }
    return data[0];
  } catch (error) {
    throw new Error("Failed to fetch product by ID: " + error.message);
  }
}

async function createProduct(title, description, price, author) {
  try {
    const { data, error } = await db
      .from("product")
      .insert({ title, description, price, author });
    if (error) {
      throw new Error("Failed to create product");
    }
    return data;
  } catch (error) {
    throw new Error("Failed to create product: " + error.message);
  }
}

async function DeleteProductService(id) {
  try {
    const { data, error } = await db
      .from("product")
      .delete()
      .eq("id", id)
      .single();
    if (error) {
      return Error(error.message);
    }
    return data;
  } catch (error) {
    throw new Error("Failed to delete product: " + error.message);
  }
}

export { getAllProducts, getProductById, createProduct, DeleteProductService };
