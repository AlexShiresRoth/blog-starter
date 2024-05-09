import { EntitySys, EntryFields } from 'contentful';
import { Product } from './product.type';

export interface ProductTableData {
  sys: EntitySys;
  headline: EntryFields.Symbol;
  subline: EntryFields.Symbol;
  productsCollection: {
    items: Product[];
  };
}
