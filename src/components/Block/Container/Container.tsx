import React, { FunctionComponent } from "react";
import { useDispatch, useSelect } from "@wordpress/data";
import { useRef } from "@wordpress/element";
import { ListChildComponentProps } from "react-window";

import styles from "./Container.styl";
import { Button } from "@/utils/components";
import { className } from "@/utils/tools";
import { store_slug } from "@/utils/data";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { useDrop, useIsSelected, useMovingIsOver } from "./utils";

interface Props {
	id: BlockId;
	index_global: number;
	drop_areas: DropArea[];
	ancestors_id: BlockId[];
	react_window_style: ListChildComponentProps["style"];
}

export const Container: FunctionComponent<Props> = props => {
	const {
		id,
		index_global,
		drop_areas,
		ancestors_id,
		react_window_style,
	} = props;

	const $block = useRef<HTMLDivElement | null>(null);

	const {
		resetMoving,
		expandBlock,
		collapseBlock,
		setMovingType,
		setMovingBlock,
	} = useDispatch(store_slug);

	const is_expanded = useSelect(select => select(store_slug).isExpanded(id));

	const children_length = useSelect(select =>
		select("core/block-editor").getBlockOrder(id)
	).length;

	const name = useSelect(select =>
		select("core/block-editor").getBlockName(id)
	);

	const moving_type = useSelect(select => select(store_slug).getMovingType());

	const moving_block = useSelect(select =>
		select(store_slug).getMovingBlock()
	);

	const { moving_is_over, setMovingIsOver } = useMovingIsOver();

	const is_selected = useIsSelected(id);

	const moving = !!moving_block;

	const is_moving = !!moving_block && moving_block.id === id;

	const ancestor_is_moving =
		!!moving_block && ancestors_id.includes(moving_block.id);

	const level = ancestors_id.length;

	const parent_id = level > 0 ? ancestors_id[ancestors_id.length - 1] : "";

	const index_local = useSelect(select =>
		select("core/block-editor").getBlockIndex(id, parent_id)
	);

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	const can_receive_drop = !!drop_areas.length;

	const onDrop = useDrop({
		parent_id,
		drop_areas,
		$block,
	});

	const toggleBlock = () =>
		is_expanded ? collapseBlock(id) : expandBlock(id);

	return (
		<div
			style={react_window_style}
			ref={$block}
			className={className({
				[styles.container]: true,
				[styles[`level-${level}`]]: true,
				[styles[`moving_type-${moving_type}`]]: !!moving_type,
				[styles.can_receive_drop]: can_receive_drop,
				[styles.is_selected]: is_selected,
				[styles.ancestor_is_moving]: ancestor_is_moving,
				[styles.moving]: moving,
				[styles["no-moving"]]: !moving,
				[styles.is_moving]: is_moving,
				[styles["no-is_moving"]]: !is_moving,
				[styles.can_move]: can_move,
				[styles["no-can_move"]]: !can_move,
				[styles.moving_is_over]: moving_is_over,
				[styles["no-moving_is_over"]]: !moving_is_over,
			})}
			onDragEnter={() => setMovingIsOver(true)}
			onDragLeave={() => setMovingIsOver(false)}
			onClick={event => {
				if (moving_type !== "by_click") return;

				onDrop(event);
				resetMoving();
			}}
		>
			<div className={styles.content}>
				<Header
					id={id}
					ancestor_is_moving={ancestor_is_moving}
					moving={moving}
					is_moving={is_moving}
					can_move={can_move}
					// TODO: Temporary patch for WP 5.8
					onDragEnd={() => resetMoving()}
					onDragStart={(e: React.DragEvent) => {
						if (e.dataTransfer && e.dataTransfer.setData) {
							// Needed for Firefox to work.
							// https://stackoverflow.com/a/33465176 | CC BY-SA 3.0
							e.dataTransfer.setData("text", "");
						}

						setTimeout(() => {
							setMovingBlock({
								id,
								parent_id,
								index_local,
								index_global,
								level,
								name: name || "",
							});

							setMovingType("by_drag");
						}, 0);
					}}
				/>

				{children_length > 0 && (
					<Button
						type="icon"
						className={styles.button}
						onClick={toggleBlock}
						icon={is_expanded ? "collapse" : "expand"}
					/>
				)}

				<Menu
					id={id}
					setMovingBlock={() =>
						setMovingBlock({
							id,
							parent_id,
							index_local,
							index_global,
							level,
							name: name || "",
						})
					}
				/>
			</div>
		</div>
	);
};
