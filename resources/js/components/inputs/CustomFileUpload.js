import { Button } from "@mui/material";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";
// import swal from "sweetalert";

const CustomFileUpload = ({ data, setData, my }) => {
    const hiddenFileInput = useRef(null);
    const handleClick = (e) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (e) => {
        const fileUploaded = e.target.files[0];
        // toast("File has been uploaded!", {
        //     type: "success",
        // });
        // swal({
        //     icon: "success",
        //     title: "File Uploaded!",
        //     text: "File has been uploaded!"
        // })
        // handleFile({... fileUploaded});
        setData({...data, valid_id: fileUploaded})
        toast("File has been uploaded!", {
            type: "success",
            autoClose: 3000
        })
    };
    return (
        <Button
            startIcon={<CloudUploadIcon />}
            variant="contained"
            sx={{ backgroundColor: "#EDBF47", "&:hover": {backgroundColor: "#EDBF47"} }}
            onClick={handleClick}
            fullWidth
            style={{
                marginTop: my,
                marginBottom: my,
            }}
        >
            UPLOAD FILE
            <input
                type="file"
                className="hidden"
                ref={hiddenFileInput}
                onChange={handleChange}
                accept="image/png, image/jpeg"
            ></input>
        </Button>
    );
};

export default CustomFileUpload;
