import { Attributes, Product, Variant } from '@Types/product';
import {
  HybrisProduct,
  Image,
  Price,
  VariantMatrixElement,
  VariantOption,
} from '@Qbk-commerce-hybris/interfaces/HybrisProduct';
import { OccEndpointsManager } from './OccEndpointsManager';

export class ProductAdapter {
  protected static readonly VARIANT_MATRIX_FIRST_LEVEL: number = 1;
  protected static variants: VariantOption[][] = [];

  protected static resolveAbsoluteUrl(url: string): string {
    return !url || url.startsWith('http') || url.startsWith('//')
      ? url
      : OccEndpointsManager.getBaseUrl({ prefix: false }) + url;
  }

  protected static getProductImages(product: HybrisProduct): string[] {
    return (product.images as any)?.map((image: Image) => ProductAdapter.resolveAbsoluteUrl(image.url)) || [];
  }

  protected static getPrice(price: Price, previousPrice: Price): Partial<Variant> {
    return previousPrice
      ? {
          price: {
            centAmount: previousPrice.value * 100,
            fractionDigits: 2,
            currencyCode: previousPrice.currencyIso,
          },
          discountedPrice: {
            centAmount: price.value * 100,
            fractionDigits: 2,
            currencyCode: price.currencyIso,
          },
        }
      : {
          price: {
            centAmount: price.value * 100,
            fractionDigits: 2,
            currencyCode: price.currencyIso,
          },
        };
  }

  protected static getVariantAttributes(variant: VariantOption): Attributes {
    const groupingData = variant.groupingData;

    if (!groupingData) {
      return {};
    }

    return {
      color: groupingData.value,
      colorLabel: groupingData.tooltip,
      finish: groupingData.value,
    };
  }

  protected static getVariantImages(variant: VariantOption): string[] {
    return variant.variantOptionQualifiers
      ? variant.variantOptionQualifiers.map((option) => ProductAdapter.resolveAbsoluteUrl(option.image.url))
      : [];
  }

  protected static getProductVariantMatrixIndex(product: HybrisProduct, matrix: VariantMatrixElement[]): number {
    let productVariantMatrixIndex: number;

    matrix?.forEach((variant: VariantMatrixElement, index: number) => {
      if (variant.variantOption?.code === product.code) {
        productVariantMatrixIndex = index;
      }
    });

    return productVariantMatrixIndex;
  }

  protected static transformMatrixToVariantOption(variantMatrix: VariantMatrixElement): VariantOption {
    return {
      ...variantMatrix.variantOption,
      groupingData: variantMatrix.groupingData,
      name: variantMatrix.parentVariantCategory?.name,
    };
  }

  protected static setVariantsGroups(product: HybrisProduct): void {
    ProductAdapter.variants = [];

    if (!!product) {
      const levels = Array.from({ length: product.categories?.length }, (_, level) => level + 1);

      let productMatrix = JSON.parse(JSON.stringify(product.variantMatrix));

      levels.forEach((level) => {
        const currentLevelProductVariantIndex = ProductAdapter.getProductVariantMatrixIndex(product, productMatrix);

        if (ProductAdapter.VARIANT_MATRIX_FIRST_LEVEL !== level) {
          productMatrix = productMatrix?.[currentLevelProductVariantIndex]?.elements;
        }

        const productMatrixWithActiveVariant = productMatrix?.map((entry: any) => {
          const normalizedEntry = ProductAdapter.transformMatrixToVariantOption(entry);

          if (normalizedEntry.code === product.code) {
            return { ...normalizedEntry, isActive: true };
          }
          return normalizedEntry;
        });

        ProductAdapter.variants.push(productMatrixWithActiveVariant);
      });
    }
  }

  protected static getVariants(product: HybrisProduct): Variant[] {
    ProductAdapter.setVariantsGroups(product);

    const variants = ProductAdapter.variants.flat().filter((variant) => variant.groupingData?.content === 'COLOR');
    const price: Partial<Variant> = ProductAdapter.getPrice(product.price, product.previousPrice);

    return variants.length > 0
      ? variants.map((variant, index) => ({
          id: JSON.stringify(index + 1),
          sku: variant.code,
          images: ProductAdapter.getVariantImages(variant),
          attributes: ProductAdapter.getVariantAttributes(variant),
          isOnStock: variant.stock?.stockLevel > 0,
          availableQuantity: variant.stock?.stockLevel,
          ...price,
        }))
      : [
          {
            id: '1',
            sku: product.code,
            images: ProductAdapter.getProductImages(product),
            isOnStock: product.stock?.stockLevel > 0,
            availableQuantity: product.stock?.stockLevel,
            ...price,
          },
        ];
  }

  static adapt(hybrisProduct: HybrisProduct): Product {
    const product: Product = {} as Product;

    product.productId = hybrisProduct.code;
    product.name = hybrisProduct.name;
    product.description = hybrisProduct.description;
    product.slug = hybrisProduct.slug;
    product.variants = ProductAdapter.getVariants(hybrisProduct);
    product._url = hybrisProduct.url;

    return product;
  }
}
