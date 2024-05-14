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

const Memory = () => {


    const [noteopen, setNoteopen] = React.useState(false);
    const handleNoteopen = () => setNoteopen(true);
    const handleNoteclose = () => setNoteopen(false);

    const [progress, setProgress] = React.useState(10);

    const [inputting, setInputting] =React.useState('');
    const [notes, setNotes] = React.useState([])

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleInputChange =(e)=>{
        setInputting(e.target.value)
    }

    const AddNote=()=>{
        let tmp=notes
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

                <AudioPlayer />
                <VideoPlayer />
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
                    <Input aria-label="Demo input" multiline className='note-input' onChange={handleInputChange } />
                    <Button className='note-button' onClick={AddNote}>Add note</Button>
                </div>
            </Drawer>



            <div className='footer'>
                <div className='footer-button' onClick={handleNoteopen}>
                    <PostAddIcon /> Add notes
                </div>
                <div className='mic-button'><MicIcon /></div>
                <Link to='medias'>
                    <div className='footer-button'>
                        <AddPhotoAlternateIcon /> Add media
                    </div></Link>

            </div>

        </div>

    )
}

export default Memory;