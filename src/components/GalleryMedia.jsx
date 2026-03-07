import { useRef, useState } from "react";

const GalleryMedia = ({ item, alt, loading = "lazy", clickToPlay = false }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  if (item.type === "video") {
    if (clickToPlay) {
      const handleClick = () => {
        const video = videoRef.current;
        if (!video) return;
        if (playing) {
          video.pause();
          setPlaying(false);
        } else {
          video.play();
          setPlaying(true);
        }
      };

      return (
        <div className="relative cursor-pointer overflow-hidden" onClick={handleClick}>
          <video
            ref={videoRef}
            src={item.src}
            playsInline
            preload="metadata"
            className={`w-full object-cover ${item.className || ""}`}
            onEnded={() => setPlaying(false)}
          />
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <video
        src={item.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full object-cover"
      />
    );
  }

  return (
    <img
      src={item.src}
      alt={alt}
      loading={loading}
      decoding="async"
      className="w-full object-cover"
    />
  );
};

export default GalleryMedia;
