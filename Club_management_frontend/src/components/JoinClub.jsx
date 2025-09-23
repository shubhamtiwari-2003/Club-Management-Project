// components/JoinClub.jsx
import React from "react";
import Slider from "react-slick";

const JoinClub = ({ settings }) => {
  const joinClub = [
    {
      id: 1,
      name: "Join Photography Club",
      details: "Capture memories, learn photography skills.",
      image: "https://source.unsplash.com/600x400/?camera,photography",
    },
    {
      id: 2,
      name: "Join Sports Club",
      details: "Football, cricket, badminton & more!",
      image: "https://source.unsplash.com/600x400/?sports,team",
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Join a Club</h2>
      <Slider {...settings}>
        {joinClub.map((club) => (
          <div key={club.id} className="p-4">
            <div className="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                src={club.image}
                alt={club.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{club.name}</h3>
                <p className="text-sm text-gray-600">{club.details}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default JoinClub;
