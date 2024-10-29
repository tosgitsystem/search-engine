import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { search } from "@/src/services/search";
import { refetchQuery, searchQuery } from "@/src/states/atoms/queryAtom";

interface VideoItem {
  title: string;
  imageUrl: string;
  snippet: string;
  source: string;
  channel: string;
  date: string;
  duration: string;
  link: string;
}

export const VideosResult: React.FC = () => {
  const query = useRecoilValue(searchQuery);
  const [page, setPage] = useState(1);
  const [allVideos, setAllVideos] = useState<VideoItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refetchData, setRefetchData] = useRecoilState(refetchQuery);

  // Fetch videos based on the current page and query
  const { data: videoResult, isLoading, refetch } = useQuery({
    queryKey: ['videos', query, page],
    queryFn: () => search({ type: "videos", q: query, page }),
  });

  // Handle refetch on query or page change
  useEffect(() => {
    if (refetchData) {
      setAllVideos([]); // Clear existing videos
      setPage(1); // Reset page to 1
      setHasMore(true); // Reset the "hasMore" state
      refetch(); // Trigger refetch
      setRefetchData(false); // Reset the refetch flag
    }
  }, [refetchData, refetch, setRefetchData]);

  // Append new videos to the state when the video results change
  useEffect(() => {
    if (videoResult?.data?.videos) {
      const newVideos = videoResult.data.videos;
      if (newVideos.length === 0) {
        setHasMore(false);
      } else {
        setAllVideos(prevVideos => [...prevVideos, ...newVideos]);
      }
    }
  }, [videoResult]);

  // Load more videos when scrolling
  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="mx-auto px-4 text-gray-600">
      <div className="p-4 rounded-2xl border max-w-3xl border-gray-200">
        <InfiniteScroll
          dataLength={allVideos.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen all videos</b>
            </p>
          }
        >
          <div className="space-y-6">
            {allVideos.map((video, index) => (
              <div key={index} className="mb-6">
                <div className="flex space-x-4">
                  <div className="relative flex-shrink-0">
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={video.imageUrl}
                        alt={video.title}
                        className="w-36 md:w-40 h-24 object-cover rounded"
                      />
                      <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </a>
                  </div>
                  <div className="flex-grow">
                    <a href={video.link} target="_blank" rel="noopener noreferrer">
                      <h2 className="text-sm md:text-lg font-semibold text-blue-400 mb-1">
                        {video.title}
                      </h2>
                    </a>
                    <p className="hidden md:block text-sm text-gray-400 mb-2">{video.snippet}</p>
                    <div className="text-xs text-gray-500">
                      {video.source} · {video.channel} · {video.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};
