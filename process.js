import React, { useState, useEffect } from 'react';

const ImagePreloader = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const imageSources = [
    'url_to_image_1',
    'url_to_image_2',
    'url_to_image_3',
    // Add more image URLs as needed
  ];

  useEffect(() => {
    const preloadImages = async () => {
      let loadedCount = 0;

      const imagePromises = imageSources.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            loadedCount++;
            const progress = (loadedCount / imageSources.length) * 100;
            setLoadingProgress(progress);
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            const progress = (loadedCount / imageSources.length) * 100;
            setLoadingProgress(progress);
            reject();
          };
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();
  }, [imageSources]);

  return (
    <div>
      <p>Loading Progress: {loadingProgress}%</p>
      {/* Add your page content here */}
    </div>
  );
};

export default ImagePreloader;
