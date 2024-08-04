'use client'
import path from 'path';
import { useState, ChangeEvent, FormEvent } from 'react';

export const FileUpload = ({setTree}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/files', {
      method: 'POST',
      body: formData,
    });


    if (response.ok) {
      const result = await response.json();
      console.log(result.directoryStructure);
      setTree(result.directoryStructure.folders.reverse());
      console.log('File uploaded successfully!');
    } else {
      console.error('File upload failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button style={{background:'yellow', color:'black'}} type="submit">Upload</button>
   
    </form>
  );
};

