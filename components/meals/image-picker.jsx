"use client";

import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const imagePickerRef = useRef(null);
  const [pickedImage, setPickedImage] = useState(null);

  const handlePickedImage = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="Image selected by the user" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id="image"
          name={name}
          accept="image/png, image/jpeg"
          ref={imagePickerRef}
          onChange={handlePickedImage}
        />
        <button
          className={classes.button}
          type="button"
          onClick={() => imagePickerRef.current.click()}
        >
          Select Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
