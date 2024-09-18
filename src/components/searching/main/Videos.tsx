import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

// Define the type for video data
interface VideoResultProps {
  title: string;
  thumbnail: string;
  description: string;
  source: string;
  channel: string;
  date: string;
 
}

// VideoResult component
const VideoResult: React.FC<VideoResultProps> = ({
  title,
  thumbnail,
  description,
  source,
  channel,
  date,
  
}) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-4">
        <div className="relative flex-shrink-0">
          <img src={thumbnail} alt={title} className="w-40 h-24 object-cover rounded" />
          
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-blue-400 mb-1">{title}</h2>
          <p className="text-sm text-gray-400 mb-2">{description}</p>
          <div className="text-xs text-gray-500">
            {source} · {channel} · {date}
          </div>
        </div>
      </div>
    </div>
  );
};

// Define the type for API response
interface APIVideo {
  title: string;
  thumbnail: string;
  description: string;
  source: string;
  channel: string;
  date: string;

}

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/photos?_start=';

export const Videos: React.FC = () => {
  const [videos, setVideos] = useState<APIVideo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [start, setStart] = useState<number>(0);
  const [limit] = useState<number>(10);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}${start}&_limit=${limit}`);
      const newVideos = response.data.map((item: any) => ({
        title: item.title,
        thumbnail: item.url,
        description: 'Mock description for video',
        source: 'Mock Source',
        channel: 'Mock Channel',
        date: '01 Jan 2024',
        
      }));
      setVideos((prevVideos) => [...prevVideos, ...newVideos]);
      setStart(start + limit);
      if (response.data.length < limit) {
        setHasMore(false);
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading && videos.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto px-4 text-gray-600">
      <div className='p-4 rounded-md border max-w-3xl border-gray-500'>
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchVideos}
          hasMore={hasMore}
          loader={<div>Loading more videos...</div>}
          endMessage={<div>No more videos</div>}
        >
          <div className="space-y-6">
            {videos.map((video, index) => (
              <VideoResult
                key={index}
                title={video.title}
                thumbnail={video.thumbnail}
                description={video.description}
                source={video.source}
                channel={video.channel}
                date={video.date}
               
              />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
