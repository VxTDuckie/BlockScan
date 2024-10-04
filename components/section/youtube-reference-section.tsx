import React from 'react'

const YTRefSection = () => {
  return (
    <main>
                    <section className="w-full flex flex-col items-center justify-center px-4 mb-16 xl:py-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center">More of your interest.</h2>
                <div className="flex flex-wrap justify-center gap-8 xl:gap-16">
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-xl w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
                            src="https://www.youtube.com/embed/p1iRYnamykw?rel=0&showinfo=0&modestbranding=1&controls=1" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-xl w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
                            src="https://www.youtube.com/embed/7jgfMa8T8Zc?rel=0&showinfo=0&modestbranding=1&controls=1" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-xl w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
                            src="https://www.youtube.com/embed/IxlG5gnwI0g?rel=0&showinfo=0&modestbranding=1&controls=1" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                </div> 
            </section>
    </main>
  )
}

export default YTRefSection