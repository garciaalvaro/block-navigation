import React from "react";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

import "./Tabs.styl";
import { Div } from "utils/Components";
import { store_slug } from "utils/data";
import { Tab } from "./Tab";

interface WithSelectProps extends Pick<State, "view"> { }

const tabs: { value: State["view"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") }
];

export const Tabs: React.ComponentType = withSelect<WithSelectProps>(
	select => ({
		view: select(store_slug).getView()
	})
)(props => {
	return (
		<Div id="tabs">
			{tabs.map(({ value, label }) => (
				<Tab key={value} tab_value={value} tab_label={label}>
					{label}
				</Tab>
			))}
		</Div>
	);
});
