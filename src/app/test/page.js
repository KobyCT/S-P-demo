"use client";

export default function Test() {
  return (
    <button
      onClick={() => {
        alert("clicked");
        console.log("clicked");
      }}
    >
      Click Me
    </button>
  );
}
