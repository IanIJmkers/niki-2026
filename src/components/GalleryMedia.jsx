const GalleryMedia = ({ item, alt, loading = "lazy" }) => {
  if (item.type === "video") {
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
