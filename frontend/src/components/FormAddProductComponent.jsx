import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { Box, TextField, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";

import ModalComponent from "./ModalComponent";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[a-zA-Z0-9\s\-\_]+$/, "Invalid title")
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  description: Yup.string()
    .matches(/^[a-zA-Z0-9\s\-\_,.]+$/, "Invalid description")
    .min(2, "Too Short!")
    .max(200, "Too Long!")
    .required("Required"),
  price: Yup.number()
    .min(1, "Minimum 1 character")
    .max(9999, "Maximum 4 characters")
    .required("Required"),
});

const FormAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [productAddSuccess, setProductAddSuccess] = useState(false);
  const [productAddError, setProductAddError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/products", values);
      resetForm();
      setProductAddSuccess(true);
      setProductAddError(false)
    } catch (error) {
      setProductAddSuccess(false);
      setProductAddError(true)
    } finally {
      setLoading(false);
          setModalActive(true);
    }
  };
  return (
    <>
      <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
        <Formik
          initialValues={{ title: "", description: "", price: "" }}
          validationSchema={validationSchema}
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
                {loading ? <CircularProgress size={24} /> : "Add Product"}
              </Button>

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "15px", marginLeft: "15px" }}
                onClick={() => navigate("/products")}>  Back to product Page
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <ModalComponent
        active={modalActive}
        type="addProductResult"
        onClose={() => {
          setModalActive(false);
          if (productAddSuccess) {
            navigate("/products");
          }
        }}
       addSuccess={productAddSuccess}
       addError={productAddError}
      ></ModalComponent>
    </>
  );
};

export default FormAddProduct;
