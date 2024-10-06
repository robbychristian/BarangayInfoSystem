import * as React from "react";
import ReactDOM from "react-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Badge, Button, Menu, MenuItem, Tooltip } from "@mui/material";

// ICONS
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MedicationIcon from "@mui/icons-material/Medication";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ArticleIcon from '@mui/icons-material/Article';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { ToastContainer, toast } from "react-toastify";
import {
    AccountCircle,
    BarChart,
    Edit,
    Lock,
    LockOutlined,
    Logout,
    ManageAccounts,
} from "@mui/icons-material";
import { api } from "../config/api";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Navbar({ auth, role, user }) {
    const userObject = user != undefined ? JSON.parse(user) : "";
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [inventoryNotif, setInventoryNotif] = React.useState(0);
    const [inventoryInitial, setInventoryInitial] = React.useState(0);
    const [medicineRequest, setMedicineRequest] = React.useState(0);
    const [medicineInitial, setMedicineInitial] = React.useState(0);
    const [userRequest, setUserRequest] = React.useState(0);
    const [userRequestInitial, setUserRequestInitial] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfileMenu = Boolean(anchorEl);
    const getAuthToken = () => {
        // Assuming your authentication token is stored in a cookie named 'token'
        return document.cookie.replace("XSRF-TOKEN=", "");
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleOpenProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseProfileMenu = () => {
        setAnchorEl(null);
    };

    const upperNavbar =
        role == 1
            ? [
                  {
                      name: "Dashboard",
                      url: "home",
                      icon: <BarChart />,
                  },
                  {
                      name: "Cedula Certificates",
                      url: "cedulacertificates",
                      icon: (
                              <ArticleIcon />
                      ),
                  },
                  {
                      name: "User Management",
                      url: "usermanagement",
                      icon: (
                              <PeopleAltIcon />
                      ),
                  },
              ]
            : role == 2
            ? [
                {
                    name: "Dashboard",
                    url: "home",
                    icon: <BarChart />,
                },
                {
                    name: "Cedula Certificates",
                    url: "cedulacertificates",
                    icon: (
                            <ArticleIcon />
                    ),
                },
              ]
            : [
                  //   {
                  //       name: "Dashboard",
                  //       url: "userdashboard",
                  //       icon: (
                  //           <Badge badgeContent={medicineRequest} color="primary">
                  //               <VaccinesIcon color="action" />
                  //           </Badge>
                  //       ),
                  //   },
                  {
                      name: "Dashboard",
                      url: "home",
                      icon: <BarChart />,
                  },
                  {
                    name: "Cedula Certificates",
                    url: "cedulacertificates",
                    icon: (
                            <ArticleIcon />
                    ),
                },
              ];

    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        console.log(auth);
        console.log(user);
        console.log(role);
        console.log(getAuthToken());
    }, []);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ToastContainer />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {auth && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <div className="flex justify-between w-full">
                        {/* NAVBAR CONTENT START */}
                        <Typography variant="h6" noWrap component="div">
                            Bayani Act
                        </Typography>
                        <div className="flex gap-4 justify-center items-center">
                            {auth ? (
                                <>
                                    <Typography>
                                        {userObject.first_name}{" "}
                                        {userObject.last_name &&
                                            userObject.last_name}
                                    </Typography>
                                    {/* <div className="bg-white rounded-full">
                                        <Avatar
                                            sx={{ width: 24, height: 24 }}
                                            alt="Remy Sharp"
                                            src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                                        />
                                    </div> */}

                                    <Tooltip title="Account">
                                        <IconButton
                                            onClick={handleOpenProfileMenu}
                                            size="small"
                                            aria-controls={
                                                openProfileMenu
                                                    ? "account-menu"
                                                    : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                                openProfileMenu
                                                    ? "true"
                                                    : undefined
                                            }
                                        >
                                            <Avatar
                                                sx={{ width: 35, height: 35 }}
                                            >
                                                {userObject.first_name[0]}
                                                {userObject.last_name != null
                                                    ? userObject.last_name[0]
                                                    : ""}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>

                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={openProfileMenu}
                                        onClose={handleCloseProfileMenu}
                                        onClick={handleCloseProfileMenu}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: "visible",
                                                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                                mt: 1.5,
                                                "& .MuiAvatar-root": {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                "&::before": {
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: "background.paper",
                                                    transform:
                                                        "translateY(-50%) rotate(45deg)",
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{
                                            horizontal: "right",
                                            vertical: "top",
                                        }}
                                        anchorOrigin={{
                                            horizontal: "right",
                                            vertical: "bottom",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                location.href = `/profile/${userObject.id}`;
                                            }}
                                        >
                                            <ListItemIcon>
                                                <AccountCircle />
                                            </ListItemIcon>
                                            Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                location.href = "/editprofile";
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Edit />
                                            </ListItemIcon>
                                            Edit Profile
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                location.href = "/editpassword";
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Lock />
                                            </ListItemIcon>
                                            Change Password
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem
                                            onClick={() => {
                                                setAnchorEl(null);
                                                api.post("logout", {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                        Authorization: `Bearer ${getAuthToken}`,
                                                    },
                                                }).then((response) => {
                                                    location.href = "/login";
                                                });
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        className="cursor-pointer"
                                        variant="body1"
                                        noWrap
                                        component="div"
                                        onClick={() =>
                                            (location.href = "/login")
                                        }
                                    >
                                        Login
                                    </Typography>
                                    <Typography
                                        className="cursor-pointer"
                                        variant="body1"
                                        noWrap
                                        component="div"
                                        onClick={() =>
                                            (location.href = "/register")
                                        }
                                    >
                                        Register
                                    </Typography>
                                </>
                            )}
                        </div>
                        {/* NAVBAR CONTENT END */}
                    </div>
                </Toolbar>
            </AppBar>
            {auth && (
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {upperNavbar.map((item, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                sx={{ display: "block" }}
                                onClick={() => (location.href = `/${item.url}`)}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {["Logout"].map((text, index) => (
                            <ListItem
                                key={text}
                                disablePadding
                                sx={{ display: "block" }}
                                onClick={() =>
                                    api
                                        .post("logout", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                                Authorization: `Bearer ${getAuthToken}`,
                                            },
                                        })
                                        .then((response) => {
                                            location.href = "/login";
                                        })
                                }
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        {index % 2 === 0 ? (
                                            <InboxIcon />
                                        ) : (
                                            <MailIcon />
                                        )}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={{ opacity: open ? 1 : 0 }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            )}
            <Box component="main" sx={{ flexGrow: 1, p: auth ? 3 : 0 }}>
                <DrawerHeader />
            </Box>
        </Box>
    );
}

if (document.getElementById("navbar")) {
    const element = document.getElementById("navbar");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <Navbar
            auth={props.auth === "true"}
            role={props.role}
            user={props.user}
        />,
        document.getElementById("navbar")
    );
}
