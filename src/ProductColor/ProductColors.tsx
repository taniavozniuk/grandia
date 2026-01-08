import { Tag } from "antd";
import type { Product } from "../types/Products";
import "./Color.css";

export const ProductColors = ({ product }: { product: Product }) => {
  if (!product.product_colors || product.product_colors.length === 0) {
    return <span>Немає кольорів</span>;
  }

  return (
    <div className="colorCon">
      {product.product_colors.map((color) => (
        <Tag key={color.colour_name} className="color__tag">
          <span
            className="color__span"
            style={{
              backgroundColor: color.hex_value,
            }}
          />
          {color.colour_name}
        </Tag>
      ))}
    </div>
  );
};
