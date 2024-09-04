import React from 'react';
import { useFilterContext } from '../context/filter_context';
import GridView from './GridView';
import ListView from './ListView';
import { useProductsContext } from '../context/products_context';
const ProductList = () => {
  const { filtered_products, grid_view, all_products } = useFilterContext();

  if (all_products.length < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products matched your search.
      </h5>
    );
  }

  if (grid_view === false) {
    return <ListView products={filtered_products} />;
  }
  return <GridView products={filtered_products} />;
};

export default ProductList;
