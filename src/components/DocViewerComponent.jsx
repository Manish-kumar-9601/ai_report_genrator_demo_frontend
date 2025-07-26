import { useRef } from "react";
import { renderAsync } from "docx-preview";
export const DocViewerComponent = ({ file }) => {
  const viewerRef = useRef(null);
  if (!file) {
    console.error("No file provided to DocViewerComponent");
    return;
  }
  renderAsync(file["data"], viewerRef.current).catch(() => {
    console.error("Error rendering document");
  });
  return (
    <div
      ref={viewerRef}
      style={{
        border: "1px solid #ccc",
        height: "500px",
        overflow: "scroll",
      }}
    ></div>
  );
};
