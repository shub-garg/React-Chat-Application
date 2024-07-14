import { useRef, useEffect } from "react";
import "./camera.css"; // Add CSS for the camera modal

const Camera = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Failed to open camera:", err);
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      onCapture(new File([blob], "photo.jpg", { type: "image/jpeg" }));
    }, "image/jpeg");
  };

  return (
      <div className="camera-content">
        <video ref={videoRef} autoPlay></video>
        <button onClick={handleCapturePhoto}>Capture Photo</button>
        <button onClick={onClose}>Close Camera</button>
      </div>
  );
};

export default Camera;
