import React, { useState } from "react";
import GlobalStyle from "../../global/GlobalStyle";
import { useSelector } from "react-redux";
import ProductCard from "../../components/productComponents/ProductCard";
import { MdSearch } from "react-icons/md";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("default"); // Default sorting option
  const products = useSelector((state) => state.products.items) || [];
  const query = searchQuery.trim().toLowerCase();

  // Filter products based on search query
  const filteredProducts = products
    .filter((product) => {
      const productName = product.name.toLowerCase();
      const productCategory = product.category?.toLowerCase() || "";
      return productName.includes(query) || productCategory.includes(query);
    })
    .sort((a, b) => {
      // Apply sorting based on the selected option
      switch (sortOption) {
        case "price-highest":
          const priceA = a.discount_price ?? a.price;
          const priceB = b.discount_price ?? b.price;
          return priceB - priceA;

        case "price-lowest":
          const priceLowA = a.discount_price ?? a.price;
          const priceLowB = b.discount_price ?? b.price;
          return priceLowA - priceLowB;

        case "highest-rated":
          const ratingA = a.people_rated > 0 ? a.rating / a.people_rated : 0;
          const ratingB = b.people_rated > 0 ? b.rating / b.people_rated : 0;
          // Sort by rating, then by people_rated if ratings are equal
          return ratingB - ratingA || b.people_rated - a.people_rated;

        default:
          return 0;
      }
    });

  return (
    <div className={GlobalStyle.container}>
      <div className={GlobalStyle.separatorCenter}>
        <input
          type="text"
          className={GlobalStyle.inputTwo}
          placeholder="Search products or categories"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery.trim() === "" ? (
        <div data-aos="fade-up" className={GlobalStyle.separatorCenter}>
          <div className="w-64 h-64 flex flex-col justify-center items-center gap-5">
            <h2 className="text-xl font-semibold">Search for products</h2>
            <MdSearch className="text-5xl" />
            <span className="text-xs text-center">
              Enter the name of the product or
              <br /> category you wish to look for.
            </span>
          </div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className={GlobalStyle.separatorCenter}>
          <div className="w-64 h-64 flex flex-col justify-center items-center gap-5">
            <h2 className="text-xl font-semibold">No result</h2>
            <MdSearch className="text-5xl" />
            <span className="text-xs text-center">
              No product or category matches
              <br /> the text you have entered.
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className={GlobalStyle.separatorX}>
            <h2 className={GlobalStyle.formHeader}>
              Results for "{searchQuery}"
            </h2>
          </div>

          <div className="flex justify-end items-center gap-4 px-5 lg:px-10">
            <label htmlFor="sort" className={GlobalStyle.formHeader}>
              Sort by:
            </label>
            <select
              id="sort"
              className={GlobalStyle.inputFour}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-highest">Price: Highest to Lowest</option>
              <option value="price-lowest">Price: Lowest to Highest</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
          </div>
          <div className={GlobalStyle.separatorY}>
            <div className={GlobalStyle.productGrid}>
              {filteredProducts.map((item, index) => {
                return <ProductCard key={index} item={item} />;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
