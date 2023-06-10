import { fetchGraphQL } from "@/contentful/api";
import { productTableQuery } from "@/contentful/gql-queries/components/product/product-table.query";
import { UnknownComponent } from "@/types/component";
import { ProductTable, ProductTableQueryResponse } from "@/types/product";
import React from "react";

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

  console.log("data", data);
  return <div className='w-full flex flex-column'>ProductTable</div>;
};

export default ProductTable;
