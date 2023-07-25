import { EntitySys, EntryFields } from "contentful";
import { Product } from "./product.type";

export interface ProductTableQueryResponse {
  errors: any[];
  data: {
    componentProductTable: {
      sys: EntitySys;
      headline: EntryFields.Symbol;
      subline: EntryFields.Symbol;
      productsCollection: {
        items: Product[];
      };
    };
  };
}
