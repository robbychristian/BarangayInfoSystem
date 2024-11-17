import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import DashboardCard from "../components/Cards/DashboardCard";
import { BarChart } from "@mui/x-charts/BarChart";
import { api } from "../config/api";

const HomePage = ({ user }) => {
    const [data, setData] = useState([])
    const [roads, setRoads] = useState([])
    const [roadCount, setRoadCount] = useState([])
    useEffect(() => {
        api.get('getalldashboarddata')
            .then((response) => {
                const tempData = response.data.incidentReportGraph;
                setRoads(tempData.map(item => item.road))
                setRoadCount(tempData.map(item => item.count))
                setData(response.data)
                console.log(response.data)
            }).catch(err => {
                console.log(err.response)
            }) 
    }, []);
    return (
        <>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="col-span-1">
                    <DashboardCard
                        borderColor={"rgb(34 197 94)"}
                        title={"REGISTERED USERS"}
                        count={data.registeredUsers}
                    />
                </div>
                <div className="col-span-1">
                    <DashboardCard
                        borderColor={"rgb(217 119 6)"}
                        title={"VERIFIED USERS"}
                        count={data.verifiedUsers}
                    />
                </div>
                <div className="col-span-1">
                    <DashboardCard
                        borderColor={"rgb(225 29 72)"}
                        title={"INCIDENT REPORTS"}
                        count={data.incidentReportCount}
                    />
                </div>
                <div className="col-span-1">
                    <DashboardCard
                        borderColor={"rgb(14 165 233)"}
                        title={"DOCUMENTS PROCESSED"}
                        count={data.totalDocuments}
                    />
                </div>
            </div>
            <div className="flex justify-between w-full my-12">
                <BarChart
                    width={700}
                    height={500}
                    xAxis={[{ data: roads, scaleType: "band" }]}
                    series={[
                        {
                            data: roadCount,
                            label: "Incident Reports",
                        },
                    ]}
                />
                <BarChart
                    width={700}
                    height={500}
                    xAxis={[{ data: ["Cedula Certificates", "Incident Complaints"], scaleType: "band" }]}
                    series={[
                        {
                            data: [data.cedulaCertificatesCount],
                            label: "Cedula Certificates",
                        },
                        {
                            data: [data.incidentComplaintCount],
                            label: "Incident Complaints",
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default HomePage;

if (document.getElementById("HomePage")) {
    const element = document.getElementById("HomePage");
    const props = Object.assign({}, element.dataset);
    ReactDOM.render(
        <HomePage {...props} />,
        document.getElementById("HomePage")
    );
}
