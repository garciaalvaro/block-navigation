import React from "react";
import type { FunctionComponent } from "react";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import {
	useColor,
	useClassName,
	useWindowSize,
	ButtonsContainer,
} from "@/utils";

import styles from "./styles.styl";
import { useSetLayout } from "./utils";
import type { ViewName, TabOption } from "./types";
import { Tab, DetachButton } from "./components";
import { ButtonToggleBlocks } from "../button-toggle-blocks";
import { ViewNavigation } from "../view-navigation";
import { ViewSettings } from "../view-settings";

const tabs: TabOption[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") },
];

export const AppSidebar: FunctionComponent = () => {
	const [view, setView] = useState<ViewName>("navigation");

	const { className: color_className } = useColor();
	const className = useClassName(
		[color_className],
		styles.container,
		color_className
	);

	const { is_mobile } = useWindowSize();

	const $container = useSetLayout();

	return (
		<div ref={$container} className={className}>
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

			<ButtonsContainer align="left">
				{!is_mobile && <DetachButton />}

				{view === "navigation" && <ButtonToggleBlocks />}
			</ButtonsContainer>
		</div>
	);
};
