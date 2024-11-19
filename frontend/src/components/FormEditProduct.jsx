import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import axios from "axios";

import { Box, Button, TextField, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate, useParams } from "react-router-dom";

import productValidationSchema from "../validationSchemaFront";

import ModalComponent from "./ModalComponent";

const FormEditProduct = () => {
  const { id } = useParams();
  // // console.log(id);
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
        console.log("API URL:", API_URL);
        console.log("Product ID:", id);
        const response = await axios.get(`${API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log("Error fetching", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/products/${id}`, values);

      if (response.data.message === "Product update.") {
        setProductUpdateSuccess(true);
        setProductUpdateError(false);
        navigate("/products");
      } else {
        setProductUpdateError(true);
        setProductUpdateSuccess(false);
      }
      setModalActive(true);
    } catch (error) {
      setProductUpdateError(true);
      console.error("Error update product:", error);
      setProductUpdateSuccess(false);
      setModalActive(true);
    }
    setLoading(false);
  };

  if (!product) {
    return <CircularProgress />;
  }
  return (
    <>
      <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
        <Formik
          initialValues={{
            title: product.title,
            description: product.description,
            price: product.price,
          }}
          validationSchema={productValidationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form>
              <div>
                <TextField
                  id="outlined-basic"
                  label="Title:"
                  name="title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.title && touched.title)}
                  helperText={errors.title && touched.title && errors.title}
                />
              </div>

              <div>
                <TextField
                  id="outlined-multiline-static"
                  label="Description:"
                  name="description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.description && touched.description)}
                  helperText={
                    errors.description &&
                    touched.description &&
                    errors.description
                  }
                />
              </div>

              <div>
                <TextField
                  label="Price"
                  type="number"
                  name="price"
                  variant="filled"
                  fullWidth
                  margin="normal"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(errors.price && touched.price)}
                  helperText={errors.price && touched.price && errors.price}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                margin="normal"
                color="success"
                startIcon={<AddIcon />}
                sx={{ marginTop: "15px", marginLeft: "35px" }}
              >
                {loading ? <CircularProgress size={24} /> : "Update Product"}
              </Button>

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "15px", marginLeft: "15px" }}
                onClick={() => navigate("/products")}
              >
                {" "}
                Back to Products Page
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <ModalComponent
        active={modalActive}
        type="updateProductResult"
        onClose={() => {
          setModalActive(false);
          if (productUpdateSuccess) {
            navigate("/products");
          }
        }}
        updateSuccess={productUpdateSuccess}
        updateError={productUpdateError}
      ></ModalComponent>
    </>
  );
};

export default FormEditProduct;
