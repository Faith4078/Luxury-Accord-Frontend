import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductsContext } from '../context/products_context';

import { formatPrice } from '../utils/helpers';
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const SingleProductPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]); // Ensure `fetchSingleProduct` is included in the dependency array.

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        navigate('/products');
      }, 3000);
      return () => clearTimeout(timeout); // Clear the timeout if the component unmounts.
    }
  }, [error, navigate]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  if (!product || !product.fields) {
    return null; // Handle the case where product is undefined or fields are missing.
  }

  return (
    <Wrapper>
      <PageHero title={product.fields.name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          {/* Uncomment and ensure images prop is provided */}
          <ProductImages images={product.fields.images} />
          <section className="content">
            <h2>{product.fields.name}</h2>
            <Stars
              stars={product.fields.rating || 0}
              reviews={product.fields.reviews || 0}
            />
            <h5 className="price">{formatPrice(product.fields.price)}</h5>
            <p className="desc">
              {product.fields.description || 'No description available.'}
            </p>
            <p className="info">
              <span>Available : </span>
              {product.fields.stock > 0 ? 'In stock' : 'Out of stock'}
            </p>
            <p className="info">
              <span>SKU :</span>
              {product.id}
            </p>
            <p className="info">
              <span>Brand :</span>
              {product.fields.company}
            </p>
            <hr />
            {product.fields.stock > 0 && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
