import React, { useCallback, useState } from 'react';


import * as mind from "mind-ar/dist/mindar-image.prod"
const ImageForm = () => {
  const [images, setImages] = useState([]);
  const [mapSrc, setMapSrc] = useState();
    const compiler = new mind.Compiler()



  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
      const imageElements = imageFiles.map(file => {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        return image;
      });
      setImages(imageElements);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataList = await compiler.compileImageTargets(images, (progress) => {
        console.log(progress);
    });
    const exportedBuffer = await compiler.exportData();
    const blob = new Blob([exportedBuffer]);
    const mindSrc = window.URL.createObjectURL(blob)
    setMapSrc(mindSrc)
    console.log(dataList);
    console.log("Selected images:", images);
  };

  const downloadHandler  = () => {
    var aLink = window.document.createElement('a');
    aLink.download = 'targets.mind';
    aLink.href = mapSrc;
    aLink.click();
    window.URL.revokeObjectURL(aLink.href);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Submit</button>
      </form>
      <button  onClick={downloadHandler}>download</button>
    </div>
  );
};

export default ImageForm;
