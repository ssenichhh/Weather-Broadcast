import React, { useEffect, useState } from "react";
import { AreaChart, Card, Title } from "@tremor/react";

function AreaChartCard({ weatherDetails }) {
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
                "Temperature (C)": weatherDetails?.hourly?.temperature_2m[i],
            }))
        );
    }, [weatherDetails]);

    return (
        <Card className="!bg-gray-100">
            <Title className="!text-black">Temperature over time (C)</Title>
            <AreaChart
                data={chartData}
                index="Time"
                categories={["Temperature (C)"]}
                color="indigo"
            />
        </Card>
    );
}

export default AreaChartCard;