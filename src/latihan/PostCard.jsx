import { useState } from "react";

const PostCard = ({ id, userId, title, body }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="flex flex-col p-5 border rounded-xl shadow-md transition-all duration-300 
                    hover:scale-105 hover:bg-pink-50 hover:border-red-400 w-72 h-full justify-between">
      <div>
        <h2 className="font-bold text-lg mb-3 text-center capitalize">{ title }</h2>
        <p className="text-sm text-gray-600 text-center leading-relaxed">{ body }</p>
      </div>

      <button
        onClick={() => setIsClicked(true)}
        className={`mt-5 py-2 px-4 rounded-md font-semibold text-white transition-all
             ${isClicked 
                ? "bg-[#b83016] hover:bg-red-700" 
                : "bg-gray-500 hover:bg-gray-400"
        }`}>
      {isClicked ? "Tombol sudah diklik" : "Silakan Klik"}
    </button>
    </div>
  );
};

export default PostCard;