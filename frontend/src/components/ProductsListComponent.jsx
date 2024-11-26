import React from "react";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCardComponent";
import ModalComponent from "./ModalComponent";
import useProducts from "./useProducts";

const ProductsList = () => {
  const {
    products,
    openDialogy,
    typeModal,
    deleteSuccess,
    deleteError,
    addSuccess,
    addError,
    handleOpenDialogy,
    handleCloseDialogy,
    deleteProduct,
  } = useProducts();

  const navigate = useNavigate();

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
