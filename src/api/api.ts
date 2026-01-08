import axios from "axios";
import type { Product } from "../types/Products";

export const apiClient = axios.create({
  baseURL: "/api",
});

interface GetProductParams {
  brands?: string[];
  tags?: string[];
}

export const getProducts = async (
  params?: GetProductParams
): Promise<Product[]> => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.brands && params.brands.length > 0) {
      params.brands.forEach((brand) => {
        queryParams.append("brand", brand);
      });
    }

    if (params?.tags && params.tags.length > 0) {
      params.tags.forEach((tag) => {
        queryParams.append("product_tags", tag);
      });
    }

    const url = queryParams.toString()
      ? `/api/v1/products.json?${queryParams.toString()}`
      : "/api/v1/products.json";

    const response = await apiClient.get<Product[]>(url);
    return response.data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
};

// export const getAllBrands = async (): Promise<string[]> => {
//   try {
//     const response = await apiClient.get<Product[]>("/api/v1/products.json");
//     const brands = response.data
//       .map((p) => p.brand)
//       .filter(Boolean) as string[];
//     return [...new Set(brands)].sort();
//   } catch (error) {
//     console.log("Error fetching brands:", error);
//     throw error;
//   }
// };

// export const getAllTags = async (): Promise<string[]> => {
//   try {
//     const response = await apiClient.get<Product[]>("/api/v1/products.json");
//     const tags = response.data
//       .flatMap((p) => p.tag_list)
//       .filter(Boolean) as string[];
//     return [...new Set(tags)].sort();
//   } catch (error) {
//     console.log("Error fetching tags:", error);
//     throw error;
//   }
// };
export const getAllFilters = async (): Promise<{
  brands: string[];
  tags: string[];
}> => {
  try {
    const response = await apiClient.get<Product[]>("/api/v1/products.json");

    const brands = response.data
      .map((p) => p.brand)
      .filter(Boolean) as string[];

    const tags = response.data
      .flatMap((p) => p.tag_list)
      .filter(Boolean) as string[];

    return {
      brands: [...new Set(brands)].sort(),
      tags: [...new Set(tags)].sort(),
    };
  } catch (error) {
    console.log("Error fetching filters:", error);
    throw error;
  }
};
