import React from 'react';
import { Product } from 'shared/types/product';
import { SliderProps } from 'components/commercetools-ui/atoms/slider';
import QbkProductSlider from 'components/qbk-ui/organisms/qbk-product-slider';

export interface QbkProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  config: SliderProps;
}

const QbkProductCarousel: React.FC<QbkProductCarouselProps> = ({ products, title, subtitle, config }) => {
  return (
    <section className="flex flex-col gap-10 px-48">
      {title && <h1 className="mb-5 font-body text-28 font-bold text-gray-900">{title}</h1>}
      {subtitle && <h2 className="font-body text-gray-500">{subtitle}</h2>}
      <QbkProductSlider products={products} {...config} />
    </section>
  );
};

export default QbkProductCarousel;
