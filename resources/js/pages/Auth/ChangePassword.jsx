import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";
import { toast } from "react-toastify";

const ChangePassword = ({user}) => {
    const userObject = JSON.parse(user)
    const [data, setData] = useState({
        id: userObject.id,
    });

    const onSubmit = () => {
        // console.log(userObject)
        api.post('changepassword', data)
            .then((response) => {
                if (response.data) {
                    toast.success("Password successfully changed!")
                } else {
                    toast.error("Current password incorrect!")
                }
                location.reload()
            }).catch(err => {
                toast.error("There is a problem handling your request!")
                console.log(err.response)
            })
    }

    return (
        <>
            <Card sx={{ width: "100%" }}>
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="h5"
                        fontWeight={700}
                        component="div"
                    >
                        Change Password
                    </Typography>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.current_password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    current_password: e.target.value,
                                })
                            }
                            label="Current Password"
                            type="password"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.new_password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    new_password: e.target.value,
                                })
                            }
                            label="New Password"
                            type="password"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.confirm_password}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    confirm_password: e.target.value,
                                })
                            }
                            label="Confirm Password"
                            type="password"
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <div className="w-full">
                        <Button fullWidth variant="contained" onClick={onSubmit}>
                            SUBMIT
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </>
    );
};

export default ChangePassword;

if (document.getElementById("ChangePassword")) {
    const element = document.getElementById("ChangePassword")
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<ChangePassword {...props} />, document.getElementById("ChangePassword"))
}