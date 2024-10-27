import {
    Button,
    Card,
    CardActions,
    CardContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomDateField from "../../components/inputs/CustomDateField";
import { api } from "../../config/api";
import { toast } from "react-toastify";

const EditProfile = ({ user }) => {
    const userObject = JSON.parse(user);
    const [data, setData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        birth_place: "",
        profile: {
            contact_number: "",
            landline: "",
        },
    });

    useEffect(() => {
        api.post("getprofile", { id: userObject.id })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, []);

    const onSubmit = () => {
        api.post('updateprofile', data)
            .then((response) => {
                console.log(response.data)
                toast.success("Profile has been updated!")
                location.reload()
            }).catch(err => {
                toast.error("There is a problem handling your request")
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
                        Edit Personal Details
                    </Typography>

                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.first_name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    first_name: e.target.value,
                                })
                            }
                            label="First Name"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.middle_name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    middle_name: e.target.value,
                                })
                            }
                            label="Middle Name"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.last_name}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    last_name: e.target.value,
                                })
                            }
                            label="Last Name"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.email}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                            label="Email"
                        />
                    </div>
                    <div className="my-2">
                        <CustomDateField
                            data={data.birthday}
                            label={"Birthday"}
                            onChange={(e) => setData({ ...data, birthday: e })}
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.birth_place}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    birth_place: e.target.value,
                                })
                            }
                            label="Birth Place"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.profile?.contact_number}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        contact_number: e.target.value,
                                    },
                                })
                            }
                            label="Contact Number"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            value={data.profile?.landline}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    profile: {
                                        ...data.profile,
                                        landline: e.target.value,
                                    },
                                })
                            }
                            label="Landline"
                        />
                    </div>
                    <div className="my-2">
                        <FormControl fullWidth>
                            <InputLabel id="religion_select">
                                Religion
                            </InputLabel>
                            <Select
                                labelId="religion_select"
                                id="religion-simple-select"
                                value={data.profile?.user_religion || ""} // Fallback to empty string
                                label="Religion"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        profile: {
                                            ...data.profile,
                                            user_religion: e.target.value,
                                        },
                                    })
                                }
                            >
                                <MenuItem value="Roman Catholic">
                                    Roman Catholic
                                </MenuItem>
                                <MenuItem value="Christian">Christian</MenuItem>
                                <MenuItem value="Muslim">Muslim</MenuItem>
                            </Select>
                        </FormControl>
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

export default EditProfile;

if (document.getElementById("EditProfile")) {
    const element = document.getElementById("EditProfile");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <EditProfile {...props} />,
        document.getElementById("EditProfile")
    );
}
