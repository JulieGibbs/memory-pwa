import './Memory.css'
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import * as React from 'react';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostAddIcon from '@mui/icons-material/PostAdd';
import MicIcon from '@mui/icons-material/Mic';
import AudioPlayer from '../components/AudioPlayer';
import VideoPlayer from '../components/VideoPlayer';
import Modal from '@mui/material/Modal';
import { Drawer, Input, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AudioRecorder from '../components/AudioRecorder';
import MediaList from './MediaList';

export const MemoryContext = React.createContext({});

const Memory = () => {


    const [noteopen, setNoteopen] = React.useState(false);
    const handleNoteopen = () => setNoteopen(true);
    const handleNoteclose = () => setNoteopen(false);


    const [inputting, setInputting] = React.useState('');
    const [notes, setNotes] = React.useState([]);
    const [audios, setAudios] = React.useState([]);
    const [medias, setMedias] = React.useState([]);

    const [recopen, setRecopen] = React.useState(false);
    const handleRecopen = () => setRecopen(true);
    const handleRecclose = () => setRecopen(false);

    const [mediaopen, setMediaopen] = React.useState(false);
    const handleMediaopen = () => setMediaopen(true);
    const handleMediaclose = () => setMediaopen(false);


    const handleInputChange = (e) => {
        setInputting(e.target.value)
    }

    const AddNote = () => {
        let tmp = notes
        tmp.push(inputting)
        setNotes(tmp)
    }
    return (
        <div className='container'>

            <div className='header'>
                <div className='top-bar'>
                    <a><ArrowBackIosNewOutlinedIcon /></a>
                    December 26, 2023
                    <a>share</a>
                </div>
                <div className='memory'>
                    <div className='memory-weekly'>Weekly prompt</div>
                    <div className='memory-title'>What is your greatest childhood memory?</div>
                </div>
            </div>
            <div className='body'>
                {audios.map((item, index) => {
                    return (<AudioPlayer audio_url={item} />)
                })}
                
                <VideoPlayer />
                {medias.map((item, index) => {
                    return (
                        <div style={{margin:'3%'}}>
                            <img
                                srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                alt={item.title}
                                loading="lazy"
                                style={{borderRadius:'10px'}}
                            />
                        </div>

                    )

                })}
                {notes.map((item, index) => {
                    return (
                        <div className='note-panel'>
                            <div className='note-card'>
                                {item}
                            </div>
                            <div className='author-time'><b>Alex </b>  10/22/23 6:02 pm</div>
                        </div>
                    )
                })}

            </div>
            <Drawer anchor="bottom" open={noteopen} onClose={handleNoteclose}>
                <div style={{ padding: '20px' }} className='note-drawer'>
                    <div onClick={handleNoteclose}><CloseIcon className='close-button' /></div>
                    <h2>What's on your mind?</h2>
                    <Input aria-label="record" multiline className='note-input' onChange={handleInputChange} />
                    <Button className='note-button' onClick={AddNote}>Add note</Button>
                </div>
            </Drawer>


            <Drawer key='record-drawer' anchor="bottom" open={recopen} onClose={handleRecclose}>
                <div style={{ padding: '20px' }} className='rec-drawer'>
                    <div onClick={handleRecclose}><CloseIcon className='close-button' /></div>
                    <h2>What's on your mind?</h2>
                    <MemoryContext.Provider value={{ audios, setAudios }}>
                        <AudioRecorder />
                    </MemoryContext.Provider>
                </div>
            </Drawer>

            <Drawer key='media-select-drawer' anchor='bottom' open={mediaopen} onClose={handleMediaclose}>
                <MemoryContext.Provider value={{ medias, setMedias, handleMediaclose }}>
                    <MediaList />
                </MemoryContext.Provider>
            </Drawer>

            <div className='footer'>
                <div className='footer-button' onClick={handleNoteopen}>
                    <PostAddIcon /> Add notes
                </div>
                <div className='mic-button' onClick={handleRecopen}><MicIcon /></div>
                <div className='footer-button' onClick={handleMediaopen}>
                    <AddPhotoAlternateIcon /> Add media

                </div>

            </div>

        </div>

    )
}

export default Memory;
