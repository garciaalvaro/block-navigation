import React from "react";
import { withSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

import "./ViewNavigation.styl";
import { Div } from "utils/Components";
import { store_slug } from "utils/data";
import { BlockList } from "../BlockList/BlockList";
import { Toolbar } from "../Toolbar/Toolbar";

interface WithSelectProps extends Pick<State, "moving_type"> {
	moving: boolean;
	root_ids: ReturnType<
		typeof import("wordpress__block-editor/store/selectors").getBlockOrder
	>;
}

export const ViewNavigation = withSelect<WithSelectProps>(select => ({
	moving: select(store_slug).isMoving(),
	moving_type: select(store_slug).getMovingType(),
	root_ids: select("core/block-editor").getBlockOrder()
}))(props => {
	const { moving, moving_type, root_ids } = props;

	return (
		<Fragment>
			{moving && moving_type === "by_click" && <Toolbar />}
			<Div id="navigation">
				<BlockList ids={root_ids} level={0} parent_id="" />
			</Div>
		</Fragment>
	);
});
