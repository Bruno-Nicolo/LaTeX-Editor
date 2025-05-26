export function PdfViewer(props: { style: string; layoutMode: string }) {
  return (
    <iframe
      src="prova.html"
      className={`${props.style} h-full`}
      title="Pdf Preview"
      onMouseEnter={() => {
        if (props.layoutMode == "DynamicSplit") {
          const iframe = document.querySelector("iframe");
          iframe?.classList.remove("closingAnimation");
          iframe?.classList.add("openingAnimation");
        }
      }}
      onMouseLeave={() => {
        if (props.layoutMode == "DynamicSplit") {
          const iframe = document.querySelector("iframe");
          iframe?.classList.remove("openingAnimation");
          iframe?.classList.add("closingAnimation");
        }
      }}
    />
  );
}
