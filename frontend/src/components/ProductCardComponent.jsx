import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

const ProductCard = ({ product, onDelete }) => {
  return (
    <div>
      <Card
        variant="outlined"
        sx={{ minWidth: 300, height: 300, bgcolor: "#FFD9E2" }}
      >
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 18, mb: 1.5 }}
          >
            Title: {product.title}{" "}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, mb: 1 }}>
            Description: {product.description}{" "}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Price: {product.price}
          </Typography>

          <CardActions>
            <Button
              onClick={() => onDelete(product._id)}
              variant="contained"
              color="error"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
