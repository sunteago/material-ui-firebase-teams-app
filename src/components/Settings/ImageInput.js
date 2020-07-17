import React, { useState } from "react";

import { Avatar, CircularProgress, Container } from "@material-ui/core";
import { storage, firebase } from "../../config/firebaseConfig";

export default function ImageInput({ classes, imageURL, setImageURL }) {
  const [progress, setProgress] = useState(null);

  const addObserver = (uploadTask) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        if (snapshot.state === firebase.storage.TaskState.PAUSED) {
          //console.log("Upload is paused");
        }
        if (snapshot.state === firebase.storage.TaskState.RUNNING) {
          //console.log("Upload is running");
        }
      },
      (error) => {
        console.log(error);
      },
      (finished) => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setImageURL(downloadURL);
          setProgress(null);
        });
      }
    );
  };

  const onUploadHandler = (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    if (image) {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(`images/${image.name}`);
      const uploadTask = imageRef.put(image);
      addObserver(uploadTask);
    }
  };

  return (
    <Container style={{ textAlign: "center", position: "relative" }}>
      <label htmlFor="raised-button-file">
        <Avatar alt="Avatar" src={imageURL} className={classes.image} />
        <div className={classes.circularProgress}>
          {progress !== null && (
            <CircularProgress
              size={50}
              variant="static"
              style={{ border: 0, objectFit: "fill" }}
              value={progress}
            />
          )}
        </div>
      </label>
      <input
        accept="image/png, image/jpg, image/jpeg"
        style={{ display: "none" }}
        id="raised-button-file"
        type="file"
        onChange={onUploadHandler}
      />
    </Container>
  );
}
