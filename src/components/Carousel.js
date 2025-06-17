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
//
// import React, { useState, useEffect } from "react";
// import BannerService from "../services/BannerService";

// function Carousel() {
//   const [activeSlide, setActiveSlide] = useState(1);
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await BannerService.bannerFe();
//         setBanners(response.banners);
//       } catch (error) {
//         console.error("Error fetching banners:", error);
//       }
//     };
//     fetchBanners();
//   }, []);

//   useEffect(() => {
//     if (banners.length === 0) return;
//     const interval = setInterval(() => {
//       const nextSlide = activeSlide === banners.length ? 1 : activeSlide + 1;
//       setActiveSlide(nextSlide);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [activeSlide, banners.length]);

//   const carouselContainer = {
//     position: "relative",
//     width: "100%",
//     maxWidth: "900px",
//     height: "480px",
//     margin: "30px auto",
//     overflow: "hidden",
//     borderRadius: "24px",
//     boxShadow: "0 8px 32px rgba(60,60,120,0.18)",
//     background: "linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)",
//   };

//   const slideStyle = (visible) => ({
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     opacity: visible ? 1 : 0,
//     zIndex: visible ? 2 : 1,
//     transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   });

//   const imgStyle = {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     borderRadius: "24px",
//     boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
//   };

//   const dotsContainer = {
//     position: "absolute",
//     bottom: "18px",
//     left: 0,
//     right: 0,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: "18px",
//     zIndex: 10,
//   };

//   const dotStyle = (active) => ({
//     width: active ? "18px" : "12px",
//     height: "12px",
//     borderRadius: "12px",
//     background: active
//       ? "linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)"
//       : "#e5e7eb",
//     boxShadow: active ? "0 2px 8px 0px #6366f130" : "none",
//     border: active ? "2px solid #6366f1" : "1px solid #e5e7eb",
//     cursor: "pointer",
//     transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
//   });

//   const captionStyle = {
//     position: "absolute",
//     bottom: "62px",
//     left: "50%",
//     transform: "translateX(-50%)",
//     color: "#fff",
//     background: "rgba(31,41,55,0.38)",
//     padding: "13px 32px",
//     borderRadius: "18px",
//     fontSize: "1.12rem",
//     fontWeight: 500,
//     textShadow: "0 2px 8px #1117",
//     letterSpacing: "0.02em",
//     boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
//     pointerEvents: "none",
//     minWidth: "180px",
//     maxWidth: "90%",
//     textAlign: "center",
//   };

//   return (
//     <div style={carouselContainer}>
//       {/* Slides */}
//       {banners.map((banner, idx) => (
//         <div key={idx} style={slideStyle(activeSlide === idx + 1)}>
//           <img
//             src={banner.image}
//             alt={banner.title || `Slide ${idx + 1}`}
//             style={imgStyle}
//           />
//           {banner.title && <div style={captionStyle}>{banner.title}</div>}
//         </div>
//       ))}

//       {/* Dots */}
//       <div style={dotsContainer}>
//         {banners.map((_, idx) => (
//           <button
//             key={idx}
//             style={dotStyle(activeSlide === idx + 1)}
//             onClick={() => setActiveSlide(idx + 1)}
//             aria-label={`Go to slide ${idx + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Carousel;
