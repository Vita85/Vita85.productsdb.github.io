import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function useAddProduct() {
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [productAddSuccess, setProductAddSuccess] = useState(false);
  const [productAddError, setProductAddError] = useState(false);

  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleModalClose = () => {
    setModalActive(false);
    if (productAddSuccess) {
      navigate("/products");
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/products`, values);
      resetForm();
      setProductAddSuccess(true);
      setProductAddError(false);
    } catch (error) {
      setProductAddSuccess(false);
      setProductAddError(true);
    } finally {
      setLoading(false);
      setModalActive(true);
    }
  };
  return {
    loading,
    modalActive,
    productAddSuccess,
    productAddError,
    handleModalClose,
    handleSubmit,
  };
}
