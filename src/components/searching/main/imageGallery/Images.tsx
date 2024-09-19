import React, { useState, useEffect,} from "react";
import { Gallery, Image } from "react-grid-gallery";
import { images as IMAGES } from "../../../../data/images"; // Import your images array
import { useModal } from "@/src/hooks/useModal";
import { ImageFullView } from "./imageFullView";

export default function App() {

// Function to check if the device is mobile
const useUserAgent = () => {
  const [userAgent, setUserAgent] = useState("");

  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);

  return userAgent;
};

const userAgent = useUserAgent();

const isMobile = /Mobile|Android/i.test(userAgent);

  const [images] = useState<Image[]>(IMAGES);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
const {openModal,modalStack,closeModal,modalOpen} = useModal();
  
useEffect(() => {
  console.log("modalopen in effect", !modalOpen)
  console.log("modalstack in effect 2", modalOpen)
  {!modalOpen && setSelectedImage(null)}
  
},[modalStack,modalOpen])

// Set default selected image on large screens



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !selectedImage) {
        setSelectedImage(images[0]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [images, selectedImage]);

  const handleSelect = (index: number) => {
   
    setSelectedImage(images[index]);
    {isMobile && openModal("image-full-view")}
   
  };


const handleImageClose = () => {

  console.log("close image")
closeModal();
console.log("modalopen", !modalOpen)
{!modalOpen && setSelectedImage(null)}

}


  return (
    <div className="flex flex-wrap ">
      {/* Image grid */}


      {isMobile && selectedImage ? (

<ImageFullView isOpen={modalStack.includes("image-full-view")}  image={selectedImage} onClose={handleImageClose} />
)   : (
  <div className={`flex-1 ${selectedImage ? 'lg:w-3/4' : 'w-full'} `}>
    <Gallery
      images={images}
      enableImageSelection={true}
      onSelect={handleSelect}

      onClick={handleSelect}
    />
  </div>)                                             }




      {/* Selected image details */}
      {!isMobile && selectedImage && (
        <div className={`lg:w-1/3 max-h-[1000px] w-full ${selectedImage ? 'block' : 'hidden'} lg:block p-4 border-l border-b`}>
          <div className="bg-white   ">
            <h2 className="text-lg font-bold mb-4">Selected Image Info</h2>
            <img
              src={selectedImage.src}
              alt={`selected-${selectedImage.caption}`}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <div className="text-sm text-gray-500">
              <p><strong>Source:</strong> {selectedImage.caption || 'Unknown'}</p>
              <p><strong>Width:</strong> {selectedImage.width}px</p>
              <p><strong>Height:</strong> {selectedImage.height}px</p>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
