import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { api } from '../../config/api';
import moment from 'moment';

const IncidentReports = ({user}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        api.get('documents/getallincidentreport')
            .then(response => {
                console.log(response.data)
                setData(response.data)
            }).catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Reporter</TableCell>
                            <TableCell>Address</TableCell>
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
                                {row.lat}, {row.lon}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {moment(row.created_at).format("LL")}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => location.href = `/viewincidentreport?id=${row.id}`}>View</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default IncidentReports;

if (document.getElementById('IncidentReports')) {
    const element = document.getElementById('IncidentReports')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<IncidentReports {...props} />, document.getElementById('IncidentReports'))
}