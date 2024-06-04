import React from 'react';
import Slider from 'components/commercetools-ui/atoms/slider';
import { Variant } from 'shared/types/product';

export interface QbkVariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  handleSelectedVariant: (variant: Variant) => void;
}

const QbkVariantSelector: React.FC<QbkVariantSelectorProps> = ({
  variants,
  selectedVariant,
  handleSelectedVariant,
}) => {
  return (
    <section className={variants.length > 5 ? 'mx-[1rem]' : ''}>
      <Slider
        slidesPerView={5}
        spaceBetween={4}
        allowTouchMove={false}
        arrows
        prevButtonStyles={{
          transform: 'translateY(-50%) translateX(1.5rem) scale(0.3)',
        }}
        nextButtonStyles={{
          transform: 'translateY(-50%) translateX(-1.5rem) scale(0.3)',
        }}
        dots={false}
      >
        {variants
          .filter(
            (variant, index, arr) => arr.findIndex((v) => v.attributes?.color === variant.attributes?.color) === index,
          )
          .map((variant, index) =>
            variant.attributes ? (
              <article
                key={index}
                className={`flex h-[1.875rem] w-[1.875rem] cursor-pointer items-center justify-center rounded-full border ${
                  variant.sku !== selectedVariant.sku ? 'border-neutral-300' : 'border-neutral-500'
                }`}
              >
                <span
                  className="block h-[1.5rem] w-[1.5rem] rounded-full"
                  style={{ backgroundColor: variant.attributes?.color || variant.attributes?.finish }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectedVariant(variant);
                  }}
                ></span>
              </article>
            ) : (
              <></>
            ),
          )}
      </Slider>
    </section>
  );
};

export default QbkVariantSelector;
