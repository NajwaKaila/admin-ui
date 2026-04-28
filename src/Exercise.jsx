import React from "react"; 
import { postsData } from "./data/postsData"; 
import PostCard from "./PostCard"; 

function Exercise() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Gunakan warna Special Red2 dari Soal 01 [cite: 137, 155] */}
      <h1 className="text-3xl font-bold text-center mb-10 text-special-red2">
        Post Cards
      </h1>
      
      {/* Container Flex untuk mengatur tata letak [cite: 150] */}
      <div className="flex flex-wrap gap-6 justify-center max-w-7xl mx-auto">
        {/* Render data menggunakan fungsi map() (Soal 03) [cite: 180] */}
        {postsData.map((post) => (
          <PostCard 
            key={post.id} 
            id={post.id} 
            userId={post.userId} 
            title={post.title} 
            body={post.body} 
          />
        ))}
      </div>
    </div>
  );
}

export default Exercise;