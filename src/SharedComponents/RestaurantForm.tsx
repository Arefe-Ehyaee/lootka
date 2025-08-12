import { useState } from "react";
import { Check, Plus, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from './Navbar';
import left from "../assets/icons/Icon.svg";
import axios from "axios";

interface FormData {
  name: string;
  category: string;
  sub_category: string;
  tags: string[];
  address: string;
  phone: string;
  rate: string;
  price_range: string;
  opening_hours: string;
  website: string;
  instagram: string;
  description: string;
  images: File[];
  files: File[];
  uploadedImageNames: string[]; // Store image names returned from the backend
  latitude: string;
  longitude: string;
  map_url: string;
  order: number;
}

// API base URL - put in a constant for easy management
const API_BASE_URL = "http://91.212.174.72:2000";

export default function RestaurantForm() {
  // Initial state for form data
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    sub_category: "",
    tags: [],
    address: "",
    phone: "",
    rate: "",
    price_range: "",
    opening_hours: "",
    website: "",
    instagram: "",
    description: "",
    latitude: "",
    longitude: "",
    images: [],
    files: [],
    uploadedImageNames: [],
    map_url: "",
    order: 1.0,
  });

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // State for tracking upload status
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Dynamic tag input
  const [newTag, setNewTag] = useState<string>("");

  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle tag management
  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
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

      // Construct payload for /places/ endpoint
      const payload = {
        name: formData.name,
        category: formData.category || null,
        sub_category: formData.sub_category || null,
        tags: formData.tags,
        address: formData.address,
        latitude: formData.latitude ? parseFloat(formData.latitude) : 0,
        longitude: formData.longitude ? parseFloat(formData.longitude) : 0,
        rate: formData.rate ? parseFloat(formData.rate) : 5,
        price_range: formData.price_range || null,
        opening_hours: formData.opening_hours || null,
        phone: formData.phone || null,
        website: formData.website || null,
        instagram: formData.instagram || null,
        images: formData.uploadedImageNames, // Use uploaded image names
        description: formData.description || null,
      };

      const res = await axios.post(`${API_BASE_URL}/places/`, payload, {
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
    <div className="min-h-screen min-w-screen">
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                نام کسب و کار *
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

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                دسته‌بندی اصلی
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                placeholder="مثال: رستوران، کافه، هتل"
              />
            </div>

            {/* Sub Category */}
            <div>
              <label htmlFor="sub_category" className="block text-sm font-medium text-gray-700 mb-1">
                زیر دسته‌بندی
              </label>
              <input
                type="text"
                id="sub_category"
                name="sub_category"
                value={formData.sub_category}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                placeholder="مثال: فست فود، ایتالیایی، 5 ستاره"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تگ‌ها</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                  placeholder="تگ جدید اضافه کنید"
                  onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-lootka-lightGreen text-white rounded-md hover:bg-lootka-darkGreen"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1.5 border border-lootka-lightGreen bg-gray-100 text-black rounded-full text-sm font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="mr-1 text-red-500 hover:text-red-700"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس *
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


            {/* Longitude */}
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                طول جغرافیایی (Longitude)
              </label>
              <input
                type="number"
                step="any"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>

                        {/* Latitude */}
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                عرض جغرافیایی (Latitude)
              </label>
              <input
                type="number"
                step="any"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
              />
            </div>

            {/* Rate */}
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
                امتیاز (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                id="rate"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
              />
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price_range" className="block text-sm font-medium text-gray-700 mb-1">
                محدوده قیمت
              </label>
              <input
                type="text"
                id="price_range"
                name="price_range"
                value={formData.price_range}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                placeholder="مثال: $، $$، $$$"
              />
            </div>

            {/* Opening Hours */}
            <div>
              <label htmlFor="opening_hours" className="block text-sm font-medium text-gray-700 mb-1">
                ساعت و روزهای کاری
              </label>
              <input
                type="text"
                id="opening_hours"
                name="opening_hours"
                value={formData.opening_hours}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
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

            {/* Website */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس وبسایت
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
                placeholder="https://example.com"
              />
            </div>

            {/* Instagram */}
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
                آدرس اینستاگرام
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                dir="ltr"
                placeholder="https://instagram.com/username"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                توضیحات
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lootka-lightGreen focus:border-lootka-lightGreen sm:text-sm"
                placeholder="توضیح کامل درباره فضا، امکانات و کیفیت خدمات، تجربه خاص و داستان کسب‌وکار"
              />
            </div>

            {/* Image Upload */}
            <div>
              <span className="block text-sm font-medium text-gray-700 mb-2">تصاویر *</span>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-lootka-darkGreen hover:text-lootka-lightGreen focus-within:outline-none"
                    >
                      <span>آپلود تصاویر</span>
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
              <span className="block text-sm font-medium text-gray-700 mb-2">فایل‌های اضافی</span>
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
                  className="ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lootka-lightGreen"
                >
                  انصراف
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lootka-darkGreen"
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