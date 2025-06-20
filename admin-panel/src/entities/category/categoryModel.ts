import type { Product } from "../product/productModel";

export interface Category {
  id: number;
  name: string;
}

export interface CategoryData {
  id: number;
  name: string;
  products?: Product[];
}
