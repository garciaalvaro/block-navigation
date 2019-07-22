import { Div, Button, Icon } from "utils/components";
import { BlockHeader } from "./BlockHeader";
import { ButtonMenu } from "./ButtonMenu";
import { BlockList } from "Components/BlockList/BlockList";
import { pr_store } from "utils/data/plugin";
import { DropArea } from "./DropArea";

type withStateProps = {
	is_open: boolean;
	moving_is_over: boolean;
};

type withSelectProps = {
	block: import("wordpress__blocks").BlockInstance;
	block_type: import("wordpress__blocks").Block;
	template_lock: string | undefined;
	moving_block: State["moving_block"];
	moving_can_be_sibling: boolean;
	is_selected: ReturnType<Selectors["isSelected"]>;
};

type ParentProps = {
	id: string;
	parent_id: string;
	level: number;
	index: number;
};

type Props = withStateProps &
	withSelectProps &
	ParentProps & { setState(obj: any): void };

const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Fragment } = wp.element;

export const Block = compose([
	withState<withStateProps>({ is_open: true, moving_is_over: false }),
	withSelect<withSelectProps, ParentProps>((select, { id, parent_id }) => {
		const {
			getBlock,
			getTemplateLock,
			canInsertBlockType,
			getSelectedBlockClientIds
		} = select("core/block-editor");
		const moving_block: State["moving_block"] = select(
			pr_store
		).getMovingBlock();
		const block: import("wordpress__blocks").BlockInstance = getBlock(id);

		return {
			block,
			block_type: select("core/blocks").getBlockType(
				block.name
			) as import("wordpress__blocks").Block,
			is_selected: (getSelectedBlockClientIds() as string[]).includes(id),
			is_moving: select(pr_store).isMoving(),
			template_lock: getTemplateLock(parent_id),
			moving_block,
			moving_can_be_sibling: canInsertBlockType(
				moving_block.block_name,
				parent_id
			)
		};
	})
])((props: Props) => {
	const {
		is_selected,
		is_moving,
		ancestor_is_closed,
		moving_is_over,
		index,
		moving_block,
		moving_can_be_sibling,
		parent_id,
		id,
		block,
		block_type,
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
		<Fragment>
			<Div
				classes={[
					"block",
					`level-${level}`,
					ancestor_is_closed ? "ancestor_is_closed" : null,
					moving_block.id === id ? "is_moving" : "no-is_moving",
					can_receive_drop ? "can_receive_drop" : "no-can_receive_drop",
					moving_is_over ? "moving_is_over" : "no-moving_is_over",
					can_move ? "can_move" : "no-can_move",
					is_selected ? "is_selected" : "no-is_selected"
				]}
			>
				<Div classes="block-content_area">
					<BlockHeader
						block={block}
						block_type={block_type}
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
						<Button
							classes={["button-icon", "button-toggle_list"]}
							onClick={() => setState({ is_open: !is_open })}
						>
							<Icon icon={is_open ? "collapse" : "expand"} />
						</Button>
					)}
					<ButtonMenu
						id={id}
						parent_id={parent_id}
						template_lock={template_lock}
						block={block}
						block_type={block_type}
						can_move={can_move}
						index={index}
					/>
				</Div>
				{is_moving && moving_block.id !== id && can_receive_drop && (
					<DropArea
						cancelMovingIsOver={() => setState({ moving_is_over: false })}
						toggleMovingIsOver={() =>
							setState({ moving_is_over: !moving_is_over })
						}
						index={index}
						parent_id={parent_id}
					/>
				)}
			</Div>
			{has_children && (
				<BlockList
					ids={block.innerBlocks.map(({ clientId }) => clientId)}
					level={level + 1}
					id={id}
					ancestor_is_closed={ancestor_is_closed || !is_open}
				/>
			)}
		</Fragment>
	);
});
