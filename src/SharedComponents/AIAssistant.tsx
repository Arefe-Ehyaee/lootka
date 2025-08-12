import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { PaperAirplaneIcon, MapPinIcon, UsersIcon, SpeakerWaveIcon, HomeIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import NoImg from '../assets/images/no-image-icon-23485.png';
// const BASE_URL = process.env.FRONT_API_URL;
const BASE_URL = "http://91.212.174.72:5000";
interface Restaurant {
  ImgName: string;
  Instagram: string;
  Latitude: string | number;
  Longitude: string | number;
  Name: string;
  OurDescription: string;
  Price: string;
  Rate: number | string;
  TypeOfFood: string;
  UsersDescription: string;
  WebSite: string;
  sub_category: string;
  "WebSite.1": string;
}

interface RestaurantResponse {
  [key: string]: Restaurant[];
}

interface SuggestionObject {
  [key: string]: Restaurant[];
}

interface Message {
  text: string;
  type: "user" | "ai";
  suggestions?: string[]; // Restaurant names as suggestions
  restaurantData?: RestaurantResponse; // Attach restaurant data to the message
}

// Star Rating Component
const StarRating: React.FC<{ rating: number | string }> = ({ rating }) => {
  // Convert rating to number and handle NaN
  const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating;
  const validRating = isNaN(numericRating) ? 0 : numericRating;
  
  // If the rating is invalid or zero, don't render anything
  if (validRating <= 0 || rating === "NaN" || rating === "N/A") {
    return null;
  }
  
  // Clamp rating between 0 and 5
  const clampedRating = Math.max(0, Math.min(5, validRating));
  
  // Create an array of 5 stars
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    if (i <= clampedRating) {
      // Full star
      stars.push(<StarIcon key={i} className="h-4 w-4 text-yellow-500" />);
    } else if (i - 0.5 <= clampedRating) {
      // Half star - for more precision you might want to use a custom half-star SVG
      stars.push(<StarIcon key={i} className="h-4 w-4 text-yellow-500 opacity-50" />);
    } else {
      // Empty star
      stars.push(<StarIconOutline key={i} className="h-4 w-4 text-yellow-500" />);
    }
  }
  
  return (
    <div className="flex items-center">
      {stars}
      <span className="text-xs text-gray-600 mr-1">{validRating.toFixed(1)}</span>
    </div>
  );
};

