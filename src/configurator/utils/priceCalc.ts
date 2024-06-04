import { userInfo } from 'os';
import { priceModifiers } from '../../../store/slices/pricesSlice';
import { productsData } from '../productsData';

interface priceCalc {
  app: any;
  config: any;
  prices: any;
  shipping: any;
  user: any;
}

export const priceCalc = ({ app, config, prices, shipping, user }: priceCalc) => {
  const { priceLevels, colorOptions } = productsData.find((el) => el.name === app.currentProduct);

  let sizePrice = 0;
  let size = (config.sizeHeight * config.sizeWidth) / 10000;

  const { first, second, third, fourth } = priceLevels;

  if (size < 1) {
    sizePrice = first * size;
  } else if (size >= 1 && size < 2) {
    const remainder = size % 1;
    sizePrice = first + second * remainder;
  } else if (size >= 2 && size < 3) {
    const remainder = size % 1;
    sizePrice = first + second + third * remainder;
  } else if (size >= 3 && size < 4) {
    const remainder = size % 1;
    sizePrice = first + second + third + fourth * remainder;
  } else if (size >= 4) {
    const remainder = size - 3;
    sizePrice = first + second + third + fourth * remainder;
  }

  // Minimum price
  sizePrice < priceLevels.min ? (sizePrice = priceLevels.min) : '';

  // Color
  const { tier1, tier2 } = priceModifiers.colorTiers;
  let colorPriceTier1 = sizePrice * tier1.mod;
  colorPriceTier1 < tier1.min ? (colorPriceTier1 = tier1.min) : '';
  let colorPriceTier2 = sizePrice * tier2.mod;
  colorPriceTier2 < tier2.min ? (colorPriceTier2 = tier2.min) : '';

  let colorPrice = 0;
  const { priceTier } = colorOptions.find((el) => el.value === config.color);
  priceTier === 1 ? (colorPrice = colorPriceTier1) : '';
  priceTier === 2 ? (colorPrice = colorPriceTier2) : '';

  // Lighting
  let lightingPrice = sizePrice * priceModifiers.lighting;
  lightingPrice < prices.lightingMin ? (lightingPrice = prices.lightingMin) : '';

  // Effect 3D
  const effect3DPrice = sizePrice * priceModifiers.effect3D;

  // Override
  const overridePrice = sizePrice * priceModifiers.override;

  // Fast Production
  const fastPrice = sizePrice * priceModifiers.fastProduction;

  // Calculate total net price
  let totalNet = sizePrice;

  config.colorPremium ? (totalNet += colorPrice) : '';
  config.lightingPremium ? (totalNet += lightingPrice) : '';
  config.effect3D ? (totalNet += effect3DPrice) : '';
  config.override ? (totalNet += overridePrice) : '';
  config.fastProduction ? (totalNet += fastPrice) : '';
  config.duskSensor ? (totalNet += prices.duskSensor) : '';
  config.revisionPremium ? (totalNet += prices.revision) : '';
  config.project ? (totalNet += prices.project) : '';

  totalNet += shipping.currentPrice;

  // Discount
  let discountTotal = 0;
  if (user.discount > 0) {
    discountTotal = (totalNet * user.discount) / 100;
  }

  totalNet -= discountTotal;

  if (user.discount === 50) {
    totalNet = 1;
  }

  // Total gross price
  const totalGross = totalNet * priceModifiers.tax;

  return {
    sizePrice,
    colorPrice,
    colorPriceTier1,
    colorPriceTier2,
    lightingPrice,
    effect3DPrice,
    overridePrice,
    fastPrice,
    totalNet,
    totalGross,
    discountTotal,
  };
};
