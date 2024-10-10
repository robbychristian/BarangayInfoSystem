import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { api } from '../../config/api';
import moment from 'moment';

const IncidentComplaint = ({user}) => {
    const userObject = JSON.parse(user)
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('documents/getallincidentreport')
            .then((response) => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <>
            <div className="w-full flex justify-end">
                {userObject.user_role != 1 && (
                    <Button variant="contained" color="success" onClick={() => {
                        location.href = "/addincidentcomplaint"
                    }}>Add Incident Complaint</Button>
                )}
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Complainant</TableCell>
                            <TableCell>Respondent Name</TableCell>
                            {/* <TableCell>Status</TableCell> */}
                            <TableCell>Date of Incident</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {row.user?.first_name} {row.user?.middle_name}{" "}
                                {row.user?.last_name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.respondent_name}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {moment(row.incident_date_time).format("LL")}
                            </TableCell>
                            <TableCell>
                                <Button>View</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default IncidentComplaint;

if (document.getElementById('IncidentComplaint')) {
    const element = document.getElementById('IncidentComplaint')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<IncidentComplaint {...props} />, document.getElementById("IncidentComplaint"))
}