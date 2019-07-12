import React, { useState, useEffect } from 'react';

export default (props) => {
  const [image, setImage] = useState(props.image);
  const [newImage, setNewImage] = useState('');
  const uploadImage = () => {
    fetch(`/api/recipes/${props.recipeID}/`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({image: newImage})
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`/api/postgres HTTP status ${res.status}`)
        }
        props.getRecipe()
        setNewImage('')
        return res
      })
  }
  return (
    <div>
      <p >
        <img src={props.image} style={{ height: '200px', width: '200px', border: '1px' }} />
      </p>
      <input value={newImage} onChange={(v) => setNewImage(v.target.value)}></input>
      <button onClick={uploadImage} >new image URL</button>
    </div>
  );
}