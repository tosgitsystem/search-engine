import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2 } from 'lucide-react';

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
          <img src={thumbnail} alt={title} className=" w-36  md:w-40 h-24 object-cover rounded" />
          
        </div>
        <div className="flex-grow">
          <h2 className="text-sm md:text-lg font-semibold text-blue-400 mb-1">{title}</h2>
          <p className=" hidden md:block text-sm text-gray-400 mb-2">{description}</p>
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
      const newVideos = response.data.map((item: { title: string; url: string }) => ({
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading && videos.length === 0) return <div><Loader2 className='animate-spin absolute top-1/2 left-1/2'/></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mx-auto px-4 text-gray-600">
      <div className='p-4 rounded-2xl border max-w-3xl border-gray-200'>
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
