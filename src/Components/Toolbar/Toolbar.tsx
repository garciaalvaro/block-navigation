import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";

import "./Toolbar.styl";
import { store_slug } from "utils/data";
import { Div, Button } from "utils/Components";
import { ToolbarMovingBlock } from "./ToolbarMovingBlock";

export const Toolbar: React.ComponentType = props => {
	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);
	const { resetMoving } = useDispatch(store_slug);

	return (
		<Div id="moving_by_click_toolbar">
			<ToolbarMovingBlock block_name={moving_block.block_name} />

			<Button
				className={["button-text", "button-cancel_move"]}
				onClick={resetMoving}
			>
				{__("Cancel Move")}
			</Button>
		</Div>
	);
};
