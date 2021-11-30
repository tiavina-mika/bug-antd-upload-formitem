import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Upload, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const PicturesWall = () => {
  // state = {
  //   previewVisible: false,
  //   previewImage: '',
  //   previewTitle: '',
  //   fileList: [
  //     {
  //       uid: '-1',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //     {
  //       uid: '-2',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //     {
  //       uid: '-3',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //     {
  //       uid: '-4',
  //       name: 'image.png',
  //       status: 'done',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //     {
  //       uid: '-xxx',
  //       percent: 50,
  //       name: 'image.png',
  //       status: 'uploading',
  //       url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //     },
  //     {
  //       uid: '-5',
  //       name: 'image.png',
  //       status: 'error',
  //     },
  //   ],
  // };

  // componentDidMount() {
  //   setState({
  //     fileList: [{
  //         "uid": "b09077486e95052161621aff6b6b086d",
  //         "name": "portfolio/preprod/projects/UI-Lovecraft_ih0wdy",
  //         "status": "done",
  //         "url": "https://res.cloudinary.com/dtdmcyxy9/image/upload/v1638295740/portfolio/preprod/projects/UI-Lovecraft_ih0wdy.jpg"
  //     }]
  //   })
  // }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const [image, setImage] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    error: "",
    fileList: []
  });

  useEffect(() => {
    setImage((prev) => ({
      ...prev,
      fileList: [
        {
          uid: "-4",
          name: "image.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        },
        {
          uid: "b09077486e95052161621aff6b6b086d",
          name: "portfolio/preprod/projects/UI-Lovecraft_ih0wdy",
          status: "done",
          url:
            "https://res.cloudinary.com/dtdmcyxy9/image/upload/v1638295740/portfolio/preprod/projects/UI-Lovecraft_ih0wdy.jpg"
        }
      ]
    }));
  }, []);

  const handleCancel = () => {
    setImage({ ...image, previewVisible: false });
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setImage({
      ...image,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    });
  };

  const handleChange = ({ fileList }) => {
    setImage({ ...image, fileList });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={image.fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {image.fileList.length >= 8 ? null : uploadButton}
          </Upload.Dragger>
        </Form.Item>
        <Modal
          visible={image.previewVisible}
          title={image.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={image.previewImage}
          />
        </Modal>
      </Form>
    </>
  );
};

ReactDOM.render(<PicturesWall />, document.getElementById("container"));
