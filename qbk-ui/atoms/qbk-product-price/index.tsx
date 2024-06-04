import React from "react";
import { useParams } from "next/navigation";
import { Money } from "shared/types/product";
import { CurrencyHelpers } from "helpers/currencyHelpers";

export interface QbkProductPriceProps {
	price?: Money;
	discountedPrice?: Money;
	discountPercentage: number;
}

const QbkProductPrice: React.FC<QbkProductPriceProps> = ({
	price,
	discountedPrice,
	discountPercentage,
}) => {
	const { locale } = useParams();

	return (
		<article className="flex flex-col justify-start gap-[0.25rem]">
			{discountedPrice && (
				<p className="w-fit rounded-lg bg-orange-400 px-[0.5rem] py-[0.13rem] text-xs font-bold text-neutral-100">
					-{Math.round(discountPercentage)}%
				</p>
			)}
			<div className="flex items-center gap-[0.25rem]">
				{discountedPrice && (
					<p className="text-xs text-gray-300 line-through">
						{CurrencyHelpers.formatForCurrency(discountedPrice, locale)}
					</p>
				)}
				<p className="text-base font-bold text-gray-900">
					{CurrencyHelpers.formatForCurrency(price ?? "", locale)}
				</p>
			</div>
		</article>
	);
};

export default QbkProductPrice;
