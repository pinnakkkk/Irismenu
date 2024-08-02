import {trackGazeInteraction} from "./gazeInteractions.js";

let camera = null;
let faceMesh = null;
let isIrisTracking = false;
let videoElement = null;
let cursor = null;

// Variables to be initialized at runtime
let prevX = 0,
  prevY = 0;
let sensitivity = 2;
let baseX = 0,
  baseY = 0;
let isCalibrated = false;
let minX = 1,
  maxX = 0,
  minY = 1,
  maxY = 0;
const calibrationFrames = 60;
let calibrationCount = 0;

// Function to initialize and start the camera
function initializeCamera() {
  if (!faceMesh) {
    initializeFaceMesh();
  }

  camera = new Camera(videoElement, {
    onFrame: async () => {
      await faceMesh.send({ image: videoElement });
    },
    width: 1280,
    height: 720,
  });
  camera.start();
}

// Function to stop and clean up the camera
function stopCamera() {
  if (camera) {
    camera.stop();
    camera = null; // Clear the camera instance
    console.log("Camera stopped");
  }
}

// Function to initialize FaceMesh
function initializeFaceMesh() {
  faceMesh = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMesh.onResults((results) => {
    onResults(results);
  });
}

// Function to toggle iris tracking
function toggleIrisTracking() {
  if (isIrisTracking) {
    stopCamera(); // Stop and clean up the camera
    isIrisTracking = false;
  } else {
    if (!camera) {
      initializeCamera(); // Initialize the camera if not already done
    }
    isIrisTracking = true;
  }
}

function onResults(results) {
  if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
    const landmarks = results.multiFaceLandmarks[0];
    const leftIris = landmarks[468];

    if (!isCalibrated) {
      // Calibration phase
      minX = Math.min(minX, leftIris.x);
      maxX = Math.max(maxX, leftIris.x);
      minY = Math.min(minY, leftIris.y);
      maxY = Math.max(maxY, leftIris.y);

      calibrationCount++;
      if (calibrationCount >= calibrationFrames) {
        baseX = (minX + maxX) / 2;
        baseY = (minY + maxY) / 2;
        isCalibrated = true;
      }
      console.log(
        `Calibrating... ${Math.round(
          (calibrationCount / calibrationFrames) * 100
        )}%`
      );
      return;
    }

    // Calculate the iris position relative to the calibrated range
    let irisX = ((leftIris.x - baseX) / (maxX - minX)) * 2;
    let irisY = ((leftIris.y - baseY) / (maxY - minY)) * 2;

    // Invert the X-axis to correct mirroring
    irisX = -irisX;

    // Apply exponential sensitivity
    const exponentialFactor = 1.5;
    irisX =
      Math.sign(irisX) *
      Math.pow(Math.abs(irisX) * sensitivity, exponentialFactor);
    irisY =
      Math.sign(irisY) *
      Math.pow(Math.abs(irisY) * sensitivity, exponentialFactor);

    // Translate to screen coordinates
    let cursorX = ((irisX + 1) / 2) * window.innerWidth;
    let cursorY = ((irisY + 1) / 2) * window.innerHeight;

    // Clamp cursor position to screen bounds
    cursorX = Math.max(
      0,
      Math.min(cursorX, window.innerWidth - cursor.offsetWidth)
    );
    cursorY = Math.max(
      0,
      Math.min(cursorY, window.innerHeight - cursor.offsetHeight)
    );

    // Apply smoothing
    cursorX = prevX * 0.3 + cursorX * 0.7;
    cursorY = prevY * 0.3 + cursorY * 0.7;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    trackGazeInteraction(cursorX, cursorY);

    prevX = cursorX;
    prevY = cursorY;
  }
}

function main() {
  const gazeModeElement = document.getElementById("gazeMode");
  videoElement = document.getElementById("input_video");
  cursor = document.getElementById("cursor");

  gazeModeElement.addEventListener("change", function () {
    toggleIrisTracking();
  });
}

document.addEventListener("DOMContentLoaded", main);
