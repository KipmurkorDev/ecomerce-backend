const sqlConfig = require("../Config/config");
const sql = require("mssql");
const { v4 } = require("uuid");

const getProducts = async (req, res) => {
  try {
    const pool = await sql.connect(sqlConfig);
    const response = await pool.request().execute("getProducts");
    const products = await response.recordset;
    res.json(products);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id_product } = req.params;
    const pool = await sql.connect(sqlConfig);
    const product = await (
      await pool.request().input("id_product", id_product).execute("getproduct")
    ).recordset;

    if (product.length) {
      res.status(200).json(product);
    } else {
      res
        .status(404)
        .json({ message: `the product  id ${id_product} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const addproduct = async (req, res) => {
  try {
    const { id_product } = v4();
    const { name_product, description, price, discount_rate, image_url } =
      req.body;
    const pool = await sql.connect(sqlConfig);
    await pool
      .request()
      .input("id_product", id_product)
      .input("name_product", name_product)
      .input("description", description)
      .input("price", price)
      .input("discount_rate", discount_rate)
      .input("image_url", image_url)
      .execute("addproduct");

    res.status(201).json({ message: "Product Inserted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id_product } = req.params;
    const { name_product, description, price, discount_rate, image_url } =
      req.body;
    const pool = await sql.connect(sqlConfig);
    const product = await (
      await pool.request().input("id_product", id_product).execute("getProduct")
    ).recordset;
    if (product.length) {
      await pool
        .request()
        .input("id_product", id_product)
        .input("name_product", name_product)
        .input("description", description)
        .input("price", price)
        .input("discount_rate", discount_rate)
        .input("image_url", image_url)
        .execute("updatProduct");
      res.status(200).json({ message: "Product was Updated!!" });
    } else {
      res
        .status(404)
        .json({ message: `Product with id ${id_product} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id_product } = req.params;
    const pool = await sql.connect(sqlConfig);
    const product = await (
      await pool.request().input("id_product", id_product).execute("getProduct")
    ).recordset;

    if (product.length) {
      await pool
        .request()
        .input("id_product", id_product)
        .execute("deleteProduct");
      res.status(200).json({ message: "Product Deleted!!" });
    } else {
      res
        .status(404)
        .json({ message: `Product with id ${id_product} does not exist` });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  getProducts,
  getProduct,
  addproduct,
  updateProduct,
  deleteProduct,
};
