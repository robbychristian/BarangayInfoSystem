import { Button, Card, CardActions, CardContent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CustomDateField from "../../components/inputs/CustomDateField";
import { api } from "../../config/api";
import moment from "moment";

const ViewIncidentComplaint = ({id}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        api.get(`documents/getincidentreport?id=${id}`)
            .then(response => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])
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
                                data={data.date_time_incident}
                                label={"Date and Time of Incident"}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Name of Complainant"
                                value={`${data.user?.first_name} ${data.user?.middle_name} ${data.user?.last_name}`}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Address of Complainant"
                                value={`${data.user?.profile?.user_street}, ${data.user?.profile?.user_barangay}`}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Contact No."
                                    value={`${data.user?.profile?.contact_number}`}
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Age"
                                    value={`${moment().diff(
                                        data.birthday,
                                        "years"
                                    )}`}
                                />
                            </div>
                        </div>
                        <div className="my-2 mt-16">
                            <TextField
                                fullWidth
                                label="Respondent Name"
                                value={data.respondent_name}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Respondent Address"
                                value={data.respondent_address}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4 my-2">
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Respondent Contact Number"
                                    value={data.respondent_contact_no}
                                />
                            </div>
                            <div className="col-span-1">
                                <TextField
                                    fullWidth
                                    label="Respondent Age"
                                    value={data.respondent_age}
                                />
                            </div>
                        </div>
                        <div className="my-2 mt-16">
                            <TextField
                                fullWidth
                                label="Incident Reason"
                                value={data.incident_info?.incident_reason}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                label="Incident Place"
                                value={data.incident_info?.incident_place}
                            />
                        </div>
                        <div className="my-2">
                            <CustomDateField
                                data={data.incident_info?.date_time_incident}
                                label={"Incident Date and Time"}
                            />
                        </div>
                        <div className="my-2">
                            <TextField
                                fullWidth
                                rows={4}
                                label="Incident Report"
                                value={data.incident_info?.incident_report}
                                multiline
                            />
                        </div>
                    </CardContent>
                    {/* <CardActions>
                        <div className="flex w-full justify-center">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    onSubmit();
                                }}
                            >
                                SUBMIT INCIDENT REPORT
                            </Button>
                        </div>
                    </CardActions> */}
                </Card>
            </div>
        </div>
    );
};

export default ViewIncidentComplaint;

if(document.getElementById("ViewIncidentComplaint")) {
    const element = document.getElementById('ViewIncidentComplaint')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<ViewIncidentComplaint {...props} />, document.getElementById("ViewIncidentComplaint"))
}
