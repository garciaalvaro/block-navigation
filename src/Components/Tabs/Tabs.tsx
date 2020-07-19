import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";

import "./Tabs.styl";
import { Div } from "utils/components";
import { Tab } from "./Tab";

const tabs: { value: State["view"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") },
];

export const Tabs: FunctionComponent = () => {
	return (
		<Div id="tabs">
			{tabs.map(({ value, label }) => (
				<Tab key={value} tab_value={value} tab_label={label}>
					{label}
				</Tab>
			))}
		</Div>
	);
};
