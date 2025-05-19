'use client'
import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';

export default function SignLanguageModel() {
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Load the model
  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await tf.loadGraphModel('/model/model.json');
        setModel(loadedModel);
        console.log("Model loaded!");
      } catch (err) {
        console.error("Failed to load model:", err);
      }
    }
    loadModel();

    return () => {
      if (model) model.dispose(); // Cleanup
    };
  }, []);

  // 2. Set up webcam
  useEffect(() => {
    if (!model) return;

    async function setupCamera() {
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    }
    setupCamera();
  }, [model]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width={224} height={224} />
      {model ? "Model loaded!" : "Loading model..."}
    </div>
  );

}