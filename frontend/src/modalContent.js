export const modalContent = (type, { deleteSuccess, deleteError, addSuccess, addError }) => {
  switch (type) {
    case "delete":
      return <p className="delete-one">Delete this product?</p>;
    case "deleteProductResult":
      return (
        <p className={deleteSuccess ? "success-add" : "fail-add"}>
          {deleteSuccess
            ? "Product delete successfully"
            : deleteError
            ? "Failed to delete product"
            : null}
        </p>
      );
    case "addProductResult":
      return (
        <p className={addSuccess ? "success-add" : "fail-add"}>
          {addSuccess
            ? "Product added successfully"
            : addError
            ? "Failed to add product"
            : null}
        </p>
      );
    default:
      return null;
  }
};