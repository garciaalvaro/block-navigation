import { pr_store } from "utils/data/plugin";
import classNames from "classnames";

const { Component } = wp.element;
const { withSelect } = wp.data;

class BlockClassName extends Component {
	getClassName = () => {
		const {
			level,
			can_receive_drop,
			can_move,
			is_parent,
			is_end_of_list,
			moving,
			descendants_client_ids,
			moving_client_id,
			mouse_over_client_id,
			is_mouse_over,
			is_selected,
			is_moving,
			is_menu_open
		} = this.props;

		const classes = classNames(
			{
				is_root: level === 0,
				is_nested: level > 0,
				can_receive_drop: can_receive_drop,
				can_move: can_move,
				is_moving: is_moving,
				"no-is_moving": !is_moving,
				is_selected: is_selected && !moving,
				is_menu_open: is_menu_open,
				is_mouse_over: is_mouse_over,
				"no-is_mouse_over": !is_mouse_over,
				is_end_of_list: is_end_of_list,
				is_parent: is_parent,
				is_mouse_over_descendant:
					is_parent && descendants_client_ids.includes(mouse_over_client_id),
				"no-is_mouse_over_descendant":
					is_parent && !descendants_client_ids.includes(mouse_over_client_id),
				is_moving_descendant:
					is_parent && descendants_client_ids.includes(moving_client_id),
				"no-is_moving_descendant":
					is_parent && !descendants_client_ids.includes(moving_client_id)
			},
			"block",
			`level-${level}`
		);

		return classes;
	};

	render() {
		const { children } = this.props;
		const className = this.getClassName();

		return children(className);
	}
}

export default withSelect((select, { client_id, is_end_of_list }) => {
	const { getClientIdsOfDescendants, isBlockSelected } = select("core/editor");
	const {
		getMoving,
		getMovingBlockClientId,
		getMouseOverClientId,
		isMouseOver,
		isMoving,
		isMenuOpen
	} = select(pr_store);

	return {
		moving: getMoving(),
		descendants_client_ids: getClientIdsOfDescendants([client_id]),
		moving_client_id: getMovingBlockClientId(),
		mouse_over_client_id: getMouseOverClientId(),
		is_mouse_over: isMouseOver(client_id, is_end_of_list),
		is_selected: isBlockSelected(client_id) && !is_end_of_list,
		is_moving: isMoving(client_id) && !is_end_of_list,
		is_menu_open: isMenuOpen(client_id)
	};
})(BlockClassName);
