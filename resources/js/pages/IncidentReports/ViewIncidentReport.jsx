import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import { Circle, Marker, Popup, useMapEvents } from 'react-leaflet';
import { api } from "../../config/api";
import {
    Circle,
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
    Marker,
    Popup,
} from "react-leaflet";
import L from "leaflet";
import { Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

function LocationMarker({ coords, setCoords, center }) {
    // const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click(e) {
            setCoords(e.latlng);
        },
        // dragend(e) {
        //     map.flyTo([center.lat, center.lng], map.getZoom());
        // },
    });

    return coords === null ? null : (
        <Circle
            center={[coords.lat, coords.lng]}
            pathOptions={{ color: "red" }}
            radius={100}
        />
    );
}

const ViewIncidentReport = ({ id }) => {
    const [data, setData] = useState(null);
    const [refresher, setRefresher] = useState(0)

    useEffect(() => {
        api.get(`documents/getincidentreport?id=${id}`)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
    }, [refresher]);

    const updateStatus = (data) => {
        api.post(`documents/updateincidentreport`, {
            data
        })
            .then((response) => {
                setRefresher(refresher + 1)
                toast("Status has been updated!", {
                    autoClose: 3000,
                    type: 'success'
                })
            }).catch(err => {
                console.log((err.response))
            })
    }

    return (
        <div className="h-60 lg:h-[80vh] w-full">
            {data && (
                <>
                <div className="flex flex-row">
                <Typography variant="h4" sx={{ fontWeight: '700' }}>STATUS: </Typography>
                <Typography variant="h4" className="ml-3" sx={{ fontWeight: '700' }} color={data.status == "Pending" ? "warning" : data.status == "In Progress" ? "primary" : "success"}>{data.status}</Typography>
                </div>
                    <MapContainer
                        style={{ height: "100%", width: "100%", marginBottom: 10 }}
                        center={[Number(data.lat), Number(data.lon)]}
                        zoom={14.5}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Circle
                            center={[Number(data.lat), Number(data.lon)]}
                            pathOptions={{ color: "orange" }}
                            radius={100}
                        />
                        {/* {areas.length > 0 &&
                    areas.map((item, index) => {
                        console.log(item);
                        return (
                            );
                            })}} */}
                    </MapContainer>
                    <Button onClick={() => updateStatus(data)} variant="contained" fullWidth>Update Status</Button>
                </>
            )}
        </div>
    );
};

export default ViewIncidentReport;

if (document.getElementById("ViewIncidentReport")) {
    const element = document.getElementById("ViewIncidentReport");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <ViewIncidentReport {...props} />,
        document.getElementById("ViewIncidentReport")
    );
}
