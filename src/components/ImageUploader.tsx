import './ImageUploader.css';

import image from '../assets/image.svg';
import check from '../assets/checked.png';
import React from 'react';

const ImageUploader = () => {
  const [upload, setUpload] = React.useState({
    uploaded: false,
    uploading: false,
    url: '',
  });

  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

  /**
   * Validates the file extension
   * @param file The file to validate
   * 
   * @returns true if the file extension is valid, false otherwise
   */
  const validateFileType = (file: File) :boolean => {
    if (ALLOWED_FILE_TYPES.includes(file.type)) {
      return true;
    }
    alert('Invalid file type');
    return false;
  };

  /**
   * Uploads the file to the server
   * @param file The file to upload
   * 
   * @returns true if the file was uploaded successfully, false otherwise
   */
  const uploadFile = (file: File) :boolean => {
    if (!validateFileType(file)) {
      return false;
    }

    setUpload((prevUpload) => ({
      ...prevUpload,
      uploading: true,
    }));

    // TODO: Implement the fetch request to upload the file
    // Simulates time to upload the file
    setTimeout(() => {
      setUpload({
        uploaded: true,
        uploading: false,
        url: URL.createObjectURL(file),
      });
    }, 2000);
    return true;
  };

 /**
  * Handles the drop event for the drop zone
  * @param e The drag event
  */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    console.log(e.dataTransfer.files);
    uploadFile(e.dataTransfer.files[0]);
  };

 /**
  * When the user clicks on the button, open the file explorer
  * and let the user choose a file.
  */
  const handleClick = () => {
    const input = document.createElement('input');
    input.type = 'file';

    input.onchange = (e: any) => {
      console.log(e.target.files);
      uploadFile(e.target.files[0]);
    }

    input.click();
  };

  /**
   * Copies the link to the clipboard
   * @param e The click event
   */
  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(upload.url);
    alert('Link copied to clipboard');
  };

  /**
   * Return the uploader content
   */
  const getContent = () => {
    if (upload.uploading) {
      return (
        <div className="uploading">
          <h1>Uploading...</h1>
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
        </div>
      );
    }

    if (upload.uploaded) {
      return (
        <>
          <img src={check} id='check'/>
          <h1>Uploaded Successfully!</h1>
          <img src={upload.url} alt="uploaded" id="uploaded" />
          <div className='link-container'>
            <p>{upload.url}</p>
            <button className="uploaded-button" onClick={copyLink}>Copy Link</button>
          </div>
        </> 
      );
    }

    return (
      <>
          <h1>Upload your image</h1>
          <p>File should be Jpeg, Png...</p>
          <>
            <input type="file" id="file" onDrop={handleDrop} alt='' onClick={e => {e.preventDefault()}}/>
            <label htmlFor="file" id="drop-zone">
              <img src={image} alt="upload" />
              <p>Drag & Drop your image here</p>
            </label>
            <p>Or</p>
            <button onClick={handleClick} id="choose-file-button">Choose a file</button>
          </>
        </>
    );
  };

  return (
    <section className={`image-uploader-container ${upload.uploading ? 'upload' : ''}`}>
      {getContent()}
    </section>
  );
};

export default ImageUploader;
