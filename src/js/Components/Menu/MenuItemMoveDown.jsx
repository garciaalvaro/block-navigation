import l, { icons } from "../../utils";

const { __ } = wp.i18n;
const { MenuItem } = wp.components;

const MenuItemMoveDown = ({ moveBlock, can_move, index, block_count }) => {
	return (
		<MenuItem
			className="move-down"
			icon={icons.down}
			onClick={() => moveBlock("down")}
			disabled={!can_move || index + 1 === block_count}
		>
			{__("Move Block Down")}
		</MenuItem>
	);
};

export default MenuItemMoveDown;
