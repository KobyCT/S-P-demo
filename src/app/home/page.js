import bg from "../asset/bg.avif";
import banner from "../asset/ctc-banner.jpg";
import First from "../components/first";
import { Itim } from "next/font/google";

const font = Itim({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className={font.className}>
      {/* 1. Parent container must be relative and have a height/width */}
      <div
        className="relative w-full h-screen"
        style={{
          backgroundImage: `url(${bg.src})`,
          backgroundRepeat: "repeat-y",
          backgroundSize: "auto",
          backgroundPosition: "center 0",
        }}
      >
        {/* Center-bottom logo */}
        <img
          src={banner.src}
          alt="ctc banner"
          className="absolute left-1/2 bottom-6 transform -translate-x-1/2 z-50 w-20"
        />
        {/* Content overlay */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: "rgba(237, 224, 220, 0.3)",
            zIndex: 20,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "10vw",
              right: "10vw",
              top: 0,
              bottom: 0,
              backgroundColor: "rgba(252, 214, 193, 0.3)", // code for #fcd6c1 with 30% opacity
              zIndex: 30,
              "@media (orientation: landscape)": {
                left: "30vw",
                right: "30vw",
              },
            }}
          >
            <div></div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <First />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
