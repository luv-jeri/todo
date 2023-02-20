import React, { useState, useEffect, memo } from 'react';
import s from './Uploader.module.css'; // CSS module';
import uploadIcon from '../../../public/icons/icons8-add-image.svg';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

function UploaderComponent({ onUpload }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const upload = async () => {
    const fileRef = ref(storage, `/images/${file.name}`);

    const uploading = uploadBytesResumable(fileRef, file);

    uploading.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const URL = await getDownloadURL(fileRef);
        setUrl(URL);
        onUpload(URL);
        setProgress(0);
      }
    );
  };

  useEffect(() => {
    if (file) {
      upload();
    }
  }, [file]);

  return (
    <div className={s.file_picker}>
      {progress ? <div className={s.overlay_progress}>{progress}%</div> : null}
      <input className={s.file_input} type='file' onChange={handleChange} />
      <img src={url ? url : uploadIcon} height={100} />
    </div>
  );
}

export default memo(UploaderComponent);
