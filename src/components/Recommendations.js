import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./rec.css";
import PropertyCard from "./PropertyCard.js";

function Recommendations() {
  // Corrected the initial state for properties.
  const [properties, setProperties] = useState([
    // {
    //   title: "K+K Picasso",
    //   image: p1,
    //   location: "Barcelona",
    //   bedrooms: 10,
    //   bathrooms: 8,
    //   area: 3200,
    //   price: 529.92,
    // },
    // {
    //   title: "Galaxy",
    //   image: p2,
    //   location: "Mumbai Near Juhu",
    //   bedrooms: 1,
    //   bathrooms: 1,
    //   area: 3200,
    //   price: 1499,
    // },
    // {
    //   title: "Private room",
    //   image: p3,
    //   location: "Pathancheru",
    //   bedrooms: 1,
    //   bathrooms: 1,
    //   area: 3200,
    //   price: 500,
    // },
    // {
    //   title: "Contact Apex Hotels",
    //   image: p4,
    //   location: "London",
    //   bedrooms: 5,
    //   bathrooms: 8,
    //   area: 3200,
    //   price: 1324.8,
    // },
    // {
    //   title: "Entire home/05",
    //   image: p5,
    //   location: "Delhi",
    //   bedrooms: 1,
    //   bathrooms: 1,
    //   area: 3200,
    //   price: 39744,
    // }
  ]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");

  useEffect(() => {
    const fetchProperties = async (pageNum = 1) => {
      try {
        // Build the query parameters based on the filter values.
        const params = new URLSearchParams();
        params.append("page", pageNum);
        if (keyword) params.append("keyword", keyword);
        if (location) params.append("location", location);
        if (minPrice) params.append("min_price", minPrice);
        if (maxPrice) params.append("max_price", maxPrice);
        if (sortBy) params.append("sort_by", sortBy);

        const response = await fetch(
          `http://localhost:5000/api/dashboard/property/card?${params.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data.message);
          setProperties(data.message);
          setTotalPages(data.total_pages || 1);
          setPage(data.current_page || 1);
        } else {
          console.error(data.error || "Failed to fetch");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties(page);
    // Note: This effect now depends on the page and filter values.
  }, [page, keyword, location, minPrice, maxPrice, sortBy]);

  // Reset to page 1 when executing a search so that changes take immediate effect.
  const handleSearch = () => {
    setPage(1);
  };

  return (
    <div className="app">
      <h1>Best Recommendations</h1>
      <p className="subtitle-rec">
        Discover the top rated properties by our users
      </p>

      <div className="filters-container">
        <button className="filter-toggle" onClick={()=>setShowFilters(!showFilters)}>
          {showFilters ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        {
          showFilters && (
            <div className="filters-dropdown">
              <div className="filter-group">
                <label>Keyword:</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e)=>setKeyword(e.target.value)}
                  placeholder="e.g. Beach House"
                />
              </div>
              <div className="filter-group">
                <label>Location:</label>
                <input
                   type="text"
                   value={location}
                   onChange={(e) =>setLocation(e.target.value)}
                   placeholder="e.g. Goa"
                />
              </div>

              <div className="filter-group">
                <label>Price Range (₹):</label>
                <div className="price-range">
                  < input
                    type="range"
                    min="0"
                    max="50000"
                    value={minPrice}
                    onChange ={(e)=>setMinPrice(e.target.value)}
                  />
                  < input 
                    type="range"
                    min="0"
                    max="50000"
                    value={maxPrice}
                    onChange ={(e)=>setMaxPrice(e.target.value)}
                  />
                  <div className="price-inputs">
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e)=>setMinPrice(e.target.value)}
                      placeholder="Min"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange ={(e)=>setMaxPrice(e.target.value)}
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              <div className="filter-group">
                <label>Sort by:</label>
                <select value={sortBy} onChange ={(e)=>setSortBy(e.target.value)}>
                  <option value="date_desc">Newest First</option>
                  <option value="date_asc">Oldest First</option>
                  <option value="price_asc">Price low to high</option>
                  <option value="price_desc">Price high to low</option>
                </select>
              </div>

              <div className="filter-actions">
                <button onClick={handleSearch}>Apply Filters</button>
              </div>
            </div>
          )}
      </div>

      {/* Properties Display */}
      <div className="card-container">
        {properties.map((prop, index) => (
          <PropertyCard key={index} {...prop} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Recommendations;
