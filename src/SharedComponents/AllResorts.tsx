import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import NoImg from '../assets/images/no-image-icon-23485.png';
import ReactMarkdown from 'react-markdown';
import Navbar from './Navbar';
import Footer from './Footer';
import starGreen from "../assets/icons/StarGreen.svg";

const BASE_URL = "http://91.212.174.72:2000";

interface Hostel {
  id: string;
  name: string;
  Rate: number;
  ImgName: string;
  image_names?: string[]; // multiple photos
  address?: string;
  opening_hours: { all_day?: string | null };
  description: string;
}

const fetchImagesForHostel = async (placeId: string): Promise<string[]> => {
  try {
    const res = await fetch(`${BASE_URL}/entity_images/place/${placeId}`);
    const imageMeta = await res.json();

    const imageUrls: string[] = [];
    for (const img of imageMeta) {
      const imgId = img.image_id;
      const response = await fetch(`${BASE_URL}/images/${imgId}`);
      if (response.ok) {
        imageUrls.push(`${BASE_URL}/images/${imgId}`);
      }
    }
    return imageUrls;
  } catch (err) {
    console.error(`Error fetching images for ${placeId}`, err);
    return [];
  }
};

const HostelCard: React.FC<{ hostel: Hostel }> = ({ hostel }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = hostel.image_names?.length ? hostel.image_names : [hostel.ImgName];

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Link
      to={`/places/${hostel.id}`}
      className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
    >
      {/* Image Carousel */}
      <div className="relative">
        <img
          src={images[currentImageIndex] || NoImg}
          alt={hostel.name}
          className="w-full h-60 object-cover group-hover:brightness-75 transition"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

            {/* Dots indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer ${currentImageIndex === index ? 'bg-white' : 'bg-white/40'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Card Info */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-myIranSansMedium">{hostel.name}</h2>
          <div className="bg-[#EDF9F3] font-myIranSansFaNumRegular border text-[#1BA75E] rounded-lg text-base flex items-center gap-1 px-1">
            {hostel.Rate}
            <img src={starGreen} alt="" className="w-4 h-4" />
          </div>
        </div>

        {hostel.address && (
          <div className="flex items-center mt-2 mb-2 text-sm font-myIranSansFaNumRegular">
            <MapPinIcon className="h-4 w-4 ml-1 shrink-0" />
            <span className="line-clamp-1 grow">{hostel.address}</span>
          </div>
        )}

        <div className="text-[10px] pb-2 flex flex-row items-end justify-between font-myIranSansFaNumRegular">
          <p className="text-justify line-clamp-3">
            <p className="font-myIranSansFaNumBold text-xs mb-1 mt-2">توضیحات</p>
            <ReactMarkdown>{hostel.description}</ReactMarkdown>
          </p>
          <button>
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

const AllResorts: React.FC = () => {
  const [hostels, setRHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/places?page=${currentPage}&limit=${pageSize}&sub_category=${encodeURIComponent("اقامتگاه")}`
        );
        const json = await res.json();

        const formatted: Hostel[] = await Promise.all(
          json.data.map(async (item: any) => {
            const images = await fetchImagesForHostel(item.place_id);
            return {
              id: item.place_id,
              name: item.name,
              Rate: item.rate || 0,
              ImgName: images[0] || 'NaN',
              image_names: images,
              address: item.address,
              opening_hours: item.opening_hours,
              description: item.description,
            };
          })
        );

        setRHostels(formatted);

        if (json.total) {
          setTotalPages(Math.ceil(json.total / pageSize));
        } else {
          const hasMore = json.data.length === pageSize;
          setTotalPages(hasMore ? currentPage + 1 : currentPage);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    setCurrentPage(newPage);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen min-w-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-3">
        <div className="p-4 md:p-10">
          <h1 className="text-xl font-myIranSansFaNumBold mb-6 mt-12">همه اقامتگاه ها</h1>

          {loading ? (
            <div className="text-center py-20">در حال بارگذاری...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {hostels.map(h => (
                  <HostelCard key={h.id} hostel={h} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center font-myIranSansFaNumRegular">
                <nav className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <ChevronRightIcon className="h-5 w-5" />
                  </button>

                  {getPageNumbers().map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md ${currentPage === page
                        ? 'bg-green-100 text-green-700 font-myIranSansFaNumBold'
                        : 'hover:bg-gray-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <ChevronLeftIcon className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllResorts;
