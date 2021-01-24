import React from "react";
import { shallow, mount, render } from "enzyme";
import InfoBox from "./InfoBox";
import { Card } from "@material-ui/core";

// Shallow testing allows us to test React components without interfering of child componets.
// it("expect to render <Card /> component", () => {
// 	const wrapper = shallow(<InfoBox />);
// 	expect(wrapper.find(Card)).to.have.lengthOf(1);
// });

it("testing", () => {
	expect(shallow(<InfoBox />).length).toEqual(1);
});
