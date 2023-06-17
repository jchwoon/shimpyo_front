const imageReader = (file: Blob | null) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    if (file) fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
};

export default imageReader;
