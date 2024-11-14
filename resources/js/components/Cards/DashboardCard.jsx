import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const DashboardCard = ({ title, count, borderColor }) => {
    return (
        <Card
            sx={{
                minWidth: 300,
                borderLeftWidth: 5,
                borderLeftColor: {borderColor},
            }}
        >
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 24, fontWeight: 700, }}
                >
                    {title}
                </Typography>
                <Typography variant="h4" fontWeight={700}>{count}</Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
