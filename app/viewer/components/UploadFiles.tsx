'use client'
import { Dropzone, ExtFile, FileMosaic } from '@files-ui/react';
import path from 'path';
import { useState, ChangeEvent, FormEvent } from 'react';


interface props {
  setTree: Function,
}

export const FileUpload = ({ setTree }:props) => {

  const [files, setFiles] = useState<ExtFile[]>([]);


  const updateFiles = (incommingFiles: ExtFile[]) => {
    const maxSize = 2 * 1024 * 1024; // 10 MB
    const filteredFiles = incommingFiles.filter(file => file.size <= maxSize);

    if (filteredFiles.length !== incommingFiles.length) {
      alert('El archivo debe ser menor a 2Mb');
      return
    }

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
      const tree = result.directoryStructure.folders.reverse();
      setTree(tree);

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
        accept=".zip,application/zip"
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

