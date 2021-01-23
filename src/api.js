import React, { useState, useEffect } from "react";
import { buildChartData, sortData } from "./util";

// In order to get Today's info, and each Country's info when clicked a country in dropdown on main page.
export const getCountryInfo = async (url) => {
	try {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const useCountryInfo = (url) => {
	const [loading, setLoading] = useState(true);
	const [countryInfo, setCountryInfo] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		getCountryInfo(url)
			.then((info) => {
				setCountryInfo(info);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [url]);

	return {
		loading,
		countryInfo,
		error,
	};
};

// export const getTodayInfo = async () => {
// 	try {
// 		const url = "https://disease.sh/v3/covid-19/all";
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		// console.log("data: ", data);

// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// export const useTodayInfo = () => {
// 	const [loading, setLoading] = useState(true);
// 	const [todayInfo, setTodayInfo] = useState({});
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		getTodayInfo()
// 			.then((info) => {
// 				setTodayInfo(info);
// 				setLoading(false);
// 			})
// 			.catch((error) => {
// 				setError(error);
// 				setLoading(false);
// 			});
// 	}, []);

// 	return {
// 		loading,
// 		todayInfo,
// 		error,
// 	};
// };

// In order to get the record for the last 120 days to draw line graph.
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
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, [casesType]);

	return { loading, covidRecord, error };
};

const getCountriesData = async () => {
	try {
		const url = "https://disease.sh/v3/covid-19/countries";
		const response = await fetch(url);
		const data = await response.json(); // this also needs to be awaited!!

		// Don't wanna use all of 'data', wanna restructure it.
		const countries = data.map((country) => ({
			name: country.country,
			value: country.countryInfo.iso2,
		}));
		const sortedData = sortData(data); // Sort by cases in descending order.

		return { sortedData, countries };
	} catch (error) {
		console.log("getCountriesData: ", error);
	}
};

export const useCountriesData = () => {
	const [loading2, setLoading] = useState(true);
	const [sortedData, setSortedData] = useState([]);
	// const [data, setData] = useState({});
	const [countries2, setCountries] = useState([]);
	const [error2, setError] = useState(null);

	useEffect(() => {
		getCountriesData()
			.then(({ sortedData, countries }) => {
				// console.log(data);
				setSortedData(sortedData);
				// setData(data.data);
				setCountries(countries);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return {
		loading2,
		sortedData,
		// data,
		countries2,
		error2,
	};
};
