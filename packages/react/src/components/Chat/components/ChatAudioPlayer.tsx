"use client";

/**
 * ChatAudioPlayer Component
 *
 * Audio playback controls with progress tracking and keyboard navigation.
 */

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import type { ChatAudioPlayerProps } from "../Chat.types";
import { formatTime } from "../utils";
import styles from "../Chat.module.css";

export const ChatAudioPlayer: React.FC<ChatAudioPlayerProps> = ({
  src,
  duration: initialDuration,
  title,
  className,
  ...rest
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration || 0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Update duration when audio metadata loads
  const handleLoadedMetadata = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration) && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
  }, []);

  // Update current time during playback
  const handleTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  }, []);

  // Handle playback end
  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  // Toggle play/pause
  const togglePlayback = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Handle autoplay restrictions
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Handle progress bar click
  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;

      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [duration],
  );

  // Handle keyboard navigation on slider
  const handleSliderKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;

      const STEP = 5; // 5 seconds
      let newTime = currentTime;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          e.preventDefault();
          newTime = Math.min(currentTime + STEP, duration);
          break;
        case "ArrowLeft":
        case "ArrowDown":
          e.preventDefault();
          newTime = Math.max(currentTime - STEP, 0);
          break;
        case "Home":
          e.preventDefault();
          newTime = 0;
          break;
        case "End":
          e.preventDefault();
          newTime = duration;
          break;
        default:
          return;
      }

      audio.currentTime = newTime;
      setCurrentTime(newTime);
    },
    [currentTime, duration],
  );

  // Calculate progress percentage
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div
      className={[styles.audioPlayer, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <audio
        ref={audioRef}
        src={src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />

      <button
        className={styles.audioPlayerButton}
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <div className={styles.audioPlayerProgress}>
        {title && <span className={styles.attachmentPreviewName}>{title}</span>}
        <div
          className={styles.audioPlayerTrack}
          onClick={handleProgressClick}
          onKeyDown={handleSliderKeyDown}
          role="slider"
          aria-label="Audio progress"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          tabIndex={0}
        >
          <div
            className={styles.audioPlayerFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.audioPlayerTime}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

ChatAudioPlayer.displayName = "ChatAudioPlayer";
