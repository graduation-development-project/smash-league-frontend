"use client";

import { LoadingOutlined } from "@ant-design/icons";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      const file = e.target.files[0];
      //   console.log("Check file", file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file first!");
      return;
    }
    setIsLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "smash-league");
    data.append("cloud_name", "dgaczeqos");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgaczeqos/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadImageUrl = await res.json();
    setIsLoading(false);
    console.log(uploadImageUrl.secure_url);
    setImageURL(uploadImageUrl.secure_url);

    // // Reference to the file in Firebase Storage
    // const storageRef = ref(storage, `images/${file.name}`);

    // try {
    //   // Upload the file to Firebase Storage
    //   const snapshot = await uploadBytes(storageRef, file);
    //   console.log("Uploaded file:", snapshot);

    //   // Get the downloadable URL of the uploaded file
    //   const url = await getDownloadURL(snapshot.ref);
    //   setImageURL(url);
    //   alert("Image uploaded successfully!");
    // } catch (error) {
    //   console.error("Upload error:", error);
    // }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload {isLoading ? <LoadingOutlined /> : ""}
      </button>

      {imageURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
