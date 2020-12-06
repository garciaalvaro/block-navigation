import React, { FunctionComponent } from "react";
import { Fragment, useEffect, useCallback, useRef } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { FixedSizeList as List } from "react-window";

import styles from "./ViewNavigation.styl";
import { store_slug } from "@/utils/data";
import { Block } from "../Block";
import { Toolbar } from "./Toolbar";
import { useBlockIds, useScrollTo } from "./utils";

interface Props {
	container_width: number;
	container_height: number;
}

export const ViewNavigation: FunctionComponent<Props> = props => {
	const { container_height, container_width } = props;

	const $list = useRef(null);

	const block_ids = useBlockIds();

	const is_detached = useSelect(select => select(store_slug).isDetached());

	const moving_block = useSelect(select =>
		select(store_slug).getMovingBlock()
	);

	const moving_type = useSelect(select => select(store_slug).getMovingType());

	const { resetMoving } = useDispatch(store_slug);

	const onDrop = useCallback(resetMoving, [resetMoving]);

	const tab_height = is_detached ? 0 : 50;

	useScrollTo({ block_ids, $list: $list.current });

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
			{moving_type === "by_click" && <Toolbar />}

			<div className={styles.container}>
				<List
					className={styles.content}
					outerRef={$list}
					height={container_height - tab_height}
					width={container_width}
					itemCount={block_ids.length}
					itemSize={52}
					itemKey={index => block_ids[index]}
					itemData={{ block_ids }}
					overscanCount={20}
				>
					{Block}
				</List>
			</div>
		</Fragment>
	);
};
