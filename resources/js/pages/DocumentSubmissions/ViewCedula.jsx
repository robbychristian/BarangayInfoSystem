import {
    Button,
    Card,
    CardActions,
    CardContent,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";

const ViewCedula = ({id}) => {
    const [data, setData] = useState({});

    useEffect(() => {
        api.get(`documents/getcedula?id=${id}`)
            .then(response => {
                console.log(response.data)
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <div className="h-[80vh] w-full">
            <div className="w-full flex justify-center items-center h-full">
                <Card sx={{ maxWidth: 700, maxHeight: 900, width: 700 }}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            fontWeight={700}
                            component="div"
                        >
                            COMMUNITY TAX CERTIFICATE APPLICATION FORM
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="caption"
                            fontWeight={300}
                            component="div"
                        >
                            City Treasurer's Office
                        </Typography>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Full Name"
                                value={`${data.user?.first_name} ${data.user?.middle_name} ${data.user?.last_name}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Address"
                                value={`${data.user?.profile?.user_street}, ${data.user?.profile?.user_barangay}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Citizenship"
                                value={`Filipino`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Sex"
                                value={`${data.user?.profile?.user_gender}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birthday"
                                value={`${data.user?.birthday}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birth Place"
                                value={`${data.user?.birth_place}`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Height (cm)"
                                    value={data.height}
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Weight (kg)"
                                    value={data.weight}
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Occupation"
                                value={data.occupation}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Salary/Income"
                                value={data.salary}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="TIN #"
                                value={data.tin_id}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ViewCedula;

if (document.getElementById('ViewCedula')) {
    const element = document.getElementById("ViewCedula");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(<ViewCedula {...props} />, document.getElementById('ViewCedula'))
}