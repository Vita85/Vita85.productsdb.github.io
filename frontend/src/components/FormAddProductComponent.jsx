import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import { Box, Button, TextField, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import productValidationSchema from "../validationSchemaFront";

import ModalComponent from "./ModalComponent";
import useAddProduct from "./useAddProduct";

const FormAddProduct = () => {
  const navigate = useNavigate();

  const {
    loading,
    modalActive,
    productAddSuccess,
    productAddError,
    handleModalClose,
    handleSubmit,
  } = useAddProduct();

  return (
    <>
      <Box sx={{ maxWidth: 500, margin: "0 auto", padding: 2 }}>
        <Formik
          initialValues={{ title: "", description: "", price: "" }}
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
                {loading ? <CircularProgress size={24} /> : "Add Product"}
              </Button>

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: "15px", marginLeft: "15px" }}
                onClick={() => navigate("/products")}
              >
                Back to product Page
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <ModalComponent
        active={modalActive}
        type="addProductResult"
        onClose={handleModalClose}
        addSuccess={productAddSuccess}
        addError={productAddError}
      />
    </>
  );
};

export default FormAddProduct;
