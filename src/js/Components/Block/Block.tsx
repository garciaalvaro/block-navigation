import { Div } from "utils/components";
import { BlockHeader } from "./BlockHeader";
import { BlockList } from "Components/BlockList/BlockList";
import { pr_store } from "utils/data/plugin";
import { withDragDrop, withDragDropProps } from "./withDragDrop";

type withStateProps = {
	is_open: boolean;
};

type withSelectProps = {
	block: import("wordpress__blocks").BlockInstance;
	block_type: import("wordpress__blocks").Block | undefined | null;
	template_lock: string | undefined;
	moving: ReturnType<Selectors["isMoving"]>;
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
	moving_type: ReturnType<Selectors["getMovingType"]>;
	can_receive_drop: boolean;
	is_selected: boolean;
};

type ParentProps = {
	id: string;
	parent_id: string;
	level: number;
	index: number;
	ancestor_is_closed: boolean;
};

type Props = withDragDropProps &
	withStateProps &
	withSelectProps &
	ParentProps & { setState(obj: any): void };

const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Fragment, Component } = wp.element;

export const Block = compose([
	withState<withStateProps>({ is_open: true }),
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
		const moving_block_can_be_sibling = canInsertBlockType(
			moving_block.block_name,
			parent_id
		);

		return {
			block,
			block_type: !block
				? null
				: select("core/blocks").getBlockType(block.name),
			is_selected: (getSelectedBlockClientIds() as string[]).includes(id),
			moving: select(pr_store).isMoving(),
			moving_type: select(pr_store).getMovingType(),
			template_lock: getTemplateLock(parent_id),
			moving_block,
			can_receive_drop:
				moving_block.template_lock === "insert"
					? moving_block.parent_id === parent_id
					: !!moving_block_can_be_sibling
		};
	}),
	withDragDrop
])(
	class extends Component<Props> {
		shouldComponentUpdate(next_props: Props) {
			// When adding a new block sometimes the previous block returns undefined.
			if (!next_props.block) {
				return false;
			}

			return true;
		}

		componentDidUpdate(prev_props: Props) {
			const { moving, is_open, setState, id } = this.props;

			if (
				prev_props.moving &&
				!moving &&
				prev_props.moving_block.id === id &&
				!is_open
			) {
				setState({ is_open: true });
			}
		}

		render() {
			const {
				toggleMovingIsOver,
				moveBlock,
				is_selected,
				can_receive_drop,
				ancestor_is_closed,
				moving_type,
				moving,
				moving_is_over,
				index,
				moving_block,
				parent_id,
				id,
				block,
				block_type,
				level,
				is_open,
				setState,
				template_lock
			} = this.props;
			const has_children = !!block.innerBlocks.length;
			const can_move = template_lock !== "all";
			const toggle = () => setState({ is_open: !is_open });
			const close = () => setState({ is_open: false });
			const open = () => setState({ is_open: true });

			return (
				<Fragment>
					<Div
						onDragEnter={toggleMovingIsOver}
						onDragLeave={toggleMovingIsOver}
						onDrop={moveBlock}
						onClick={() => {
							if (moving && moving_type === "by_click") {
								moveBlock();
							}
						}}
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
						<BlockHeader
							block={block}
							block_type={block_type}
							toggle={toggle}
							close={close}
							open={open}
							can_move={can_move}
							can_receive_drop={can_receive_drop}
							template_lock={template_lock}
							parent_id={parent_id}
							index={index}
							id={id}
							has_children={has_children}
							is_open={is_open}
							// toggleMovingsIsOver={() =>
							// 	setState({ moving_is_over: !moving_is_over })
							// }
						/>

						{/* {is_moving && moving_block.id !== id && can_receive_drop && (
					<DropArea
						cancelMovingIsOver={() => setState({ moving_is_over: false })}
						toggleMovingIsOver={() =>
							setState({ moving_is_over: !moving_is_over })
						}
						index={index}
						parent_id={parent_id}
					/>
				)} */}
					</Div>
					{has_children && is_open && (
						<BlockList
							ids={block.innerBlocks.map(({ clientId }) => clientId)}
							level={level + 1}
							id={id}
							ancestor_is_closed={ancestor_is_closed || !is_open}
						/>
					)}
				</Fragment>
			);
		}
	}
);
