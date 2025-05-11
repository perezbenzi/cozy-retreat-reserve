
const Gallery = ({ images }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div 
          key={index} 
          className={`
            rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105
            ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
          `}
        >
          <img
            src={image}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-full object-cover aspect-[4/3]"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
