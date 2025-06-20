import type { Category } from "../category/categoryModel";

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;
}

export type ProductData = Product & { category?: Category };
