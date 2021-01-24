import React, { useState, useEffect } from "react";
import { getCountryInfo, getCountriesData } from "./api";
import app from "./app";

test("Async fetch api to get today cases", async () => {
	expect.assertions(6);
	const data = await getCountryInfo("https://disease.sh/v3/covid-19/all");
	expect(data).toHaveProperty("cases");
	expect(data).toHaveProperty("deaths");
	expect(data).toHaveProperty("recovered");
	expect(data).toHaveProperty("todayCases");
	expect(data).toHaveProperty("todayDeaths");
	expect(data).toHaveProperty("todayRecovered");
});

test("Async fetch api to get one country cases", async () => {
	expect.assertions(2);
	const data = await getCountryInfo("https://disease.sh/v3/covid-19/countries/kor");
	console.log(data);
	expect(data).toHaveProperty("countryInfo");
	const countryInfo = data.countryInfo;
	expect(countryInfo).toHaveProperty("iso2");
});

// test("useEffect that returns the info in a beautiful way", () => {
// 	expect.assertions(3);
// 	const { loading, countryInfo, error } = useCountryInfo("https://disease.sh/v3/covid-19/all");
// 	expect(loading).tobeFalsy();
// 	expect(countryInfo).toHaveLength(221);
// 	expect(error).toBeNull();
// });

test("api to get all countries", async () => {
	expect.assertions(2);
	const { sortedData, countries } = await getCountriesData();
	expect(sortedData).toHaveLength(221);
	expect(countries).toHaveLength(221);
});
