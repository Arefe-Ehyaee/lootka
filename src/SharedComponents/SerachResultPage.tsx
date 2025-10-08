import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PlaceCard from '../SharedComponents/PlaceCard';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchResults = location.state?.places || [];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // number of cards per page

  const totalPages = Math.ceil(searchResults.length / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  // Slice results for current page
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen min-w-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-3">
        <div className="p-4 md:p-10">
          <h1 className="text-xl font-myYekanFaNumDemiBold mb-6 mt-12">نتایج جستجو</h1>

          {searchResults.length === 0 ? (
            <div className="text-center py-20 text-gray-500">هیچ نتیجه‌ای پیدا نشد</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedResults.map((place: any) => (
                  <PlaceCard
                    key={place.place_id}
                    place={{
                      id: place.place_id,
                      name: place.name,
                      Rate: place.rate,
                      ImgName: place.image || 'NaN',
                      address: place.address,
                      description: place.description,
                      opening_hours: place.opening_hours,
                    }}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center font-myYekanFaNumDemiBold">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      قبلی
                    </button>

                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === page
                            ? 'bg-green-100 text-green-700 font-myYekanFaNumDemiBold'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      بعدی
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchResultsPage;
