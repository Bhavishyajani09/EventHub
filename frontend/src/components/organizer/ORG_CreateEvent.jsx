import React, { useState } from "react";

export default function CreateEvent() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    language: "",
    type: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    city: "",
    address: "",
    price: "",
    tickets: "",
    bannerImage: null,
    bannerPreview: "",
    galleryImages: [],
    galleryPreviews: [],
    media: null,
  });

  const totalSteps = 5;

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: files ? files : value,
  //   });
  // };

//   const handleChange = (e) => {
//   const { name, value, files } = e.target;

//   setFormData((prev) => ({
//     ...prev,
//     [name]: files ? files[0] : value,
//   }));
// };


const handleChange = (e) => {
  const { name, value, files, type } = e.target;

  // 📁 file input
  if (files) {
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
    return;
  }

  // 🚫 negative number block (PROPER)
  if (type === "number") {
    if (value === "") {
      setFormData((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    const numValue = Number(value);
    if (numValue < 0) return;
  }

   // 📁 Banner Image
  if (name === "bannerImage" && files[0]) {
    setFormData((prev) => ({
      ...prev,
      bannerImage: files[0],
      bannerPreview: URL.createObjectURL(files[0]),
    }));
    return;
  }

  // 📁 Gallery Images
  if (name === "galleryImages" && files.length) {
    const previews = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prev) => ({
      ...prev,
      galleryImages: files,
      galleryPreviews: previews,
    }));
    return;
  }

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};



  // Next & Preveous Steps
const nextStep = () => {
  const form = document.querySelector("form");
  if (!form.checkValidity()) {
    form.reportValidity(); // browser error show karega
    return;
  }else if  (step === 4 && !formData.bannerImage) {
    alert("Please upload banner image");
    return;
  }

  setStep(step + 1);
};

const prevStep = () => setStep(step - 1);


// const getTodayDate = () => {
//   return new Date().toISOString().split("T")[0];
// };

// const getCurrentTime = () => {
//   return new Date().toTimeString().slice(0, 5);
// };

// const handleChange = (e) => {
//   const { name, value, files } = e.target;

//   // 📁 File input
//   if (files) {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files[0],
//     }));
//     return;
//   }

//   // ⛔ Start time past block (only if date = today)
//   if (
//     name === "startTime" &&
//     formData.date === getTodayDate() &&
//     value < getCurrentTime()
//   ) {
//     return;
//   }

//   // ⛔ End time before start time block
//   if (
//     name === "endTime" &&
//     formData.startTime &&
//     value < formData.startTime
//   ) {
//     return;
//   }

//   // ✅ Normal update
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };


  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Create Event</h1>
        <p className="text-gray-500">
          Fill in the details to create a new event
        </p>
      </div>

      {/* Steps */}
      <div className="flex justify-between">
        {["Basic", "Date & Venue", "Ticketing", "Media", "Publish"].map(
          (label, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  step >= i + 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {i + 1}
              </div>
              <p className="text-xs mt-1 text-center">{label}</p>
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        {step === 1 && (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      setStep((prev) => prev + 1);
    }}
    className="space-y-6"
  >
    <h2 className="font-semibold text-lg">Basic Details</h2>

    <label className="block">
      <span className="text-sm font-medium">Event Title *</span>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="input"
        required
      />
    </label>

    <label className="block">
      <span className="text-sm font-medium">Description *</span>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="input"
        rows="4"
        required
      />
    </label>

    
  </form>
)}

          
      

        

        {step === 2 && (
           <form className="space-y-6">
       <div className="space-y-6">
         {/* Title */}
         <div>
           <h2 className="text-lg font-semibold">Date & Venue</h2>
           <p className="text-sm text-gray-500">When and where</p>
         </div>
     
          {/* Date */}
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* Start Date */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      Start Date *
    </label>
    <input
      type="date"
      name="startDate"
      value={formData.startDate}
      min={new Date().toISOString().split("T")[0]}
      onChange={handleChange}
      className="input mt-1 w-full"
      required
    />
  </div>

  {/* End Date */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      End Date *
    </label>
    <input
      type="date"
      name="endDate"
      value={formData.endDate}
      min={formData.startDate || new Date().toISOString().split("T")[0]}
      onChange={handleChange}
      className="input mt-1 w-full"
      required
    />
  </div>
</div>


    {/* Time */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* Start Time */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      Start Time *
    </label>
   <input
  type="time"
  name="startTime"
  value={formData.startTime}
  min={
    formData.startDate === new Date().toISOString().split("T")[0]
      ? new Date().toTimeString().slice(0, 5)
      : undefined
  }
  onChange={handleChange}
  className="input mt-1 w-full"
  required
/>

  </div>

  {/* End Time */}
  <div>
    <label className="text-sm font-medium text-gray-700">
      End Time *
    </label>
<input
  type="time"
  name="endTime"
  value={formData.endTime}
  min={formData.startTime || undefined}
  onChange={handleChange}
  className="input mt-1 w-full"
  required
/>


  </div>

</div>



    {/* Venue Details */}
<div className="space-y-4">
  <div>
    <label className="text-sm font-medium text-gray-700">
      Venue Name *
    </label>
    <input
      type="text"
      name="venue"
      value={formData.venue}
      placeholder="Enter venue name"
      onChange={handleChange}
      className="input mt-1"
      required
    />
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium text-gray-700">
        City *
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        placeholder="Enter city"
        onChange={handleChange}
        className="input mt-1"
        required
      />
    </div>

    <div>
      <label className="text-sm font-medium text-gray-700">
        Full Address *
      </label>
      <input
        type="text"
        name="address"
        value={formData.address}
        placeholder="Enter full address"
        onChange={handleChange}
        className="input mt-1"
        required
      />
    </div>
  </div>
</div>



        <div>
          <label className="text-sm font-medium text-gray-700">
            Map Preview
          </label>
        
          {formData.address || formData.city ? (
            <iframe
              title="map"
              className="mt-2 h-48 w-full rounded-lg border"
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `${formData.address} ${formData.city}`
              )}&output=embed`}
            />
          ) : (
            <div className="mt-2 h-48 w-full rounded-lg border flex items-center justify-center text-gray-400 text-sm bg-gray-50">
              Enter address to preview map
            </div>
          )}
        </div>
        
          </div>
          </form>
        )}
        
        
        {/* {step === 3 && (
          <>
            <h2 className="font-semibold text-lg">Ticketing</h2>
            <input name="price" type="number" onChange={handleChange} className="input" placeholder="Ticket price" />
            <input name="tickets" type="number" onChange={handleChange} className="input" placeholder="Available tickets" />
          </>
        )} */}


{step === 3 && (
  <form className="space-y-6">
  <div className="space-y-6">
    <div>
      <h2 className="text-lg font-semibold">Ticketing</h2>
      <p className="text-sm text-gray-500">Pricing and capacity</p>
    </div>

       {/* Silver */}
        <div className="space-y-2 border rounded-lg p-4">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 text-sm font-medium ">
            <div>Category</div>
            <div>Price (₹)</div>
            <div>Total Seats</div>
          </div>
        
          {/* Row */}
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="border p-2 rounded-lg bg-gray-100">Silver</div>
        
<input
  type="number"
  name="silverPrice"
  placeholder="0.00"
  value={formData.silverSeats}
  onChange={handleChange}
  min="0"
  step="0.01"
  className="input bg-gray-100"
/>
        
<input
  type="number"
  name="silverSeats"
  placeholder="0"
  value={formData.silverSeats}
  onChange={handleChange}
  min="0"
  step="1"
  className="input bg-gray-100"
/>
          </div>
        </div>
        
        {/* Gold */}
        <div className="space-y-2 border rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium">
            <div>Category</div>
            <div>Price (₹)</div>
            <div>Total Seats</div>
          </div>
        
          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="border p-2 rounded-lg bg-gray-100">Gold</div>
        
            <input
              type="number"
              name="goldPrice"
              placeholder="0.00"
              value={formData.goldPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="input bg-gray-100"
            />
        
            <input
              type="number"
              name="goldSeats"
              placeholder="0"
              value={formData.goldSeats}
              onChange={handleChange}
              min="0"
              step="1"
              className="input bg-gray-100"
            />
          </div>
        </div>
        
        {/* VIP */}
        <div className="space-y-2 border rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-sm font-medium ">
            <div>Category</div>
            <div>Price (₹)</div>
            <div>Total Seats</div>
          </div>
        
          <div className="grid grid-cols-3 gap-4 items-center ">
            <div className="border p-2 rounded-lg bg-gray-100">VIP</div>
        
            <input
              type="number"
              name="vipPrice"
              placeholder="0.00"
              value={formData.vipPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="input bg-gray-100" 
            />
        
            <input
              type="number"
              name="vipSeats"
              placeholder="0"
              value={formData.vipSeats}
              onChange={handleChange}
              min="0"
              step="1"
              className="input bg-gray-100"
            />
          </div>
        </div>



{/* Convenience Fee & Tax */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
  {/* Convenience Fee */}
  <div>
    <label className="text-sm font-medium ">
      Convenience Fee (%)
    </label>
    <input
      type="number"
      name="convenienceFee"
      value={formData.convenienceFee}
      onChange={handleChange}
      placeholder="0"
      className="input mt-1 bg-gray-100"
    />
  </div>

  {/* Tax */}
  <div>
    <label className="text-sm font-medium">
      Tax (%)
    </label>
    <input
      type="number"
      name="tax"
      value={formData.tax}
      onChange={handleChange}
      placeholder="0"
      className="input mt-1 bg-gray-100"
    />
  </div>
</div>

    
    
  </div>
  </form>
)}




      

  {step === 4 && (
  <>
    <h2 className="font-semibold text-lg mb-1">Media</h2>
    <p className="text-sm text-gray-500 mb-6">
      Images and videos
    </p>

    {/* ================= Banner Image ================= */}
    <div className="mb-6">
      <h3 className="font-medium mb-1">Banner Image</h3>
      <p className="text-sm text-gray-400 mb-3">
        This image will be shown as the main banner
      </p>

      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition">
        {formData.bannerPreview && (
  <img
    src={formData.bannerPreview}
    alt="Banner Preview"
    className="mt-4 h-40 w-full object-cover rounded-lg border"
  />
)}
        <input
          type="file"
          name="bannerImage"
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="hidden"
        />

        <span className="text-purple-600 font-medium">
          Click to upload banner image
        </span>
        <span className="text-gray-500 text-sm">
          or drag and drop
        </span>

        <p className="text-xs text-gray-400 mt-2">
          PNG, JPG up to 10MB (1920×1080 recommended)
        </p>
      </label>
    </div>

    {/* ================= Gallery Images ================= */}
    <div>
      <h3 className="font-medium mb-1">Gallery Images</h3>
      <p className="text-sm text-gray-400 mb-3">
        These images will appear in event gallery
      </p>

      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition">
        <input
          type="file"
          name="galleryImages"
          multiple
          accept="image/png, image/jpeg"
          onChange={handleChange}
          className="hidden"
        />

        <span className="text-purple-600 font-medium">
          Click to upload gallery images
        </span>
        <span className="text-gray-500 text-sm">
          or drag and drop
        </span>

        <p className="text-xs text-gray-400 mt-2">
          Up to 10 images, PNG or JPG
        </p>
      </label>
      {formData.galleryPreviews?.length > 0 && (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
    {formData.galleryPreviews.map((src, index) => (
      <img
        key={index}
        src={src}
        alt="Gallery"
        className="h-24 w-full object-cover rounded-lg border"
      />
    ))}
  </div>
)}

    </div>
  </>
)}




        {step === 5 && (
          <>
            <h2 className="font-semibold text-lg">Publish</h2>
            <p className="text-gray-600">All details look good. Ready to publish 🎉</p>
          </>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={step === totalSteps ? () => alert("Event Created!") : nextStep}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          {step === totalSteps ? "Publish" : "Next"}
        </button>

      </div>

      {/* Tailwind reusable class */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 0.5rem 1rem;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
          }
        `}
      </style>
    </div>
  );
}




