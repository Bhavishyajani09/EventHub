import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Upload, ArrowLeft, Save, X } from 'lucide-react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import organizerService from '../../services/organizerService';


const ORG_edit = ({ isDark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Crop state
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [tempImage, setTempImage] = useState(null);


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 0,
    price: 0,
    category: '',
    image: null,
    isPublished: false,
    hasArtist: false,
    artistName: ''
  });

  const [seatTypes, setSeatTypes] = useState({
    general: { price: '', quantity: '' },
    vip: { price: '', quantity: '' },
    premium: { price: '', quantity: '' }
  });

  const categories = [
    'Music', 'Comedy', 'Art', 'Sports', 'Seasonal Event', 'Movie'
  ];

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await organizerService.getEventById(id);
      if (response.success && response.event) {
        const event = response.event;
        const eventDate = event.date ? new Date(event.date) : null;
        const eventDateStr = eventDate ? eventDate.toISOString().split('T')[0] : '';
        const eventTimeStr = eventDate ? eventDate.toTimeString().split(' ')[0].substring(0, 5) : '';

        const seatTypesObj = {
          general: { price: '', quantity: '' },
          vip: { price: '', quantity: '' },
          premium: { price: '', quantity: '' }
        };

        if (event.seatTypes && Array.isArray(event.seatTypes)) {
          event.seatTypes.forEach(seat => {
            const name = seat.name.toLowerCase();
            if (seatTypesObj[name]) {
              seatTypesObj[name] = {
                price: seat.price.toString(),
                quantity: seat.quantity.toString()
              };
            }
          });
        }

        setSeatTypes(seatTypesObj);

        setFormData({
          title: event.title || '',
          description: event.description || '',
          date: eventDateStr,
          time: eventTimeStr,
          location: event.location || '',
          capacity: event.capacity || 0,
          price: event.price || 0,
          category: event.category || '',
          image: null,
          isPublished: event.isPublished || false,
          hasArtist: event.hasArtist || false,
          artistName: event.artistName || ''
        });

        if (event.image) {
          setImagePreview(event.image);
        }
      } else {
        setError('Event not found');
      }
    } catch (error) {
      console.error('Fetch event error:', error);
      setError('Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent negative values for price and capacity
    if (type === 'number' && value !== '') {
      const numValue = parseFloat(value);
      if (numValue < 0) return;
      if (name === 'capacity' && numValue === 0) return; // Capacity should be at least 1
    }

    if (name === 'date') {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        setError('Cannot select a past date');
        return;
      }
      setError('');
    }

    if (name === 'time' && formData.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate.toDateString() === today.toDateString()) {
        const [hours, minutes] = value.split(':');
        const selectedTime = new Date();
        selectedTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

        if (selectedTime < today) {
          setError('Cannot select a past time for today');
          return;
        }
      }
      setError('');
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const updateSeatType = (type, field, value) => {
    if (value !== '' && parseFloat(value) < 0) return;

    setSeatTypes(prev => {
      const updated = {
        ...prev,
        [type]: { ...prev[type], [field]: value }
      };

      if (field === 'quantity') {
        const totalCapacity =
          (parseInt(updated.general.quantity) || 0) +
          (parseInt(updated.vip.quantity) || 0) +
          (parseInt(updated.premium.quantity) || 0);

        setFormData(prevForm => ({
          ...prevForm,
          capacity: totalCapacity
        }));
      }

      if (field === 'price') {
        const prices = [
          parseFloat(updated.general.price) || 0,
          parseFloat(updated.vip.price) || 0,
          parseFloat(updated.premium.price) || 0
        ].filter(p => p > 0);
        const lowestPrice = prices.length > 0 ? Math.min(...prices) : 0;
        setFormData(prevForm => ({
          ...prevForm,
          price: lowestPrice
        }));
      }

      return updated;
    });
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
      if (!croppedAreaPixels || !tempImage) return;

      const croppedImageBlob = await getCroppedImg(
        tempImage,
        croppedAreaPixels
      );

      const file = new File([croppedImageBlob], "event-image.jpg", { type: "image/jpeg" });
      setFormData(prev => ({ ...prev, image: file }));

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


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || !formData.location) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const updateData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          updateData.append('image', formData[key]);
        } else if (key !== 'image') {
          updateData.append(key, formData[key]);
        }
      });

      // Combine date and time into a single ISO string for accurate timezone handling
      if (formData.date && formData.time) {
        const localDate = new Date(`${formData.date}T${formData.time}`);
        updateData.set('date', localDate.toISOString());
      } else if (formData.date) {
        updateData.set('date', formData.date);
      }

      // Add seat types
      const seatTypesArray = [
        { name: 'General', price: seatTypes.general.price, quantity: seatTypes.general.quantity },
        { name: 'VIP', price: seatTypes.vip.price, quantity: seatTypes.vip.quantity },
        { name: 'Premium', price: seatTypes.premium.price, quantity: seatTypes.premium.quantity }
      ].filter(seat => seat.price && seat.quantity);

      updateData.append('seatTypes', JSON.stringify(seatTypesArray));

      // Add category flags for consistency
      if (formData.category === 'Movie') {
        updateData.append('isMovie', 'true');
      } else if (formData.category === 'Music') {
        updateData.append('isConcert', 'true');
      } else if (formData.category === 'Sports') {
        updateData.append('isSports', 'true');
      }

      const response = await organizerService.updateEvent(id, updateData);

      if (response.success) {
        navigate('/events');
      } else {
        setError(response.message || 'Failed to update event');
      }
    } catch (error) {
      setError('Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/events')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Edit Event</h1>
            <p className="text-gray-500 text-sm">Update your event details</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`rounded-lg shadow-md p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Image
            </label>
            <label className="cursor-pointer block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-400 transition-colors">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded-lg bg-gray-100"
                      style={{ objectPosition: 'center' }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImagePreview('');
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <span className="mt-2 block text-sm font-medium text-gray-900">
                        Upload event image
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <input
                type="file"
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Basic Information */}
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              required
            />
          </div>

          <div className="flex items-center gap-2 mt-4 mb-2">
            <input
              type="checkbox"
              id="hasArtist"
              name="hasArtist"
              checked={formData.hasArtist}
              onChange={handleInputChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="hasArtist" className="text-sm font-medium text-gray-700">
              Does your event have an artist?
            </label>
          </div>

          {formData.hasArtist && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Artist Name
              </label>
              <input
                type="text"
                name="artistName"
                value={formData.artistName}
                onChange={handleInputChange}
                required={formData.hasArtist}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                placeholder="Enter artist name"
              />
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>
          </div>

          {/* Location & Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
                required
              />
            </div>

            {/* Publish Toggle */}
            <div className="flex items-center gap-3 py-2 mt-4">
              <input
                type="checkbox"
                id="isPublished"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor="isPublished" className="text-sm font-medium text-gray-700 cursor-pointer">
                Publish event? (Requires admin approval to show on home page)
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>

            <div className="mt-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Price (₹ - Auto-lowest)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              />
            </div>
          </div>

          {/* Seat Types */}
          <div className="mt-8 border-t pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Seat Types & Pricing
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['general', 'vip', 'premium'].map((type) => (
                <div key={type} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-3 capitalize">{type}</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Price (₹)</label>
                      <input
                        type="number"
                        value={seatTypes[type].price}
                        onChange={(e) => updateSeatType(type, 'price', e.target.value)}
                        min="0"
                        step="0.01"
                        className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-indigo-500"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                      <input
                        type="number"
                        value={seatTypes[type].quantity}
                        onChange={(e) => updateSeatType(type, 'quantity', e.target.value)}
                        min="0"
                        className="w-full px-2 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-indigo-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/events')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Updating...
              </>
            ) : (
              <>
                <Save size={16} />
                Update Event
              </>
            )}
          </button>
        </div>
      </form >

      {/* Crop Modal */}
      {
        isCropping && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
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

              <div className="relative w-full h-[400px] bg-gray-900">
                <Cropper
                  image={tempImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
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
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
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
        )
      }
    </div >
  );
};

export default ORG_edit;