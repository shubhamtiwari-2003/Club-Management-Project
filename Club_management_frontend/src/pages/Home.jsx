// pages/HomePage.jsx
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Clubs from "../components/Clubs";
import Events from "../components/Events";
import Announcements from "../components/Announcements";
import JoinClub from "../components/JoinClub";

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full px-6 py-10 space-y-16">
      <Clubs settings={sliderSettings} />
      <Events settings={sliderSettings} />
      <Announcements settings={sliderSettings} />
      <JoinClub settings={sliderSettings} />
    </div>
  );
};

export default Home;
