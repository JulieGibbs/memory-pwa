import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { MemoryContext } from './Memory';
import { Link } from 'react-router-dom';
import './MediaList.css'
const MediaList = () => {

  const [checkedMedia, setCheckedMedia] = React.useState([])
  const [addColor, setAddcolor]=React.useState('#000000')
  const {medias, setMedias, handleMediaclose}=React.useContext(MemoryContext)
  const handleCheckboxChange = (src) => {
    let tmp = checkedMedia
    if (tmp.indexOf(src) !== -1) {
      tmp.pop(src)
    }
    else {
      tmp.push(src)
    }

    if (tmp.length>=1){
      setAddcolor('#1A836D')
    }
    else{
      setAddcolor('#000000')
    }
    setCheckedMedia(tmp)
  }

  const addMedias=()=>{
    let array1=medias
    let array2=checkedMedia
    setMedias(array1.concat(array2))
  }

  return (
    <div className='container'>
      <div className='medialist-top-bar'>
        <div onClick={handleMediaclose}>Cancel</div>
        <b>Select Media</b>
        <a style={{color:addColor}} onClick={addMedias}>Add</a>
      </div>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={164} style={{ position: 'relative' }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <Checkbox
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
              style={{ position: 'absolute', top: 0, left: 0, color: '#1A836D' }}
              color="primary"
              inputProps={{ 'aria-label': 'select image' }}
              onChange={() => handleCheckboxChange(item.img)}
            />
            <img
              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>

  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];

export default MediaList;