"use client"
import { Hero } from "@/components"
import CustomCursor from "@/components/CustomCursor"

export default function page() {

    

    return (
        <main className="bg-cover overflow-hidden bg-black">        
            <CustomCursor />    
            <Hero/>
            <section>
                <div className="lg:py-5">    
                    <video 
                    autoPlay 
                    loop
                    muted 
                    src="/videos/video-3.mp4" 
                    className="h-[700px] rounded-lg object-cover object-center w-full"
                    />   
                    
                </div>
            </section>
            <h1 className="text-white text-center header mt-12" 
                            style={{filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))',}}>Trace and visualize like an expert
            </h1>
            <p className="text-white text-center lg:py-4">Get the lowest fees, fastest transactions, powerful APIs, and more</p>
            <section className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center mt-20 mb-48" >
                <div className="flex flex-col  justify-center md:flex-1 mb-10 md:mb-0">
                    <div className="flex items-end mb-8">
                        <p className="font-bold text-primary-red text-7xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+15,000</p>
                        <p className="text-white text-2xl ml-4">daily active users.</p>
                    </div>
                    <div className="flex items-end mb-8">
                        <p className="font-bold text-primary-red text-7xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+1,500</p>
                        <p className="text-white text-2xl ml-4">unique tokens tracked.</p>
                    </div>
                    <div className="flex items-end mb-8">
                        <p className="font-bold text-primary-red text-7xl text-shadow-glow-red" style={{ filter: 'drop-shadow(0 0 10px rgba(231, 33, 6, 0.5))' }}>+3,000</p>
                        <p className="text-white text-2xl ml-4">smart contracts analyzed.</p>
                    </div>
                </div> 
                <div className="flex flex-1 items-center justify-center">
                    <video
                        autoPlay
                        loop
                        muted 
                        src="/videos/video-5.mp4"
                        className="h-3/4 w-3/4 rounded-lg object-cover"
                    />
                </div>   

            </section>
            <section className="w-full flex flex-col items-center justify-center">
  <h2 className="text-3xl font-bold text-white mb-6 text-center">More of your interest.</h2>
  <div className="flex flex-wrap justify-center gap-16">
    <div className="w-80 md:w-96 lg:w-[500px] aspect-w-16 aspect-h-9">
      <iframe
        className="rounded-lg"
        width="90%" 
        height="450" 
        src="https://www.youtube.com/embed/p1iRYnamykw?rel=0&showinfo=0&modestbranding=1&controls=1" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      ></iframe>
    </div>

    <div className="w-80 md:w-96 lg:w-[500px] aspect-w-16 aspect-h-9">
      <iframe
        className="rounded-lg"
        width="90%" 
        height="450" 
        src="https://www.youtube.com/embed/7jgfMa8T8Zc?rel=0&showinfo=0&modestbranding=1&controls=1" 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
      ></iframe>
    </div>

    <div className="w-80 md:w-96 lg:w-[500px] aspect-w-16 aspect-h-9">
      <iframe
        className="rounded-lg"
        width="90%" 
        height="450" 
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
