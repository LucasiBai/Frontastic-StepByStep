import { Context } from '@frontastic/extension-types';

const defaultCurrency = 'USD';

export abstract class BaseApi {
  protected environment: string;
  protected locale: string;
  protected currency: string;
  protected defaultLocale: string;
  protected defaultCurrency: string;

  constructor(frontasticContext: Context, locale: string | null, currency: string | null) {
    this.defaultLocale = frontasticContext.project.defaultLocale;
    this.defaultCurrency = defaultCurrency;

    this.locale = locale !== null ? locale : this.defaultLocale;
    this.currency = currency !== null ? currency : this.defaultCurrency;
    this.environment = frontasticContext.environment;
  }
}
