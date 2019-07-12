import React, { useState, useEffect } from 'react';

export default (props) => {
  const test = 'hi';
  const [image, setImage] = useState(props.image);
  return (
    <div>
      <p >
        <img src={props.image} style={{ height: '200px', width: '200px', border: '1px' }} />
      </p>
      <input></input>
      <button onClick={() => {console.log('saving that url');}} >new image URL</button>
    </div>
  );
}