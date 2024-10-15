import React from 'react' // Importing React to create a functional component.

// Functional component for displaying a full-screen video section.
const Video = () => {
  return (
    // Section for video display, hidden on smaller screens (lg:hidden).
    <section className="hidden lg:flex xl:px-0 z-50 relative">
      <div className="w-full">
        {/* Video element that plays automatically, loops, and is muted */}
        <video 
          autoPlay 
          loop
          muted 
          src="/videos/video-3.mp4" // Source of the video file.
          className="h-[300px] sm:h-[500px] lg:h-[1000px] rounded-lg object-cover object-center w-full" // Responsive height and styling.
        />
      </div>
    </section>
  )
}

// Exporting the Video component to be used in other parts of the application.
export default Video
