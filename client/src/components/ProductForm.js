import { useState, useEffect } from "react";

export default function ProductForm({ product, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    brand: "",
    category: "",
    stock: "",
    price: "",
    desc: ""
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when editing
  useEffect(() => {
    if (product) {
      setFormData({
        brand: product.brand || "",
        category: product.category || "",
        stock: product.stock || "",
        price: product.price || "",
        desc: product.desc || ""
      });
    } else {
      setFormData({
        brand: "",
        category: "",
        stock: "",
        price: "",
        desc: ""
      });
    }
    setErrors({});
  }, [product]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
console.log(formData)
  // Validate form
  const validateForm = () => {
    const newErrors = {};

      if (!formData.brand.trim()) {
        newErrors.brand = "Brand is required";
      }

      if (!formData.category.trim()) {
        newErrors.category = "Category is required";
      }

      if (!formData.stock || formData.stock < 0) {
        newErrors.stock = "Stock must be a positive number";
      }

      if (!formData.price || formData.price <= 0) {
        newErrors.price = "Price must be a positive number";
      }

      if (!formData.desc.trim()) {
        newErrors.desc = "Description is required";
      }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert stock and price to numbers
    const submitData = {
      ...formData,
      stock: parseInt(formData.stock, 10),
      price: parseFloat(formData.price)
    };

    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Brand */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Brand <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Example: Toyota, Daihatsu"
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${
            errors.brand
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        />
        {errors.brand && (
          <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${
            errors.category
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        >
          <option value="">Select category</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="MPV">MPV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Pickup">Pickup</option>
          <option value="Lainnya">Lainnya</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="0"
          min="0"
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${
            errors.stock
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        />
        {errors.stock && (
          <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Price (IDR) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="0"
          min="0"
          step="1000000"
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${
            errors.price
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      {/* desc */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Describe the vehicle..."
          rows="4"
          className={`w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 ${
            errors.desc
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          disabled={isLoading}
        />
        {errors.desc && (
          <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold transition"
        >
          {isLoading ? "Menyimpan..." : (product ? "Update" : "Simpan")}
        </button>
      </div>
    </form>
  );
}