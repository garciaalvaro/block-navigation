import { useSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

import "./ViewNavigation.styl";
import { Div } from "utils/Components";
import { store_slug } from "utils/data";
import { BlockList } from "../BlockList/BlockList";
import { Toolbar } from "../Toolbar/Toolbar";

export const ViewNavigation: React.ComponentType = props => {
	const is_moving = useSelect<boolean>(select => select(store_slug).isMoving());

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	// When the list order changes we rerender the component.
	// We use getBlockOrder selector instead of getBlocks
	// to keep parent rerenders to a minimum.
	const root_ids = useSelect(select =>
		select("core/block-editor").getBlockOrder()
	);

	return (
		<Fragment>
			{is_moving && moving_type === "by_click" && <Toolbar />}

			<Div id="navigation">
				<BlockList ids={root_ids} level={0} parent_id="" />
			</Div>
		</Fragment>
	);
};
