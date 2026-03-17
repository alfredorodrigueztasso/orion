"use client";

/**
 * ChatVoiceRecorder Component
 *
 * Voice recording UI with waveform visualization.
 */

import React from "react";
import { Mic, Square, X, Send } from "lucide-react";
import type { ChatVoiceRecorderProps } from "../Chat.types";
import { useVoiceRecorder } from "../hooks/useVoiceRecorder";
import { formatTime } from "../utils";
import styles from "../Chat.module.css";

export const ChatVoiceRecorder: React.FC<ChatVoiceRecorderProps> = ({
  onRecordingComplete,
  onCancel,
  maxDuration = 300,
  className,
  ...rest
}) => {
  const {
    isRecording,
    duration,
    audioBlob,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    reset,
    isSupported,
  } = useVoiceRecorder({
    maxDuration,
    onRecordingComplete,
    onError: (err) => console.error("Recording error:", err),
  });

  const handleMainButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else if (audioBlob) {
      // Send the recorded audio
      onRecordingComplete?.(audioBlob);
      reset();
    } else {
      startRecording();
    }
  };

  const handleCancel = () => {
    cancelRecording();
    onCancel?.();
  };

  if (!isSupported) {
    return (
      <div
        className={[styles.voiceRecorder, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <div className={styles.voiceRecorderInfo}>
          <span className={styles.voiceRecorderLabel}>
            Voice recording is not supported in this browser
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={[styles.voiceRecorder, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <div className={styles.voiceRecorderInfo}>
          <span
            className={[
              styles.voiceRecorderLabel,
              styles.voiceRecorderError,
            ].join(" ")}
          >
            {error}
          </span>
        </div>
        <button
          className={styles.inputButton}
          onClick={reset}
          aria-label="Try again"
        >
          <X size={20} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={[styles.voiceRecorder, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {/* Main record/stop/send button */}
      <button
        className={[
          styles.voiceRecorderButton,
          !isRecording && !audioBlob && styles.voiceRecorderButtonIdle,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={handleMainButtonClick}
        aria-label={
          isRecording
            ? "Stop recording"
            : audioBlob
              ? "Send recording"
              : "Start recording"
        }
      >
        {isRecording ? (
          <Square size={20} />
        ) : audioBlob ? (
          <Send size={20} />
        ) : (
          <Mic size={20} />
        )}
      </button>

      {/* Info section */}
      <div className={styles.voiceRecorderInfo}>
        <span className={styles.voiceRecorderDuration}>
          {formatTime(duration)}
        </span>
        <span className={styles.voiceRecorderLabel}>
          {isRecording
            ? "Recording..."
            : audioBlob
              ? "Recording ready"
              : "Click to record"}
        </span>
      </div>

      {/* Waveform visualization (only when recording) */}
      {isRecording && (
        <div className={styles.voiceRecorderWaveform}>
          <div className={styles.voiceRecorderBar} />
          <div className={styles.voiceRecorderBar} />
          <div className={styles.voiceRecorderBar} />
          <div className={styles.voiceRecorderBar} />
          <div className={styles.voiceRecorderBar} />
        </div>
      )}

      {/* Cancel button */}
      {(isRecording || audioBlob) && (
        <div className={styles.voiceRecorderActions}>
          <button
            className={styles.inputButton}
            onClick={handleCancel}
            aria-label="Cancel recording"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

ChatVoiceRecorder.displayName = "ChatVoiceRecorder";
