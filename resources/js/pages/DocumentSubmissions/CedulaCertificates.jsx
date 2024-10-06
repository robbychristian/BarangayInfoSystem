import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import { api } from "../../config/api";
import { toast } from "react-toastify";

const CedulaCertificates = ({user}) => {
    const userObject = JSON.parse(user)
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0);

    useEffect(() => {
        if (userObject.user_role == 1) {
            api.get("documents/getallcedulas")
                .then((response) => {
                    setData(response.data);
                })
                .catch((err) => {
                    console.log(err.response);
                });
        } else if (userObject.user_role == 3) {
            api.get(`documents/getresidentcedulas?user_id=${userObject.id}`)
                .then((response) => {
                    setData(response.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }, [refresher]);

    return (
        <>
            <div className="w-full flex justify-end">
                <Button variant="contained" color="success" onClick={() => {
                    location.href = "/addcedula"
                }}>Add Document</Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
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
                                <TableCell>{row.user?.email}</TableCell>
                                <TableCell>
                                    {row.cedula_status == "Pending" ? (
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                            color="warning"
                                        >
                                            Pending
                                        </Typography>
                                    ) : row.cedula_status == "Verified" ? (
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                            color="success"
                                        >
                                            Verified
                                        </Typography>
                                    ) : (
                                        <Typography
                                            variant="caption"
                                            fontWeight={600}
                                            color="error"
                                        >
                                            Expired
                                        </Typography>
                                    )}
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
};

export default CedulaCertificates;

if (document.getElementById("CedulaCertificates")) {
    const element = document.getElementById("CedulaCertificates");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <CedulaCertificates {...props} />,
        document.getElementById("CedulaCertificates")
    );
}
