import React, { FunctionComponent, DragEventHandler } from "react";
import { useDispatch, useSelect } from "@wordpress/data";

import styles from "./header.styl";
import { Title } from "./title";
import { Content } from "./content";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";

interface Props {
	id: BlockId;
	onDragStart?: DragEventHandler;
	onDragEnd?: DragEventHandler;
	ancestor_is_moving: boolean;
	moving: boolean;
	is_moving: boolean;
	can_move: boolean;
}

export const Header: FunctionComponent<Props> = props => {
	const {
		id,
		onDragStart,
		onDragEnd,
		ancestor_is_moving,
		moving,
		is_moving,
		can_move,
	} = props;

	const is_detached = useSelect(select => select(store_slug).isDetached());

	const block_info_displayed = useSelect(select =>
		select(store_slug).getBlockInfoDisplayed()
	);

	const { selectBlock } = useDispatch("core/block-editor");

	return (
		<div
			className={className({
				[styles.container]: true,
				[styles.ancestor_is_moving]: ancestor_is_moving,
				[styles["no-moving"]]: !moving,
				[styles.is_moving]: is_moving,
				[styles.can_move]: can_move,
				[styles["no-can_move"]]: !can_move,
				[styles.is_detached]: is_detached,
			})}
			draggable={can_move}
			onClick={() => selectBlock(id)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<div className={styles.content}>
				<Title id={id} />

				{(block_info_displayed === "title_content" ||
					block_info_displayed === "content") && <Content id={id} />}
			</div>
		</div>
	);
};
