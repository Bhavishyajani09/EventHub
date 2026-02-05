import React, { useState } from 'react';
import { Calendar, MapPin, Users, IndianRupee, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import organizerService from '../../services/organizerService';


const CreateEvent = ({ isDark }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    category: '',
    isPublished: false
  });
  const [seatTypes, setSeatTypes] = useState({
    general: { price: '', quantity: '' },
    vip: { price: '', quantity: '' },
    premium: { price: '', quantity: '' }
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      const croppedImageBlob = await getCroppedImg(
        tempImage,
        croppedAreaPixels
      );

      const file = new File([croppedImageBlob], "event-image.jpg", { type: "image/jpeg" });
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsCropping(false);
        setTempImage(null);
        setZoom(1);
        setCrop({ x: 0, y: 0 });
      };
      reader.readAsDataURL(croppedImageBlob);
    } catch (e) {
      console.error(e);
      setError('Failed to crop image');
    }
  };


  const removeImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const updateSeatType = (type, field, value) => {
    setSeatTypes(prev => {
      const updated = {
        ...prev,
        [type]: { ...prev[type], [field]: value }
      };

      // Auto-calculate total capacity when quantities change
      if (field === 'quantity') {
        const totalCapacity =
          (parseInt(updated.general.quantity) || 0) +
          (parseInt(updated.vip.quantity) || 0) +
          (parseInt(updated.premium.quantity) || 0);

        setFormData(prevForm => ({
          ...prevForm,
          capacity: totalCapacity.toString()
        }));
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const eventFormData = new FormData();

      // Calculate the lowest price from seat types
      const prices = [
        parseFloat(seatTypes.general.price) || 0,
        parseFloat(seatTypes.vip.price) || 0,
        parseFloat(seatTypes.premium.price) || 0
      ].filter(price => price > 0);

      const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;

      // Add form fields
      Object.keys(formData).forEach(key => {
        eventFormData.append(key, formData[key]);
      });

      // Add category flags for frontend filtering
      if (formData.category === 'Movie') {
        eventFormData.append('isMovie', 'true');
      } else if (formData.category === 'Music') {
        eventFormData.append('isConcert', 'true');
      } else if (formData.category === 'Sports') {
        eventFormData.append('isSports', 'true');
      }

      // Add lowest price as base price
      eventFormData.append('price', lowestPrice.toString());

      // Add seat types - convert to array format for backend
      const seatTypesArray = [
        { name: 'General', price: seatTypes.general.price, quantity: seatTypes.general.quantity },
        { name: 'VIP', price: seatTypes.vip.price, quantity: seatTypes.vip.quantity },
        { name: 'Premium', price: seatTypes.premium.price, quantity: seatTypes.premium.quantity }
      ].filter(seat => seat.price && seat.quantity);

      eventFormData.append('seatTypes', JSON.stringify(seatTypesArray));

      // Add image if selected
      if (image) {
        eventFormData.append('image', image);
      }

      const response = await organizerService.createEvent(eventFormData);

      if (response.success) {
        setSuccess('Event created successfully!');
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          capacity: '',
          category: '',
          isPublished: false
        });
        setSeatTypes({
          general: { price: '', quantity: '' },
          vip: { price: '', quantity: '' },
          premium: { price: '', quantity: '' }
        });
        setImage(null);
        setImagePreview('');

        // Navigate back to events after 2 seconds
        setTimeout(() => {
          navigate('/events');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create New Event</h1>
        <p className={`mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Fill in the details to create your event</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className={`rounded-lg shadow-md p-6 space-y-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Image
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-48 object-contain rounded-lg bg-gray-50"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload event image
                    </span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            >
              <option value="" disabled>Select category</option>
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Art">Art</option>
              <option value="Sports">Sports</option>
              <option value="Seasonal Event">Seasonal Event</option>
              <option value="Movie">Movie</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="Describe your event"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time *
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
            placeholder="Event venue or address"
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Total Capacity (Auto-calculated)
          </label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
            placeholder="Will be calculated from seat quantities"
          />
        </div>

        {/* Seat Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Seat Types & Pricing
          </label>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* General Seats */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">General</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={seatTypes.general.price}
                    onChange={(e) => updateSeatType('general', 'price', e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={seatTypes.general.quantity}
                    onChange={(e) => updateSeatType('general', 'quantity', e.target.value)}
                    min="0"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* VIP Seats */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">VIP</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={seatTypes.vip.price}
                    onChange={(e) => updateSeatType('vip', 'price', e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={seatTypes.vip.quantity}
                    onChange={(e) => updateSeatType('vip', 'quantity', e.target.value)}
                    min="0"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Premium Seats */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-3">Premium</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    value={seatTypes.premium.price}
                    onChange={(e) => updateSeatType('premium', 'price', e.target.value)}
                    min="0"
                    step="0.01"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={seatTypes.premium.quantity}
                    onChange={(e) => updateSeatType('premium', 'quantity', e.target.value)}
                    min="0"
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </div>
      </form>

      {/* Crop Modal */}
      {isCropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl h-[600px] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Crop Image</h3>
              <button
                onClick={() => {
                  setIsCropping(false);
                  setTempImage(null);
                  setZoom(1);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative flex-1 bg-gray-900">
              <Cropper
                image={tempImage}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zoom
                </label>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsCropping(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={showCroppedImage}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Apply Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEvent;