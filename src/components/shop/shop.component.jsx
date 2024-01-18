import { useContext, useState } from "react";
import { CartProvider } from "../../contexts/cart.context";
import { ProductsContext } from "../../contexts/producsts.context";
import ProductItem from "../product-item/product-item.component";

import './shop.styles.scss'

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductItem key={product.id} product={product}/>
      ))}
    </div>
  );
};

export default Shop;
