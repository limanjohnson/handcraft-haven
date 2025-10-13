"use client";

import { useState } from "react";

type FilterOptions = {
  search: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
  sortBy: "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest";
};

type ProductFilterProps = {
  onFilterChange: (filters: FilterOptions) => void;
};

export default function ProductFilter({ onFilterChange }: ProductFilterProps) {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState(false);
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("newest");

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      minPrice,
      maxPrice,
      inStock,
      sortBy,
    });
  };

  const handleReset = () => {
    setSearch("");
    setMinPrice("");
    setMaxPrice("");
    setInStock(false);
    setSortBy("newest");
    onFilterChange({
      search: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      sortBy: "newest",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-4" style={{ color: '#5C4A3A' }}>Filter Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
            Search
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              color: '#5C4A3A',
            }}
            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
          />
        </div>

        {/* Min Price */}
        <div>
          <label htmlFor="minPrice" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="$0"
            step="any"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ 
              color: '#5C4A3A',
            }}
            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
          />
        </div>

        {/* Max Price */}
        <div>
          <label htmlFor="maxPrice" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Any"
            step="any"
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            style={{ 
              color: '#5C4A3A',
            }}
            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
          />
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium mb-1" style={{ color: '#5C4A3A' }}>
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as FilterOptions["sortBy"])}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
            style={{ 
              color: '#5C4A3A',
            }}
            onFocus={(e) => e.target.style.setProperty('--tw-ring-color', '#8B6F47')}
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {/* In Stock Checkbox */}
      <div className="mt-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded focus:ring-2"
            style={{ 
              accentColor: '#8B6F47',
            }}
          />
          <span className="ml-2 text-sm" style={{ color: '#5C4A3A' }}>Show only in-stock items</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 text-white rounded-md transition"
          style={{ 
            backgroundColor: '#8B6F47',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5C4A3A'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#8B6F47'}
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 rounded-md transition"
          style={{ 
            backgroundColor: '#D4C5A9',
            color: '#5C4A3A',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c4b599'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D4C5A9'}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
