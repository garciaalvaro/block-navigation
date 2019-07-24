import { Div } from "utils/components";
import { pr_store } from "utils/data/plugin";
import { BlockHeader } from "./BlockHeader";
import { BlockList } from "Components/BlockList/BlockList";
import { BlockListDropArea } from "Components/BlockList/BlockListDropArea";
import { withMove, WithMoveProps } from "utils/HOC/withMove";

interface WithStateProps {
	is_open: boolean;
}

interface WithSelectProps {
	block: Block | undefined;
	block_type: BlockType | undefined | null;
	template_lock: string;
	moving: ReturnType<Selectors["isMoving"]>;
	moving_block: ReturnType<Selectors["getMovingBlock"]>;
	moving_type: ReturnType<Selectors["getMovingType"]>;
	can_receive_drop: boolean;
	is_selected: boolean;
}

type OwnProps = {
	id: string;
	parent_id: string;
	level: number;
	index: number;
	is_last_children: boolean;
};

type Props = OwnProps &
	WithStateProps &
	SetStateProp &
	WithMoveProps &
	WithSelectProps;

const { withSelect } = wp.data;
const { compose, withState } = wp.compose;
const { Fragment, Component } = wp.element;

export const Block: React.ComponentType<OwnProps> = compose([
	withState<WithStateProps>({ is_open: true }),
	withSelect<WithSelectProps, OwnProps>((select, { id, parent_id }) => {
		const {
			getBlock,
			getTemplateLock,
			canInsertBlockType,
			getSelectedBlockClientIds
		} = select("core/block-editor");
		const moving_block: State["moving_block"] = select(
			pr_store
		).getMovingBlock();
		const block: Block = getBlock(id);
		const moving_block_can_be_sibling = canInsertBlockType(
			moving_block.block_name,
			parent_id
		);

		return {
			block,
			block_type: block ? select("core/blocks").getBlockType(block.name) : null,
			is_selected: (getSelectedBlockClientIds() as string[]).includes(id),
			moving: select(pr_store).isMoving(),
			moving_type: select(pr_store).getMovingType(),
			template_lock: getTemplateLock(parent_id) || "",
			moving_block,
			can_receive_drop:
				moving_block.template_lock === "insert"
					? moving_block.parent_id === parent_id
					: !!moving_block_can_be_sibling
		};
	}),
	withMove
])(
	class extends Component<Props> {
		shouldComponentUpdate(next_props: Props) {
			// When adding a new paragraph block the previous block returns undefined.
			if (!next_props.block) {
				return false;
			}

			return true;
		}

		componentDidUpdate(prev_props: Props) {
			const { moving, is_open, setState, id } = this.props;

			// If a block which has children has just moved, expand it.
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
				template_lock,
				is_last_children
			} = this.props;

			if (!block) {
				return null;
			}

			const has_children = !!block.innerBlocks.length;
			const can_move = template_lock !== "all";
			const toggle = () => setState({ is_open: !is_open });
			const close = () => setState({ is_open: false });
			const open = () => setState({ is_open: true });

			return (
				<Fragment>
					<Div
						id={id}
						onDragEnter={toggleMovingIsOver}
						onDragLeave={toggleMovingIsOver}
						onDrop={moveBlock}
						onClick={!moving || moving_type !== "by_click" ? null : moveBlock}
						classes={[
							"block",
							`level-${level}`,
							`${moving_block.id === id ? "" : "no-"}is_moving`,
							`${can_receive_drop ? "" : "no-"}can_receive_drop`,
							`${moving_is_over ? "" : "no-"}moving_is_over`,
							`${can_move ? "" : "no-"}can_move`,
							`${is_selected ? "" : "no-"}is_selected`
						]}
					>
						<BlockHeader
							block={block}
							block_type={block_type}
							toggle={toggle}
							close={close}
							open={open}
							can_move={can_move}
							template_lock={template_lock}
							parent_id={parent_id}
							index={index}
							id={id}
							has_children={has_children}
							is_open={is_open}
						/>
					</Div>
					{has_children && is_open && (
						<BlockList
							ids={block.innerBlocks.map(({ clientId }) => clientId)}
							level={level + 1}
							parent_id={id}
						/>
					)}
					{is_last_children && moving && can_receive_drop && (
						<BlockListDropArea
							parent_id={parent_id}
							index={index + 1}
							level={level}
							can_receive_drop={true}
						/>
					)}
				</Fragment>
			);
		}
	}
);