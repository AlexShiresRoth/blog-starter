"use client";
import { Product } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import RichTextRender from "../rendering/rich-text-render";
import "remixicon/fonts/remixicon.css";

//@TODO add framer motion animation for modal
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className='flex flex-col rounded bg-white p-4 gap-4 h-full border-[1px] border-gray-200 relative'>
      {product.isExpandable && (
        <button
          onClick={toggleExpanded}
          className='bg-blue-100 text-blue-300 rounded-t absolute bottom-full border-blue-200 border-[1px] right-0 px-2'
        >
          Expand
        </button>
      )}
      {!!product.featuredImage && (
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.description}
          width={product.featuredImage.width}
          height={product.featuredImage.height}
        />
      )}
      <div className='flex justify-between items-center border-b-[1px] border-gray-100 py-2'>
        <h3 className='font-bold text-lg leading-7'>{product.name}</h3>
      </div>
      {!!product.excerpt && product.isExpandable && (
        <p className='text-gray-500 leading-7'>{product.excerpt}</p>
      )}
      {!product.isExpandable && (
        <RichTextRender content={product.description} />
      )}
    </div>
  );
};

export default ProductCard;
