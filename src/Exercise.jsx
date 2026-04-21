import React from "react";
import UserCard from "./UserCard";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Cards
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <UserCard 
          name="Najwa"
          email="najwa@gmail.com"
          street="jl.pamularsih"
          city="semarang" />
          <UserCard 
          name="Kaila"
          email="kaila@gmail.com"
          street="jl.puspowarno"
          city="semarang" />
          <UserCard 
          name="Nuraisyah"
          email="aisyah@gmail.com"
          street="jl.puspanjolo"
          city="semarang" />
        </div>
      </div>
    </>
  );
}

export default Exercise;