import getTodayInfo from "./api";
import app from "./app";

test("api to get today cases", async () => {
	expect.assertions(6);
	const data = await getTodayInfo();
	expect(data).toHaveProperty("cases");
	expect(data).toHaveProperty("deaths");
	expect(data).toHaveProperty("recovered");
	expect(data).toHaveProperty("todayCases");
	expect(data).toHaveProperty("todayDeaths");
	expect(data).toHaveProperty("todayRecovered");
});

test("api to get all countries", async () => {
	expect.assertions(1);
	const data = await app.getCountriesData();
	expect(data).toHaveLength(221);
});
