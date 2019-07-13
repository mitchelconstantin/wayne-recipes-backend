import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


export default (props) => {
  const imgurUpload = (file) => {

    const upload = (blob) => {
      let formData = new FormData()
      formData.append('image', blob)
      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID 546c25a59c58ad7',
          'Cache-Control': null, //required for cors
          'X-Requested-With': null, //required for cors
        },
        body: formData
      }).then(response => {
        response.json().then(body => {
          console.log('got body', body);
          props.uploadImage(body.data.link);
        });
        // if (response.ok) {
        //   alert('Image uploaded to album');
        // }
      }).catch(error => {
        console.error('error upload', error);
        //alert('Upload failed: ' + error);
      });
    }

    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      console.log('yay loaded');
      upload(reader.result.split(',')[1]);
    }
    reader.readAsDataURL(file[0])
    // reader.readAsBinaryString(file[0])

  }


  const onDrop = useCallback(acceptedFiles => {
    console.log('woohoo thanks for the files');
    imgurUpload(acceptedFiles);
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}