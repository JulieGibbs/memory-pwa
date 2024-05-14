import React, { useState, useRef } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import './VideoPlayer.css'
import Slider from '@mui/material/Slider';
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  return (
    <div className='video-panel'>
      <div className='video-card'>
        <video
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          width={'100%'}
        >
          <source src="./assests/video/river-video.mp4" type="video/mp4" />
        </video>
        <div className='play-button' onClick={handlePlayPause}>{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}</div>
        <Slider
          className='play-slider'
          min={0}
          max={videoRef.current ? videoRef.current.duration : 0}
          value={currentTime}
          onChange={(e, value) => {
            setCurrentTime(value);
            videoRef.current.currentTime = value;
          }}
        />
      </div>
      <div className='author-time'><b>Alex </b>  10/22/23 6:02 pm</div>
    </div>


  );
};

export default VideoPlayer;