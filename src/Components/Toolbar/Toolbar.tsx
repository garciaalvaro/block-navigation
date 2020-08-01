import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";

import "./Toolbar.styl";
import { Div, Button } from "@/utils/components";
import { BlockHeader } from "../BlockHeader";

export const Toolbar: FunctionComponent = () => {
	const { resetMoving } = useDispatch("melonpan/block-navigation");

	const moving_block = useSelect(select =>
		select("melonpan/block-navigation").getMovingBlock()
	);

	const moving_type = useSelect(select =>
		select("melonpan/block-navigation").getMovingType()
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
