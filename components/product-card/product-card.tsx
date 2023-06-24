"use client";
import { Product } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import RichTextRender from "../rendering/rich-text-render";
import "remixicon/fonts/remixicon.css";
import AnimatedModal from "../modals/animated-modal";
import Link from "next/link";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      {isExpanded && (
        <FullProductCard
          product={product}
          isExpanded={isExpanded}
          toggleExpanded={toggleExpanded}
        />
      )}

      {/* still want to show the card that was selected */}
      <ProductCardBasic product={product} toggleExpanded={toggleExpanded} />
    </>
  );
};

const ProductCardContainer = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => (
  <div
    className={`flex flex-col rounded bg-white p-6 gap-4 h-full border-[1px] border-gray-200 relative ${classNames}`}
  >
    {children}
  </div>
);

const ProductCardBasic = ({
  product,
  toggleExpanded,
}: Props & { toggleExpanded: () => void }) => {
  return (
    <ProductCardContainer classNames='gap-6 '>
      {product.isExpandable && (
        <button
          onClick={toggleExpanded}
          className='bg-blue-100 text-blue-300 rounded-t absolute bottom-full border-blue-200 border-[1px] left-0 px-2'
        >
          Expand
        </button>
      )}
      {!!product.featuredImage && (
        <div className='relative h-[300px] w-full'>
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.description}
            className='object-center object-cover'
            fill
          />
        </div>
      )}
      <div className='flex justify-between items-center border-b-[1px] border-gray-100 py-2'>
        <h3 className='font-bold text-lg leading-7'>{product.name}</h3>
      </div>
      {!!product.excerpt && product.isExpandable && (
        <p className='text-gray-500 leading-7'>{product.excerpt}</p>
      )}
      {!product.isExpandable && product.description && (
        <RichTextRender content={product.description} />
      )}
      {!!product.externalLink && (
        <div>
          <a
            href={product.externalLink ?? ""}
            rel='noreferrer noopener'
            target='_blank'
            className='border-[1px] border-gray-400 text-gray-700 rounded px-4 py-2 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all'
          >
            {product.externalLinkText}
          </a>
        </div>
      )}
      {!!product.targetPage && (
        <div>
          <Link
            href={product.targetPage.slug}
            className='border-[1px] border-gray-400 text-gray-700 rounded px-4 py-2 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all'
          >
            {product.targetPage.pageName}
          </Link>
        </div>
      )}
    </ProductCardContainer>
  );
};

const FullProductCard = ({
  product,
  isExpanded,
  toggleExpanded,
}: Props & { isExpanded: boolean; toggleExpanded: () => void }) => {
  return (
    <AnimatedModal isVisible={isExpanded} toggleVisibility={toggleExpanded}>
      <ProductCardContainer classNames='md:max-w-2xl'>
        <div className='w-full flex flex-col justify-between gap-8'>
          {!!product.featuredImage && (
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.description}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
            />
          )}
          <div className='flex flex-col'>
            <div className='flex justify-between items-center border-b-[1px] border-gray-100 py-2'>
              <h3 className='font-bold text-lg leading-7'>{product.name}</h3>
            </div>
            <RichTextRender
              content={product.description}
              classNames='text-gray-500 leading-7'
            />
          </div>
          <div>
            <button
              onClick={toggleExpanded}
              className=' text-black rounded-t border-gray-400 border-[1px] px-4 py-2 rounded hover:bg-blue-400 hover:text-white hover:border-blue-400 transition-colors'
            >
              Close
            </button>
          </div>
        </div>
      </ProductCardContainer>
    </AnimatedModal>
  );
};

export default ProductCard;
