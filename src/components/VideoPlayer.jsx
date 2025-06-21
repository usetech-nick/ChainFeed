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
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
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

      <div className="absolute bottom-24 left-4 right-16 text-white z-10">
        <div className="text-blue-400 font-medium text-sm">{video.hashtag}</div>
        <div className="flex items-center gap-2">
          <div className="font-semibold text-base">{video.userName}</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFollowing(!isFollowing);
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

      <div className="absolute top-1/3 right-3 flex flex-col items-center space-y-5 z-12">
        <div className="flex flex-col items-center">
          <button
            onClick={toggleLike}
            className="transition-transform duration-200 active:scale-90"
          >
            <Heart
              className={`w-7 h-7 transition-colors duration-300 ${
                isLiked ? "text-red-500 fill-red-500" : "text-white"
              }`}
            />
          </button>
          <span className="text-white text-xs mt-1">{likes}</span>
        </div>

        <div className="flex flex-col items-center">
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="text-white text-xs mt-1">{video.comments}</span>
        </div>

        <div className="flex flex-col items-center">
          <Share className="w-7 h-7 text-white" />
          <span className="text-white text-xs mt-1">{video.shares}</span>
        </div>
        <div className="flex flex-col items-center">
          <IndianRupee className="w-7 h-7 text-white" />
          <span className="text-white text-xs font-medium">
            {video.earnings}
          </span>
        </div>
        <button>
          <MoreHorizontal className="w-7 h-7 text-white" />
        </button>
      </div>

      {video.isPaid && (
        <div className="absolute bottom-28 right-3 border border-yellow-400 text-yellow-400 text-xs px-2 py-0.5 rounded-full z-10">
          Paid
        </div>
      )}

      <button
        onClick={toggleMute}
        className="absolute top-20 right-4 p-2 bg-black/40 rounded-full z-10"
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
