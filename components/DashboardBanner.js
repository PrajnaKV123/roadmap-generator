

export default function DashboardBanner() {
  return (

      <div className="  bg-gradient-to-r from-[#F5E6D3] to-[#EFE2D1]  shadow-lg overflow-hidden">

        <div className="grid lg:grid-cols-2  gap-5 items-center p-8 sm:p-10 md:p-14">

          {/* Left Content */}
          <div>
            <p className="text-[#8B5E3C] text-lg font-semibold mb-3">
              Welcome to PathMind
            </p>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#622304] leading-tight mb-6"
              style={{ fontFamily: " serif" }}
            >
              Where Learning<br />
              Meets Intelligence
            </h1>

            <div className="w-20 h-1 bg-[#C49A6C] rounded-full mb-6"></div>

            <p className="text-[#5C4435] text-base sm:text-lg leading-relaxed max-w-xl">
              PathMind helps you discover personalized learning roadmaps
              tailored to your goals. Learn smarter, stay focused,
              and achieve more with AI guidance at every step.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src="/eduction-banner.png"
              alt="Digital Education"
              className="w-full max-w-xl object-contain rounded-full"
            />
          </div>

        </div>
      </div>
  
  );
}