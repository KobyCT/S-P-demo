import Image from "next/image";
import bg from "./background.png";
import fg from "./foreground.png";

export default function LayeredImages() {
  return (
    <div className="relative w-[500px] h-[500px]">
      <Image
        src={bg}
        alt="Background"
        width={500}
        height={500}
        className="absolute top-0 left-0 z-0"
      />

      <Image
        src={fg}
        alt="Foreground"
        width={500}
        height={500}
        className="absolute top-0 left-0 z-10"
      />
    </div>
  );
}
