import React from 'react';

interface VideoCardProps {
  embedId: string;
  title: string;
}

const VideoCard = ({ embedId, title } : VideoCardProps) => (
  <div className="w-full"> {/* Ensure full width of grid cell */}
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:scale-105 duration-300"> {/* Add h-full */}
      <div className="relative pb-[56.25%] "> {/* 16:9 aspect ratio */}
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded-t-xl "
          src={`https://www.youtube.com/embed/${embedId}?rel=0&showinfo=0&modestbranding=1&controls=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{title}</h3>
      </div>
    </div>
  </div>
);

const YTRefSection = () => {
  const videos = [
    {
      embedId: 'p1iRYnamykw',
      title: 'Understanding Smart Contract Security',
    },
    {
      embedId: '7jgfMa8T8Zc',
      title: 'Blockchain Development Fundamentals',
    },
    {
      embedId: 'IxlG5gnwI0g',
      title: 'Web3 Development Guide',
    },
  ];

  return (
    <section className="bg-white py-16 px-16">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            More of Your Interest
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore these curated videos to deepen your understanding of blockchain technology and smart contract development.
          </p>
        </div>

        {/* Updated grid to ensure equal sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              embedId={video.embedId}
              title={video.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default YTRefSection;