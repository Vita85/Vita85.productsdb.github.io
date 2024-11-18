import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCardComponent";
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
  const API_URL = process.env.REACT_APP_API_URL;
  
  const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    setProducts(response.data);
  };

  const deleteProduct = async () => {
    if (deleteToProduct) {
      try {
        await axios.delete(`${API_URL}/products/${deleteToProduct}`);
        fetchProducts();
        setDeleteError(false);
        setDeleteSuccess(true);
      } catch (error) {
        setDeleteError(true);
        setDeleteSuccess(false);
      } finally {
        setTypeModal("deleteProductResult");
        setTimeout(() => setOpenDiology(false), 2000);
      }
    }
  };

  const handleOpenDialogy = (id) => {
    setDeleteToProduct(id);
    setTypeModal("delete");
    setOpenDiology(true);
  };

  const handleCloseDialogy = () => {
    setOpenDiology(false);
    setDeleteToProduct(null);
  };
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
      
      {/* Card Component */}
      <div className="cards-container">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleOpenDialogy}
          />
        ))}
      </div>

      <ModalComponent
        active={openDialogy}
        type={typeModal}
        onClose={handleCloseDialogy}
        onConfirm={deleteProduct}
        deleteSuccess={deleteSuccess}
        deleteError={deleteError}
        addSuccess={addSuccess}
        addError={addError}
      />
    </div>
  );
};

export default ProductsList;
