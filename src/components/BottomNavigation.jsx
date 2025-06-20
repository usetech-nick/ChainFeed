import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { useState } from "react";

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Discover" },
    { id: "create", icon: Plus, label: "", isSpecial: true },
    { id: "inbox", icon: MessageCircle, label: "Inbox" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-40">
      <div className="flex justify-around items-center py-1">
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
            ) : (
              <>
                <item.icon
                  className={`w-6 h-6 ${
                    activeTab === item.id ? "text-white" : "text-gray-400"
                  }`}
                />
                {item.label && (
                  <span
                    className={`text-xs mt-1 ${
                      activeTab === item.id ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
