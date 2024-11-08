
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsList from "./components/ProductsListComponent";
import FormAddProduct from "./components/FormAddProductComponent";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/add-product" element={<FormAddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;