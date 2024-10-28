import React, { useState, useEffect } from "react";
import { Gallery, Image } from "react-grid-gallery";
import { useModal } from "@/src/hooks/useModal";
import { ImageFullView } from "./imageFullView";
import { search } from "@/src/services/search";
import { searchQuery } from "@/src/states/atoms/queryAtom";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

export const ImageGallery = () => {
  const query = useRecoilValue(searchQuery);
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const useUserAgent = () => {
    const [userAgent, setUserAgent] = useState("");

    useEffect(() => {
      setUserAgent(navigator.userAgent);
    }, []);

    return userAgent;
  };

  const userAgent = useUserAgent();
  const isMobile = /Mobile|Android/i.test(userAgent);

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const { openModal, modalStack, closeModal, modalOpen } = useModal();

  const { data: imagesResult, isLoading } = useQuery({
    queryKey: ['images', query, page],
    queryFn: () => search({ type: "images", q: query, page }),
  
  });

  useEffect(() => {
    if (imagesResult?.data?.images) {
      const newImages = transformImages(imagesResult.data.images);
      if (newImages.length === 0) {
        setHasMore(false);
      } else {
        setAllImages(prevImages => [...prevImages, ...newImages]);
      }
    }
  }, [imagesResult]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  interface ApiImage {
    title: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    source: string;
    domain: string;
    link: string;
  }

  const transformImages = (apiImages: ApiImage[]): Image[] => {
    return apiImages?.map((img) => ({
      src: img.imageUrl,
      width: img.imageWidth,
      height: img.imageHeight,
      tags: [{ value: img.link, title: img.title }],
      caption: img.title,
      thumbnailCaption: img.domain,
    }));
  };

  useEffect(() => {
    if (!modalOpen) setSelectedImage(null);
  }, [modalStack, modalOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && !selectedImage && allImages.length > 0) {
        setSelectedImage(allImages[0]);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [allImages, selectedImage]);

  const handleSelect = (index: number) => {
    setSelectedImage(allImages[index]);
    if (isMobile) openModal("image-full-view");
  };

  const handleImageClose = () => {
    closeModal();
    if (!modalOpen) setSelectedImage(null);
  };

  return (
    <div className="flex flex-wrap">
      {isMobile && selectedImage ? (
        <ImageFullView isOpen={modalStack.includes("image-full-view")} image={selectedImage} onClose={handleImageClose} />
      ) : (
        <div className={`flex-1 ${selectedImage ? 'lg:w-3/4' : 'w-full'}`}>
          <InfiniteScroll
            dataLength={allImages.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>You have seen all images</b>
              </p>
            }
          >
            <Gallery
              images={allImages}
              enableImageSelection={true}
              onSelect={handleSelect}
              tagStyle={{ backgroundColor: "rgba(0, 0, 0, 0)", color: "black", marginBottom: 10 }}
              onClick={handleSelect}
            />
          </InfiniteScroll>
        </div>
      )}

      {!isMobile && selectedImage && (
        <div className={`lg:w-[37.33333%] max-h-[1000px] w-full ${selectedImage ? 'block' : 'hidden'} lg:block p-4 border-l border-b`}>
          <div className="bg-white">
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