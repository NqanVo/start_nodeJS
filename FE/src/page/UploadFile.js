import React, { useState } from 'react';
import axios from "axios"
const UploadFile = () => {
    const [file, setFile] = useState()
    const [view, setView] = useState()
    const handleSubmitFile = (e) => {
        e.preventDefault()
        const datafile = {
            profile_pic: file
        }
        const uploadImage = async () => {
            const res = await axios.post('http://localhost:7070/upload-profile-image', datafile)
            setView(res.data)
        }
        uploadImage()
    }
    console.log(file);
    return (
        <div>
            <h1>Single File</h1>
            <form action='http://localhost:7070/upload-profile-image' method='POST' encType='multipart/form-data'>
                <label htmlFor="">File</label>
                {/* <input type="file" name="profile_pic" id="" onChange={(e) => setFile(e.target.value)} /> */}
                <input type="file" name="profile_pic" id="" />

                {/* <button onClick={handleSubmitFile}>Save file</button> */}
                <input type="submit" />
            </form>
            <h1>Multi Files</h1>
            <form action='http://localhost:7070/upload-multiple-image' method='POST' encType='multipart/form-data'>
                <label htmlFor="">File</label>
                {/* <input type="file" name="profile_pic" id="" onChange={(e) => setFile(e.target.value)} /> */}
                <input type="file" name="multiple_pic" id="" multiple={true} />

                {/* <button onClick={handleSubmitFile}>Save file</button> */}
                <input type="submit" />
            </form>
        </div>
    );
};

export default UploadFile;