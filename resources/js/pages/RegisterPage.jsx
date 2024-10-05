import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";

const RegisterPage = () => {
    const [data, setData] = useState([]);
    return (
        <div className="h-[80vh] w-full">
            <div className="w-full flex justify-center items-center h-full">
                <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" fontWeight={700} component="div">
                            Registration
                        </Typography>
                        <Typography gutterBottom variant="caption" fontWeight={300} component="div">
                            Upon registering, you verify that the information you provided is true.
                        </Typography>
                        <div className="my-2">
                            <TextField fullWidth label="First Name" />
                        </div>
                        <div className="my-2">
                            <TextField fullWidth label="Middle Name" />
                        </div>
                        <div className="my-2">
                            <TextField fullWidth label="Last Name" />
                        </div>
                        <div className="my-2">
                            <TextField fullWidth label="Last Name" />
                        </div>
                        <div className="my-2">
                            <TextField fullWidth label="Last Name" />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default RegisterPage;

if (document.getElementById("RegisterPage")) {
    ReactDOM.render(<RegisterPage />, document.getElementById("RegisterPage"));
}
