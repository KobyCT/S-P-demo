import bg from "../asset/bg.avif";

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
          backgroundColor: "rgba(237, 224, 220, 0.3)", //code for #ede0dc with 60% opacity
          zIndex: 20,
        }}
      >
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-4xl font-bold">Hello World</h1>
        </div>
      </div>
    </div>
  );
}
