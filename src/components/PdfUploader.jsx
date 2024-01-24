import { Button, List } from "antd";
import React, { useEffect, useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";

export function PdfUploader(props) {
  const [fileList, setFileList] = useState([]);

  const handleFiles = (acceptedFiles) => {
    setFileList([...fileList, ...acceptedFiles]);
    props.setFileList([...fileList, ...acceptedFiles]);
  };

  const handleDeleteFile = (file) => {
    if (fileList.length === 0) {
      setFileList([]);
    } else {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i] === file) {
          fileList.splice(i, 1);
        }
      }
    }
    props.setFileList(fileList);
    console.log(fileList);
  };
  useEffect(() => {
    if (props.testHandle === true) {
      handleFiles(["test.pdf", "test2.pdf"]);
    }
    if (props.testDelete === true) {
      setFileList(["test.pdf", "test2.pdf"]);
      handleDeleteFile("test.pdf");
    }
  }, []);

  return (
    <div>
      <Dropzone onDrop={handleFiles}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Button icon={<UploadOutlined />}>Dateien hochladen</Button>
            </div>
          </section>
        )}
      </Dropzone>
      <List
        style={{ marginTop: "20px" }}
        bordered
        dataSource={fileList}
        renderItem={(item) => (
          <List.Item
            actions={[
              <DeleteOutlined
                key="delete"
                onClick={() => handleDeleteFile(item)}
              />,
            ]}
          >
            {item.name}
          </List.Item>
        )}
      />
    </div>
  );
}
