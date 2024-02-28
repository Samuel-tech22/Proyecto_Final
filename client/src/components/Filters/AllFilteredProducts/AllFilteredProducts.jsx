"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../ProductCard/ProductCard";
import { apiUrl } from "@/config";
import Filter from "@/components/Filters/Filter/Filter";

const AllFilteredProducts = ({ title }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getAllProducts = async () => {
    console.log("Buscando productos..");
    try {
      const response = await axios.get(`${apiUrl}/products`);
      const result = await response.data;
      setProducts(result);
      setFilteredProducts(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []); 

  const handleFilter = (marca, talla, minPrice, maxPrice) => {
    const filtrados = products
      .filter((item, index, arr) => {
        return (
          (item.marca === marca || marca === "") &&
          (item.stocks.some((stock) => stock.talla === parseInt(talla) && stock.stock > 0) || talla === "") &&
          (item.price >= minPrice || minPrice === "") &&
          (item.price <= maxPrice || maxPrice === "")
        );
      })
      .map((item) => {
        return item;
      });
    setFilteredProducts(filtrados);
  };

  return (
    <div className="flex flex-col">
      {/* //cada vez que en filter se haga un cambio handler filter le voy a pasar a mi filter */}
      <Filter handleFilter={handleFilter} />
      <p className="p-3 text-4xl py-5 font-bold tracking-wider">{title}</p>
      <div className="w-full  justify-start">
        {filteredProducts.map((product, index) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </div>
  );
};

export default AllFilteredProducts;
