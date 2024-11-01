import { Card, LineChart, Title } from "@tremor/react";
import React, { useEffect, useState } from "react";

function LineChartCard({ weatherDetails }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const hourly = weatherDetails?.hourly?.time?.map((time) =>
            new Date(time)
                .toLocaleString("en-US", { hour: "numeric", hour12: false })
                .slice(0, 24)
        );

        setChartData(
            hourly?.map((hour, i) => ({
                Time: Number(hour),
                Humidity: weatherDetails?.hourly?.relativehumidity_2m[i],
            }))
        );
    }, [weatherDetails]);
    return (
        <Card className="!bg-gray-100 mt-5">
            <Title className="!text-black">Humidity over time</Title>
            <LineChart
                data={chartData}
                index="Time"
                categories={["Humidity"]}
                colors={["yellow"]}
            />
        </Card>
    );
}

export default LineChartCard;