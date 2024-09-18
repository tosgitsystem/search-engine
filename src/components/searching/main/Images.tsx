'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import InfiniteScroll from 'react-infinite-scroll-component';
import Modal from './Model'; // Ensure the import path is correct

interface GalleryImage {
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption?: string;
  original: string;
  width: number;
  height: number;
}

interface APIImage {
  id: string;
  author: string;
  download_url: string;
  width: number;
  height: number;
}

const API_URL = 'https://picsum.photos/v2/list?page=';

const isNotComputerImage = (caption?: string) => {
  return !caption?.toLowerCase().includes('computer');
};

export const Images: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchImages = async (pageNumber: number) => {
    try {
      const response = await axios.get(`${API_URL}${pageNumber}`);
      const data: APIImage[] = response.data;

      if (data.length === 0) {
        setHasMore(false);
      }

      const galleryImages: GalleryImage[] = data
        .filter(image => isNotComputerImage(image.author))
        .map((image) => ({
          src: image.download_url,
          thumbnail: image.download_url,
          thumbnailWidth: image.width,
          thumbnailHeight: image.height,
          caption: image.author,
          original: image.download_url,
          width: image.width,
          height: image.height
        }));

      setImages((prevImages) => [...prevImages, ...galleryImages]);

      if (galleryImages.length > 0) {
        setSelectedImage(galleryImages[0]);
        setIsModalOpen(true);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (loading && page === 1) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex h-screen w-3/4'>
      <div className='flex-1 overflow-auto p-2'>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<div className="text-center">Loading more images...</div>}
          endMessage={<div className="text-center">No more images</div>}
        >
          <div className="grid grid-cols-3 gap-4" style={{ height: 'calc(100vh - 16px)' }}>
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className={`relative cursor-pointer ${selectedImage === image ? 'border-4 border-blue-500' : ''}`}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};
