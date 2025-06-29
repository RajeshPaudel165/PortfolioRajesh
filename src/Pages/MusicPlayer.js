import React, { useState, useRef, useEffect } from "react";
import "../Styles/MusicPlayer.css";
import {
  FaRandom,
  FaRedo,
  FaStepBackward,
  FaStepForward,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaHeart,
} from "react-icons/fa";

// Import images
import hataridaiImage from "../assets/hataridai.avif";
import trilogyImage from "../assets/trilogy.jpeg";
import downloadImage from "../assets/download.jpeg";
import johnImage from "../assets/john.jpeg";
import afterImage from "../assets/after.jpeg";

const MusicPlayer = ({ darkMode }) => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const audioRef = useRef(null);

  // Demo playlist with sample tracks
  const playlist = [
    {
      id: 1,
      title: "Hataarindai, Bataasindai",
      artist: "Sajjan Raj Vaidya",
      album: "Official Release",
      duration: "5:55",
      cover: hataridaiImage,
      audioUrl:
        "/music/Sajjan Raj Vaidya - Hataarindai, Bataasindai [Official Release] - Sajjan.mp3",
    },
    {
      id: 2,
      title: "Hell Of A Night",
      artist: "Travis Scott",
      album: "Lloyd Ellis",
      duration: "6:30",
      cover: downloadImage,
      audioUrl: "/music/Travis Scott - Hell Of A Night - Lloyd Ellis.mp3",
    },
    {
      id: 3,
      title: "The Morning",
      artist: "The Weeknd",
      album: "The Weeknd",
      duration: "5:02",
      cover: trilogyImage,
      audioUrl: "/music/The Weeknd - The Morning - The Weeknd.mp3",
    },
    {
      id: 4,
      title: "All of Me",
      artist: "John Legend",
      album: "Official Video",
      duration: "3:03",
      cover: johnImage,
      audioUrl:
        "/music/John Legend - All of Me (Official Video) - johnlegendVEVO.mp3",
    },
    {
      id: 5,
      title: "After Hours",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "7:11",
      cover: afterImage,
      audioUrl: "/music/The Weeknd - After Hours (Audio) - The Weeknd.mp3",
    },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    setIsPlaying(false);
    setTimeout(() => {
      if (isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const previousTrack = () => {
    const prev = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setIsPlaying(false);
    setTimeout(() => {
      if (isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, 100);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleShuffle = () => setIsShuffled(!isShuffled);
  const toggleLoop = () => setIsLooped(!isLooped);
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div className={`music-player ${darkMode ? "" : "light-mode"}`}>
      <div className="music-header">
        <h2>Music</h2>
        <div className="music-controls-top">
          <button
            className={`control-btn ${isShuffled ? "active" : ""}`}
            onClick={toggleShuffle}
            title="Shuffle"
          >
            <FaRandom size={18} />
          </button>
          <button
            className={`control-btn ${isLooped ? "active" : ""}`}
            onClick={toggleLoop}
            title="Repeat"
          >
            <FaRedo size={18} />
          </button>
        </div>
      </div>

      <div className="music-content">
        <div className="album-art">
          <img
            src={playlist[currentTrack].cover}
            alt={playlist[currentTrack].album}
          />
        </div>

        <div className="player-controls-section">
          <div className="track-info">
            <h3 className="track-title">{playlist[currentTrack].title}</h3>
            <p className="track-artist">{playlist[currentTrack].artist}</p>
            <p className="track-album">{playlist[currentTrack].album}</p>
          </div>

          <div className="progress-container">
            <div className="progress-bar" onClick={handleSeek}>
              <div
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="main-controls">
            <button className="control-btn large" onClick={previousTrack}>
              <FaStepBackward size={20} />
            </button>
            <button className="play-btn" onClick={togglePlay}>
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            <button className="control-btn large" onClick={nextTrack}>
              <FaStepForward size={20} />
            </button>
          </div>

          <div className="volume-control">
            <FaVolumeUp size={16} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>

          <button
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={toggleLike}
          >
            <FaHeart size={18} />
          </button>
        </div>
      </div>

      <div className="playlist">
        <h4>Playlist ({playlist.length} tracks)</h4>
        <div className="playlist-tracks">
          {playlist.map((track, index) => (
            <div
              key={track.id}
              className={`playlist-track ${
                currentTrack === index ? "active" : ""
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <img
                src={track.cover}
                alt={track.album}
                className="track-thumb"
              />
              <div className="track-details">
                <span className="track-name">{track.title}</span>
                <span className="track-artist-small">{track.artist}</span>
              </div>
              <span className="track-duration">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <audio
        ref={audioRef}
        src={playlist[currentTrack].audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
        onLoadedMetadata={handleTimeUpdate}
      />
    </div>
  );
};

export default MusicPlayer;
