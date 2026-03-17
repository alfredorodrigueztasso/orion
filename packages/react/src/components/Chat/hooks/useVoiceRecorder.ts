/**
 * useVoiceRecorder Hook
 *
 * Provides voice recording functionality using the MediaRecorder API.
 * Includes duration tracking and error handling.
 */

import { useState, useRef, useCallback, useEffect } from "react";
import type { VoiceRecorderState } from "../Chat.types";

export interface UseVoiceRecorderOptions {
  /** Maximum recording duration in seconds */
  maxDuration?: number;
  /** Audio MIME type */
  mimeType?: string;
  /** Callback when recording is complete */
  onRecordingComplete?: (blob: Blob) => void;
  /** Callback on error */
  onError?: (error: string) => void;
}

export interface UseVoiceRecorderReturn extends VoiceRecorderState {
  /** Start recording */
  startRecording: () => Promise<void>;
  /** Stop recording */
  stopRecording: () => void;
  /** Cancel recording */
  cancelRecording: () => void;
  /** Reset state */
  reset: () => void;
  /** Whether recording is supported */
  isSupported: boolean;
}

export function useVoiceRecorder(
  options: UseVoiceRecorderOptions = {},
): UseVoiceRecorderReturn {
  const {
    maxDuration = 300, // 5 minutes default
    mimeType = "audio/webm",
    onRecordingComplete,
    onError,
  } = options;

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>();
  const [error, setError] = useState<string | undefined>();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Check if MediaRecorder is supported
  const isSupported =
    typeof window !== "undefined" && "MediaRecorder" in window;

  // Clean up resources
  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    if (!isSupported) {
      const errMsg = "Voice recording is not supported in this browser";
      setError(errMsg);
      onError?.(errMsg);
      return;
    }

    try {
      // Reset state
      setError(undefined);
      setAudioBlob(undefined);
      setDuration(0);
      chunksRef.current = [];

      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine supported MIME type
      let recordMimeType = mimeType;
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        // Fallback to commonly supported types
        const fallbacks = ["audio/webm", "audio/mp4", "audio/ogg"];
        recordMimeType =
          fallbacks.find((type) => MediaRecorder.isTypeSupported(type)) || "";
      }

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: recordMimeType || undefined,
      });
      mediaRecorderRef.current = mediaRecorder;

      // Handle data
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      // Handle stop
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recordMimeType || "audio/webm",
        });
        setAudioBlob(blob);
        onRecordingComplete?.(blob);
        cleanup();
      };

      // Handle error
      mediaRecorder.onerror = () => {
        const errMsg = "Recording failed";
        setError(errMsg);
        onError?.(errMsg);
        cleanup();
      };

      // Start recording
      mediaRecorder.start(100); // Collect data every 100ms
      setIsRecording(true);
      startTimeRef.current = Date.now();

      // Start duration timer
      timerRef.current = window.setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setDuration(elapsed);

        // Auto-stop if max duration reached
        if (elapsed >= maxDuration) {
          stopRecording();
        }
      }, 100);
    } catch (err) {
      const errMsg =
        err instanceof Error ? err.message : "Failed to access microphone";
      setError(errMsg);
      onError?.(errMsg);
      cleanup();
    }
  }, [
    isSupported,
    mimeType,
    maxDuration,
    onRecordingComplete,
    onError,
    cleanup,
  ]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [isRecording]);

  // Cancel recording
  const cancelRecording = useCallback(() => {
    cleanup();
    setIsRecording(false);
    setDuration(0);
    setAudioBlob(undefined);
  }, [cleanup]);

  // Reset state
  const reset = useCallback(() => {
    cancelRecording();
    setError(undefined);
  }, [cancelRecording]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    isRecording,
    duration,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    reset,
    isSupported,
  };
}
