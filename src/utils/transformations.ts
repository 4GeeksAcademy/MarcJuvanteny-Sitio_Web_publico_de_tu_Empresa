// src/utils/transformations.ts

import {
  Carrier,
  Product,
  ProductCategory,
  Shipment,
  ShipmentStatus,
} from "../types/models";

// Calcula el costo total de un envío
export function calculateShippingCost(
  shipment: Shipment,
  product: Product,
  carrier: Carrier
): number {
  const baseCost = carrier.baseRateUSD;
  const weightCost = product.weightKg * carrier.ratePerKgUSD * shipment.quantity;
  const distanceCost = shipment.destination.distanceKm * carrier.ratePerKmUSD;

  let subtotal = baseCost + weightCost + distanceCost;

  if (shipment.priority === "Express") {
    subtotal = subtotal * 1.3;
  } else if (shipment.priority === "Same-day") {
    subtotal = subtotal * 1.6;
  }

  return Math.round(subtotal * 100) / 100;
}

// Calcula la puntuación de idoneidad de un transportista (0-100)
export function scoreCarrierForShipment(
  carrier: Carrier,
  shipment: Shipment,
  product: Product
): number {
  let score = 0;

  // Opera en el país de destino (20 puntos)
  if (carrier.operatesIn.includes(shipment.destination.country)) {
    score += 20;
  }

  // Puede manejar el peso total (20 puntos)
  if (product.weightKg * shipment.quantity <= carrier.maxWeightKg) {
    score += 20;
  }

  // Soporta la prioridad del envío (15 puntos)
  if (carrier.acceptsPriority.includes(shipment.priority)) {
    score += 15;
  }

  // Maneja frágiles (15 puntos)
  if (product.isFragile) {
    if (carrier.handlesFragile) {
      score += 15;
    }
    // Si es frágil pero el transportista no maneja frágiles → 0 puntos
  } else {
    // Si no es frágil, siempre suma 15
    score += 15;
  }

  // Confiabilidad (30 puntos máximo)
  score += carrier.onTimeRate * 0.3;

  return Math.round(score * 100) / 100;
}

// Selecciona el mejor transportista para un envío
export function selectBestCarrier(
  carriers: Carrier[],
  shipment: Shipment,
  product: Product
): { carrier: Carrier; score: number; cost: number } | null {
  // Puntúa todos los transportistas
  const scored = carriers.map((carrier) => ({
    carrier,
    score: scoreCarrierForShipment(carrier, shipment, product),
    cost: calculateShippingCost(shipment, product, carrier),
  }));

  // Filtra los que tienen puntuación >= 50
  const suitable = scored.filter((item) => item.score >= 50);

  if (suitable.length === 0) {
    return null;
  }

  // Selecciona el de menor costo entre los adecuados
  return suitable.reduce((best, current) =>
    current.cost < best.cost ? current : best
  );
}

// Cuenta productos por categoría
export function countProductsByCategory(
  products: Product[]
): Record<ProductCategory, number> {
  const result: Record<ProductCategory, number> = {
    Fashion: 0,
    Electronics: 0,
    Cosmetics: 0,
    Home: 0,
    Other: 0,
  };

  for (const product of products) {
    result[product.category]++;
  }

  return result;
}

// Calcula el valor total del inventario
export function calculateTotalInventoryValue(products: Product[]): number {
  const total = products.reduce((sum, product) => {
    return sum + product.stockQuantity * product.unitCostUSD;
  }, 0);

  return Math.round(total * 100) / 100;
}

// Calcula la distancia media de todos los envíos
export function calculateAverageShipmentDistance(shipments: Shipment[]): number {
  if (shipments.length === 0) return 0;

  const totalDistance = shipments.reduce((sum, shipment) => {
    return sum + shipment.destination.distanceKm;
  }, 0);

  return Math.round((totalDistance / shipments.length) * 100) / 100;
}

// Agrupa envíos por estado
export function groupShipmentsByStatus(
  shipments: Shipment[]
): Record<ShipmentStatus, Shipment[]> {
  const result: Record<ShipmentStatus, Shipment[]> = {
    Pending: [],
    Assigned: [],
    "In transit": [],
    Delivered: [],
    Failed: [],
  };

  for (const shipment of shipments) {
    result[shipment.status].push(shipment);
  }

  return result;
}

// Encuentra los N transportistas más usados
export function findTopCarriers(
  shipments: Shipment[],
  topN: number
): Array<{ carrier: string; count: number }> {
  const counts: Record<string, number> = {};

  for (const shipment of shipments) {
    if (shipment.carrier !== null) {
      if (counts[shipment.carrier] === undefined) {
        counts[shipment.carrier] = 0;
      }
      counts[shipment.carrier]++;
    }
  }

  return Object.entries(counts)
    .map(([carrier, count]) => ({ carrier, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);
}