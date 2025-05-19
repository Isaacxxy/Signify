"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import {
  loadSignLanguageModel,
  SignLanguageModel,
} from "@/app/utils/tfModelLoader";
import * as tf from "@tensorflow/tfjs";
import { Captions, CaptionsOff } from "lucide-react";

interface iVideoContainer {
  stream: MediaStream | null;
  isLocalStream: boolean;
  isOnCall: boolean;
  isChatOpen?: boolean;
}

const VideoContainer = ({
  stream,
  isLocalStream,
  isOnCall,
  isChatOpen,
}: iVideoContainer) => {
  const [modelData, setModelData] = useState<SignLanguageModel | null>(null);
  const [predictions, setPredictions] = useState<
    Array<{
      label: string;
      confidence: number;
    }>
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSignLanguageEnabled, setIsSignLanguageEnabled] = useState(false);
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Load the sign language model
  useEffect(() => {
    loadSignLanguageModel().then(setModelData);
    return () => tf.disposeVariables();
  }, []);

  const toggleSignLanguage = async () => {
    if (isSignLanguageEnabled) {
      setIsSignLanguageEnabled(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
      setPredictions([]);
    } else {
      setIsSignLanguageEnabled(true);
      startPredictionLoop();
    }
  };

  const startPredictionLoop = () => {
    const predict = async () => {
      if (!modelData || !videoRef.current || !canvasRef.current) {
        animationRef.current = requestAnimationFrame(predict);
        return;
      }

      if (
        videoRef.current.videoWidth === 0 ||
        videoRef.current.videoHeight === 0
      ) {
        animationRef.current = requestAnimationFrame(predict);
        return;
      }
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) {
        animationRef.current = requestAnimationFrame(predict);
        return;
      }
      try {
        // Mise à jour de la taille du canvas
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // Dessiner l'image vidéo
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // Vérification supplémentaire des dimensions
        if (canvasRef.current.width === 0 || canvasRef.current.height === 0) {
          throw new Error("Canvas dimensions are zero");
        }

        // Conversion en tenseur avec gestion d'erreur
        let tensor;
        try {
          tensor = tf.tidy(() => {
            return tf.browser
              .fromPixels(canvasRef.current!)
              .resizeBilinear([224, 224])
              .toFloat()
              .div(255.0)
              .expandDims();
          });

          // Prédiction
          const prediction = modelData.model.predict(tensor) as tf.Tensor;
          const scores = await prediction.data();

          // Traitement des résultats
          const scoresArray = Array.from(scores as Float32Array);
          const maxScoreIndex = scoresArray.indexOf(Math.max(...scoresArray));
          const newPrediction = {
            label: modelData.metadata.labels[maxScoreIndex],
            confidence: Math.max(...scoresArray),
          };

          setPredictions((prev) => [newPrediction, ...prev.slice(0, 4)]);

          // Nettoyage
          tf.dispose([prediction]);
        } finally {
          if (tensor) tf.dispose([tensor]);
        }
      } catch (err) {
        console.error("Prediction error:", err);
      }

      animationRef.current = requestAnimationFrame(predict);
    };

    predict();
  };

  useEffect(() => {
    return () => {
      if (modelData?.model) modelData.model.dispose();
    };
  }, [modelData]);

  const getTopPrediction = () => {
    if (predictions.length === 0) return null;
    return predictions[0];
  };

  const topPrediction = getTopPrediction();

  return (
    <div className="">
      <video
        ref={videoRef}
        className={cn(
          "rounded border-2 w-[1200px] border-red-600",
          isLocalStream &&
            isOnCall &&
            "md:w-[300px] max-w-[300px] w-[200px] h-auto rounded absolute top-2 left-2 border-green-500",
          isChatOpen && !isLocalStream && !isOnCall && "w-[1500px]"
        )}
        autoPlay
        muted={isLocalStream}
        playsInline
      />

      <button
        className={cn(
          "absolute bottom-2 right-2 bg-white text-black rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors",
          isSignLanguageEnabled && "bg-green-100 ring-2 ring-green-400"
        )}
        onClick={toggleSignLanguage}
      >
        {isSignLanguageEnabled ? (
          <Captions className="h-6 w-6" />
        ) : (
          <CaptionsOff className="h-6 w-6" />
        )}
      </button>

      {/* Affichage principal de la prédiction (sous-titre) */}
      {isSignLanguageEnabled && topPrediction && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-lg">
          {topPrediction.label} ({Math.round(topPrediction.confidence * 100)}%)
        </div>
      )}

      {/* Historique des prédictions */}
      {isSignLanguageEnabled && predictions.length > 0 && (
        <div className="absolute top-16 right-2 bg-black bg-opacity-60 text-white p-3 rounded-lg max-h-40 overflow-y-auto">
          <h4 className="font-medium mb-2">Dernières prédictions:</h4>
          <ul className="space-y-1">
            {predictions.map((prediction, index) => (
              <li
                key={index}
                className={cn(
                  "text-sm",
                  index === 0 ? "font-bold text-green-300" : "opacity-80"
                )}
              >
                {prediction.label}: {Math.round(prediction.confidence * 100)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {!modelData && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
          Chargement du modèle...
        </div>
      )}
    </div>
  );
};
export default VideoContainer;