const AIAssistant: React.FC = () => {
  const [userId] = useState<string | null>("123456");
  const [messages, setMessages] = useState<Message[]>([]);
  const [restaurantData, setRestaurantData] = useState<RestaurantResponse | null>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [hasSentMessage, setHasSentMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const preparedQuestions = [
    { text: "رستوران های اطراف من", icon: MapPinIcon },
    { text: "رستوران با غذاهای محلی", icon: HomeIcon },
    { text: "رستوران مخصوص دورهمی خانواده", icon: UsersIcon },
    { text: "رستوران با موسیقی زنده", icon: SpeakerWaveIcon }
  ];

  const handleSendMessage = async (message: string) => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, type: "user" },
      ]);

      setHasSentMessage(true);
      setInputMessage("");
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: message, id: userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch AI response");
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Extract suggestions from response
        // The suggestion is an object with restaurant names as keys
        let suggestionList: string[] = [];
        let restaurantDataObj: RestaurantResponse | undefined = undefined;

        if (data.suggestion && typeof data.suggestion === 'object') {
          suggestionList = Object.keys(data.suggestion);
          console.log("Setting suggestions:", suggestionList);

          // Store restaurant data for later use
          restaurantDataObj = data.suggestion as RestaurantResponse;
          setRestaurantData(restaurantDataObj);
        }

        // Add AI message with suggestions attached to it
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: data.response,
            type: "ai",
            suggestions: suggestionList,
            restaurantData: restaurantDataObj
          },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "خطا در دریافت پاسخ از سرور", type: "ai" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = async (restaurantName: string) => {
    console.log("Restaurant suggestion clicked:", restaurantName);

    // Add the selected restaurant name as a user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: restaurantName, type: "user" },
    ]);

    // Show loading indicator
    setIsLoading(true);

    try {
      // Make API call to get detailed restaurant information
      const response = await fetch(`${BASE_URL}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: restaurantName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch restaurant information");
      }

      const data = await response.json();
      console.log("Restaurant data received:", data);

      // Update our stored restaurant data if needed
      // Then format and display the restaurant information
      formatAndDisplayRestaurantInfo(restaurantName, data);
    } catch (error) {
      console.error("Error fetching restaurant information:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "خطا در دریافت اطلاعات رستوران‌ها", type: "ai" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format and display restaurant information
  const formatAndDisplayRestaurantInfo = (restaurantName: string, data: RestaurantResponse) => {
    if (data.response && data.response.length > 0) {
      const restaurant = data.response[0]; // Using the format from your JSON example

      // Create a more comprehensive and visually appealing restaurant card
      const restaurantInfo = `## ${restaurant.Name}
  
  **نوع غذا:** ${restaurant.TypeOfFood}
  **قیمت:** ${restaurant.Price}
  ${restaurant.Rate !== "NaN" && restaurant.Rate !== "N/A" ? `**امتیاز:** ${restaurant.Rate}\n` : ''}
  
  ${restaurant.OurDescription}
  
  ---
  
  ${restaurant.UsersDescription}
  
  ${restaurant.Instagram && restaurant.Instagram !== "NaN" ? `[صفحه اینستاگرام](${restaurant.Instagram})` : ''}
  ${restaurant.WebSite && restaurant.WebSite !== "NaN" ? `[وبسایت](${restaurant.WebSite})` : ''}
  `;

      // Add restaurant details as an AI message in the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: restaurantInfo,
          type: "ai"
        },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `متأسفانه اطلاعات برای رستوران ${restaurantName} در دسترس نیست.`,
          type: "ai"
        },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  // Auto-scroll to the bottom of the chat when messages change
  useEffect(() => {
    const messagesContainer = document.querySelector('.scrollbar-webkit');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="rounded-lg mb-8">
      {/* <h2 className="text-2xl font-myIranSansFaNumBold mb-6">دستیار هوشمند</h2> */}
      <div className="border-2 border-[#D9D9D9] hover:border-lootka-lightGreen transition-colors duration-300 rounded-2xl overflow-hidden">

        {/* Prepared Questions */}
        <div className="p-4 border-b border-[#D9D9D9]">
          <div className="flex flex-wrap gap-2">
            {preparedQuestions.map((question, index) => {
              const Icon = question.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question.text)}
                  className="flex items-center px-3 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  <Icon className="h-4 w-4 ml-1" />
                  {question.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex flex-col gap-2 px-5 py-4 overflow-x-hidden overflow-y-auto scrollbar-webkit min-h-[200px] max-h-[500px] font-myIranSansMedium text-sm">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <div
                className={`p-2 rounded-lg max-w-[80%] font-myIranSansRegular ${msg.type === "user"
                  ? "bg-lootka-lightGreen text-white self-end"
                  : "bg-gray-200 text-black self-start"
                  }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {/* Show restaurant suggestions after AI messages as horizontal cards */}
              {msg.type === "ai" && msg.suggestions && msg.suggestions.length > 0 && msg.restaurantData && (
                <div className="mt-3 mb-4 flex flex-col gap-3 self-start w-full">
                  {msg.suggestions.map((restaurantName, idx) => {
                    // Access restaurant data if available
                    const restaurant = msg.restaurantData?.[restaurantName]?.[0];
                    if (!restaurant) return null;
                    
                    // Parse rating to a number for the star component
                    const rating = typeof restaurant.Rate === 'string' 
                      ? parseFloat(restaurant.Rate) 
                      : restaurant.Rate;

                    const isValidRating = !isNaN(rating) && 
                                        rating > 0 && 
                                        restaurant.Rate !== "NaN" && 
                                        restaurant.Rate !== "N/A";

                    return (
                      <div
                        key={idx}
                        className="w-[60%] h-[200px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-row-reverse"
                        onClick={() => handleSuggestionClick(restaurantName)}
                      >
                        {/* Image on the right side */}
                        <div className="w-1/3">
                          <img
                            src={restaurant.ImgName && restaurant.ImgName !== "NaN"
                              ? `${BASE_URL}/images/${restaurant.ImgName}`
                              : NoImg}
                            alt={restaurant.Name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Restaurant info on the left side */}
                        <div className="w-2/3 px-4 py-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-sm font-myIranSansFaNumBold text-gray-900">{restaurant.Name}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {restaurant.TypeOfFood.split('\n')[0]}
                            </p>
                          </div>
                          
                          <div className="flex flex-col justify-between">
                            {/* Only show star rating if rating is valid */}
                            {isValidRating && <StarRating rating={rating} />}
                            <span className="text-xs text-gray-600 mt-1">محدوده قیمت: {restaurant.Price}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-xs text-gray-600 text-justify line-clamp-4">
                                {restaurant.OurDescription}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="self-center p-3">
              <div className="animate-pulse flex space-x-2">
                <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
                <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="relative flex mx-auto items-center gap-2 w-[80%] ">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className=" flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-lootka-lightGreen"
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`absolute left-2 p-1 ${isLoading ? 'bg-gray-400' : 'bg-lootka-darkGreen'} text-white rounded-full hover:bg-lootka-lightGreen transition-colors`}
            >
              <PaperAirplaneIcon className="h-5 w-5 transform rotate-180" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;