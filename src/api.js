import React, { useState, useEffect } from "react";
import { buildChartData } from "./util";

export const getTodayInfo = async () => {
	try {
		const url = "https://disease.sh/v3/covid-19/all";
		const response = await fetch(url);
		const data = await response.json();
		// console.log("data: ", data);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useTodayInfo = () => {
	const [loading, setLoading] = useState(true);
	const [todayInfo, setTodayInfo] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		getTodayInfo()
			.then((info) => {
				setTodayInfo(info);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return {
		loading,
		todayInfo,
		error,
	};
};

const getCovidRecord = async () => {
	try {
		const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
		const response = await fetch(url);
		const data = await response.json();

		// console.log(data);

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useCovidRecord = (casesType) => {
	const [loading, setLoading] = useState(true);
	const [covidRecord, setCovidRecord] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		getCovidRecord()
			.then((data) => {
				let chartData = buildChartData(data, casesType);
				setCovidRecord(chartData);
				// console.log(data);
				// console.log(chartData);
				console.log(covidRecord);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [casesType]);

	// console.log(covidRecord);

	return { loading, covidRecord, error };
};

// export default getTodayInfo;
