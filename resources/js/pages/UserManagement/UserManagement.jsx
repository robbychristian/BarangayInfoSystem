import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    TextField,
    Typography,
} from "@mui/material";
import { api } from "../../config/api";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const UserManagement = ({ user }) => {
    const userObject = JSON.parse(user);
    const [data, setData] = useState([]);
    const [formdata, setFormdata] = useState({});
    const [open, setOpen] = useState(false);
    const [refresher, setRefresher] = useState(0);

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
        api.post("usermanagement/verifyuser", { id })
            .then((response) => {
                toast.success("User verified!");
                setRefresher(refresher + 1);
            })
            .catch((err) => {
                console.log(err.response);
            });
    };

    const addBarangayOfficial = () => {
        if (formdata.password !== formdata.password_confirmation) {
            toast('Password does not match!', {
                autoClose: 3000,
                type: "error"
            })
        } else {
            api.post('usermanagement/registerbarangayofficial', formdata)
                .then((response) => {
                    console.log(response.data)
                    toast("Barangay Offical has been added!", {
                        autoClose: 3000,
                        type: "success"
                    })
                    setRefresher(refresher + 1)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    }

    return (
        <>
            <div className="w-full flex justify-end">
                {userObject.user_role == 1 && (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => setOpen(true)}
                    >
                        Add Barangay Official
                    </Button>
                )}
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Add Barangay Official"}</DialogTitle>
                <DialogContent sx={{ width: 500 }}>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="First Name"
                            value={formdata.first_name}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    first_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Middle Name"
                            value={formdata.middle_name}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    middle_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={formdata.last_name}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    last_name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Email"
                            value={formdata.email}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    email: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Password"
                            value={formdata.password}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    password: e.target.value,
                                })
                            }
                            type="password"
                        />
                    </div>
                    <div className="my-2">
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            value={formdata.password_confirmation}
                            onChange={(e) =>
                                setFormdata({
                                    ...formdata,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={() => addBarangayOfficial()}>Confirm</Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Verified</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Role</TableCell>
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
                                    {row.profile?.user_street},{" "}
                                    {row.profile?.user_barangay}
                                </TableCell>
                                <TableCell>{row.profile?.user_gender}</TableCell>
                                <TableCell>{row.user_role == 2 ? "Barangay Official" : "Resident"}</TableCell>
                                <TableCell>
                                    {row.is_verified == 0 && (
                                        <Button
                                            onClick={() => verifyUser(row.id)}
                                        >
                                            Verify
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default UserManagement;

if (document.getElementById("UserManagement")) {
    const element = document.getElementById("UserManagement");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <UserManagement {...props} />,
        document.getElementById("UserManagement")
    );
}
