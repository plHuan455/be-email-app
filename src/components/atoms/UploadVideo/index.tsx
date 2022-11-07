import { Button } from "@mui/material";
import { ChangeEvent, DragEvent, useRef, useState } from "react";

interface UploadVideoProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onDrop?: (e: DragEvent<HTMLDivElement>) => void
}

function UploadVideo({
  onChange,
  onDrop
}: UploadVideoProps) {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");
  // ref
  const inputRef = useRef<HTMLInputElement>(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFiles = (files: HTMLInputElement) => {
    const TwoGigabytes = 2147483648
    if (files.size > TwoGigabytes) {
      // will display error later
      return
    }
    // console.log(files[0])
    const url = URL.createObjectURL(files[0])
    setVideoSrc(url)
  }

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
      onChange && onChange(e)
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current!.click()
  };

  return (
    <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      {videoSrc &&
        <div className="w-full h-32 preview-container">
          <video src={videoSrc} autoPlay playsInline></video>
          <div className="flex mt-2 justify-center">
            <Button
              variant="contained"
              size="small"
              style={{ background: "#d32f2f" }}
              onClick={() => setVideoSrc("")}
            >
              Close
            </Button>
          </div>
        </div>
      }
      {!videoSrc &&
        <>
          <input ref={inputRef} type="file" accept="video/mp4,video/webm" id="input-file-upload" multiple={false} onChange={e => { onChange && onChange(e); handleChange(e) }} />
          <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
            <div>
              <p>Choose a video to upload</p>
              <p>Or drag and drop a file</p>
              <p>MP4 or WebM</p>
              <p>Resolution 720 x 1280 or above</p>
              <p>10 minutes at max</p>
              <p>Less than 2GB</p>
              <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
            </div>
          </label>
          {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={e => { onDrop && onDrop(e); handleDrop(e) }}></div>}
        </>
      }
    </form>
  );
};

export default UploadVideo