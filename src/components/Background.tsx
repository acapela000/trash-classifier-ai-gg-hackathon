'use client'

export default function Background() {
    return (
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-100 
                      bg-custom-linear bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 
                        bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
    );
  }
  
  