import { Calendar, Globe } from "lucide-react"

// Dummy data
const articles = [
  {
    icon: "🔵",
    title: "Algoritma x KitaLulus DSPE - Algoritma",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "algoritma.ma",
    date: "September 4, 2023",
  },
  {
    icon: "🔷",
    title: "Open Enterprise Server | OpenText",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "microfocus.com",
    date: "July 15, 2021",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🌐",
    title: "Indesit DSFE 1B10 UK N Dishwasher - White | Sirius Buying Group",
    source: "siriusbuyinggroup.co.uk",
    date: "June 30, 2021",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🔵",
    title: "DFWh-What prices should be. Great deals up to 90% off retail",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "dfwh.com",
    date: "September 11, 2020",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🟠",
    title: "OCP Blesses AT&T's Disaggregated Security Architecture Push - SDxCentral",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "sdxcentral.com",
    date: "March 6, 2020",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🔵",
    title: "Algoritma x KitaLulus DSPE - Algoritma",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "algoritma.ma",
    date: "September 4, 2023",
  },
  {
    icon: "🔷",
    title: "Open Enterprise Server | OpenText",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "microfocus.com",
    date: "July 15, 2021",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🌐",
    title: "Indesit DSFE 1B10 UK N Dishwasher - White | Sirius Buying Group",
    source: "siriusbuyinggroup.co.uk",
    date: "June 30, 2021",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🔵",
    title: "DFWh-What prices should be. Great deals up to 90% off retail",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "dfwh.com",
    date: "September 11, 2020",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    icon: "🟠",
    title: "OCP Blesses AT&T's Disaggregated Security Architecture Push - SDxCentral",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "sdxcentral.com",
    date: "March 6, 2020",
    image: "/placeholder.svg?height=50&width=50",
  },
]

export const News = () =>  {
  return (
    <div className="max-w-2xl py-4 md:pr-4 border rounded-md">
      {articles.map((article, index) => (
        <div
          key={index}
          className={`flex items-center py-4 px-1 bg-white`}
        >
          <div className="flex-shrink-0 mr-4">
        
          </div>
          <div className="flex-grow">
          <div className="flex items-center text-sm text-gray-500">
              <Globe className="w-4 h-4 mr-1" />
              <span className="mr-4">{article.source}</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-nowrap">{article.date}</span>
            </div>
            <h3 className="text-base font-base md:font-medium text-blue-500 mb-1">
              {article.title}
            </h3>
            <p className="hidden md:block text-gray-400  text-xs">
                {article.description}
            </p>
         
          </div>
          <div >
        <img src="https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg" className="h-[50px] max-w-[72px] rounded-md"/>
      </div>
        </div>
      ))}
      
    </div>
  )
}