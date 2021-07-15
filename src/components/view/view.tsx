import React from "react";
import type { FunctionComponent } from "react";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import type { ViewName, TabOption } from "./types";
import { useColor, useClassName } from "@/utils";
import { Tab } from "./components";
import { ViewNavigation } from "../view-navigation";
import { ViewSettings } from "../view-settings";

const tabs: TabOption[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") },
];

export const View: FunctionComponent = () => {
	const [view, setView] = useState<ViewName>("navigation");

	const color_className = useColor();
	const className = useClassName(styles.container, ...color_className);

	return (
		<div className={className}>
			<div className={styles.tabs}>
				{tabs.map(tab => (
					<Tab
						key={tab.value}
						is_active={tab.value === view}
						label={tab.label}
						onClick={() => setView(tab.value)}
					>
						{tab.label}
					</Tab>
				))}
			</div>

			{view === "navigation" ? <ViewNavigation /> : <ViewSettings />}
		</div>
	);
};
