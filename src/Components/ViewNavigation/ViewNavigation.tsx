import React, { FunctionComponent } from "react";
import {
	Fragment,
	useEffect,
	useCallback,
	useContext,
	useRef,
} from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { FixedSizeList as List } from "react-window";

import "./ViewNavigation.styl";
import { Div } from "@/utils/components";
import { Block } from "../Block";
import { Toolbar } from "../Toolbar";
import { ContextContainer } from "../App/AppContainer";
import { useBlockIds } from "./useBlockIds";
import { useScrollTo } from "./useScrollTo";

export const ViewNavigation: FunctionComponent = () => {
	const { container_height, container_width } = useContext(ContextContainer);

	const list_ref = useRef(null);

	const block_ids = useBlockIds();

	const moving_block = useSelect(select =>
		select("melonpan/block-navigation").getMovingBlock()
	);

	const { resetMoving } = useDispatch("melonpan/block-navigation");

	const onDrop = useCallback(resetMoving, [resetMoving]);

	useScrollTo({ block_ids, list_ref: list_ref.current });

	useEffect(() => {
		const onDropHandler = () => onDrop();

		if (moving_block) {
			document.addEventListener("drop", onDropHandler);
		} else {
			document.removeEventListener("drop", onDropHandler);
		}
	}, [moving_block]);

	return (
		<Fragment>
			<Toolbar />

			<Div id="navigation">
				<List
					outerRef={list_ref}
					height={container_height - 50}
					width={container_width}
					itemCount={block_ids.length}
					itemSize={52}
					itemKey={index => block_ids[index]}
					itemData={{ block_ids }}
					overscanCount={20}
				>
					{Block}
				</List>
			</Div>
		</Fragment>
	);
};
