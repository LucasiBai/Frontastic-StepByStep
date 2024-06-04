export const OccEndpointNames = {
  PRODUCT: 'product',
} as const;
export type OccEndpointName = (typeof OccEndpointNames)[keyof typeof OccEndpointNames];

export type OccEndpoints = {
  [OccEndpointNames.PRODUCT]: string;
};
