const preloadImages = (imageUrls: string[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    if (totalImages === 0) {
      resolve();
      return;
    }

    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === totalImages) {
          resolve();
        }
      };
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${url}`));
      };
    });
  });
};

export default preloadImages;
