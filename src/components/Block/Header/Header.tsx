import React, { FunctionComponent, DragEventHandler } from "react";
import { useDispatch } from "@wordpress/data";

import styles from "./Header.styl";
import { Title } from "../Title";
import { Body } from "../Body";
import { className } from "@/utils/tools";

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

	const { selectBlock } = useDispatch("core/block-editor");

	return (
		<div
			className={className({
				[styles.container]: true,
				[styles.ancestor_is_moving]: ancestor_is_moving,
				[styles.moving]: moving,
				[styles["no-moving"]]: !moving,
				[styles.is_moving]: is_moving,
				[styles["no-is_moving"]]: !is_moving,
				[styles.can_move]: can_move,
				[styles["no-can_move"]]: !can_move,
			})}
			draggable={can_move}
			onClick={() => selectBlock(id)}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<div className={styles.content}>
				<Title id={id} />

				<Body id={id} />
			</div>
		</div>
	);
};
