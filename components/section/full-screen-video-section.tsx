import React from 'react'

const Video = () => {
  return (
    <section className="hidden lg:flex xl:px-0 z-50 relative">
    <div className="w-full ">    
      <video 
        autoPlay 
        loop
        muted 
        src="/videos/video-3.mp4" 
        className="h-[300px] sm:h-[500px] lg:h-[1000px] rounded-lg object-cover object-center w-full"
      />
    </div>

    </section>
  )
}

export default Video