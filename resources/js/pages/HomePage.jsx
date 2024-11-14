import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import DashboardCard from "../components/Cards/DashboardCard";
import { BarChart } from "@mui/x-charts/BarChart";

const HomePage = () => {
    return (
        <>
            <div className="flex justify-between w-full">
                <DashboardCard
                    borderColor={"rgb(34 197 94)"}
                    title={"REGISTERED USERS"}
                    count={"6"}
                />
                <DashboardCard
                    borderColor={"rgb(217 119 6)"}
                    title={"VERIFIED USERS"}
                    count={"3"}
                />
                <DashboardCard
                    borderColor={"rgb(225 29 72)"}
                    title={"INCIDENT REPORTS"}
                    count={"3"}
                />
                <DashboardCard
                    borderColor={"rgb(14 165 233)"}
                    title={"DOCUMENTS PROCESSED"}
                    count={"3"}
                />
            </div>
            <div className="flex justify-between w-full my-12">
                <BarChart
                    width={700}
                    height={500}
                    xAxis={[{ data: ["A", "B", "C"], scaleType: "band" }]}
                    series={[
                        {
                            data: [2400, 1398, 9800],
                            label: "Incident Reports",
                        },
                    ]}
                />
                <BarChart
                    width={700}
                    height={500}
                    xAxis={[{ data: ["A", "B", "C"], scaleType: "band" }]}
                    series={[
                        {
                            data: [2400, 1398, 9800],
                            label: "Incident Reports",
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
