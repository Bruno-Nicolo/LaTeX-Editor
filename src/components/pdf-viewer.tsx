export function PdfViewer(props: { layoutMode: string }) {
  return (
    <iframe
      src="prova.html"
      className={`w-full h-full`}
      title="Pdf Preview"
      onMouseEnter={() => {
        const iframe = document.querySelector("iframe");
        if (props.layoutMode == "DynamicSplit") {
          iframe?.classList.remove("closingAnimation");
          iframe?.classList.add("openingAnimation");
        } else if (props.layoutMode == "Overlap") {
          iframe?.classList.remove("z-1");
          iframe?.classList.add("z-[100]");
        }
      }}
      onMouseLeave={() => {
        const iframe = document.querySelector("iframe");
        if (props.layoutMode == "DynamicSplit") {
          iframe?.classList.remove("openingAnimation");
          iframe?.classList.add("closingAnimation");
        } else if (props.layoutMode == "Overlap") {
          iframe?.classList.remove("z-[100]");
          iframe?.classList.add("z-1");
        }
      }}
    />
  );
}
