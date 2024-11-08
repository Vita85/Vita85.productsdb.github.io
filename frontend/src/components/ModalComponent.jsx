import React from "react";
import { Button } from "@mui/material";

const ModalComponent = ({
  active,
  onClose,
  type,
  onConfirm,
  deleteError,
  deleteSuccess,
  addSuccess,
  addError,
}) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {type === "delete" ? (
          <p className="delete-one">Delete this product?</p>
        ) : type === "deleteResult" ? (
          <p className={deleteSuccess ? "success-add" : "fail-add"}>
            {deleteSuccess
              ? "Product delete successfully"
              : deleteError
              ? "Product delete successfully"
              : null}
          </p>
        ) : type === "addProductResult" ? (
          <p className={addSuccess ? "success-add" : "fail-add"}>
            {addSuccess
              ? "Product added successfully"
              : addError
              ? "Failed to add product"
              : null}
          </p>
        ) : null}

        <div>
          {type === "delete" ? (
            <>
              <Button
                variant="contained"
                color="error"
                sx={{ marginRight: "15px" }}
                onClick={onConfirm}
              >
                Delete
              </Button>
              <Button variant="contained" color="success" onClick={onClose}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="contained" color="success" onClick={onClose}>
              Back to product Page
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
