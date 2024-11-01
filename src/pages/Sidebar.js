import { City, Country } from "country-state-city";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Card, Metric, Text } from "@tremor/react";
import AreaChartCard from "../components/AreaChartCard";
import LineChartCard from "../components/LineChartCard";
import moment from "moment/moment";

function Sidebar() {
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [selectedCity, setSelectedCity] = useState({});
    const [weatherDetails, setWeatherDetails] = useState([]);

    useEffect(() => {
        setAllCountries(
            Country.getAllCountries().map((country) => ({
                value: {
                    name: country.name,
                    latitude: country.latitude,
                    longitude: country.longitude,
                    isoCode: country.isoCode,
                },
                label: country.name,
            }))
        );
    }, []);

    const handleSelectedCountry = (option) => {
        setSelectedCountry(option);
        setSelectedCity(null);
    };

    const handleSelectedCity = (option) => {
        setSelectedCity(option);
    };

    const getWeatherDetails = async (e) => {
        e.preventDefault();
        const fetchWeather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.value.latitude}&longitude=${selectedCity.value.longitude}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weathercode,surface_pressure,windspeed_180m,winddirection_180m,temperature_180m,soil_temperature_54cm,soil_moisture_27_81cm,uv_index,uv_index_clear_sky,is_day&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timezone=GMT`
        );
        const data = await fetchWeather.json();
        setWeatherDetails(data);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar Div */}
            <div className="flex flex-col space-y-10 bg-blue-950 text-white w-64 p-4 overflow-y-auto">
                {/* Select country and city */}
                <div className="flex flex-col justify-center space-y-5">
                    <Select
                        options={allCountries}
                        value={selectedCountry}
                        onChange={handleSelectedCountry}
                    />
                    <Select
                        options={City.getCitiesOfCountry(
                            selectedCountry?.value?.isoCode
                        ).map((city) => ({
                            value: {
                                latitude: city.latitude,
                                longitude: city.longitude,
                                name: city.name,
                            },
                            label: city.name,
                        }))}
                        value={selectedCity}
                        onChange={handleSelectedCity}
                    />
                    <button
                        onClick={getWeatherDetails}
                        className="bg-green-400 w-full py-3 rounded-lg text-white text-sm font-bold hover:scale-105 transition-all duration-200 ease-in-out"
                    >
                        Get Weather
                    </button>
                </div>
                {/* Show some details */}
                <div className="flex flex-col space-y-2">
                    <p className="text-lg font-semibold">
                        {selectedCountry?.label} | {selectedCity?.label}
                    </p>
                    <p>
                        Latitude: {selectedCity?.value?.latitude} | Longitude:
                        {selectedCity?.value?.longitude}
                    </p>
                </div>
                {/* Day or Night */}
                <div className="flex items-center space-x-5">
                    <p>
                        <WbSunnyIcon />
                        {moment(
                            new Date(weatherDetails?.daily?.sunrise[0]).getTime()
                        ).format("LT")}
                    </p>
                    <p>
                        <NightlightRoundIcon />
                        {moment(
                            new Date(weatherDetails?.daily?.sunset[0]).getTime()
                        ).format("LT")}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 h-screen p-4 overflow-y-auto">
                <div className="flex items-center justify-evenly space-x-2 mt-2">
                    <Card
                        decoration="top"
                        decorationColor="red"
                        className="!bg-gray-100 !text-center"
                    >
                        <Text className="!font-semibold !text-xl">Max Temperature</Text>
                        <Metric className="!text-black !font-bold">
                            {weatherDetails?.daily?.apparent_temperature_max[0]} &#x2103;
                        </Metric>
                    </Card>
                    <Card
                        decoration="top"
                        decorationColor="green"
                        className="max-w-xs !bg-gray-100 !text-center"
                    >
                        <Text className="!font-semibold !text-xl">Min Temperature</Text>
                        <Metric className="!text-black !font-bold">
                            {weatherDetails?.daily?.apparent_temperature_min[0]} &#x2103;
                        </Metric>
                    </Card>
                    <Card
                        decoration="top"
                        decorationColor="blue"
                        className="max-w-xs !bg-gray-100 !text-center"
                    >
                        <Text className="!font-semibold !text-xl">Wind Direction</Text>
                        <Metric className="!text-black !font-bold">
                            {weatherDetails?.daily?.winddirection_10m_dominant[0]} &#176;
                        </Metric>
                    </Card>
                </div>
                {/* Charts */}
                <div className="mt-5">
                    <AreaChartCard weatherDetails={weatherDetails} />
                    <LineChartCard weatherDetails={weatherDetails} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;