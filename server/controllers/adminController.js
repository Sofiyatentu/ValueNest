const { imageUploadUtil } = require("../helpers/cloudinary");
const Product = require("../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "No file received",
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = `data:${req.file.mimetype};base64,${b64}`;

    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      category,
      brand,
      price,
      salePrice,
      stock,
      description,
    } = req.body;
    const newProduct = new Product({
      image,
      title,
      category,
      brand,
      price,
      salePrice,
      stock,
      description,
    });
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      category,
      brand,
      price,
      salePrice,
      stock,
      description,
    } = req.body;
    const product = await Product.findById(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    product.title = title || product.title;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.price = price || product.price;
    product.salePrice = salePrice || product.salePrice;
    product.stock = stock || product.stock;
    product.image = image || product.image;

    await product.save();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    res.status(200).json({
      success: true,
      message: "Product is deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};
module.exports = {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
};
