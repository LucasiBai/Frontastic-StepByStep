import axios from 'axios';
import { ProductPaginatedResult } from '@Types/result';
import { Product } from '@Types/product';
import { ProductQuery } from '@Qbk-commerce-hybris/interfaces/ProductQuery';
import { OccEndpointsManager } from '@Qbk-commerce-hybris/utils/OccEndpointsManager';
import { HybrisProduct } from '@Qbk-commerce-hybris/interfaces/HybrisProduct';
import { ProductAdapter } from '@Qbk-commerce-hybris/utils/ProductAdapter';
import { OccEndpointNames } from '@Qbk-commerce-hybris/interfaces/OccEndpoints';
import { BaseApi } from './BaseApi';

export class ProductApi extends BaseApi {
  query: (productQuery: ProductQuery) => Promise<ProductPaginatedResult> = async (productQuery: ProductQuery) => {
    const { productCodes, baseSiteId } = productQuery;

    return await Promise.all(productCodes.map((productCode) => this.fetchProduct(baseSiteId, productCode))).then(
      (items) =>
        <ProductPaginatedResult>{
          total: productCodes.length,
          items,
        },
    );
  };

  protected fetchProduct: (baseSiteId: string, productCode: string) => Promise<Product> = async (
    baseSiteId: string,
    productCode: string,
  ) => {
    const url = OccEndpointsManager.buildUrl(OccEndpointNames.PRODUCT, {
      urlParams: { baseSiteId, productCode },
    });
    const response = await axios.get<HybrisProduct>(url);

    return ProductAdapter.adapt(response.data);
  };
}
