import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import emptyImage from '../ShowRecipe/emptyImage.png';

interface Props {
  picture?: string;
  setPicture: Function;
}
export const ImageUploader =  ({picture, setPicture} : Props) => {
  const onDrop = useCallback(async acceptedFiles => {
    const imageBlob = await readFileAsync(acceptedFiles);
    //@ts-ignore
    uploadImageToServer(imageBlob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const readFileAsync = (file: any) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        //@ts-ignore
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file[0])
    })
  }

  const uploadImageToServer = async (image : string) => {
    console.log('trying to upload');
    const res = await fetch(`/api/image`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: image })
    })
    const json = await res.json();
    // setLocalPicture(json.link);
    setPicture(json.link)
  }
  const onError = (ev : any) => {
    const eventTarget = ev.target;
    eventTarget.src = emptyImage;
  };

  return (
    <div {...getRootProps()}>
      <p >
        <img onError={onError} src={picture || emptyImage} alt={'a tasty dish'} style={{ height: '200px', width: '200px', border: '1px' }} />
      </p>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  );
}