import React from 'react';

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: GalleryImage | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, image }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="w-1/3 fixed top-30 right-0 h-full bg-white border-l border-gray-300 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        &times;
      </button>
      <div className="flex flex-col h-full p-4">
        <img src={image.original} alt={image.caption} className="w-full h-auto mb-4" />
        <div>
          <p className="text-lg font-semibold">{image.caption}</p>
          <p className="text-sm text-gray-600">{`Dimensions: ${image.width} x ${image.height}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
