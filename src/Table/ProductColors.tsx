import { Tag } from "antd";
import type { Product } from "../types/Products";

export const ProductColors = ({ product }: { product: Product }) => {
  if (!product.product_colors || product.product_colors.length === 0) {
    return <span>Немає кольорів</span>;
  }

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {product.product_colors.map((color) => (
        <Tag
          key={color.colour_name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: color.hex_value,
              border: "1px solid #ccc",
              display: "inline-block",
            }}
          />
          {color.colour_name}
        </Tag>
      ))}
    </div>
  );
};
