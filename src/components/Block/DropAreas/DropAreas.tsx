import React, { FunctionComponent } from "react";
import { ListChildComponentProps } from "react-window";

import styles from "./DropAreas.styl";
import { className } from "@/utils/tools";

interface Props {
	react_window_style: ListChildComponentProps["style"];
	drop_areas: DropArea[];
}

export const DropAreas: FunctionComponent<Props> = props => {
	const { react_window_style, drop_areas } = props;

	return (
		<div className={styles.container} style={react_window_style}>
			{drop_areas.map(({ id, level }) => (
				<div
					key={id}
					className={className([
						styles.overlay,
						styles[`level-${level}`],
					])}
				></div>
			))}
		</div>
	);
};
