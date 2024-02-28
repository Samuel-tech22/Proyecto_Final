"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { apiUrl } from "@/config";
import ProductCard from "@/components/ProductCard/ProductCard";

export default function SearchProductPage() {
    const router = useRouter();
    const { keyword } = router.query;
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchProducts = async () => {
        try {
        const response = await axios.get(`${apiUrl}/search/${keyword}`);
        const results = await response.data;
        setSearchResults(results);
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        if (keyword) {
        handleSearchProducts();
        }
    }, [keyword]);

    return (
        <div className="w-full">
        <div>
            {searchResults.map((product) => (
            <ProductCard key={product._id} product={product} />
            ))}
        </div>
        </div>
    );
}
