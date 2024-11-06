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
import { update } from "lodash";

const ViewCedula = ({id}) => {
    const [data, setData] = useState({
        user: {
            first_name: "",
            middle_name: "",
            last_name: "",
            profile: {
                user_street: "",
                user_barangay: "",
                user_gender: ""
            },
            birthday: "",
            birth_place: ""
        },
        height: "",
        weight: "",
        occupation: "",
        salary: "",
        tin_id: ""
    });
    const [refresher, setRefresher] = useState(0)

    useEffect(() => {
        api.get(`documents/getcedula?id=${id}`)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [refresher])

    const updateStatus = (data) => {
        api.post(`documents/updatecertificate`, {data})
            .then(response => {
                setRefresher(refresher + 1)
            }).catch(err => {
                console.log(err.response)
            })
    }

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
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Address"
                                value={`${data.user?.profile?.user_street}, ${data.user?.profile?.user_barangay}`}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Citizenship"
                                value={`Filipino`}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Sex"
                                value={`${data.user?.profile?.user_gender}`}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birthday"
                                value={`${data.user?.birthday}`}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birth Place"
                                value={`${data.user?.birth_place}`}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Height (cm)"
                                    value={data.height}
                                    InputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Weight (kg)"
                                    value={data.weight}
                                    InputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Occupation"
                                value={data.occupation}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Salary/Income"
                                value={data.salary}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="TIN #"
                                value={data.tin_id}
                                InputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </div>
                    </CardContent>
            <Button variant="contained" fullWidth onClick={() => updateStatus(data)}>Update Status</Button>
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
