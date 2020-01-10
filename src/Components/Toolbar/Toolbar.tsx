import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import "./Toolbar.styl";
import { store_slug } from "utils/data";
import { Div, Button } from "utils/Components";
import { BlockHeader } from "../BlockHeader/BlockHeader";

export const Toolbar: React.ComponentType = props => {
	const { resetMoving } = useDispatch(store_slug);

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	const moving_type = useSelect<State["moving_type"]>(select =>
		select(store_slug).getMovingType()
	);

	if (moving_type !== "by_click" || !moving_block) {
		return null;
	}

	return (
		<Div id="moving_by_click_toolbar">
			<BlockHeader id={moving_block.id} />

			<Button
				className={["button-text", "button-cancel_move"]}
				onClick={resetMoving}
			>
				{__("Cancel Move")}
			</Button>
		</Div>
	);
};
