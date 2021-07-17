import React from "react";
import type { FunctionComponent } from "react";
import { Fragment } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

import styles from "./styles.styl";
import { Toolbar } from "./components/toolbar";
import { store_slug } from "@/store";
import { BlocksList } from "../blocks-list";

export const ViewNavigation: FunctionComponent = () => {
	const moving_type = useSelect(select => select(store_slug).moving_type());
	const ids = useSelect(select => select(store_slug).ids());
	const ids_visible = useSelect(select => select(store_slug).ids_visible());

	if (!ids) {
		return <Fragment>{__("Loading...")}</Fragment>;
	}

	return (
		<Fragment>
			{moving_type === "by_click" && <Toolbar />}

			<div className={styles.container}>
				{ids_visible.length === 0 ? (
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
