'use client'
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import path from 'path';
import { useState, ChangeEvent, FormEvent } from 'react';

export const FileUpload = ({ setTree }) => {
  
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<ExtFile[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const updateFiles = (incommingFiles: ExtFile[]) => {
    // console.log(incommingFiles);
    if(incommingFiles.length === 0) return;
    setFiles(incommingFiles);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!files[0]) return;

    const formData = new FormData();
    formData.append('file', files[0].file!);

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
    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
      {/* <input type="file" onChange={handleFileChange} /> */}
      <Dropzone 
        onChange={updateFiles} 
        value={files}
        minHeight='65vh'
        style={{
          width: '85%',
          marginTop: '2rem',
        }}
        footer={false}
      >
        {files.map((file, i) => (
          <FileMosaic progress={20} key={i} {...file} preview />
        ))}
      </Dropzone>
      <div className='flex justify-center mt-2'>
        <button className='p-4 w-32 h-10 bg-blue-600 text-white rounded-sm flex justify-center items-center' type="submit">
          Upload
        </button>
      </div>
    </form>
  );
};

