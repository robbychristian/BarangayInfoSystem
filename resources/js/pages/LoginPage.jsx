import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { toast, ToastContainer } from "react-toastify";
import { api } from "../config/api";

const LoginPage = () => {
    const [data, setData] = useState({});
    const onSubmit = () => {
        api.get(`usermanagement/checkverification?email=${data.email}`)
            .then((response) => {
                if (response.data) {
                    api.post("login", data)
                        .then((response) => {
                            toast.success("Login Successfully!", {
                                autoClose: 3000,
                            });
                            location.href = "/home";
                        })
                        .catch((err) => {
                            toast.error(
                                "These credentials do not match our records."
                            );
                        });
                } else {
                    toast("Please verify your account first!", {
                        type: "warning",
                        autoClose: 3000,
                    });
                }
            })
            .catch((err) => {
                console.log(err.response);
            });
    };
    return (
        <div className="h-[80vh] w-full">
            {/* <ToastContainer /> */}
            <div className="w-full flex justify-center items-center h-full">
                <Card sx={{ maxWidth: 700, maxHeight: 900, width: 700 }}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            fontWeight={700}
                            component="div"
                        >
                            Login
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="caption"
                            fontWeight={300}
                            component="div"
                        >
                            Login your registered account here!
                        </Typography>

                        <div className="my-2">
                            <TextField
                                fullWidth
                                value={data.email}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    });
                                }}
                                label="Email"
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                value={data.password}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    });
                                }}
                                type="password"
                                label="Password"
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="contained"
                            fullWidth
                            color="primary"
                            onClick={onSubmit}
                        >
                            LOGIN
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;

if (document.getElementById("LoginPage")) {
    ReactDOM.render(<LoginPage />, document.getElementById("LoginPage"));
}
