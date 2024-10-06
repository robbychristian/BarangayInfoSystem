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

const UserManagement = () => {
    const [data, setData] = useState([]);
    const [refresher, setRefresher] = useState(0)

    useEffect(() => {
        api.get("usermanagement/getallresidents")
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [refresher]);

    const verifyUser = (id) => {
        api.post('usermanagement/verifyuser', {id})
            .then(response => {
                toast.success('User verified!')
                setRefresher(refresher + 1)
            }).catch(err => {
                console.log(err.response)
            })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Verified</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Gender</TableCell>
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
                                {row.first_name} {row.middle_name}{" "}
                                {row.last_name}
                            </TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>
                                {row.is_verified == 0 ? (
                                    <Typography
                                        variant="caption"
                                        fontWeight={600}
                                        color="error"
                                    >
                                        Not Verified
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="caption"
                                        fontWeight={600}
                                        color="success"
                                    >
                                        Verified
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell>
                                {row.profile.user_street},{" "}
                                {row.profile.user_barangay}
                            </TableCell>
                            <TableCell>{row.profile.user_gender}</TableCell>
                            <TableCell>
                                <Button onClick={() => verifyUser(row.id)}>Verify</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserManagement;

if (document.getElementById("UserManagement")) {
    ReactDOM.render(
        <UserManagement />,
        document.getElementById("UserManagement")
    );
}
