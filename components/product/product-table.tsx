import { fetchGraphQL } from "@/contentful/api";
import { productTableQuery } from "@/contentful/gql-queries/components/product/product-table.query";
import { UnknownComponent } from "@/types/component";
import { ProductTable, ProductTableQueryResponse } from "@/types/product";
import React from "react";
import ProductCart from "../product-card/product-card";
import ProductCard from "../product-card/product-card";

async function getProductTable(id: string): Promise<ProductTable> {
  const res: ProductTableQueryResponse = await fetchGraphQL(
    productTableQuery(id)
  );
  console.log;

  if (res.errors) console.error("Errors in product table query", res.errors);

  if (!res.data) throw new Error("No data returned from GraphQL");

  return res.data.componentProductTable;
}

const ProductTable = async (component: UnknownComponent) => {
  const data = await getProductTable(component.sys.id);

  return (
    <div className='w-full flex flex-col items-center py-12'>
      <div className='w-3/4 flex flex-col gap-12 '>
        <div className='flex flex-col gap-2 items-center  p-4'>
          <h1 className='text-5xl font-bold text-black'>{data.headline}</h1>
          <h4 className='text-blue-500'>{data.subline}</h4>
        </div>
        {!!data.productsCollection.items.length && (
          <div className='grid grid-cols-3 gap-x-10 gap-y-14 my-4'>
            {data.productsCollection.items.map((product) => {
              return <ProductCard product={product} key={product.sys.id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
