// src/utils/collections.ts

import { Product, ProductCategory, Carrier, WarehouseLocation } from "../types/models";

// Retorna productos en el almacén especificado
export function filterProductsByWarehouse(
  products: Product[],
  warehouse: WarehouseLocation
): Product[] {
  return products.filter((product) => product.warehouse === warehouse);
}

// Retorna productos en la categoría especificada
export function filterProductsByCategory(
  products: Product[],
  category: ProductCategory
): Product[] {
  return products.filter((product) => product.category === category);
}

// Retorna productos donde stockQuantity <= minStockThreshold
export function filterLowStockProducts(products: Product[]): Product[] {
  return products.filter(
    (product) => product.stockQuantity <= product.minStockThreshold
  );
}

// Retorna productos ordenados por cantidad de stock (sin mutar el array original)
export function sortProductsByStock(
  products: Product[],
  order: "asc" | "desc"
): Product[] {
  return [...products].sort((a, b) => {
    if (order === "asc") {
      return a.stockQuantity - b.stockQuantity;
    } else {
      return b.stockQuantity - a.stockQuantity;
    }
  });
}

// Retorna transportistas ordenados por tasa de entrega a tiempo (sin mutar el array original)
export function sortCarriersByReliability(
  carriers: Carrier[],
  order: "asc" | "desc"
): Carrier[] {
  return [...carriers].sort((a, b) => {
    if (order === "asc") {
      return a.onTimeRate - b.onTimeRate;
    } else {
      return b.onTimeRate - a.onTimeRate;
    }
  });
}