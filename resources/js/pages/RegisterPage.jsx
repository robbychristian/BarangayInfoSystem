import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomDateField from "../components/inputs/CustomDateField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomFileUpload from "../components/inputs/CustomFileUpload";
import { api } from "../config/api";
import moment from "moment";

const RegisterPage = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const backPage = () => {
        setPage(page - 1);
    };

    const nextPage = () => {
        if (page == 1) {
            if (Object.keys(data).length < 5) {
                toast("Please fill in the form!", {
                    autoClose: 3000,
                    type: "error",
                });
            } else {
                setPage(page + 1);
            }
        } else if (page == 2) {
            if (data.is_employed == undefined) {
                toast("Please fill in the employment status!", {
                    autoClose: 3000,
                    type: "error",
                });
            } else {
                setPage(page + 1);
            }
        } else if (page == 3) {
            const formdata = new FormData();

            const formValues = Object.entries(data);

            formValues.forEach(([key, value]) => {
                // if (key == 'birthday') {
                //     formdata.append(`${key}`, `${moment(value).format("LL")}`)
                // }
                // formdata.append(`${key}`, `${value}`)
                if (key == "birthday") {
                    formdata.append(key, moment(value).format("YYYY-MM-DD"));
                } else {
                    formdata.append(key, value);
                }
                
            });

            console.log([...formdata]);
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            api.post("register", formdata, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken
                }

            })
                .then((response) => {
                    toast("Registered Successfully!", {
                        type: "success",
                        autoClose: 3000
                    })
                    location.href = '/login'
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    };

    return (
        <div className="h-[80vh] w-full">
            <ToastContainer />
            <div className="w-full flex justify-center items-center h-full">
                <Card sx={{ maxWidth: 700, maxHeight: 900, width: 700 }}>
                    <CardContent>
                        {page == 1 ? (
                            <>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    fontWeight={700}
                                    component="div"
                                >
                                    Registration
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    fontWeight={300}
                                    component="div"
                                >
                                    Upon registering, you verify that the
                                    information you provided is true.
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
                                    <TextField
                                        fullWidth
                                        value={data.password}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password: e.target.value,
                                            })
                                        }
                                        label="Password"
                                        type="password"
                                    />
                                </div>
                                <div className="my-2">
                                    <TextField
                                        fullWidth
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                password_confirmation:
                                                    e.target.value,
                                            })
                                        }
                                        label="Confirm Password"
                                        type="password"
                                    />
                                </div>
                                <div className="my-2">
                                    <CustomDateField
                                        data={data.birthday}
                                        label={"Birthday"}
                                        onChange={(e) =>
                                            setData({ ...data, birthday: e })
                                        }
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
                            </>
                        ) : page == 2 ? (
                            <>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    fontWeight={700}
                                    component="div"
                                >
                                    Employment Status
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    fontWeight={300}
                                    component="div"
                                >
                                    Your employment status would greatly help us
                                    determine your taxes.
                                </Typography>
                                <div className="my-2">
                                    <label className="text-lg font-semibold">
                                        Are you employed?
                                    </label>
                                    <div>
                                        <Radio
                                            checked={data.is_employed === 1}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    is_employed: 1,
                                                    is_student: 0,
                                                })
                                            }
                                            value={1}
                                            name="radio-buttons"
                                        />
                                        <label htmlFor="">Yes</label>
                                    </div>
                                    <div>
                                        <Radio
                                            checked={data.is_employed === 0}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    is_employed: 0,
                                                    is_student: 1,
                                                })
                                            }
                                            value={0}
                                            name="radio-buttons"
                                        />
                                        <label htmlFor="">No</label>
                                    </div>
                                </div>
                                {data.is_student == 1 && (
                                    <div className="my-2">
                                        <TextField
                                            fullWidth
                                            value={data.school_name}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    school_name: e.target.value,
                                                })
                                            }
                                            label="School Name"
                                        />
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    fontWeight={700}
                                    component="div"
                                >
                                    Personal Information
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="caption"
                                    fontWeight={300}
                                    component="div"
                                >
                                    Your personal information would fast track
                                    filling up forms in the future!
                                </Typography>
                                <div className="my-2">
                                    <TextField
                                        fullWidth
                                        value={data.contact_no}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                contact_no: e.target.value,
                                            })
                                        }
                                        label="Contact No."
                                    />
                                </div>
                                <div className="my-2">
                                    <TextField
                                        fullWidth
                                        value={data.landline}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                landline: e.target.value,
                                            })
                                        }
                                        label="Landline"
                                    />
                                </div>
                                <div className="my-2">
                                    <TextField
                                        fullWidth
                                        value={data.user_street}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                user_street: e.target.value,
                                            })
                                        }
                                        label="Street"
                                    />
                                </div>
                                <div className="my-2">
                                    <TextField
                                        fullWidth
                                        value={data.user_barangay}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                user_barangay: e.target.value,
                                            })
                                        }
                                        label="Barangay"
                                    />
                                </div>
                                <div className="my-2">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            Gender
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={data.gender}
                                            label="Gender"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    gender: e.target.value,
                                                })
                                            }
                                        >
                                            <MenuItem value={"Male"}>
                                                Male
                                            </MenuItem>
                                            <MenuItem value={"Female"}>
                                                Female
                                            </MenuItem>
                                            <MenuItem value={"LGBTQIA+"}>
                                                LGBTQIA+
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="my-2">
                                    <FormControl fullWidth>
                                        <InputLabel id="religion_select">
                                            Religion
                                        </InputLabel>
                                        <Select
                                            labelId="religion_select"
                                            id="religion-simple-select"
                                            value={data.religion}
                                            label="Religion"
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    religion: e.target.value,
                                                })
                                            }
                                        >
                                            <MenuItem value={"Roman Catholic"}>
                                                Roman Catholic
                                            </MenuItem>
                                            <MenuItem value={"Christian"}>
                                                Christian
                                            </MenuItem>
                                            <MenuItem value={"Muslim"}>
                                                Muslim
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="my-2">
                                    <CustomFileUpload
                                        data={data}
                                        setData={setData}
                                        my={3}
                                    />
                                </div>
                            </>
                        )}
                    </CardContent>
                    <CardActions
                        sx={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        {page > 1 ? (
                            <Button
                                size="small"
                                color="error"
                                variant="contained"
                                onClick={backPage}
                            >
                                Back
                            </Button>
                        ) : (
                            <div></div>
                        )}
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={nextPage}
                        >
                            {page == 3 ? "Submit" : "Next"}
                        </Button>
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
