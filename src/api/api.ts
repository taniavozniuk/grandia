import axios from "axios";
import type { Product } from "../types/Products";

const BASE__URL = "http://makeup-api.herokuapp.com/api/v1/products.json";

export const apiClient = axios.create({
  baseURL: BASE__URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>("");
    return response.data;
  } catch (error) {
    console.log("Error fetching interests:", error);
    throw error;
  }
};
