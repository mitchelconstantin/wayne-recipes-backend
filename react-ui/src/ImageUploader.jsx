import React, { useState, useEffect } from 'react';

export default (props) => {
  const [image, setImage] = useState(props.image);
  const [newImage, setNewImage] = useState('');
  const uploadImage = () => {
    console.log('setting the new image :D', newImage);
  }
  return (
    <div>
      <p >
        <img src={image} style={{ height: '200px', width: '200px', border: '1px' }} />
      </p>
      <input value={newImage} onChange={(v) => setNewImage(v.target.value)}></input>
      <button onClick={ uploadImage} >new image URL</button>
    </div>
  );
}