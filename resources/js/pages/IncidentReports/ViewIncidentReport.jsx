import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
// import { Circle, Marker, Popup, useMapEvents } from 'react-leaflet';
import { api } from '../../config/api';
import {
    Circle,
    MapContainer,
    TileLayer,
    useMap,
    useMapEvents,
    Marker,
    Popup
} from "react-leaflet";
import L from "leaflet";

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

const ViewIncidentReport = ({id}) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        api.get(`documents/getincidentreport?id=${id}`)
            .then((response) => {
                setData(response.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    return (
        <div className="h-60 lg:h-36 w-full">
            <MapContainer
                style={{ height: "10%", width: "100%" }}
                center={[15.3147512, 119.9984387]}
                zoom={14.5}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {data && (
                    <Circle
                        center={[
                            Number(data.lat),
                            Number(data.lon),
                        ]}
                        pathOptions={{ color: "orange" }}
                        radius={100}
                    />
                )}
                {/* {areas.length > 0 &&
                    areas.map((item, index) => {
                        console.log(item);
                        return (
                        );
                    })}} */}
            </MapContainer>
        </div>
    );
}

export default ViewIncidentReport;

if (document.getElementById("ViewIncidentReport")) {
    const element = document.getElementById("ViewIncidentReport")
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<ViewIncidentReport {...props} />, document.getElementById("ViewIncidentReport"))
}