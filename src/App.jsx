import { useState, useEffect, useRef } from "react";
import TopNavBar from "./components/TopNavBar";
import BottomNavigation from "./components/BottomNavigation";
import VideoPlayer from "./components/VideoPlayer";
import LoadingScreen from "./components/LoadingScreen";
import useWindowSize from "./hooks/useWindowSize";
import mockVideos from "./data/mockVideos";

const App = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef(null);
  const { width, height } = useWindowSize();
  const isMobile = width <= 768;

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    // Simulate API call with 2 sec delay
    const fetchVideos = () => {
      setTimeout(() => {
        // Simulate 10% chance of fetch failure
        const corruptedVideos = mockVideos.map((vid) => {
          if (Math.random() < 0.1) {
            return { ...vid, loadFailed: true };
          }
          return { ...vid, loadFailed: false };
        });
        setVideos(corruptedVideos);
        setLoading(false);
      }, 2000);
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const newIndex = Math.round(scrollTop / height);
      if (newIndex !== currentVideoIndex) setCurrentVideoIndex(newIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentVideoIndex, height]);

  const handleCameraClick = () => {
    console.log("Camera Clicked");
  };

  const handleNotificationClick = () => {
    console.log("Notification Clicked");
  };

  if (loading) return <LoadingScreen />;

  const infiniteVideos = Array(3).fill(videos).flat();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div
        className="relative bg-black overflow-hidden"
        style={{
          width: isMobile ? "100vw" : "390px",
          height: isMobile ? "calc(var(--vh, 1vh) * 100 - 112px)" : "844px",
          borderRadius: isMobile ? "0" : "20px",
        }}
      >
        <TopNavBar
          onCameraClick={handleCameraClick}
          onNotificationClick={handleNotificationClick}
        />

        <div
          ref={containerRef}
          className="overflow-y-scroll snap-y snap-mandatory no-scrollbar"
          style={{
            height: isMobile ? "100vh" : "844px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {infiniteVideos.map((video, index) => (
            <div
              key={video.id}
              className="snap-start flex-shrink-0"
              style={{ height: isMobile ? "100vh" : "844px" }}
            >
              <VideoPlayer
                video={video}
                isActive={index === currentVideoIndex}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
              />
            </div>
          ))}
        </div>

        <BottomNavigation />
      </div>
    </div>
  );
};

export default App;
