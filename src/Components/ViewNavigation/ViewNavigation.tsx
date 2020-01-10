import { Fragment } from "@wordpress/element";

import "./ViewNavigation.styl";
import { Div } from "utils/Components";
import { Block } from "../Block/Block";
import { Toolbar } from "../Toolbar/Toolbar";
import { useBlocks } from "./useBlocks";
import { BlockDropAreas } from "../BlockDropAreas/BlockDropAreas";

export const ViewNavigation: React.ComponentType = props => {
	const blocks = useBlocks();

	return (
		<Fragment>
			<Toolbar />

			<Div id="navigation">
				<Div id="navigation-drop_overlay">
					{blocks.map(({ id, drop_areas }) => (
						<BlockDropAreas key={id} drop_areas={drop_areas} />
					))}
				</Div>

				<Div id="navigation-blocks">
					{blocks.map(({ id, drop_areas }) => (
						<Block key={id} id={id} drop_areas={drop_areas} />
					))}
				</Div>
			</Div>
		</Fragment>
	);
};
