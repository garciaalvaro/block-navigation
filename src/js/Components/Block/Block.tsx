import { Div, Button, Icon } from "utils/components";
import { BlockHeader } from "./BlockHeader";
import { BlockList } from "Components/BlockList/BlockList";
import { pr_store } from "utils/data/plugin";

type withStateProps = {
	is_open: boolean;
	moving_is_over: boolean;
	setState: Function;
};
type withSelectProps = {
	block: import("wordpress__blocks").BlockInstance;
	template_lock: string | undefined;
	moving_block: State["moving_block"];
	moving_can_be_sibling: boolean;
};
type ParentProps = {
	id: string;
	parent_id: string;
	level: number;
	index: number;
};
type Props = withStateProps & withSelectProps & ParentProps;

const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Fragment } = wp.element;

export const Block = compose([
	withState({ is_open: true, moving_is_over: false }),
	withSelect<withSelectProps, ParentProps>((select, { id, parent_id }) => {
		const { getBlock, getTemplateLock, canInsertBlockType } = select(
			"core/block-editor"
		);
		const moving_block: State["moving_block"] = select(
			pr_store
		).getMovingBlock();

		return {
			block: getBlock(id),
			template_lock: getTemplateLock(parent_id),
			moving_block,
			moving_can_be_sibling: canInsertBlockType(
				moving_block.block_name,
				parent_id
			)
		};
	})
])((props => {
	const {
		moving_is_over,
		index,
		moving_block,
		moving_can_be_sibling,
		parent_id,
		id,
		block,
		level,
		is_open,
		setState,
		template_lock
	} = props;
	const has_children = !!block.innerBlocks.length;
	const can_move = template_lock !== "all";
	const can_receive_drop =
		moving_block.template_lock === "insert"
			? moving_block.parent_id === parent_id
			: moving_can_be_sibling;

	return (
		<Div
			classes={[
				"block",
				`level-${level}`,
				has_children ? (is_open ? "list-is_open" : "list-is_closed") : null,
				moving_block.id === id ? "is_moving" : "no-is_moving",
				can_receive_drop ? "can_receive_drop" : "no-can_receive_drop",
				moving_is_over ? "moving_is_over" : "no-moving_is_over"
			]}
		>
			<BlockHeader
				block={block}
				close={() => setState({ is_open: false })}
				open={() => setState({ is_open: true })}
				can_move={can_move}
				can_receive_drop={can_receive_drop}
				template_lock={template_lock}
				parent_id={parent_id}
				index={index}
				toggleMovingsIsOver={() =>
					setState({ moving_is_over: !moving_is_over })
				}
			/>
			{has_children && (
				<Fragment>
					<BlockList
						ids={block.innerBlocks.map(({ clientId }) => clientId)}
						level={level + 1}
						id={id}
					/>
					<Button
						classes={["button-icon", "button-toggle"]}
						onClick={() => setState({ is_open: !is_open })}
					>
						<Icon icon={is_open ? "collapse" : "expand"} />
					</Button>
				</Fragment>
			)}
		</Div>
	);
}) as React.ComponentType<Props>);
