import {
	Fragment,
	useEffect,
	useCallback,
	useContext,
	useRef
} from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { FixedSizeList as List } from "react-window";

import "./ViewNavigation.styl";
import { store_slug } from "utils/data";
import { Div } from "utils/Components";
import { Block } from "../Block/Block";
import { Toolbar } from "../Toolbar/Toolbar";
import { ContextContainer } from "../App/AppContainer";
import { useBlockIds } from "./useBlockIds";
import { useScrollTo } from "./useScrollTo";

export const ViewNavigation: React.ComponentType = () => {
	const { container_height, container_width } = useContext(ContextContainer);

	const list_ref = useRef(null);

	const block_ids = useBlockIds();

	const moving_block = useSelect<State["moving_block"]>(select =>
		select(store_slug).getMovingBlock()
	);

	const { resetMoving } = useDispatch(store_slug);

	const onDrop = useCallback(resetMoving, [resetMoving]);

	useScrollTo({ block_ids, list_ref: list_ref.current });

	useEffect(() => {
		if (moving_block) {
			document.addEventListener("drop", onDrop);
		} else {
			document.removeEventListener("drop", onDrop);
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
