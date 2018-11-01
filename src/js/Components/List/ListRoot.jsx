import l, { plugin_namespace } from "../../utils/#";
import VirtualList from "react-tiny-virtual-list";
import FixedSize from "./_FixedSize";
import CanReceiveDrop from "./_CanReceiveDrop";
import VirtualListUtils from "./_VirtualListUtils";

const { isEqual, isEmpty, difference, forEach, get } = lodash;
const { Component, createRef } = wp.element;
const { withSelect, withDispatch, select } = wp.data;
const { compose, withState } = wp.compose;
const {
	getBlockIndex,
	getBlockHierarchyRootClientId,
	getBlockRootClientId
} = select("core/editor");

class ListRoot extends Component {
	constructor(props) {
		super(props);

		this.vlist = createRef();
	}

	componentDidUpdate = prevProps => {
		const {
			getJustModified,
			getJustCollapsedIndex,
			recalculateHeight,
			getRootIndex,
			expandAncestors,
			getScrollAlignment,
			vlist
		} = this;
		const {
			move_type,
			selected_client_id,
			client_ids,
			client_ids_all,
			collapsed_parent_blocks,
			selectBlock_triggered,
			triggerSelectBlock,
			updated,
			moving,
			setState,
			scroll_alignment,
			selected_index
		} = this.props;
		let updated_new = updated;
		let scroll_alignment_new = scroll_alignment;
		let selected_index_new = selected_index;

		// If the block editor has triggered selectBlock
		if (
			!isEqual(selected_client_id, prevProps.selected_client_id) &&
			!selectBlock_triggered
		) {
			const index = getRootIndex(selected_client_id);
			const parent_client_id = getBlockRootClientId(selected_client_id);

			selected_index_new = index;
			scroll_alignment_new = "start";

			if (!isEmpty(parent_client_id)) {
				scroll_alignment_new = getScrollAlignment(selected_client_id);

				if (scroll_alignment_new === false) {
					scroll_alignment_new = "start";
					expandAncestors(parent_client_id);
				}
			}
		}

		// If the block editor has modified the top-level blocks
		if (!isEqual(client_ids, prevProps.client_ids)) {
			const { index } = getJustModified(client_ids, prevProps.client_ids);

			recalculateHeight(index);
			updated_new = updated_new + 1;

			// TODO: client_ids modification changes the scrollTop to 0,
			// As a way to mitigate it we change the scroll index to the modified one
			selected_index_new = index;

			// If the block editor has modified any-level blocks
		} else if (!isEqual(client_ids_all, prevProps.client_ids_all)) {
			const { client_id } = getJustModified(
				client_ids_all,
				prevProps.client_ids_all
			);
			const root_client_id = getBlockHierarchyRootClientId(client_id);
			const index = getBlockIndex(root_client_id);

			recalculateHeight(index);
			updated_new = updated_new + 1;
		}

		// If inside the plugin a block has been collapsed
		if (
			!isEqual(collapsed_parent_blocks, prevProps.collapsed_parent_blocks)
		) {
			const index = getJustCollapsedIndex(
				collapsed_parent_blocks,
				prevProps.collapsed_parent_blocks
			);

			recalculateHeight(index);
			updated_new = updated_new + 1;
		}

		// If inside the plugin moving action has started or finished
		if (moving !== prevProps.moving) {
			if (
				move_type === "by_click" ||
				prevProps.move_type === "by_click"
			) {
				let scroll_top = vlist.current.rootNode.scrollTop;

				if (move_type === "by_click") {
					scroll_top = scroll_top + 50;
				} else if (prevProps.move_type === "by_click") {
					scroll_top = scroll_top - 50;
				}

				// Change the scrollTop value to avoid
				// a 50px jump when the toggle-panels bar appears/disappears
				vlist.current.rootNode.scrollTop = scroll_top;
			}

			updated_new = updated_new + 1;
		}

		if (selectBlock_triggered) {
			triggerSelectBlock(false);
		}

		if (
			!isEqual(updated_new, updated) ||
			!isEqual(selected_index_new, selected_index) ||
			!isEqual(scroll_alignment_new, scroll_alignment)
		) {
			setState({
				updated: updated_new,
				selected_index: selected_index_new,
				scroll_alignment: scroll_alignment_new
			});
		}
	};

