// src/utils/search.ts

import { Product, Shipment } from "../types/models";

// Búsqueda lineal de producto por SKU (case-insensitive)
export function findProductBySKU(
  products: Product[],
  sku: string
): Product | null {
  for (const product of products) {
    if (product.sku.toLowerCase() === sku.toLowerCase()) {
      return product;
    }
  }
  return null;
}

// Búsqueda lineal de envío por ID
export function findShipmentById(
  shipments: Shipment[],
  id: string
): Shipment | null {
  for (const shipment of shipments) {
    if (shipment.id === id) {
      return shipment;
    }
  }
  return null;
}

// Búsqueda binaria por peso (el array debe estar ordenado por weightKg de forma ascendente)
// Retorna el índice si se encuentra, -1 en caso contrario
export function binarySearchProductByWeight(
  sortedProducts: Product[],
  targetWeight: number
): number {
  let left = 0;
  let right = sortedProducts.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midWeight = sortedProducts[mid].weightKg;

    if (midWeight === targetWeight) {
      return mid;
    } else if (midWeight < targetWeight) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}