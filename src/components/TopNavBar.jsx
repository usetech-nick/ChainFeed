import { Wallet, Bell } from "lucide-react";

const TopNavBar = ({ onCameraClick, onNotificationClick }) => (
  <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
    <div className="flex justify-between items-center px-4 py-3 pt-8">
      <button onClick={onCameraClick} className="p-2">
        <Wallet className="w-6 h-6 text-white" />
      </button>
      <div className="text-white font-semibold text-lg">For You</div>
      <button onClick={onNotificationClick} className="p-2 relative">
        <Bell className="w-6 h-6 text-white" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  </div>
);

export default TopNavBar;
