import { ProductQuery } from '@Qbk-commerce-hybris/interfaces/ProductQuery';
import { DataSourceConfiguration } from '@frontastic/extension-types';

export class ProductQueryFactory {
  static queryFromParams(config: DataSourceConfiguration): ProductQuery {
    const query: ProductQuery = {
      baseSiteId: '',
      productCodes: [],
    };

    if (config.configuration) {
      query.baseSiteId = config.configuration.baseSiteId;
      query.productCodes = (config.configuration.productCodes as string).split(',').map((code: string) => code.trim());
    }

    return query;
  }
}
