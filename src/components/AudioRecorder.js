import React, { useState, useRef } from "react";
import MicIcon from '@mui/icons-material/Mic';

import StopIcon from '@mui/icons-material/Stop';
import RecorderPlayer from "./RecorderPlayer";

import './AudioRecorder.css'
const AudioRecorder = () => {
    const mimeType = "audio/webm";

    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };

    const startRecording = async () => {
        getMicrophonePermission()
        setRecordingStatus("recording");
        //create new Media recorder instance using the stream
        const media = new MediaRecorder(stream, { type: mimeType });
        //set the MediaRecorder instance to the mediaRecorder ref
        mediaRecorder.current = media;
        //invokes the start method to start the recording process
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === "undefined") return;
            if (event.data.size === 0) return;
            localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };

    const stopRecording = () => {
        setRecordingStatus("completed");
        //stops the recording instance
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
            //creates a blob file from the audiochunks data
            const audioBlob = new Blob(audioChunks, { type: mimeType });
            //creates a playable URL from the blob file.
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudio(audioUrl);
            setAudioChunks([]);
        };
    };

    const saveRecording = () => {

    }


    return (
        <div>
            {audio ? (
                <div className="audio-container">
                    <audio src={audio} controls></audio>
                </div>
            ) : null}
            <div className="audio-controls">
                {!permission ? (
                    <div onClick={getMicrophonePermission} className='get-mic'>
                        Get Microphone
                    </div>
                ) : null}
                {permission && recordingStatus === "inactive" ? (
                    <div className='mic-button' onClick={startRecording} ><MicIcon /></div>
                ) : null}
                {recordingStatus === "recording" ? (
                    <div className='mic-button' onClick={stopRecording}><StopIcon /></div>
                ) : null}
                {recordingStatus === "completed" ? (
                    <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                        <div className='re-rec' onClick={() => setRecordingStatus("inactive")}>Re-record</div>
                        <div className='get-mic' onClick={stopRecording}>Save</div>
                    </div>

                ) : null}
            </div>

        </div>
    );
};
export default AudioRecorder;