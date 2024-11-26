import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useUpdateProduct(id) {
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [product, setProduct] = useState(null);
  const [productUpdateSuccess, setProductUpdateSuccess] = useState(false);
  const [productUpdateError, setProductUpdateError] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // console.log("API URL:", API_URL);
        // console.log("Product ID:", id);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleModalClose = () => {
    setModalActive(false);
    if (productUpdateSuccess) {
      navigate("/products");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, values);

      if (response.data.message === "Product updated.") {
        setProductUpdateSuccess(true);
        setProductUpdateError(false);
      } else if (response.data.message === "No changes to update.") {
        setProductUpdateSuccess(false);
        setProductUpdateError(false);
      } else {
        setProductUpdateError(true);
        setProductUpdateSuccess(false);
      }

      setModalActive(true);
    } catch (error) {
      setProductUpdateError(true);
      setProductUpdateSuccess(false);
      console.error("Error updating product:", error);
      setModalActive(true);
    }
    setLoading(false);
  };

  return {
    loading,
    modalActive,
    product,
    productUpdateSuccess,
    productUpdateError,
    handleModalClose,
    handleSubmit,
  };
}
