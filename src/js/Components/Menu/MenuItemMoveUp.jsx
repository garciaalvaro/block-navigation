import l, { icons } from "../../utils/#";

const { __ } = wp.i18n;
const { MenuItem } = wp.components;

const MenuItemMoveUp = ({ moveBlock, can_move, index }) => {
	return (
		<MenuItem
			className="move-up"
			icon={icons.up}
			onClick={() => moveBlock("up")}
			disabled={!can_move || index === 0}
		>
			{__("Move Block Up")}
		</MenuItem>
	);
};

export default MenuItemMoveUp;
