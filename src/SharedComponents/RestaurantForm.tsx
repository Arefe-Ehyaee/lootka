import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import left from "../assets/icons/Icon.svg";
import axios, { AxiosError } from "axios";

interface FormDataShape {
  name: string;
  category: string;
  sub_category: string;
  tags: string[];
  address: string;
  latitude: string;
  longitude: string;
  rate: string;
  price_range: string;
  opening_hours: string;
  phone: string;
  website: string;
  instagram: string;
  description: string;
  images: File[];
}

const API_BASE_URL = "http://91.212.174.72:2000";

// Simple Input Component
const Input = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// Simple Textarea Component
const Textarea = ({ label, ...props }: any) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <textarea
      {...props}
      className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default function RestaurantForm() {
  const [formData, setFormData] = useState<FormDataShape>({
    name: "",
    category: "",
    sub_category: "",
    tags: [],
    address: "",
    latitude: "",
    longitude: "",
    rate: "",
    price_range: "",
    opening_hours: "",
    phone: "",
    website: "",
    instagram: "",
    description: "",
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    const t = newTag.trim();
    if (t && !formData.tags.includes(t)) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, t] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...newFiles] }));

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result)
          setImagePreviews((prev) => [...prev, ev.target!.result as string]);
      };
      reader.readAsDataURL(file);
    });

    e.currentTarget.value = "";
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadOneImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await axios.post(`${API_BASE_URL}/images/upload`, fd);
    if (res.data?.img_path) return res.data.img_path;
    throw new Error(`Upload failed: ${JSON.stringify(res.data)}`);
  };

  const attachImageToPlace = async (placeId: string, imgPath: string, description?: string) => {
    await axios.post(
      `${API_BASE_URL}/images/set/place/${encodeURIComponent(placeId)}`,
      null,
      { params: { img_path: imgPath, ...(description ? { description } : {}) } }
    );
  };

  const handleSubmit = async () => {
    try {
      if (!formData.name.trim()) return alert("لطفا نام کسب و کار را وارد کنید");
      if (!formData.address.trim()) return alert("لطفا آدرس را وارد کنید");

      setIsSubmitting(true);

      // 1️⃣ Create place
      const placePayload = {
        name: formData.name.trim(),
        category: formData.category || "",
        sub_category: formData.sub_category || "",
        tags: formData.tags,
        address: formData.address.trim(),
        latitude: Number(formData.latitude) || 0,
        longitude: Number(formData.longitude) || 0,
        rate: Math.max(0, Math.min(5, Number(formData.rate) || 5)),
        price_range: formData.price_range || "",
        opening_hours: formData.opening_hours || "",
        phone: formData.phone || "",
        website: formData.website || "",
        instagram: formData.instagram || "",
        description: formData.description || "",
        images: [],
      };

      const placeRes = await axios.post(`${API_BASE_URL}/places/`, placePayload, {
        headers: { "Content-Type": "application/json" },
        validateStatus: (status) => status < 500,
      });

      if (placeRes.status !== 200)
        throw new Error(`ثبت موفق نبود. کد وضعیت: ${placeRes.status}`);

      const placeId =
        placeRes.data?.place_id ??
        placeRes.data?.id ??
        placeRes.data?.data?.place_id ??
        placeRes.data?.data?.id;

      if (!placeId) throw new Error("Place ID not returned from API.");

      alert("اطلاعات با موفقیت ثبت شد!");

      // 2️⃣ Upload & attach images
      for (const file of formData.images) {
        try {
          const imgPath = await uploadOneImage(file);
          await attachImageToPlace(String(placeId), imgPath);
        } catch (imgErr) {
          console.error("Image upload/attach failed:", file.name, imgErr);
        }
      }

      // ✅ Done
      navigate("/");
    } catch (err) {
      const e = err as AxiosError<any>;
      console.error("Error submitting form:", e?.response?.data || e.message || err);
      alert(e.message);
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
            <h2 className="text-xl font-bold text-gray-800">فرم ثبت کسب و کار شما</h2>
            <button
              onClick={() => window.history.back()}
              className="text-sm text-black hover:underline rounded-lg px-2 py-1 border flex flex-row gap-1 items-center"
            >
              بازگشت
              <img src={left} className="w-3 h-3" alt="back" />
            </button>
          </div>

          <div className="space-y-6 text-right" dir="rtl">
            <Input label="نام کسب و کار *" name="name" value={formData.name} onChange={handleInputChange} />
            <Input label="دسته‌بندی اصلی" name="category" value={formData.category} onChange={handleInputChange} />
            <Input label="زیر دسته‌بندی" name="sub_category" value={formData.sub_category} onChange={handleInputChange} />

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تگ‌ها</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  className="flex-1 py-2 px-3 border rounded-md shadow-sm"
                  placeholder="تگ جدید اضافه کنید"
                />
                <button type="button" onClick={addTag} className="px-4 py-2 bg-green-500 text-white rounded-md">
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 border bg-gray-100 rounded-full">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="mr-1 text-red-500">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <Textarea label="آدرس *" name="address" value={formData.address} onChange={handleInputChange} />
            <Input label="عرض جغرافیایی" name="latitude" value={formData.latitude} onChange={handleInputChange} type="number" step="any" />
            <Input label="طول جغرافیایی" name="longitude" value={formData.longitude} onChange={handleInputChange} type="number" step="any" />
            <Input label="امتیاز (۰ تا ۵)" name="rate" value={formData.rate} onChange={handleInputChange} type="number" step="0.1" />
            <Input label="بازه قیمت" name="price_range" value={formData.price_range} onChange={handleInputChange} />
            <Input label="ساعات کاری" name="opening_hours" value={formData.opening_hours} onChange={handleInputChange} />
            <Input label="تلفن" name="phone" value={formData.phone} onChange={handleInputChange} />
            <Input label="وب‌سایت" name="website" value={formData.website} onChange={handleInputChange} />
            <Input label="اینستاگرام" name="instagram" value={formData.instagram} onChange={handleInputChange} />
            <Textarea label="توضیحات" name="description" value={formData.description} onChange={handleInputChange} />

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">تصاویر</label>
              <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
              <div className="flex flex-wrap gap-2 mt-2">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative">
                    <img src={src} alt="" className="w-24 h-24 object-cover rounded-md" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {isSubmitting ? "در حال ارسال..." : "ثبت"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