	getScrollAlignment = client_id => {
		let scroll_alignment_new;
		const root_client_id = getBlockHierarchyRootClientId(client_id);
		const $root_block = $(`#bn-${root_client_id}`);
		const $block = $root_block.find(`#bn-${client_id}`);

		if ($block.length === 0) {
			return false;
		}

		const children_top = $block.offset().top - $root_block.offset().top;
		const root_height = $root_block.height();
		const children_top_percentage = children_top / root_height;

		switch (true) {
			case children_top_percentage > 0.66:
				scroll_alignment_new = "end";
				break;
			case children_top_percentage > 0.33:
				scroll_alignment_new = "center";
				break;
			default:
				scroll_alignment_new = "start";
		}

		return scroll_alignment_new;
	};

	expandAncestors = client_id => {
		const { expandBlock } = this.props;
		const { expandAncestors } = this;

		expandBlock(client_id);

		const parent_client_id = getBlockRootClientId(client_id);

		if (!isEmpty(parent_client_id)) {
			expandAncestors(parent_client_id);
		}
	};

	recalculateHeight = index => {
		this.vlist.current.recomputeSizes(index);
	};

	getJustModified = (client_ids_new, client_ids_old) => {
		const modified = { index: 0, client_id: "" };

		forEach(client_ids_new, (client_id, index) => {
			if (client_id !== get(client_ids_old, index)) {
				modified.client_id = client_id;
				modified.index = index;

				return false;
			}
		});

		return modified;
	};

	getJustCollapsedIndex = (collapsed_new, collapsed_old) => {
		const client_id = [
			...difference(collapsed_old, collapsed_new),
			...difference(collapsed_new, collapsed_old)
		][0];
		const root_index = this.getRootIndex(client_id);

		return root_index;
	};

	getRootIndex = client_id => {
		const root_client_id = getBlockHierarchyRootClientId(client_id);
		const root_index = getBlockIndex(root_client_id);

		return root_index;
	};

	render() {
		const {
			scroll_alignment,
			selected_index,
			updated,
			client_ids,
			can_move,
			moving,
			moving_block
		} = this.props;

		return (
			<FixedSize>
				{container_height => (
					<CanReceiveDrop
						parent_client_id=""
						moving={moving}
						moving_block={moving_block}
					>
						{can_receive_drop => (
							<VirtualListUtils
								client_ids={client_ids}
								moving={moving}
								moving_block={moving_block}
								can_receive_drop={can_receive_drop}
								can_move={can_move}
							>
								{({ getHeight, getBlocks }) => (
									<VirtualList
										className="list"
										width="100%"
										height={container_height}
										estimatedItemSize={60}
										itemCount={client_ids.length + 1}
										itemSize={getHeight}
										renderItem={getBlocks}
										// Update the Virtual List manually
										updated={updated}
										scrollToAlignment={scroll_alignment}
										scrollToIndex={selected_index}
										ref={this.vlist}
									/>
								)}
							</VirtualListUtils>
						)}
					</CanReceiveDrop>
				)}
			</FixedSize>
		);
	}
}

export default compose([
	withState({ updated: 0, scroll_alignment: "start", selected_index: 0 }),
	withDispatch(dispatch => {
		const { triggerSelectBlock, expandBlock } = dispatch(plugin_namespace);

		return {
			triggerSelectBlock,
			expandBlock
		};
	}),
	withSelect(select => {
		const {
			getBlockOrder,
			getTemplateLock,
			getSelectedBlockClientId,
			getClientIdsWithDescendants
		} = select("core/editor");
		const {
			getMoveType,
			getMovingBlock,
			getMoving,
			getCollapsedParentBlocks,
			didSelectBlockTrigger
		} = select(plugin_namespace);
		const client_ids = getBlockOrder();

		return {
			client_ids,
			client_ids_all: getClientIdsWithDescendants(),
			can_move: getTemplateLock() !== "all" && client_ids.length > 1,
			move_type: getMoveType(),
			moving_block: getMovingBlock(),
			moving: getMoving(),
			collapsed_parent_blocks: getCollapsedParentBlocks(),
			selected_client_id: getSelectedBlockClientId(),
			selectBlock_triggered: didSelectBlockTrigger()
		};
	})
])(ListRoot);
