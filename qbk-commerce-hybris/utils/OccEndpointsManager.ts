import { DynamicAttributes } from '@Qbk-commerce-hybris/interfaces/DynamicAttributes';
import { OccEndpointNames, OccEndpoints } from '@Qbk-commerce-hybris/interfaces/OccEndpoints';
import { StringTemplate } from './StringTemplate';

const baseUrl = 'https://hybris.stg-qbklab.qubikdigital.com';
const prefix = '/occ/v2';

export class OccEndpointsManager {
  private static prefix = prefix;
  private static baseUrl = baseUrl;
  private static endpoints: OccEndpoints = {
    [OccEndpointNames.PRODUCT]: '${baseSiteId}/products/${productCode}?fields=FULL',
  };

  static buildUrl(endpoint: string, attributes?: DynamicAttributes): string {
    const endpointUrl = this.endpoints[endpoint];
    return endpointUrl ? `${this.getBaseUrl()}/${StringTemplate.resolve(endpointUrl, attributes.urlParams, true)}` : '';
  }

  static getBaseUrl(props: { prefix?: boolean } = { prefix: true }): string {
    return this.baseUrl + (props.prefix ? this.prefix : '');
  }
}
