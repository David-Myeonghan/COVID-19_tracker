import { useState, useEffect } from "react";
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

// In order to get the record for the last 120 days to draw line graph.
export const getCovidRecord = async () => {
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

// In order to get country info to be used in drawing circles in map and also table.
export const getCountriesData = async () => {
	try {
		const url = "https://disease.sh/v3/covid-19/countries";
		const response = await fetch(url);
		const data = await response.json(); // this also needs to be awaited!!

		// Don't wanna use all of 'data', wanna restructure it in way i want to use.
		const countries = data.map((country) => ({
			name: country.country,
			value: country.countryInfo.iso2,
		}));
		// Sort by cases in descending order.
		const sortedData = sortData(data);

		return { sortedData, countries };
	} catch (error) {
		console.log("getCountriesData: ", error);
	}
};

export const useCountriesData = () => {
	const [loadingCountries, setLoading] = useState(true);
	const [sortedData, setSortedData] = useState([]);
	const [mapCountries, setCountries] = useState([]);
	const [errorCountries, setError] = useState(null);

	useEffect(() => {
		getCountriesData()
			.then(({ sortedData, countries }) => {
				setSortedData(sortedData);
				setCountries(countries);
				setLoading(false);
			})
			.catch((error) => {
				setError(error);
				setLoading(false);
			});
	}, []);

	return {
		loadingCountries,
		sortedData,
		mapCountries,
		errorCountries,
	};
};
