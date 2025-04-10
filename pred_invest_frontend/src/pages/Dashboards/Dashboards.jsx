import {useEffect, useRef, useState} from "react";
import Loader from "@/components/utils/loader/Loader";
import {notification, Select} from "antd";
import "./Dashboards.css"
import {fetchDashboards, fetchDataTypes} from "@/auth-api.js";
import {formatDashboardResponse, formatDataTypeResponse} from "@/utils/dashboards.js";
import {showErrorNotification} from "@/utils/notifications.js";
import Dashboard from "@/components/dashboards/Dashboard.jsx";


export default function MyDashboards() {
    const [data, setData] = useState([]);
    const [dataType, setDataType] = useState(null);
    const [dataTypes, setDataTypes] = useState([]);
    const [chartType, setChartType] = useState("line");
    const [duration, setDuration] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [dataTypeChosen, setDataTypeChosen] = useState(false);
    const [chartTypeChosen, setChartTypeChosen] = useState(false);
    const [durationChosen, setDurationChosen] = useState(false);

    const [api, contextHolder] = notification.useNotification();


    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        (async () => {
            try {
                let dataTypes = await fetchDataTypes()
                setDataTypes(formatDataTypeResponse(dataTypes))
            } catch (error) {
                setError(error);
            }
        })()

    }, []);

    useEffect(() => {
        (async () => {
            if (dataType && duration) {
                setLoading(true);
                setError(null);
                try {
                    let response = await fetchDashboards(dataType, "close", duration)
                    const formatedResponse = formatDashboardResponse(response, duration);
                    setData(formatedResponse);
                    setChartTypeChosen(true)
                } catch (error) {
                    setError(error);
                }
            }
            setLoading(false);

        })()
    }, [dataType, duration]);


    if (loading) return <Loader/>;
    if (error) {
        showErrorNotification(api, "An error occurred while loading the dashboard! Please try again later.")
    }

    return (
        <>
            {contextHolder}
            <div className="my-5 container">
                <div className="d-flex gap-4 mb-4">
                    <Select
                        value={dataTypeChosen ? dataType : undefined}
                        onChange={(value) => {
                            setDataType(value)
                            setDataTypeChosen(true);
                        }}
                        showSearch
                        optionFilterProp="label"
                        options={dataTypes}
                        className="dashboard-filter"
                        placeholder={!dataTypeChosen ? "Choose ticker" : undefined}
                    >
                    </Select>

                    <Select
                        value={chartTypeChosen ? chartType : undefined}
                        onChange={(value) => {
                            setChartType(value)
                            setChartTypeChosen(true)
                        }}
                        optionFilterProp="label"
                        options={
                            [
                                {
                                    value: "line",
                                    label: "Line",
                                },

                                {
                                    value: "bar",
                                    label: "Bar",
                                },
                            ]
                        }
                        className="dashboard-filter"
                        placeholder={!chartTypeChosen ? "Plot type" : undefined}
                    >
                    </Select>

                    <Select
                        value={durationChosen ? duration : undefined}
                        onChange={(value) => {
                            setDuration(value)
                            setDurationChosen(true);
                        }}
                        optionFilterProp="label"
                        options={
                            [
                                {
                                    value: "week",
                                    label: "Week",
                                },

                                {
                                    value: "month",
                                    label: "Month",
                                },
                            ]
                        }
                        className="dashboard-filter"
                        placeholder={!durationChosen ? "Choose duration" : undefined}
                    >
                    </Select>
                </div>
                <div className="d-flex flex-column gap-4">
                    <Dashboard data={data} dataType={dataType} chartType={chartType} duration={duration}/>
                </div>


            </div>

        </>
    );
}
