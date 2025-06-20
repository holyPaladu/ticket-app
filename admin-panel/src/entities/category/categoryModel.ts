import type { Product } from "../product/productModel";

export interface Category {
  id: number;
  name: string;
}

export type CategoryData = Category & { products?: Product[] };
