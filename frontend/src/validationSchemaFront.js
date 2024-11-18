import * as Yup from "yup";

const productValidationSchema = Yup.object().shape({
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

export default productValidationSchema;