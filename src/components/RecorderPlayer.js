import * as React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Slider from '@mui/material/Slider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PauseIcon from '@mui/icons-material/Pause';
import ReactAudioPlayer from 'react-audio-player';

import './RecorderPlayer.css'
import { IconButton } from '@mui/material';

const AudioProgressBar = (props) => {
    const { duration, currentProgress, buffered, ...rest } = props;
    const progressBarWidth = isNaN(currentProgress / duration) ? 0 : currentProgress / duration;
    const bufferedWidth = isNaN(buffered / duration) ? 0 : buffered / duration;
    const progressStyles = {
        "--progress-width": progressBarWidth,
        "--buffered-width": bufferedWidth,
    };
    return (
        <div className="absolute h-1 -top-[4px] left-0 right-0 group">
            <Slider
                type="range"
                name="progress"
                style={progressStyles}
                min={0}
                max={duration}
                value={currentProgress}
                {...rest}
            />
        </div>
    );
}

const RecorderPlayer = (recorder_url) => {

    const audioRef = React.useRef(null);
    const [duration, setDuration] = React.useState(0);
    const [isReady, setIsReady] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currrentProgress, setCurrrentProgress] = React.useState(0);
    const [buffered, setBuffered] = React.useState(0);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        } else {
            audioRef.current?.play();
            setIsPlaying(true);
        }
    };

    const handleBufferProgress = (e) => {
        const audio = e.currentTarget;
        const dur = audio.duration;
        if (dur > 0) {
            for (let i = 0; i < audio.buffered.length; i++) {
                if (
                    audio.buffered.start(audio.buffered.length - 1 - i) < audio.currentTime
                ) {
                    const bufferedLength = audio.buffered.end(
                        audio.buffered.length - 1 - i,
                    );
                    setBuffered(bufferedLength);
                    break;
                }
            }
        }
    };
    const formatDurationDisplay = (duration) => {
        const min = Math.floor(duration / 60);
        const sec = Math.floor(duration - min * 60);
        const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":"); // format - mm:ss
        return formatted;
    }
    return (

        <div className='audio-card'>

            <div className='audio-up'>
                <audio
                    ref={audioRef}
                    preload="metadata"
                    onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                    onCanPlay={(e) => {
                        setIsReady(true);
                    }}
                    onPlaying={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onTimeUpdate={(e) => {
                        setCurrrentProgress(e.currentTarget.currentTime);
                        handleBufferProgress(e);
                    }}
                    onProgress={handleBufferProgress}
                >
                    <source src={recorder_url.recorder_url} />
                </audio>
                <div className='audio-play-slider'>
                    <AudioProgressBar
                        duration={duration}
                        currentProgress={currrentProgress}
                        buffered={buffered}
                        onChange={(e, value) => {
                            if (!audioRef.current) return;
                            audioRef.current.currentTime = value;
                            setCurrrentProgress(value);
                        }}
                    />
                    <div className='slider-values'>
                        <div className='value-text'>00:00</div>
                        <div className='value-text'>{duration}</div>
                    </div>
                </div>
                <div className='audio-play-button' onClick={togglePlayPause}>
                    {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </div>
            </div>
        </div>


    )
}

export default RecorderPlayer;