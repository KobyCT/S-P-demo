import bg from "../asset/bg.avif";
import First from "../components/first";
export default function Home() {
  return (
    // 1. Parent container must be relative and have a height/width
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "auto",
        backgroundPosition: "center 0",
      }}
    >
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
        <div style={{
          position: "absolute",
          left: "10vw",
          right: "10vw",
          top: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 224, 220, 0.3)",
          zIndex: 30,
          "@media (orientation: landscape)": {
            left: "30vw",
            right: "30vw",
          }
        }} >
          <div>
            <image className=""/>
          </div>
          <div className="relative z-10 flex items-center justify-center h-full">
            <First />
          </div>
        </div>
      </div>
    </div>
  );
}