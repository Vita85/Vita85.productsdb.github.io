import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useProducts() {
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

  return {
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
  };
}
