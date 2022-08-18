import React, { useState, useImperativeHandle } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';


//Switch img to base64
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export default function PictureWall(props, ref) {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');  //img's url or base64

    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ])


    //Close preview
    const handleCancel = () => setPreviewVisible(false);

    //Open preview
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };

    //When the img state changes
    const handleChange = ({ file, fileList: newFileList }) => {
        if (file.status === 'done') {
            /*
             服务器返回的img url,
             服务器返回的其public文件中的img文件名
            */
            const { url, name } = file.response.data
            //AntD bug：不可以直接file.url = url...
            newFileList[fileList.length - 1].url = url   //将本地base64替换为服务器返回的图片url
            newFileList[fileList.length - 1].name = name //将本地图片name替换为服务器文件夹中的文件名(后续删除用)
        }
        if (file.status === 'removed') {
            //Send a delete request to the server
        }
        setFileList(newFileList);
    }

    //Get an array of picture names from 'fileList'
    //To send an add product request  
    const getImgNameArr = () => {
        const result = []
        fileList.map((item) => {    //eslint-disable-line
            result.push(item.name)
        })
        return result
    }

    //用于父组件回显数据图片
    const setImgsList = (imgArr) => {
        let fileList = []
        imgArr.forEach((item, index) => {
            fileList.push({ uid: -index, name: item, url: item })
        })
        setFileList(fileList)
    }

    //向父组件暴露getImgNameArr,setImgsList方法
    useImperativeHandle(ref, () => ({
        getImgNameArr,
        setImgsList
    }))

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <>
            <Upload
                action='(API)upload url' //上传的url
                method='(API)post'
                name='(API)Params key'
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};
