export interface FeatureValue {
  value?: string;
}

export interface FeatureUnit {
  name?: string;
  symbol?: string;
  unitType?: string;
}

export interface Feature {
  code?: string;
  comparable?: boolean;
  description?: string;
  featureUnit?: FeatureUnit;
  featureValues?: FeatureValue[];
  name?: string;
  range?: boolean;
  type?: string;
}

export const ImageTypes = {
  PRIMARY: 'PRIMARY',
  GALLERY: 'GALLERY',
} as const;
export type ImageType = (typeof ImageTypes)[keyof typeof ImageTypes];

export interface Image {
  altText?: string;
  role?: string;
  format?: string;
  galleryIndex?: number;
  imageType?: ImageType;
  url?: string;
}

export interface ImageGroup {
  [format: string]: Image;
}

export interface Images {
  [imageType: string]: ImageGroup | ImageGroup[];
}

export const PriceTypes = {
  BUY: 'BUY',
  FROM: 'FROM',
} as const;
export type PriceType = (typeof PriceTypes)[keyof typeof PriceTypes];

export interface Price {
  currencyIso?: string;
  formattedValue?: string;
  maxQuantity?: number;
  minQuantity?: number;
  priceType?: PriceType;
  value?: number;
}

export interface PriceRange {
  maxPrice?: Price;
  minPrice?: Price;
}

export interface Stock {
  isValueRounded?: boolean;
  stockLevel?: number;
  stockLevelStatus?: string;
}

export interface FutureStock {
  date?: Date;
  formattedDate?: string;
  stock?: Stock;
}

export interface GroupingData {
  content?: string;
  format?: string;
  groupedBy?: string;
  name?: string;
  showsName?: boolean;
  tooltip?: string;
  value?: string;
}

export const VariantTypes = {
  SIZE: 'ApparelSizeVariantProduct',
  STYLE: 'ApparelStyleVariantProduct',
  COLOR: 'ElectronicsColorVariantProduct',
} as const;
export type VariantType = (typeof VariantTypes)[keyof typeof VariantTypes];

export const VariantQualifiers = {
  SIZE: 'size',
  STYLE: 'style',
  COLOR: 'color',
  THUMBNAIL: 'thumbnail',
  PRODUCT: 'product',
  ROLLUP_PROPERTY: 'rollupProperty',
} as const;
export type VariantQualifier = (typeof VariantQualifiers)[keyof typeof VariantQualifiers];

export interface VariantOptionQualifier {
  image?: Image;
  name?: string;
  qualifier?: VariantQualifier;
  value?: string;
}

export interface VariantOption {
  name?: string;
  code?: string;
  priceData?: Price;
  stock?: Stock;
  url?: string;
  variantOptionQualifiers?: VariantOptionQualifier[];
  groupingData?: GroupingData;
}

export interface VariantCategory {
  hasImage?: boolean;
  name?: string;
  priority?: number;
}

export interface VariantValueCategory {
  name?: string;
  sequence?: number;
  superCategories?: VariantCategory[];
}

export interface VariantMatrixElement {
  elements?: VariantMatrixElement[];
  isLeaf?: boolean;
  parentVariantCategory?: VariantCategory;
  variantOption?: VariantOption;
  variantValueCategory?: VariantValueCategory;
  groupingData?: GroupingData;
}

export interface Category {
  code?: string;
  name?: string;
  image?: Image;
  url?: string;
}

export interface PromotionRestriction {
  description?: string;
  restrictionType?: string;
}

export interface Promotion {
  code?: string;
  couldFireMessages?: string[];
  description?: string;
  enabled?: boolean;
  endDate?: Date;
  firedMessages?: string[];
  priority?: number;
  productBanner?: Image;
  promotionGroup?: string;
  promotionType?: string;
  restrictions?: PromotionRestriction[];
  startDate?: Date;
  title?: string;
}

export interface Classification {
  code?: string;
  features?: Feature[];
  name?: string;
}

export interface Review {
  alias?: string;
  comment?: string;
  date?: Date;
  headline?: string;
  id?: string;
  principal?: any;
  rating?: number;
}

export interface ProductReference {
  description?: string;
  preselected?: boolean;
  quantity?: number;
  referenceType?: string;
  target?: HybrisProduct;
}

export interface ProductReferences {
  [referenceType: string]: ProductReference[];
}

export interface BaseOption {
  options?: VariantOption[];
  selected?: VariantOption;
  variantType?: VariantType;
}

export interface HybrisProduct {
  availableForPickup?: boolean;
  averageRating?: number;
  baseOptions?: BaseOption[];
  baseProduct?: string;
  categories?: Category[];
  classifications?: Classification[];
  code?: string;
  description?: string;
  futureStocks?: FutureStock[];
  images?: Images;
  manufacturer?: string;
  multidimensional?: boolean;
  name?: string;
  slug?: string;
  nameHtml?: string;
  numberOfReviews?: number;
  potentialPromotions?: Promotion[];
  price?: Price;
  previousPrice?: Price;
  discount?: string;
  priceRange?: PriceRange;
  productReferences?: ProductReferences;
  purchasable?: boolean;
  reviews?: Review[];
  stock?: Stock;
  summary?: string;
  url?: string;
  variantMatrix?: VariantMatrixElement[];
  variantOptions?: VariantOption[];
  variantType?: VariantType;
  volumePrices?: Price[];
  volumePricesFlag?: boolean;
}
