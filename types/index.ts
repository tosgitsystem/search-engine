export interface SearchResult {
    searchParameters?: {
      q?: string;
      gl?: string;
      hl?: string;
      autocorrect?: boolean;
      page?: number;
      type?: string;
    };
    knowledgeGraph?: {
      title?: string;
      type?: string;
      website?: string;
      imageUrl?: string;
      description?: string;
      descriptionSource?: string;
      descriptionLink?: string;
      attributes?: {
        Headquarters?: string;
        CEO?: string;
        Founded?: string;
        Sales?: string;
        Products?: string;
        Founders?: string;
        Subsidiaries?: string;// To allow for any additional attributes
      };
    };
    organic?: {
      title?: string;
      link?: string;
      snippet?: string;
      sitelinks?: {
        title?: string;
        link?: string;
      }[];
      position?: number;
      date?: string; // Optional, as not all results have a date
      attributes?: { [key: string]: string }; // Optional, for dynamic attributes
    }[];
    peopleAlsoAsk?: {
      question?: string;
      snippet?: string;
      title?: string;
      link?: string;
    }[];
    relatedSearches?: {
      query?: string;
    }[];
  }
  

  export interface Video {
    title: string;
    link: string;
    snippet: string;
    imageUrl: string;
    duration: string;
    source: string;
    channel: string;
    date: string;
    position: number;
  }


  export interface INews {
    title: string;
    link: string;
    snippet: string;
    date: string;
    source: string;
    imageUrl?: string;  // Optional, in case some news doesn't have an image
    position: number;
  }
  


  export interface Image {
    title: string;
    imageUrl: string;
    imageWidth: number;
    imageHeight: number;
    thumbnailUrl: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    source: string;
    domain: string;
    link: string;
    googleUrl: string;
    position: number;
  }