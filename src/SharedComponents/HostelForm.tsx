import { useState } from "react";
import { Check, Plus, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from './Navbar';
import left from "../assets/icons/Icon.svg";
import axios from "axios";

// Define TypeScript types
type Category = "اقامتگاه" | "خوردنی" | "سایر";
type FoodType = "کباب" | "محلی" | "فست فود" | "دریایی" | "بین المللی" | "ایرانی" | "مخلفات" | "طباخی" | "آش و حلیم" | "جیگرکی";
type SubCategory = "اقامتگاه";
type Tag = "هاستل" | "بوم گردی" | "چشم انداز دریا" | "ستنی" | "نزدیک به بازار رشت" | "در دل طبیعت";
type MealTime = "صبحانه" | "ناهار" | "شام";

interface FormData {
  mealTime: MealTime[];
  subCategory: SubCategory[];
  category: Category;
  name: string;
  address: string;
  phone: string;
  rating: string;
  workingHours: string;
  website: string;
  instagram: string;
  foodType: FoodType[];
  about: string;
  images: File[];
  files: File[];
  uploadedImageNames: string[]; // Store image names returned from the backend
  latitude: string;
  longitude: string;
  map_url: string;
  order: number;
  tag: Tag[];
}

// API base URL - put in a constant for easy management
const API_BASE_URL = "http://82.115.25.241:4000";

export default function HostelForm() {
  // Initial state for form data
  const [formData, setFormData] = useState<FormData>({
    mealTime: [],
    subCategory: [],
    category: "اقامتگاه",
    name: "",
    address: "",
    phone: "",
    workingHours: "",
    website: "",
    instagram: "",
    foodType: [],
    about: "",
    rating: "",
    map_url: "",
    latitude: "",
    longitude: "",
    images: [],
    files: [],
    uploadedImageNames: [],
    order: 1.0,
    tag: [],
  });

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // State for tracking upload status
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Food type options
  const foodTypeOptions: FoodType[] = ["کباب", "محلی", "فست فود", "دریایی", "بین المللی", "ایرانی", "مخلفات", "طباخی", "آش و حلیم", "جیگرکی"];
  const subCategoryOptions: SubCategory[] = ["اقامتگاه"];
  const TagOptions: Tag[] = ["هاستل" , "بوم گردی" , "چشم انداز دریا" , "ستنی" , "نزدیک به بازار رشت" , "در دل طبیعت"];
  const mealTimeOptions: MealTime[] = ["صبحانه", "ناهار", "شام"];
  // Category options
  const categoryOptions: Category[] = ["اقامتگاه", "خوردنی", "سایر"];

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleSubCategory = (subCategory: SubCategory) => {
    setFormData(prev => {
      if (prev.subCategory.includes(subCategory)) {
        return { ...prev, subCategory: prev.subCategory.filter(t => t !== subCategory) };
      } else {
        return { ...prev, subCategory: [...prev.subCategory, subCategory] };
      }
    });
  };

    const toggleTag = (tag: Tag) => {
    setFormData(prev => {
      if (prev.tag.includes(tag)) {
        return { ...prev, tag: prev.tag.filter(t => t !== tag) };
      } else {
        return { ...prev, tag: [...prev.tag, tag] };
      }
    });
  };

  const toggleMealTime = (time: MealTime) => {
    setFormData(prev => {
      if (prev.mealTime.includes(time)) {
        return { ...prev, mealTime: prev.mealTime.filter(t => t !== time) };
      } else {
        return { ...prev, mealTime: [...prev.mealTime, time] };
      }
    });
  };

  // Handle food type selection
  const toggleFoodType = (type: FoodType) => {
    setFormData(prev => {
      if (prev.foodType.includes(type)) {
        return { ...prev, foodType: prev.foodType.filter(t => t !== type) };
      } else {
        return { ...prev, foodType: [...prev.foodType, type] };
      }
    });
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);

      // Create image previews immediately for better UX
      newImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImagePreviews(prev => [...prev, e.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });

      // Add to formData.images array
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));

      setIsUploading(true);

      // Upload each image to the backend immediately
      for (const file of newImages) {
        try {
          const formDataForUpload = new FormData();
          formDataForUpload.append("file", file); // Changed to "file" to match backend expectation

          const imageUploadResponse = await axios.post(
            `${API_BASE_URL}/upload-image/`,
            formDataForUpload,
            {
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                setUploadProgress(prev => ({ ...prev, [file.name]: percentCompleted }));
              }
            }
          );

          // Save the returned filename
          const uploadedFileName = imageUploadResponse.data.filename;

          setFormData(prev => ({
            ...prev,
            uploadedImageNames: [...prev.uploadedImageNames, uploadedFileName]
          }));

          console.log(`Image ${file.name} uploaded successfully, saved as ${uploadedFileName}`);
        } catch (error) {
          console.error(`Error uploading image ${file.name}:`, error);
          alert(`خطا در آپلود تصویر ${file.name}`);
        }
      }

      setIsUploading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData({ ...formData, files: [...formData.files, ...newFiles] });
    }
  };

  // Remove an image
  const removeImage = async (index: number) => {
    // Get the filename to remove
    const fileToRemove = formData.uploadedImageNames[index];

    if (fileToRemove) {
      try {
        // Call the backend to remove the image
        await axios.post(`${API_BASE_URL}/remove-image/${fileToRemove}`);
        console.log(`Successfully removed image ${fileToRemove} from server`);
      } catch (error) {
        console.error(`Error removing image ${fileToRemove} from server:`, error);
        alert(`خطا در حذف تصویر از سرور`);
        // Continue with removal from UI even if server removal fails
      }
    }

    // Remove from images array
    const updatedImages = formData.images.filter((_, i) => i !== index);

    // Remove from uploadedImageNames array
    const updatedUploadedImageNames = [...formData.uploadedImageNames];
    updatedUploadedImageNames.splice(index, 1);

    // Remove from previews
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updatedImages,
      uploadedImageNames: updatedUploadedImageNames
    });
    setImagePreviews(updatedPreviews);
  };

  // Remove a file
  const removeFile = (index: number) => {
    setFormData({
      ...formData,
      files: formData.files.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        alert("لطفا نام کسب و کار را وارد کنید");
        return;
      }

      if (!formData.address.trim()) {
        alert("لطفا آدرس را وارد کنید");
        return;
      }

      // Check if we have any uploaded image names
      if (formData.uploadedImageNames.length === 0) {
        alert("لطفا حداقل یک تصویر آپلود کنید");
        return;
      }

      setIsSubmitting(true);

      // Construct payload for add_place using the already uploaded image names
      const payload = {
        name: formData.name,
        phone: formData.phone || null,
        type: "restaurant", // or set dynamically
        address: formData.address,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        price_range: "$$$", // update this if needed
        opening_hours: {
          monday: null,
          tuesday: null,
          wednesday: null,
          thursday: null,
          friday: null,
          saturday: null,
          sunday: null,
          all_day: formData.workingHours,
        },
        rating: formData.rating,
        reviews: [],
        order: formData.order,
        website: formData.website || null,
        instagram: formData.instagram || null,
        image_names: formData.uploadedImageNames, // Use all uploaded image names
        food_types: formData.foodType,
        subCategory: formData.subCategory,
        mealTime: formData.mealTime,
        about: formData.about || null,
        map_url: formData.map_url || null,
        description: formData.about,
      };

      const res = await axios.post(`${API_BASE_URL}/add_hostel`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Place added:", res.data);
      alert("اطلاعات با موفقیت ثبت شد!");
      navigate("/"); // Navigate back after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("ارسال فرم با خطا مواجه شد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen font-myIranSansRegular">
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-myIranSansFaNumBold text-gray-800">فرم ثبت کسب و کار شما</h2>
            <button
              onClick={() => window.history.back()}
              className="text-sm text-black hover:underline rounded-lg px-2 py-1 border border-lootka-lightGreen flex flex-row gap-1 items-center"
            >
              بازگشت
              <img src={left} className='w-3 h-3' alt="back" />
            </button>
          </div>

          <div className="space-y-6 text-right" dir="rtl">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                دسته‌بندی
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">دسته بندی</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {subCategoryOptions.map((subCategory) => (
                  <button
                    key={subCategory}
                    type="button"
                    onClick={() => toggleSubCategory(subCategory)}
                    className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm font-medium ${formData.subCategory.includes(subCategory)
                      ? " bg-gray-100 text-black border-lootka-lightGreen"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-200"
                      }`}
                  >
                    {subCategory}
                    {formData.subCategory.includes(subCategory) && (
                      <Check size={16} className="mr-1 text-lootka-darkGreen" />
                    )}
                  </button>
                ))}
              </div>
            </div>


                        <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">تگ</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {TagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm font-medium ${formData.tag.includes(tag)
                      ? " bg-gray-100 text-black border-lootka-lightGreen"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-[#648A33]/20"
                      }`}
                  >
                    {tag}
                    {formData.tag.includes(tag) && (
                      <Check size={16} className="mr-1 text-lootka-darkGreen" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                نام کسب و کار
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                required
              />
            </div>

            {/* About */}
            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-700 mb-1">
                درباره کسب و کار ( توضیح کامل درباره فضا، امکانات و کیفیت غذا، تجربه خاص و داستان کسب‌وکار)
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                value={formData.about}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
              />
            </div>

            {/* Order */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                اولویت
              </label>
              <input
                type="text"
                id="order"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                required
              />
            </div>

            {/* Location Link */}
            <div>
              <label htmlFor="map_url" className="block text-sm font-medium text-gray-700 mb-1">
                لینک لوکیشن
              </label>
              <input
                type="url"
                id="map_url"
                name="map_url"
                value={formData.map_url}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
                placeholder="https://maps.google.com/..."
              />
            </div>

            {/* long */}
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                longitude
              </label>
              <input
                type="tel"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>

            {/* lat */}
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                latitude
              </label>
              <input
                type="tel"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                شماره تلفن
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>

            {/* Working Hours */}
            <div>
              <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700 mb-1">
                ساعت و روزهای کاری
              </label>
              <input
                type="text"
                id="workingHours"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
              />
            </div>

            {/* Instagram */}
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس اینستاگرام
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس وبسایت (منو به همراه قیمت)
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>


            {/* rating */}
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                میانگین رتبه
              </label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                required
              />
            </div>

            {/* Meal Time */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">وعده غذایی</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {mealTimeOptions.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => toggleMealTime(time)}
                    className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm font-medium ${formData.mealTime.includes(time)
                      ? " bg-gray-100 text-black border-lootka-lightGreen"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-[#648A33]/20"
                      }`}
                  >
                    {time}
                    {formData.mealTime.includes(time) && (
                      <Check size={16} className="mr-1  text-lootka-darkGreen" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Food Type */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">نوع غذا</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {foodTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleFoodType(type)}
                    className={`inline-flex items-center px-3 py-1.5 border rounded-full text-sm font-medium ${formData.foodType.includes(type)
                      ? " bg-gray-100 text-black border-lootka-lightGreen"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-[#648A33]/20"
                      }`}
                  >
                    {type}
                    {formData.foodType.includes(type) && (
                      <Check size={16} className="mr-1 text-lootka-darkGreen" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">عکس های کسب و کار (از فضای داخل و بیرونی در صورت داشتن و عکس از غذاها)</span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-[#648A33] hover:text-[#648A33]/50 focus-within:outline-none"
                    >
                      <span>آپلود عکس</span>
                      <input
                        id="image-upload"
                        name="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                      />
                    </label>
                    <p className="pr-1">یا فایل را اینجا رها کنید</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG تا 10MB</p>
                  {isUploading && (
                    <p className="text-sm text-lootka-darkGreen">در حال آپلود تصاویر...</p>
                  )}
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      {/* Upload progress indicator */}
                      {uploadProgress[formData.images[index]?.name] && uploadProgress[formData.images[index]?.name] < 100 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gray-200 h-1">
                          <div
                            className="bg-lootka-darkGreen h-1"
                            style={{ width: `${uploadProgress[formData.images[index].name]}%` }}
                          ></div>
                        </div>
                      )}
                      {/* Badge for uploaded images */}
                      {formData.uploadedImageNames[index] && (
                        <div className="absolute top-0 left-0 bg-lootka-darkGreen text-white text-xs px-1 py-0.5 rounded-br-md">
                          آپلود شده
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1"
                        disabled={isUploading && uploadProgress[formData.images[index]?.name] < 100}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* File Upload */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">فایل نظرات</span>
              <div className="mt-1">
                <label
                  htmlFor="file-upload"
                  className="flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Plus size={16} className="ml-2" />
                  <span>افزودن فایل</span>
                  <input
                    id="file-upload"
                    name="files"
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* File List */}
              {formData.files.length > 0 && (
                <ul className="mt-3 divide-y divide-gray-200 border border-gray-200 rounded-md">
                  {formData.files.map((file, index) => (
                    <li key={index} className="pr-3 pl-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">{file.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          حذف
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:text-[#648A33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lootka-lightGreen"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#648A33] hover:bg-[#648A33]/80 cursor-pointer"
                  disabled={isUploading || formData.uploadedImageNames.length === 0 || isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "ثبت اطلاعات"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}