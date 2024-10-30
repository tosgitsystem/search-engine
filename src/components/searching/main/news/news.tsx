import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { search } from "@/src/services/search";
import { refetchQuery, searchQuery } from "@/src/states/atoms/queryAtom";
import { Calendar, Globe, Loader2 } from "lucide-react";


export const NewsPage = () => {
  const query = useRecoilValue(searchQuery);
  const [page, setPage] = useState(1);
  interface NewsArticle {
    source: string;
    date: string;
    link: string;
    title: string;
    snippet: string;
    imageUrl?: string;
  }

  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [refetchData, setRefetchData] = useRecoilState(refetchQuery);

  const { data: newsResult, isLoading,refetch } = useQuery({
    queryKey: ['news', page],
    queryFn: () => search({ type: "news", q: query, page }),

  });

  useEffect(() => {
    if (newsResult?.data?.news) {
      const newNews = newsResult.data.news;
      if (newNews.length === 0) {
        setHasMore(false);
      } else {
        setAllNews(prevNews => [...prevNews, ...newNews]);
      }
    }
  }, [newsResult]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  if (refetchData) {
    refetch();
    console.log("refetching")
    setRefetchData(false);
  }


  return (
    <InfiniteScroll
    dataLength={allNews.length}
    next={loadMore}
    hasMore={hasMore}
    loader={<div className="absolute top-1/2 left-1/2"><Loader2 className="animate-spin"/></div> }
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>You have seen all news</b>
      </p>
    }
    className="px-3"
  >
      <div className="py-4 md:pr-4 border rounded-2xl ">
        {allNews.map((article, index) => (
          <div key={index} className="flex items-center py-4 px-1 bg-white">
            <div className="flex-grow">
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="w-4 h-4 mr-1" />
                <span className="mr-4">{article.source}</span>
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-nowrap">{article.date}</span>
              </div>
              <h3 className="text-base font-base md:font-medium text-blue-500 mb-1">
                <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
              </h3>
              <p className="hidden md:block text-gray-400 text-xs">{article.snippet}</p>
            </div>
            {article.imageUrl && (
              <div>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-[50px] max-w-[72px] rounded-md"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};
