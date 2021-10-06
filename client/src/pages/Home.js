import React, { useState } from "react";
import axios from "axios";
import { Divider, Image } from "semantic-ui-react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import JustImageUpload from "../components/JustImageUpload";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Home() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(
    "https://react.semantic-ui.com/images/wireframe/image.png"
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(text);
    try {
      // send image stuff in files state
      let data = new FormData();
      data.append("file", files[0].file);
      data.append("text", text);
      let res = await axios.post("/api/memes", data);
      console.log(res);
      setUrl(res.data.image);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      alert("err in post meme occured");
    }
  };

  const fileChanged = (fileItems) => {
    if (fileItems[0]) {
      console.log(fileItems[0].file);
    }
    setFiles(fileItems);
  };
  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit}>
        <p>text</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <FilePond
          files={files}
          allowMultiple={false}
          // onupdatefiles={setFiles}
          onupdatefiles={fileChanged}
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        <br />
        <button type="submit">add</button>
      </form>

      <Image src={url} size="large" wrapped />
      <Divider />
      <JustImageUpload />
    </div>
  );
}
