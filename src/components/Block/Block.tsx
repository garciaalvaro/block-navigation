import React, { FunctionComponent } from "react";
import { Fragment } from "@wordpress/element";
import { ListChildComponentProps } from "react-window";

import { DropAreas } from "./DropAreas";
import { Container } from "./Container";
import { useDropAreas, useAncestorsId } from "./utils";

interface Props {
	data: { block_ids: BlockId[] };
	index: number;
	style: ListChildComponentProps["style"];
}

export const Block: FunctionComponent<Props> = props => {
	const {
		index: index_global,
		style: react_window_style,
		data: { block_ids },
	} = props;

	const id = block_ids[index_global];

	const ancestors_id = useAncestorsId(id);

	const drop_areas = useDropAreas({
		id,
		block_ids,
		index_global,
		ancestors_id,
	});

	return (
		<Fragment>
			<Container
				id={id}
				index_global={index_global}
				drop_areas={drop_areas}
				ancestors_id={ancestors_id}
				react_window_style={react_window_style}
			/>

			<DropAreas
				drop_areas={drop_areas}
				react_window_style={react_window_style}
			/>
		</Fragment>
	);
};
