// kisi file ko data url me Kaise read krte hai like this
export const readFileAsDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); // Use FileReader instead of FileRender
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = () => {
        reject(new Error("An error occurred while reading the file"));
      };
      reader.readAsDataURL(file); // Corrected method name
    });
  };
  
