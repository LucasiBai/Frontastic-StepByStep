import React from 'react';
import { Product } from 'shared/types/product';
import Slider, { SliderProps } from 'components/commercetools-ui/atoms/slider';
import QbkProductCard from 'components/qbk-ui/organisms/qbk-product-card';

export interface QbkProductSliderProps extends SliderProps {
  products: Product[];
}

const QbkProductSlider: React.FC<QbkProductSliderProps> = ({ products, ...config }) => {
  return (
    <section className="max-w-full">
      <Slider threshold={25} arrows innerArrows solidArrows {...config}>
        {products.map((product, key) => (
          <QbkProductCard product={product} key={key} />
        ))}
      </Slider>
    </section>
  );
};

export default QbkProductSlider;
