
import { useEffect, useRef } from 'react';
import { animateLetters } from '@/utils/animationUtils';

const Index = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Handle letter animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && textRef.current) {
            // Start the letter animation when the element is in view
            animateLetterByLetter(textRef.current);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (textRef.current) {
      observer.observe(textRef.current);
    }
    
    // Handle scroll wheel to horizontal scroll conversion
    const handleWheel = (event: WheelEvent) => {
      if (scrollContainerRef.current) {
        // Only control horizontal scroll while in the horizontal section
        const scrollContainer = scrollContainerRef.current;
        const containerRect = scrollContainer.getBoundingClientRect();
        const isInViewport = containerRect.top < window.innerHeight && containerRect.bottom > 0;
        
        // Only prevent default if we're in the horizontal section and not at the end
        if (isInViewport) {
          const isAtEnd = scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10;
          if (!isAtEnd) {
            event.preventDefault();
            scrollContainer.scrollLeft += event.deltaY;
          }
        }
      }
    };
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel);
    }
    
    return () => {
      if (textRef.current) observer.unobserve(textRef.current);
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);
  
  // Custom animation function to animate letters one by one
  const animateLetterByLetter = (element: HTMLElement) => {
    const text = "STUDENT NETWORK";
    element.textContent = "";
    
    // Create container for letters
    const letterContainer = document.createElement("div");
    letterContainer.className = "flex space-x-1 md:space-x-2 font-cursive";
    element.appendChild(letterContainer);
    
    // Add each letter as a separate element
    text.split('').forEach((letter, index) => {
      const span = document.createElement("span");
      span.textContent = letter === " " ? "\u00A0" : letter; // Use non-breaking space for actual spaces
      span.className = "text-4xl md:text-7xl lg:text-9xl font-cursive transform translate-y-full opacity-0 transition-all duration-500";
      span.style.transitionDelay = `${index * 120}ms`;
      letterContainer.appendChild(span);
      
      // Trigger animation after a small delay
      setTimeout(() => {
        span.classList.remove("translate-y-full", "opacity-0");
        span.classList.add("translate-y-0", "opacity-100");
      }, 100);
    });
  };
  
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Horizontal scrolling section */}
      <div className="relative h-screen overflow-hidden">
        <div 
          ref={containerRef}
          className="absolute inset-0 flex items-center"
        >
          <div 
            ref={scrollContainerRef}
            className="w-screen h-screen overflow-x-auto overflow-y-hidden scrollbar-hide horizontal-scroll"
          >
            <div className="h-screen flex items-center px-6 min-w-[200vw]">
              <div className="flex items-center h-full">
                {/* First section - animated text */}
                <div className="min-w-screen h-full flex items-center justify-center">
                  <div 
                    ref={textRef}
                    className="overflow-hidden"
                  >
                    {/* Text will be injected here by the animation */}
                  </div>
                </div>
                
                {/* Second section - content */}
                <div className="min-w-screen h-full flex items-center justify-center px-6">
                  <div className="max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect. Collaborate. Create.</h2>
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                      Join the premier platform for students to network, share ideas, and build meaningful connections
                      across universities and disciplines.
                    </p>
                    <button className="btn-primary">Get Started</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="text-sm text-muted-foreground flex items-center">
              <span>Scroll down to navigate</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 animate-bounce"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional vertical content section */}
      <div className="min-h-screen bg-background flex flex-col items-center justify-center py-20 px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center">Continue Exploring</h2>
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-muted p-6 rounded-lg animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Student Resources</h3>
            <p className="text-muted-foreground mb-4">Access a wealth of materials to support your academic journey.</p>
            <button className="btn-secondary">Explore Resources</button>
          </div>
          <div className="bg-muted p-6 rounded-lg animate-fade-in animate-delay-100">
            <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
            <p className="text-muted-foreground mb-4">Stay connected with networking events and workshops.</p>
            <button className="btn-secondary">View Calendar</button>
          </div>
          <div className="bg-muted p-6 rounded-lg animate-fade-in animate-delay-200">
            <h3 className="text-2xl font-bold mb-4">Study Groups</h3>
            <p className="text-muted-foreground mb-4">Join or create study groups with students from around the world.</p>
            <button className="btn-secondary">Find Groups</button>
          </div>
          <div className="bg-muted p-6 rounded-lg animate-fade-in animate-delay-300">
            <h3 className="text-2xl font-bold mb-4">Career Development</h3>
            <p className="text-muted-foreground mb-4">Prepare for your future with internship and job opportunities.</p>
            <button className="btn-secondary">Career Center</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
