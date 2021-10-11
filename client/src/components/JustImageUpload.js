import React, { useState } from "react";

// import Uploader from "./uploader";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from "filepond-plugin-image-resize";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import { Image } from "semantic-ui-react";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);

function JustImageUpload() {
  const [files, setFiles] = useState([]);
  const [url, setUrl] = useState(null);

  function setMetadata(fileItems) {
    const _fileItems = fileItems.map((fileItem) => {
      return fileItem.setMetadata("username", "yourUserName");
    });

    //the line below is called twice, I guess this is the reason why it sometimes the server accepts duplicated files
    console.log(_fileItems);
    setFiles(_fileItems);
  }
  const handleOnAddFile = (err, file) => {
    console.log(err);
    console.log(file);
    console.log("here in handleOnAddFile");
  };

  return (
    <>
      <FilePond
        files={files}
        name="items"
        allowMultiple={true}
        onupdatefiles={(fileItems) => setMetadata(fileItems)}
        onprocessfile={(error, file) => {
          if (error) {
            alert("err");
            return;
          }
          console.log("here in onprocessfile");
          console.log("server id", file.serverId);
          let fileObj = JSON.parse(file.serverId);
          setUrl(fileObj.image);
          // once finish remove the files
          setFiles([]);
        }}
        onprocessfileprogress={(file, progress) => {
          //...
          console.log("onprocessfileprogress called");
        }}
        onaddfile={handleOnAddFile}
        labelIdle='Drag & Drop files or <span class="filepond--label-action">Browse</span>'
        server="/api/memes1"
      />
      )
      <Image src={url} size="large" wrapped />
    </>
  )}

export default JustImageUpload;
