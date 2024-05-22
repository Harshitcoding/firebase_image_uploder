import "./App.css";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");

  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + uuidv4()}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        alert('image uploaded successfully')
        return getDownloadURL(snapshot.ref);
        
      })
      .then((url) => {
        setImageUrls((prev) => [...prev, url]);
        setImageUpload(null); // Reset file input
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        const fetchUrls = response.items.map((item) =>
          getDownloadURL(item)
        );
        Promise.all(fetchUrls).then((urls) => {
          setImageUrls(urls);
        });
      })
      .catch((error) => {
        console.error("Error listing images:", error);
      });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload Image</button>
      {imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`uploaded-${index}`} />
      ))}
    </div>
  );
}

export default App;
