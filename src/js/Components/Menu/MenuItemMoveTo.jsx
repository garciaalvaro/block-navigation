import l, { icons } from "../../utils/#";

const { __ } = wp.i18n;
const { MenuItem } = wp.components;

const MenuItemMoveTo = ({ beginMove, can_move }) => {
	return (
		<MenuItem
			className="move-to"
			icon={icons.move}
			onClick={beginMove}
			disabled={!can_move}
		>
			{__("Move Block To")}
		</MenuItem>
	);
};

export default MenuItemMoveTo;
