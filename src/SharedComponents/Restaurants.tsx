import React from 'react';
import { Link } from 'react-router-dom';

const restaurants = [
  {
    id: 1,
    name: 'Le Petit Bistro',
    cuisine: 'French',
    rating: 4.5,
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    location: 'Paris, France',
    reviews: 1245
  },
  {
    id: 2,
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.7,
    price: '$$$$',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    location: 'Tokyo, Japan',
    reviews: 892
  },
  {
    id: 3,
    name: 'Pasta Paradise',
    cuisine: 'Italian',
    rating: 4.3,
    price: '$$',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    location: 'Rome, Italy',
    reviews: 567
  },
  {
    id: 4,
    name: 'Burger Haven',
    cuisine: 'American',
    rating: 4.2,
    price: '$',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    location: 'New York, USA',
    reviews: 2345
  }
];

const Restaurants = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-myIranSansFaNumBold text-gray-900 mb-8">Restaurants</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <select className="px-4 py-2 border rounded-lg">
            <option>All Cuisines</option>
            <option>French</option>
            <option>Japanese</option>
            <option>Italian</option>
            <option>American</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>Price Range</option>
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
            <option>$$$$</option>
          </select>
          <select className="px-4 py-2 border rounded-lg">
            <option>Rating</option>
            <option>4+ Stars</option>
            <option>3+ Stars</option>
            <option>2+ Stars</option>
          </select>
        </div>

        {/* Restaurant List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-myIranSansMedium text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1 text-gray-600">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-1">{restaurant.cuisine}</p>
                  <p className="text-gray-600">{restaurant.location}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-gray-600">{restaurant.price}</span>
                    <span className="text-gray-500 text-sm">{restaurant.reviews} reviews</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants; 