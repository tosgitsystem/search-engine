'use client';
import React, { useEffect, useState } from 'react';
import { All,  ImageGallery,  LargeHeader, Main, VideosResult } from '../components';

import { useModal } from '../hooks/useModal';
import {  NewsPage } from '../components/searching/main/news/news';









export const Search: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const {closeModal} = useModal();

  

  useEffect(() => {

closeModal();
  }, []);

 
  const renderContent = () => {
    switch (activeTab) {
      case 'All':
        return <All  />;
      case 'Images':
        return <ImageGallery />;
        case 'News':
          return <NewsPage />;
      case 'Videos':
        return <VideosResult />;
      default:
        return <All />;
    }
  };

  return (
    <div className="min-h-screen min-w-screen  bg-white">
      <LargeHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className={`relative z-10 mt-2  ${activeTab === 'Images' ? " md:pl-56 pr-2" : "md:pl-[14rem] md:pr-[18rem]   lg:pl-[14rem] lg:pr-[20rem] xl:pr-[29rem]"}`}>
        <Main renderContent={renderContent} />
      </div>
    </div>
  );
};
