import { useState, useRef } from 'react';
import { uploadAPI } from '../utils/api';

const ImageUpload = ({ onUploadSuccess, label = "Upload Image", accept = "image/*" }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError('');
    
    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload
    handleUpload(file);
  };

  const handleUpload = async (file) => {
    setUploading(true);
    setError('');

    try {
      const { data } = await uploadAPI.image(file);
      
      if (data.success) {
        onUploadSuccess(data.data);
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full
                     hover:bg-red-700 transition-colors"
          >
            <i className="fa-solid fa-times"></i>
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
              <div className="text-white">Uploading...</div>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center
                   hover:border-accent cursor-pointer transition-colors"
        >
          <i className="fa-solid fa-cloud-upload-alt text-4xl text-gray-400 mb-2"></i>
          <p className="text-gray-400">Click to upload {label.toLowerCase()}</p>
          <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF (Max 5MB)</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;