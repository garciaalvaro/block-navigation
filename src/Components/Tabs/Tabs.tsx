import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";

import styles from "./Tabs.styl";
import { Tab } from "./Tab";

const tabs: { value: State["view"]; label: string }[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") },
];

export const Tabs: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			{tabs.map(tab => (
				<Tab key={tab.value} {...tab}>
					{tab.label}
				</Tab>
			))}
		</div>
	);
};
