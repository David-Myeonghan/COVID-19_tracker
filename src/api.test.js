import React, { useState, useEffect } from "react";
import { getCountryInfo, getCountriesData, getCovidRecord } from "./api";
import app from "./app";

describe("Basic API Test", () => {
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
		expect(data).toHaveProperty("countryInfo");
		const countryInfo = data.countryInfo;
		expect(countryInfo).toHaveProperty("iso2");
	});

	test("Async fetch api to get cases by caseType for the last 120 days", async () => {
		expect.assertions(2);
		const { cases, deaths, recovered } = await getCovidRecord();
		expect(cases).toHaveProperty("1/1/21");
		expect(cases).toMatchObject({ "1/1/21": expect.any(Number) });
	});

	test("Async fetch api to get all countries sorted by the number of cases in a descending order", async () => {
		expect.assertions(2);
		const { sortedData, countries } = await getCountriesData();
		expect(sortedData).toHaveLength(221);
		expect(countries).toHaveLength(221);
	});
});
