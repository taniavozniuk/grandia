import axios from "axios";
import type { Product } from "../types/Products";

export const apiClient = axios.create({
  baseURL: "/api",
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>("/api/v1/products.json");
    return response.data;
  } catch (error) {
    console.log("Error fetching interests:", error);
    throw error;
  }
};
