import React from "react";
import type { FunctionComponent } from "react";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";

import styles from "./styles.styl";
import { setLayout } from "./utils";
import type { ViewName, TabOption } from "./types";
import {
	useColor,
	useClassName,
	useWindowSize,
	ButtonsContainer,
} from "@/utils";
import { Tab, DetachButton } from "./components";
import { ToggleBlocks } from "../button-toggle-blocks";
import { ViewNavigation } from "../view-navigation";
import { ViewSettings } from "../view-settings";
import { store_slug } from "@/store";

const tabs: TabOption[] = [
	{ value: "navigation", label: __("Navigation") },
	{ value: "settings", label: __("Settings") },
];

export const AppSidebar: FunctionComponent = () => {
	const [view, setView] = useState<ViewName>("navigation");

	const { className: color_className } = useColor();
	const className = useClassName(styles.container, color_className);

	const { is_mobile } = useWindowSize();

	const $container = setLayout();

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { stopDraggingBlocks } = useDispatch("core/block-editor");
	const { movingBlockUpdate, movingTypeReset } = useDispatch(store_slug);
	const moving_block = useSelect(select => select(store_slug).moving_block());

	useEffect(() => {
		if (!moving_block || view !== "settings") return;

		stopDraggingBlocks();
		movingBlockUpdate(null);
		movingTypeReset();
	}, [view]);

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

				<ToggleBlocks />
			</ButtonsContainer>
		</div>
	);
};
