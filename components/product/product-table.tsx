import { fetchGraphQL } from '@/contentful/api';
import { productTableQuery } from '@/contentful/gql-queries/components/product/product-table.query';
import { UnknownComponent } from '@/types/component';
import { ProductTableData, ProductTableQueryResponse } from '@/types/product';
import React from 'react';
import ProductCard from '../product-card/product-card';

interface ProductTableResponse {
  data: {
    componentProductTable: ProductTableData;
  };
}

async function getProductTable(id: string) {
  try {
    const res = await fetchGraphQL<ProductTableResponse>(productTableQuery(id));

    return res.data.componentProductTable;
  } catch (error) {
    console.error('Error fetching product table data:', error);
    return null;
  }
}

const ProductTable = async (component: UnknownComponent) => {
  const data = await getProductTable(component.sys.id);

  if (!data) return null;

  return (
    <div className="w-full flex flex-col items-center py-12">
      <div className="w-11/12 mx-4 md:mx-0 md:w-3/4 flex flex-col gap-12 ">
        <div className="flex flex-col gap-4  py-4">
          <h1 className="text-5xl font-bold text-black ">{data.headline}</h1>
          <h4 className="text-blue-500 ">{data.subline}</h4>
        </div>
        {!!data.productsCollection.items.length && (
          <div className="flex flex-col md:grid md:grid-cols-3 gap-x-10 gap-y-14 my-4">
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
