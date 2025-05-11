
const Gallery = ({ images }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => (
        <div 
          key={index} 
          className={`
            rounded-lg overflow-hidden shadow-md
            ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
          `}
        >
          <img
            src={image || "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover aspect-[4/3]"
            onError={(e) => {
              // Fallback to a placeholder image if the original fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
