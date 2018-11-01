import l, { plugin_namespace } from "../../utils/#";
import Block from "../Block/Block";
import Html from "../Utils/_Html";
import EndOfList from "../Block/EndOfList";

const { pullAll, last } = lodash;
const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;
const { select } = wp.data;
const { getClientIdsOfDescendants } = select("core/editor");

class VirtualListUtils extends Component {
	getDescendantsValues = root_descendants => {
		const descendants = root_descendants.reduce(
			(descendants, client_id) => {
				const this_descendants = getClientIdsOfDescendants([client_id]);

				if (select(plugin_namespace).isCollapsed(client_id)) {
					pullAll(descendants.visible, this_descendants);

					return descendants;
				}

				// If it is parent
				if (this_descendants.length > 0) {
					descendants.expanded++;
				}

				return descendants;
			},
			{ visible: root_descendants, expanded: 0 }
		);

		return descendants;
	};

	getBlockHeight = (client_id, is_expanded) => {
		const descendants = getClientIdsOfDescendants([client_id]);

		if (descendants.length === 0 || !is_expanded) {
			return 60;
		}

		const descendants_values = this.getDescendantsValues(descendants);
		const height =
			60 + // Header Height
			15 + // Nested List Bottom Padding
			descendants_values.visible.length * 60 + // Header Height
			descendants_values.expanded * 15; // Nested List Bottom Padding

		return height;
	};

	getBottomSpacerHeight = () => {
		const { moving_block, moving } = this.props;
		const {
			client_id: moving_client_id,
			was_expanded: moving_was_expanded
		} = moving_block;

		if (moving) {
			// Calculate the height of the elemnt which is going to be moved
			// and add that height to the last item,
			// to prevent the scrollTop from jumping
			const block_height = this.getBlockHeight(
				moving_client_id,
				moving_was_expanded
			);

			return block_height + (200 - 60);
		}

		return 200;
	};

	getHeight = index => {
		const { getBottomSpacerHeight, getBlockHeight } = this;
		const { client_ids } = this.props;

		// Last iteration. This is a div which
		// gives some extra space at the bottom
		if (client_ids.length === index) {
			const bottom_spacer_height = getBottomSpacerHeight();

			return bottom_spacer_height;
		}

		const client_id = client_ids[index];
		const is_expanded = select(plugin_namespace).isExpanded(client_id);
		const block_height = getBlockHeight(client_id, is_expanded);

		return block_height;
	};

	getBlocks = ({ index, style }) => {
		const { client_ids, can_receive_drop, can_move } = this.props;

		if (client_ids.length === 0) {
			return (
				<Html
					key={index}
					id="blocks-empty"
					className="block"
					style={style}
				>
					<Html html_element="span" className="block-header">
						{__("No blocks.")}
					</Html>
				</Html>
			);
		}

		// Last iteration. This is a div which
		// gives some extra space at the bottom
		if (index === client_ids.length) {
			return (
				<Fragment key={index}>
					<EndOfList
						style_virtual={style}
						client_id={last(client_ids)}
						parent_client_id={""}
						can_receive_drop={can_receive_drop}
						can_move={can_move}
						level={0}
					/>
					<Html
						id="bottom_spacer"
						className="list-item"
						style={style}
					/>
				</Fragment>
			);
		}

		const client_id = client_ids[index];

		return (
			<Block
				key={client_id}
				style_virtual={style}
				client_id={client_id}
				parent_client_id={""}
				can_receive_drop={can_receive_drop}
				can_move={can_move}
				level={0}
			/>
		);
	};

	render() {
		const { getHeight, getBlocks } = this;
		const { children } = this.props;

		return children({ getHeight, getBlocks });
	}
}

export default VirtualListUtils;
