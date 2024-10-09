import React from 'react'

const Video = () => {
  return (
    <section className="xl:px-0">
    <div className="w-full lg:p-5">    
      <video 
        autoPlay 
        loop
        muted 
        src="/videos/video-3.mp4" 
        className="h-[300px] sm:h-[500px] lg:h-[700px] rounded-lg object-cover object-center w-full"
      />
    </div>

    </section>
  )
}

export default Video