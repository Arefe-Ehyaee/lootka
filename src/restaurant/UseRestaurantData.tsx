import { useState, useEffect } from 'react';

interface OpeningHours {
  monday?: string | null;
  tuesday?: string | null;
  wednesday?: string | null;
  thursday?: string | null;
  friday?: string | null;
  saturday?: string | null;
  sunday?: string | null;
  all_day: string | null;
}

interface Image {
  image_id: string;
  filename: string;
  description?: string | null;
}

interface Restaurant {
  id?: string;
  name: string;
  OurDescription: string;
  UsersDescription?: string;
  rating?: number;
  reviews?: number;
  address?: string;
  opening_hours: OpeningHours;
  phone?: string;
  website?: string;
  instagram?: string;
  image_names?: string[];
  images?: Image[]; // <-- Add this
  Menu?: any[];
  food_types?: string[];
  mealTime?: string[];
  Cuisine?: string;
  price_range?: string;
  latitude?: number;
  longitude?: number;
  map_url: string;
  review_summary: string;
  description: string;
  sub_category: string;
}


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const usePlaceData = (id: string | undefined) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/places/${id}`, {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details');
        }

        const data = await response.json();
        setRestaurant(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching restaurant details');
        console.error('Error fetching restaurant details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurantDetails();
    }
  }, [id]);

  return { restaurant, loading, error };
};