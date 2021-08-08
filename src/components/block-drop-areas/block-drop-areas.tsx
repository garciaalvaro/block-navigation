import React from "react";
import type { FunctionComponent } from "react";
import { useContext } from "@wordpress/element";

import styles from "./styles.styl";
import { DropArea } from "./components";
import { context } from "../block";

export const BlockDropAreas: FunctionComponent = () => {
	const { drop_areas } = useContext(context);

	if (!drop_areas.length) {
		return null;
	}

	return (
		<div
			className={styles.container}
			onDragLeave={e => {
				// https://stackoverflow.com/a/54271161 | CC BY-SA 3.0
				// Prevent drag leave from triggering when switching
				// between drop areas.
				if (e.currentTarget.contains(e.relatedTarget as Node)) {
					e.stopPropagation();
				}
			}}
		>
			{drop_areas.map(drop_area => (
				<DropArea
					key={drop_area.id}
					id={drop_area.id}
					index={drop_area.index}
					level={drop_area.level}
				/>
			))}
		</div>
	);
};
