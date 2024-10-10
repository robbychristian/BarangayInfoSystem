import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";
import CustomDateField from "../../components/inputs/CustomDateField";
import { toast } from "react-toastify";

const AddCedulaCertificate = ({ user }) => {
    const userObject = JSON.parse(user);
    const [data, setData] = useState({});
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        api.get(`usermanagement/getuserdetails?id=${userObject.id}`)
            .then((response) => {
                setUserDetails(response.data);
                setData({...data, user_id: userObject.id})
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const onSubmit = () => {
        if (Object.keys(data).length < 6) {
            toast("Please fill in the form!", {
                autoClose: 3000,
                type: "error",
            });
        } else {
            api.post('documents/submitcedula', data)
                .then(response => {
                    toast("Form has been submitted!", {
                        autoClose: 3000,
                        type: "success",
                    });
                    location.href = "/cedulacertificates"
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
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
                                value={`${userDetails.first_name} ${userDetails.middle_name} ${userDetails.last_name}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Address"
                                value={`${userDetails.profile?.user_street}, ${userDetails.profile?.user_barangay}`}
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
                                value={`${userDetails.profile?.user_gender}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birthday"
                                value={`${userDetails.birthday}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Birth Place"
                                value={`${userDetails.birth_place}`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Height (cm)"
                                    value={data.height}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            height: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Weight (kg)"
                                    value={data.weight}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            weight: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Occupation"
                                value={data.occupation}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        occupation: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Salary/Income"
                                value={data.salary}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        salary: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="TIN #"
                                value={data.tin_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        tin_id: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="flex w-full justify-center">
                            <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>SUBMIT CEDULA</Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default AddCedulaCertificate;

if (document.getElementById("AddCedulaCertificate")) {
    const element = document.getElementById("AddCedulaCertificate");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <AddCedulaCertificate {...props} />,
        document.getElementById("AddCedulaCertificate")
    );
}
