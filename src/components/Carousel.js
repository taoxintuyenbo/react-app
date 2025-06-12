import React, { useState, useEffect } from "react";
import BannerService from "../services/BannerService";
// import BannerService from "../../../services/BannerService"; // Import the banner service

function Carousel() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [banners, setBanners] = useState([]); // Store banners from the service

  useEffect(() => {
    // Fetch banners from the service
    const fetchBanners = async () => {
      try {
        const response = await BannerService.bannerFe();
        console.log("response", response);
        setBanners(response.banners); // Assume response.data contains an array of banners
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    // Auto-switch slides
    const interval = setInterval(() => {
      const nextSlide = activeSlide === banners.length ? 1 : activeSlide + 1;
      setActiveSlide(nextSlide);
    }, 3000); // Change the slide every 3 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [activeSlide, banners.length]);

  return (
    <div>
      {/* Carousel */}
      <div className="max-w-full h-[500px] mx-auto relative" id="carousel">
        {/* Slides */}
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full ${
              activeSlide === index + 1 ? "block" : "hidden"
            }`}
          >
            <img
              src={banner.image} // Assume each banner object has an 'image' property
              alt={banner.title || `Slide ${index + 1}`} // Use 'title' or fallback to slide number
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Buttons */}
        <div className="absolute bottom-4 w-full flex items-center justify-center px-4">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 mx-2 rounded-full ${
                activeSlide === index + 1 ? "bg-white" : "bg-gray-300"
              }`}
              onClick={() => setActiveSlide(index + 1)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
