const { ObjectId } = require("mongodb");

const validationSchema = require("./validationSchemaBack");
const { getDB } = require("./dbConnect");

//GET
const getAllProducts = async (req, res) => {
  try {
    const dbMongo = getDB();
    const productsCollection = dbMongo.collection("products");
    const allProducts = await productsCollection.find().toArray();
    res.json(allProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error. Error fetching", error });
  }
};

//POST

const createProduct = async (req, res) => {
  const { error, value } = validationSchema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: "Invalid data", details: error.details });
  }
  try {
    const dbMongo = getDB();
    const products = dbMongo.collection("products");
    const product = await products.insertOne(req.body);
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error. Error adding product.", error });
  }
};

//DELETE

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const dbMongo = getDB();
    const productsCollection = dbMongo.collection("products");

    const resultDelete = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (resultDelete.deletedCount > 0) {
      res.json({ message: "Product deleted." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Error deleting product.",
      error,
    });
  }
};

//PUT
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productUpdate = req.body;

  try {
    const dbMongo = getDB();
    const productsCollection = dbMongo.collection("products");

    const findProduct = await productsCollection.findOne({
      _id: new ObjectId(id),
    });
    if (
      findProduct.title === productUpdate.title &&
      findProduct.description === productUpdate.description &&
      findProduct.price === productUpdate.price
    ) {
      return res.status(400).json({ message: "Not changes." });
    }
    const resultUpdate = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: productUpdate }
    );

    if (resultUpdate.modifiedCount > 0) {
      res.json({ message: "Product update." });
    } else {
      res.status(404).json({ message: "Product not found or not changes." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error. Error update product.",
      error,
    });
  }
};

module.exports = {
  getAllProducts,
  deleteProduct,
  updateProduct,
  createProduct,
};
