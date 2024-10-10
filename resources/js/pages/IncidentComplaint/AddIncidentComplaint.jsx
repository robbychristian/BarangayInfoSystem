import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { api } from "../../config/api";
import moment from "moment";
import CustomDateField from "../../components/inputs/CustomDateField";
import { toast } from "react-toastify";

const AddIncidentComplaint = ({user}) => {
    const userObject = JSON.parse(user)
    const [data, setData] = useState({})
    const [userDetails, setUserDetails] = useState([])

    useEffect(() => {
        api.get(`usermanagement/getuserdetails?id=${userObject.id}`)
            .then((response) => {
                const details = response.data
                setUserDetails(response.data);
                setData({...data, user_id: userObject.id, age: moment().diff(details.birthday, 'years')})
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [])

    const onSubmit = () => {
        api.post('documents/addincidentcomplaint', data)
            .then((response) => {
                const formdata = new FormData()
                const formValues = Object.entries(data);
                formValues.forEach(([key,value]) => {
                    if (key == 'incident_time') {
                        formdata.append(key, moment(value).format("YYYY-MM-DD"))
                    } else if (key == 'date_time_incident') {
                        formdata.append(key, moment(value).format("YYYY-MM-DD"))
                    } else {
                        formdata.append(key, value)
                    }
                })
                toast.success("Incident has been reported!")
                location.href = '/incidentcomplaints'
            }).catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div className="w-full my-5">
            <div className="w-full flex justify-center items-center h-full">
                <Card sx={{ maxWidth: 700, width: 700 }}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            fontWeight={700}
                            component="div"
                        >
                            INCIDENT/COMPLAINT FORM
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="caption"
                            fontWeight={300}
                            component="div"
                        >
                            Barangay Dioquino Zobel
                        </Typography>
                        <div className="my-2">
                            <CustomDateField 
                                data={data}
                                label={'Date and Time of Incident'}
                                onChange={(e) => setData({ ...data, date_time_incident: e })}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Name of Complainant"
                                value={`${userDetails.first_name} ${userDetails.middle_name} ${userDetails.last_name}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Address of Complainant"
                                value={`${userDetails.profile?.user_street}, ${userDetails.profile?.user_barangay}`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Contact No."
                                    value={`${userDetails.profile?.contact_number}`}
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Age"
                                    value={`${moment().diff(userDetails.birthday, 'years')}`}
                                />
                            </div>
                        </div>
                        <div className="my-2 mt-16">
                            <TextField
                                fullWidth
                                label="Respondent Name"
                                value={data.respondent_name}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        respondent_name: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Respondent Address"
                                value={data.respondent_address}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        respondent_address: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Respondent Contact Number"
                                    value={data.respondent_contact_no}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            respondent_contact_no: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Respondent Age"
                                    value={data.respondent_age}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            respondent_age: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="my-2 mt-16">
                            <TextField
                                fullWidth
                                label="Incident Reason"
                                value={data.incident_reason}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        incident_reason: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Incident Place"
                                value={data.incident_place}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        incident_place: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-2">
                            <CustomDateField 
                                data={data}
                                label={'Incident Date and Time'}
                                onChange={(e) => setData({ ...data, incident_time: e })}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                rows={4}
                                label="Incident Report"
                                value={data.incident_report}
                                multiline
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        incident_report: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </CardContent>
                    <CardActions>
                        <div className="flex w-full justify-center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    onSubmit()
                                }}
                            >
                                SUBMIT INCIDENT REPORT
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
};

export default AddIncidentComplaint;

if (document.getElementById('AddIncidentComplaint')) {
    const element = document.getElementById('AddIncidentComplaint')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<AddIncidentComplaint {...props} />, document.getElementById('AddIncidentComplaint'))
}