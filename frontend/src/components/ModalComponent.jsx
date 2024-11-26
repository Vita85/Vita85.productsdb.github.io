import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { modalContent } from "../modalContent";

const ModalComponent = ({
  active,
  onClose,
  type,
  onConfirm,
  deleteError,
  deleteSuccess,
  addSuccess,
  addError,
  updateSuccess,
  updateError,
}) => {
  const navigate = useNavigate();
  const modalActionContent = modalContent(type, {
    deleteSuccess,
    deleteError,
    addSuccess,
    addError,
    updateSuccess,
    updateError,
  });
  return (
    <div className={active ? "modal active" : "modal"} onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        {modalActionContent}

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
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/products")}
            >
              Back to product Page
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
