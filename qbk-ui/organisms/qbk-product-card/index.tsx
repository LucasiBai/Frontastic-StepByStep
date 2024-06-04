"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Product } from "shared/types/product";
import QuickView from "components/commercetools-ui/organisms/product/product-quick-view";
import QbkVariantSelector from "../../atoms/qbk-variant-selector";
import QbkProductPrice from "components/qbk-ui/atoms/qbk-product-price";
import { CheckIcon, HeartIcon } from "@heroicons/react/24/solid";
import Image from "frontastic/lib/image";
import { ImageLoaderProps } from "next/image";

export interface QbkProductCardProps {
	product: Product;
}

const defaultLoader = ({ src }: ImageLoaderProps) => {
	//image source with the query paremeters removed
	const [source, query] = src.split("?");

	const queries = new URLSearchParams(query); //injected query params

	const suffix = queries.get("suffix"); //image variants: small, medium, large, etc...

	//add suffix if exists
	if (suffix) {
		const lastDotIndex = src.lastIndexOf(".");

		return `${source.substring(0, lastDotIndex)}-${suffix}.${source.substring(
			lastDotIndex + 1,
		)}`;
	}

	return source + "?" + query;
};

const QbkProductCard: React.FC<QbkProductCardProps> = ({ product }) => {
	const [selectedVariant, setSelectedVariant] = useState(
		() => product?.variants[0],
	);

	const discountedPrice = selectedVariant?.discountedPrice;
	const discountPercentage = selectedVariant
		? (((selectedVariant.price?.centAmount as number) -
				(discountedPrice?.centAmount as number)) /
				(selectedVariant.price?.centAmount as number)) *
		  100
		: 0;

	const productUrl = useMemo(() => {
		if (!product._url)
			return `/${(product.name ?? "").toLowerCase().replace(/\s+/g, "-")}/p/${
				selectedVariant.sku
			}`;

		const name = product._url.split("/")[1];

		return `/${name}/p/${selectedVariant.sku}`;
	}, [product, selectedVariant]);

	return (
		<article className="flex h-full flex-col gap-16 rounded-lg border border-solid border-neutral-300 bg-neutral-100 p-16 font-body">
			<section
				className="group relative block  w-full"
				style={{ paddingBottom: "115%" }}
			>
				<Link
					href={productUrl}
					className="absolute bottom-0 left-0 right-0 top-0"
				>
					<Image
						src={selectedVariant.images?.[0]}
						alt={product.name ?? ""}
						style={{ objectFit: "cover", objectPosition: "center" }}
						className={`w-full rounded-md opacity-100 transition-opacity duration-500 ease-in-out hover:opacity-75 ${
							!selectedVariant.isOnStock ? "grayscale filter" : ""
						}`}
						loader={defaultLoader}
						fill
					/>
				</Link>
				<div className="absolute bottom-[0.25rem] left-[0.25rem] right-[0.25rem] flex items-end opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
					<QuickView
						buttonIsVisible={true}
						product={product}
						hideButton={() => {}}
					/>
				</div>
			</section>

			<section className="flex h-full flex-col gap-[0.75rem]">
				<Link href={productUrl}>
					<section className="flex flex-col-reverse">
						<h1 className="font-body text-base font-normal text-gray-900">
							{product.name}
						</h1>
						<h2 className="font-body text-sm font-normal text-neutral-500">
							{selectedVariant.sku}
						</h2>
					</section>
				</Link>

				{/* Rating placeholder */}

				<section className="max-w-full">
					<QbkVariantSelector
						variants={product.variants}
						selectedVariant={selectedVariant}
						handleSelectedVariant={setSelectedVariant}
					/>
				</section>

				<QbkProductPrice
					price={selectedVariant.price}
					discountedPrice={discountedPrice}
					discountPercentage={discountPercentage}
				/>
			</section>

			<section className="flex items-center justify-between border-t border-solid border-neutral-300 pt-[0.75rem]">
				{/* Visual implementation only */}
				<label className="relative h-fit cursor-pointer select-none text-sm text-neutral-500">
					<input type="checkbox" className="peer hidden" />
					<CheckIcon className="absolute left-0 hidden h-[1.5rem] w-[1.5rem] text-neutral-100 peer-checked:block" />
					<span className="before:content flex items-center gap-[0.5rem] before:block before:h-[1.5rem] before:w-[1.5rem] before:rounded-md before:border before:border-solid before:border-neutral-400 peer-checked:before:border-blue-500 peer-checked:before:bg-blue-500">
						{/* Task: update with translation */}
						Compare
					</span>
				</label>

				<button className="group flex h-[2rem] w-[2rem] items-center justify-center rounded-full border border-neutral-300 bg-neutral-100 p-[0.25rem]  text-neutral-500 shadow transition-colors duration-300 ease-in-out hover:text-red-400">
					<HeartIcon className="fill-none stroke-current stroke-2 group-hover:fill-current" />
				</button>
			</section>
		</article>
	);
};

export default QbkProductCard;
