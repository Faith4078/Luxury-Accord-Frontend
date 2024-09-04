import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload
      .map((p) => p.fields.price || 0)
      .reduce((max, curr) => Math.max(max, curr), 0);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }

  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let tempProducts = [...filtered_products].slice();

    if (sort === 'price-lowest') {
      tempProducts = tempProducts.sort(
        (a, b) => a.fields.price - b.fields.price
      );
    }

    if (sort === 'price-highest') {
      tempProducts = tempProducts.sort(
        (a, b) => b.fields.price - a.fields.price
      );
    }

    if (sort === 'name-a') {
      tempProducts = tempProducts.sort((a, b) =>
        a.fields.name.localeCompare(b.fields.name)
      );
    }

    if (sort === 'name-z') {
      tempProducts = tempProducts.sort((a, b) =>
        b.fields.name.localeCompare(a.fields.name)
      );
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;
    let tempProducts = [...all_products];

    if (text) {
      tempProducts = tempProducts.filter((product) =>
        product.fields.name?.toLowerCase().includes(text.toLowerCase())
      );
    }

    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.fields.category === category
      );
    }

    if (company !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.fields.company === company
      );
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((product) => {
        return (
          Array.isArray(product.fields.colors) &&
          product.fields.colors.includes(color)
        );
      });
    }

    tempProducts = tempProducts.filter(
      (product) => product.fields.price <= price
    );

    if (shipping) {
      tempProducts = tempProducts.filter(
        (product) => product.fields.shipping === true
      );
    }

    return { ...state, filtered_products: tempProducts };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
