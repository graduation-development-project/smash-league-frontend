"use client";

import React, { useState } from "react";
import { ConsoleSqlOutlined, LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";

const UploadImage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // api truyen file => URL 3 anh sau khi up len cloud

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "smash-league");
    formData.append("cloud_name", "dgaczeqos");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgaczeqos/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await response.json();
      if (uploadData.secure_url) {
        setImageURL(uploadData.secure_url);
      } else {
        alert("Failed to upload the image. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(imageURL);
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-semibold mb-4">Upload an Image</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 flex items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <LoadingOutlined className="mr-2" /> Uploading...
          </>
        ) : (
          "Upload"
        )}
      </button>

      {imageURL && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Uploaded Image:</h3>
          <Image
            src={imageURL}
            alt="Uploaded"
            width={500}
            height={500}
            className="max-w-full h-auto rounded-lg shadow"
          />
        </div>
      )}

      <div className="mt-8">
        {file && (
          <div className="">
            <h3 className="text-lg font-medium mb-2">Uploaded Image:</h3>
            <Image
              src={URL.createObjectURL(file)}
              alt="Uploaded"
              width={500}
              height={500}
              className="max-w-full h-auto rounded-lg shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
