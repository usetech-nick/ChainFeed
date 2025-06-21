import { Play, Video, Plus, Search } from "lucide-react";
import { useState } from "react";
import profilePic from "/assets/pfp.jpg";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: Play },
    { id: "search", icon: Video },
    { id: "create", icon: Plus, isSpecial: true },
    { id: "inbox", icon: Search },
    { id: "profile", isImage: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center py-2 px-3"
          >
            {item.isSpecial ? (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-xl">
                <item.icon className="w-6 h-6 text-white" />
              </div>
            ) : item.isImage ? (
              <img
                src={profilePic}
                className={`w-6 h-6 rounded-full object-cover border-2 ${
                  activeTab === item.id ? "border-white" : "border-gray-500"
                }`}
                alt="Profile"
              />
            ) : (
              <item.icon
                className={`w-6 h-6 ${
                  activeTab === item.id ? "text-white" : "text-gray-400"
                }`}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
