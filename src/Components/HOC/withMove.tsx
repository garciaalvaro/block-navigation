import React from "react";
import { withSelect, withDispatch } from "@wordpress/data";
import { compose } from "@wordpress/compose";
import { useState } from "@wordpress/element";

import { store_slug } from "utils/data";

export interface WithMoveProps {
	moving_is_over: boolean;
	toggleMovingIsOver: Function;
	moveBlock: Function;
}

interface WithDispatchProps extends Pick<ActionCreators, "resetMoving"> {
	moveBlockToPosition: typeof import("wordpress__block-editor/store/actions").moveBlockToPosition;
}

interface WithSelectProps extends Pick<State, "moving_block"> { }

interface OwnProps
	extends Pick<BlockProps, "can_receive_drop" | "parent_id" | "index"> { }

export const withMove = compose(
	withDispatch<WithDispatchProps>(dispatch => ({
		moveBlockToPosition: dispatch("core/block-editor").moveBlockToPosition,
		resetMoving: dispatch(store_slug).resetMoving
	})),
	withSelect<WithSelectProps>(select => ({
		moving_block: select(store_slug).getMovingBlock()
	})),
	(Component: React.ComponentType<OwnProps & WithMoveProps>) => (
		props: OwnProps & WithSelectProps & WithDispatchProps & WithMoveProps
	) => {
		const { resetMoving, moveBlockToPosition, ...rest } = props;
		const { moving_block, can_receive_drop, parent_id, index } = rest;
		const [moving_is_over, setMovingIsOver] = useState(false);
		const toggleMovingIsOver = () => setMovingIsOver(is_over => !is_over);
		const moveBlock = () => {
			setMovingIsOver(false);
			resetMoving();

			if (can_receive_drop) {
				moveBlockToPosition(
					moving_block.id,
					moving_block.parent_id,
					parent_id,
					moving_block.parent_id === parent_id && moving_block.index < index
						? index - 1
						: index
				);
			}
		};

		return (
			<Component
				{...rest}
				moving_is_over={moving_is_over}
				toggleMovingIsOver={toggleMovingIsOver}
				moveBlock={moveBlock}
			/>
		);
	}
);
