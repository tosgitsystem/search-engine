// FullImageModal.tsx

import { ArrowUpRight, Copy, Download, X } from 'lucide-react';
import React from 'react';
import { Image } from 'react-grid-gallery';

interface FullImageModalProps {
  isOpen: boolean;
  image: Image | null;
  onClose: () => void;
 
}

export const ImageFullView: React.FC<FullImageModalProps> = ({ isOpen, image,onClose }) => {
    // const {closeModal} = useModal();
  if (!isOpen || !image) return null;

  return (
    <div className="fixed  flex items-center justify-center -mt-1 ">
      <div className="bg-white rounded-lg max-w-3xl w-full">
        <div className="flex items-center justify-between pb-4 border-b">
       
       <div className='flex flex-col'>
       <h2 className='font-bold text-base'>Image Name</h2>
       <p className='text-sm text-gray-500'>example.com</p>
       </div>
      
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-center ">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="relative">
          <img src={image.src} alt={ 'Image'} className="w-full h-auto" />
         
           
        </div>
        <div className="p-4 flex flex-col justify-start items-start gap-2">
          <div className="text-sm text-gray-500">
            Images might be subject to copyright
          </div>
          <div className="flex gap-4">
            <button className="text-blue-600 hover:underline"><ArrowUpRight size={32} className=' border rounded-full p-1'/></button>
            <button className="text-blue-600 hover:underline"><Download size={32} className=' border rounded-full p-1'/></button>
            <button className="text-blue-600 hover:underline"><Copy size={32} className=' border rounded-full p-1'/></button>
          </div>
        </div>
      </div>
    </div>
  );
};






