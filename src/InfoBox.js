import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

// '...props' will include onClick
function InfoBox({ title, cases, isRed, active, total, ...props }) {
	return (
		// onClick here makes cards clickable. // (string interpolation) if this is active, add "infoBox--selected"// if it's is red, add "infoBox--red"// in BEM, __ this is element change, -- is modifying.
		<Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
			{/* if active, add the string more */}
			<CardContent>
				{/* Title */}
				<Typography className="infoBox__title" color="textSecondary">
					{title}
				</Typography>

				{/* +120k Number of cases */}
				<h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{cases}</h2>

				{/* 1.2M Total */}
				<Typography className="infoBox__total" color="textSecondary">
					{total} Total
				</Typography>
			</CardContent>
		</Card>
	);
}

export default InfoBox;
