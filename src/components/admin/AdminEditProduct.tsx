import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../SupabaseClient';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Upload, X, Plus, ArrowLeft } from 'lucide-react';
import { Jewelry } from '../../types';

const AdminEditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [categories, setCategories] = useState<
    { id: number; category: string }[]
  >([]);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState<string[]>(['']);
  const [isNew, setIsNew] = useState(true);

  // Existing images from Supabase
  const [existingImages, setExistingImages] = useState<string[]>([]);

  // New images to upload
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('jwelerry') // Make sure the table name is correct
          .select('*') // Select all columns
          .eq('id', id) // Filter where id matches
          .single(); // Returns a single object instead of an array

        if (error) throw error;

        if (data as Jewelry) {
          setName(data.jwelerry_name);
          setPrice(data.jwelerry_price);
          setDescription(data.jwelerry_description);
          setCategory(data.jwelerry_category);

          // Handle details
          if (
            Array.isArray(data.jwelerry_details) &&
            data.jwelerry_details.length > 0
          ) {
            setDetails(data.jwelerry_details);
          } else if (typeof data.jwelerry_details === 'string') {
            setDetails(
              data.jwelerry_details
                .split('\n')
                .filter((item: any) => item.trim() !== '')
            );
          } else {
            setDetails(['']);
          }

          setIsNew(data.isNew || false);
          setExistingImages(data.image_url || []);
        } else {
          alert('Product not found');
          navigate('/admin/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Failed to load product');
        navigate('/admin/products');
      }
    };

    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase.from('category').select('*');
        if (error) throw error;
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      }
    };

    Promise.all([fetchProduct(), fetchCategories()]).finally(() =>
      setInitialLoading(false)
    );
  }, [id, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      // Create preview URLs
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));

      setNewImages([...newImages, ...newFiles]);
      setNewImagePreviewUrls([...newImagePreviewUrls, ...newPreviewUrls]);
    }
  };

  const removeNewImage = (index: number) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImagePreviewUrls[index]);

    const updatedImages = [...newImages];
    updatedImages.splice(index, 1);

    const updatedPreviewUrls = [...newImagePreviewUrls];
    updatedPreviewUrls.splice(index, 1);

    setNewImages(updatedImages);
    setNewImagePreviewUrls(updatedPreviewUrls);
  };

  const removeExistingImage = (index: number) => {
    const updatedImages = [...existingImages];
    updatedImages.splice(index, 1);
    setExistingImages(updatedImages);
  };

  const addDetailField = () => {
    setDetails([...details, '']);
  };

  const updateDetail = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const removeDetail = (index: number) => {
    if (details.length === 1) return;
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (existingImages.length === 0 && newImages.length === 0) {
      alert('Please add at least one product image');
      return;
    }

    setLoading(true);

    try {
      // Filter out empty details
      const filteredDetails = details.filter((detail) => detail.trim() !== '');

      // Upload new images to Supabase Storage
      const newImageUrls: string[] = [];

      for (const image of newImages) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2, 15)}.${fileExt}`;
        const filePath = `jwelerry/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('jwelerry')
          .upload(filePath, image);

        if (uploadError) throw uploadError;

        newImageUrls.push(filePath);
      }

      // Combine existing and new image URLs
      const allImageUrls = [...existingImages, ...newImageUrls];

      // Update product in database
      const { error } = await supabase
        .from('jwelerry')
        .update({
          jwelerry_name: name,
          jwelerry_price: price,
          jwelerry_description: description,
          jwelerry_details: filteredDetails,
          jwelerry_category: category,
          image_url: allImageUrls,
          isNew: isNew,
        })
        .eq('id', id);

      if (error) throw error;

      alert('Product updated successfully!');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <AdminSidebar
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />

        <div className="md:pl-64">
          <AdminHeader />

          <main className="p-6 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1a0f00]"></div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      <div className="md:pl-64">
        <AdminHeader />

        <main className="p-6">
          <div className="mb-6">
            <button
              onClick={() => navigate('/admin/products')}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back to Products
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-serif text-gray-800">
                Edit Product
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Product Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                      placeholder="Gold Diamond Ring"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price *
                    </label>
                    <input
                      id="price"
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                      placeholder="$1,299.99"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Category *
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                      required
                    >
                      {categories.length === 0 ? (
                        <option value="">No categories available</option>
                      ) : (
                        categories.map((cat) => (
                          <option key={cat.id} value={cat.category}>
                            {cat.category}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center">
                      <input
                        id="isNew"
                        type="checkbox"
                        checked={isNew}
                        onChange={(e) => setIsNew(e.target.checked)}
                        className="h-4 w-4 text-[#1a0f00] focus:ring-[#3a2a1a] border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isNew"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Mark as New Product
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description *
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={5}
                      className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                      placeholder="Describe your product..."
                      required
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Details
                    </label>

                    {details.map((detail, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={detail}
                          onChange={(e) => updateDetail(index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#3a2a1a] focus:border-transparent"
                          placeholder="e.g., 18k Gold, 1.2 carats"
                        />
                        <button
                          type="button"
                          onClick={() => removeDetail(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          disabled={details.length === 1}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={addDetailField}
                      className="mt-2 inline-flex items-center text-sm text-[#1a0f00] hover:text-[#3a2a1a]"
                    >
                      <Plus size={16} className="mr-1" />
                      Add Detail
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images *
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {/* Existing images */}
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={
                            url.startsWith('http')
                              ? url
                              : `https://zoisqpjdagwrmfzniotl.supabase.co/storage/v1/object/public/${url}`
                          }
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {/* New images */}
                  {newImagePreviewUrls.map((url, index) => (
                    <div key={`new-${index}`} className="relative group">
                      <div className="aspect-square overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={url}
                          alt={`New ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {/* Add image button */}
                  <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors">
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center p-4">
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleNewImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  Upload high-quality images of your product. First image will
                  be used as the main product image.
                </p>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className="mr-4 bg-white text-gray-700 py-2 px-6 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#1a0f00] text-white py-2 px-6 rounded-md hover:bg-[#3a2a1a] transition-colors disabled:opacity-70"
                >
                  {loading ? 'Saving...' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEditProduct;
