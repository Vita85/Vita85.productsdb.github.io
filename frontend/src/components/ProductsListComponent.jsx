import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

import ModalComponent from "./ModalComponent";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [openDialogy, setOpenDiology] = useState(false);
  const [deleteToProduct, setDeleteToProduct] = useState(null);
  const [typeModal, setTypeModal] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [addSuccess, setAddSuccess] = useState(false);
  const [addError, setAddError] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:8080/products");
    setProducts(response.data);
  };

  const deleteProduct = async () => {
  if(deleteToProduct) {
   try{
      await axios.delete(`http://localhost:8080/products/${deleteToProduct}`);
      fetchProducts();
      setDeleteError(false)
      setDeleteSuccess(true)
    } catch (error) {
      setDeleteError( true)
      setDeleteSuccess(false)
    } finally {
      setTypeModal("deleteResult")
      setTimeout(() => setOpenDiology(false), 1000)
    }
  }
  };

  const handleOpenDialogy = (id) => {
    setDeleteToProduct(id);
    setTypeModal("delete");
    setOpenDiology(true)
  }

  const handleCloseDialogy = () => {
    setOpenDiology(false)
    setDeleteToProduct(null);
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="wrapper">
      <header className="header-list">
        <h1>Products List</h1>
        <Button
          onClick={() => navigate("/add-product")}
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </header>
      <div className="cards-container">
        {products.map((product) => (
          <Card
            variant="outlined"
            sx={{ minWidth: 300, height: 300, bgcolor: "#FFD9E2" }}
            key={product._id}
          >
            <CardContent key={product._id}>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 18, mb: 1.5 }}
              >
                Title: {product.title}{" "}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
                Description: {product.description}{" "}
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                Price: {product.price}
              </Typography>

              <CardActions>
                <Button
                  onClick={() => handleOpenDialogy(product._id)}
                  variant="contained"
                  color="error"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        ))}
      </div>

      <ModalComponent
      active={openDialogy}
      type={typeModal}
      onClose={handleCloseDialogy}
      onConfirm={deleteProduct}
      // errorMessage={errorMessage}
      deleteSuccess={deleteSuccess}
      deleteError={deleteError}
      addSuccess={addSuccess}
      addError={addError}
      />
    </div>
  );
};

export default ProductsList;
