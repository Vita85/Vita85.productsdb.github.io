const express = require("express");
const { mongoInstance } = require("./dbConnect");
const cors = require("cors");

const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

const productController = require("./productController");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(bodyParser.json());

mongoInstance.connectDB();

//GET ALL
app.get("/products", productController.getAllProducts);

//GET ID
app.get("/products/:id", productController.getProductId);

//POST
app.post("/products", productController.createProduct);

//DELETE
app.delete("/products/:id", productController.deleteProduct);

//PUT
app.put("/products/:id", productController.updateProduct);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
