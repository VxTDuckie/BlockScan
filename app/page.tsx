"use client"
import Hero from "@/components/section/Hero"

export default function Page() {
    return (
        <main className="bg-cover overflow-hidden bg-black">         
            <Hero/>
            <section className="px-4 xl:px-0">
            <div className="w-full lg:py-5">    
              <video 
                autoPlay 
                loop
                muted 
                src="/videos/video-3.mp4" 
                className="h-[300px] sm:h-[500px] lg:h-[700px] rounded-lg object-cover object-center w-full"
              />
            </div>

            </section>
            <h1 className="text-white text-center header mt-8 xl:mt-[200px] text-2xl sm:text-3xl xl:text-6xl px-4" 
                style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))'}}>
                Trace and visualize like an expert
            </h1>
            <p className="text-white text-center py-2 xl:py-4 xl:text-2xl px-4 text-sm sm:text-base">Get the lowest fees, fastest transactions, powerful APIs, and more</p>
            <section className="max-w-screen-xl mx-auto flex flex-col xl:flex-row items-center justify-between mt-10 xl:mt-20 mb-24 xl:mb-48 px-4 gap-12" >
                <div className="flex flex-col justify-center xl:flex-1 mb-10 xl:mb-0">
                    <div className="flex items-center mb-12">
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+15,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">daily active users.</p>
                    </div>
                    <div className="flex items-center mb-12">
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+1,500</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">unique tokens tracked.</p>
                    </div>
                    <div className="flex items-center mb-12">
                        <p className="font-bold text-primary-red text-5xl sm:text-6xl xl:text-8xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+3,000</p>
                        <p className="text-white text-xl sm:text-2xl xl:text-[27px] font-semibold ml-4">smart contracts analyzed.</p>
                    </div>
                </div> 
                <div className="flex flex-1 items-center justify-center">
                    <video
                        autoPlay
                        loop
                        muted 
                        src="/videos/video-5.mp4"
                        className="h-full w-full xl:h-4/4 xl:w-4/4 rounded-lg object-cover"
                    />
                </div>   
            </section>
            <section className="w-full flex flex-col items-center justify-center px-4 mb-16 xl:py-16">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-12 text-center">More of your interest.</h2>
                <div className="flex flex-wrap justify-center gap-8 xl:gap-16">
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-lg w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
                            src="https://www.youtube.com/embed/p1iRYnamykw?rel=0&showinfo=0&modestbranding=1&controls=1" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-lg w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
                            src="https://www.youtube.com/embed/7jgfMa8T8Zc?rel=0&showinfo=0&modestbranding=1&controls=1" 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="w-full sm:w-80 md:w-96 xl:w-[500px] aspect-w-16 aspect-h-9">
                        <iframe
                            className="rounded-lg w-full h-[200px] sm:h-[250px] md:h-[300px] xl:h-[450px]"
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