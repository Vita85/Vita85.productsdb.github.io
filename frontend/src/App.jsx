
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsListComponent";
import FormAddProduct from "./components/FormAddProductComponent";
import FormEditProduct from "./components/FormEditProduct";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<FormAddProduct />} />
          <Route path="/edit-product/:id" element={<FormEditProduct />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;