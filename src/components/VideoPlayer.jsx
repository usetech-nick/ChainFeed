import { useState, useRef, useEffect } from "react";
import {
  Play,
  Heart,
  MessageCircle,
  Share,
  Volume2,
  VolumeX,
  MoreHorizontal,
  IndianRupee,
} from "lucide-react";

const VideoPlayer = ({ video, isMuted, setIsMuted }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(video.likes);
  const [hasTriedToPlay, setHasTriedToPlay] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  if (video.loadFailed) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <p className="mb-4">Failed to load video</p>
          <button
            className="px-4 py-2 bg-white text-black rounded"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }

  // Load like state from localStorage
  useEffect(() => {
    const savedLike = localStorage.getItem(`liked-${video.id}`);
    if (savedLike === "true") {
      setIsLiked(true);
      setLikes(video.likes + 1); // ✅ Ensures only +1, not cumulative
    }
  }, [video.id]);

  // Load follow state from localStorage
  useEffect(() => {
    const savedFollow = localStorage.getItem(`followed-${video.userName}`);
    if (savedFollow === "true") {
      setIsFollowing(true);
    }
  }, [video.userName]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play()
            .then(() => {
              setIsPlaying(true);
              setHasTriedToPlay(true);
            })
            .catch(() => {
              setIsPlaying(false);
              setHasTriedToPlay(true);
            });
        } else {
          el.pause();
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.75,
      }
    );

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  const toggleMute = (e) => {
    e.stopPropagation();
    const el = videoRef.current;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : prev - 1));
    localStorage.setItem(`liked-${video.id}`, newLiked);
  };

  return (
    <div
      className="relative w-full bg-black"
      style={{ height: "calc(100vh - 65px)" }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
        muted={isMuted}
        loop
        playsInline
        onClick={() => {
          if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>

      {hasTriedToPlay && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-black/50 rounded-full p-4">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      )}

      <div className="absolute bottom-7 left-4 right-16 text-white z-10">
        <div className="text-blue-400 font-medium text-sm">{video.hashtag}</div>
        <div className="flex items-center gap-3">
          <img
            src={video.userImage}
            className="w-8 h-8 rounded-full object-cover border border-white"
          />
          <div className="font-semibold text-base">{video.userName}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const newFollow = !isFollowing;
              setIsFollowing(newFollow);
              localStorage.setItem(`followed-${video.userName}`, newFollow);
            }}
            className={`text-xs px-3 py-1 rounded-full transition-all duration-300 ${
              isFollowing
                ? "bg-white text-black"
                : "bg-transparent border border-white text-white"
            }`}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="bg-gray-800 text-xs px-2 py-0.5 rounded-full text-white">
            {video.title}
          </span>
        </div>
        <div className="text-sm text-gray-300 line-clamp-3 mt-1">
          {video.description}
        </div>
      </div>

      <div className="absolute top-[60%] right-3 transform -translate-y-1/2 flex flex-col items-center space-y-5 z-12">
        <div className="flex flex-col items-center">
          <button
            onClick={toggleLike}
            className="transition-transform duration-200 active:scale-90"
          >
            <Heart
              className={`w-7 h-7 transition-colors duration-300 ${
                isLiked
                  ? "text-red-500 fill-red-500"
                  : "text-white hover:text-red-400"
              }`}
            />
          </button>
          <span className="text-white text-xs mt-1">{likes}</span>
        </div>

        <div className="flex flex-col items-center">
          <MessageCircle className="w-7 h-7 text-white hover:text-blue-400 transition-colors duration-200 cursor-pointer" />
          <span className="text-white text-xs mt-1">{video.comments}</span>
        </div>

        <div className="flex flex-col items-center">
          <Share className="w-7 h-7 text-white hover:text-green-400 transition-colors duration-200 cursor-pointer" />
          <span className="text-white text-xs mt-1">{video.shares}</span>
        </div>
        <div className="flex flex-col items-center">
          <IndianRupee className="w-7 h-7 text-white hover:text-yellow-400 transition-colors duration-200 cursor-pointer" />
          <span className="text-white text-xs font-medium">
            {video.earnings}
          </span>
        </div>
        <button>
          <MoreHorizontal className="w-7 h-7 text-white" />
        </button>
      </div>

      {video.isPaid && (
        <div className="absolute bottom-20 right-6 border border-yellow-400 text-yellow-400 text-sm px-2 py-1 rounded-md z-10">
          Paid
        </div>
      )}

      <button
        onClick={toggleMute}
        className="absolute top-24 right-4 p-2 bg-black/40 rounded-full z-10"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white" />
        ) : (
          <Volume2 className="w-5 h-5 text-white" />
        )}
      </button>
    </div>
  );
};

export default VideoPlayer;
