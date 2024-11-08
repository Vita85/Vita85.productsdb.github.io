const { MongoClient, ObjectId } = require("mongodb");

const validationSchema = require("./validationSchema")
require('dotenv').config(); 
const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("sample_mflix");


//GET

const getAllProducts = async (req, res) => {
  try {
    await client.connect();
    const productsCollection = database.collection("products");
    const allProducts = await productsCollection.find().toArray();
    res.json(allProducts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error. Error fetching", error });
  } finally {
    await client.close();
  }
};

//POST

const createProduct = async (req, res) => {

  const {error, value} = validationSchema.validate(req.body)

  if(error) {
    return res.status(400).json({ message: 'Invalid data', details: error.details });
  }
  try {
    await client.connect();
    const products = database.collection("products");
    const product = await products.insertOne(req.body);
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error. Error adding product.", error });
  } finally {
    await client.close();
  }
}

//DELETE

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await client.connect();
    const productsCollection = database.collection("products");

    const resultDelete = await productsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (resultDelete.deletedCount > 0) {
      res.json({ message: "Product deleted." });
    } else {
      res.status(404).json({ message: "Product not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal Server Error. Error deleting product.",
        error,
      });
  } finally {
    await client.close();
  }
};


//PUT
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productUpdate = req.body;

  try {
    await client.connect();
    const productsCollection = database.collection("products");

    const resultUpdate = await productsCollection.updateOne(
      {_id: new ObjectId(id)}, 
      {$set: productUpdate }
    );

    if (resultUpdate.modifiedCount > 0) {
      res.json({ message: "Product update." });
    } else {
      res.status(404).json({ message: "Product not found or not changes." });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Internal Server Error. Error update product.",
        error,
      });
  } finally {
    await client.close();
  }
}

module.exports = {
  getAllProducts, deleteProduct, updateProduct, createProduct
}