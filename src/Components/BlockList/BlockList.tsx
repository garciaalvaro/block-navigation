import React from "react";
import { Fragment } from "@wordpress/element";

import "./BlockList.styl";
import { Block } from "../Block/Block";

interface Props extends Pick<BlockProps, "parent_id" | "level"> {
	ids: string[];
}

export const BlockList: React.ComponentType<Props> = props => {
	const { parent_id, ids, level } = props;

	return (
		<Fragment>
			{ids.map((id, index) => (
				<Block
					key={id}
					id={id}
					parent_id={parent_id}
					level={level}
					index={index}
					is_last_children={index + 1 === ids.length}
				/>
			))}
		</Fragment>
	);
};
