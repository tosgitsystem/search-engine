import React, { useState, useEffect } from "react";
import { Gallery, Image } from "react-grid-gallery";
import { useModal } from "@/src/hooks/useModal";
import { ImageFullView } from "./imageFullView";
import { search } from "@/src/services/search";
import { refetchQuery, searchQuery } from "@/src/states/atoms/queryAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader2 } from "lucide-react";

interface ApiImage {
  title: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  source: string;
  domain: string;
  link: string;
}

export const ImageGallery = () => {
  const query = useRecoilValue(searchQuery);
  const [page, setPage] = useState(1);
  const [allImages, setAllImages] = useState<Image[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refetchData, setRefetchData] = useRecoilState(refetchQuery);

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

  const { data: imagesResult, isLoading, refetch } = useQuery({
    queryKey: ["images", page],
    queryFn: () => search({ type: "images", q: query, page }),
  });

  const transformImages = (apiImages: ApiImage[]): Image[] => {
    return apiImages?.map((img) => ({
      src: img.imageUrl,
      width: img.imageWidth,
      height: img.imageHeight,
      tags: [{ value: img.link, title: img.title }],
      caption: img.title,
      thumbnailCaption: img.domain,
      source: img.source,  // Add source field
      link: img.link,       // Add link field
    }));
  };

  useEffect(() => {
    if (imagesResult?.data?.images) {
      const newImages = transformImages(imagesResult.data.images);
      if (newImages.length === 0) {
        setHasMore(false);
      } else {
        setAllImages((prevImages) => [...prevImages, ...newImages]);
      }
    }
  }, [imagesResult]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
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

  // Refetch handling
  useEffect(() => {
    if (refetchData) {
      setAllImages([]); // Reset all images to avoid duplicated results
      setPage(1); // Reset page to fetch from start
      setHasMore(true); // Ensure pagination works again
      refetch(); // Refetch data
      setRefetchData(false); // Reset refetch state
    }
  }, [refetchData, refetch, setRefetchData]);

  return (
    <div className="flex flex-wrap">
      {isMobile && selectedImage ? (
        <ImageFullView
          isOpen={modalStack.includes("image-full-view")}
          image={selectedImage}
          onClose={handleImageClose}
        />
      ) : (
        <div className={`flex-1 ${selectedImage ? "lg:w-3/4" : "w-full"}`}>
          <InfiniteScroll
            dataLength={allImages.length}
            next={loadMore}
            hasMore={hasMore}
            loader={ <div className="absolute top-1/2 left-1/2"><Loader2 className="animate-spin"/></div>  }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>You have seen all images</b>
              </p>
            }
          >
            <Gallery
              images={allImages}
              enableImageSelection={true}
              onSelect={handleSelect}
              tagStyle={{
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "black",
                marginBottom: 10,
              }}
              onClick={handleSelect}
            />
          </InfiniteScroll>
        </div>
      )}

      {!isMobile && selectedImage && (
        <div
          className={`lg:w-[37.33333%] sticky max-h-[1000px] w-full ${
            selectedImage ? "block" : "hidden"
          } lg:block p-4 pt-0 border-l border-b`}
        >
          <div className="bg-white fixed">
            <h2 className="text-lg font-bold mb-4">Selected Image Info</h2>
            <img
              src={selectedImage.src}
              alt={`selected-${selectedImage.caption}`}
              className="w-full h-auto mb-4 rounded-lg max-h-[400px]"
            />
            <div className="text-sm text-gray-500">
              <p><strong>Title:</strong> {selectedImage.caption || "Unknown"}</p>
              {/* <p><strong>Source:</strong> {selectedImage.source || "Unknown"}</p> */}
              <p><strong>Domain:</strong> {selectedImage.thumbnailCaption || "Unknown"}</p>
              {/* <p><strong>Link:</strong> <a href={selectedImage.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">{selectedImage.link || "Unknown"}</a></p> */}
              <p><strong>Width:</strong> {selectedImage.width}px</p>
              <p><strong>Height:</strong> {selectedImage.height}px</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
