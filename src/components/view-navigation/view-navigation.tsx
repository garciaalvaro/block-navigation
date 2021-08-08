import React from "react";
import type { FunctionComponent } from "react";
import { Fragment, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import { store_slug } from "@/store";

import styles from "./styles.styl";
import { Toolbar } from "./components/toolbar";
import { BlocksList } from "../blocks-list";

export const ViewNavigation: FunctionComponent = () => {
	const moving_type = useSelect(select => select(store_slug).moving_type());
	const ids = useSelect(select => select(store_slug).ids());

	// @ts-expect-error @wordpress/block-editor types are outdated
	const { stopDraggingBlocks } = useDispatch("core/block-editor");
	const { movingBlockUpdate, movingTypeReset } = useDispatch(store_slug);

	// Reset moving when the navigation component is unmounted
	// (detach, switch to settings, sidebar closes).
	useEffect(() => {
		return () => {
			stopDraggingBlocks();
			movingBlockUpdate(null);
			movingTypeReset();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!ids) {
		return <Fragment>{__("Loading...")}</Fragment>;
	}

	return (
		<Fragment>
			{moving_type === "by_click" && <Toolbar />}

			<div className={styles.container}>
				{ids.length === 0 ? (
					<span className={styles.no_blocks}>
						{__("There are no blocks.")}
					</span>
				) : (
					<BlocksList />
				)}
			</div>
		</Fragment>
	);
};
