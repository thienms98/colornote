import { useState } from "react";
import { uploadFile } from "@uploadcare/upload-client";
import { uploadCareKeys } from "../../constants";

// import classNames from 'classnames/bind'
// import styles from './ImageUploader.module.scss'
// const cx = classNames.bind(styles)

export default function ImageUploader() {
  const [fileData, setFileData] = useState(null);
  // fileData must be `Blob`, `File`, `Buffer`, UUID, CDN URL or Remote URL
  async function upload(fileData) {
    const result = await uploadFile(fileData, {
      publicKey: uploadCareKeys.PUBLIC_KEY,
      store: "auto",
      metadata: {
        subsystem: "uploader",
        pet: "cat",
      },
    });
    console.log(`URL: ${result.cdnUrl}`);
  }
  upload();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          upload(new Blob(e.target.file.files));
        }}
      >
        <input type='file' name='file' id='' onChange={(e) => console.log(e.target.files)} />
        <input type='submit' value='Upload' />
      </form>
    </>
  );
}
