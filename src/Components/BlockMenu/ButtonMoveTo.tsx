import { __ } from "@wordpress/i18n";
import { useDispatch } from "@wordpress/data";

import { Div, Icon, Button, Span } from "utils/Components";
import { store_slug } from "utils/data";

export const ButtonMoveTo: React.ComponentType<MenuProps> = props => {
	const {
		id,
		parent_id,
		template_lock,
		block,
		can_move,
		close,
		is_expanded,
		collapseBlock,
		index
	} = props;

	const { setMovingBlock } = useDispatch(store_slug);
	const { setMovingType } = useDispatch(store_slug);

	const onClick = () => {
		close();
		collapseBlock();
		setMovingType("by_click");
		setMovingBlock({
			id,
			parent_id,
			template_lock,
			block_name: block.name,
			index,
			was_expanded: is_expanded
		});
	};

	return (
		<Button
			className={["button", "button-menu", !can_move ? "is_disabled" : null]}
			onClick={onClick}
		>
			<Div className="menu-icon">
				<Icon icon="move" />
			</Div>

			<Span>{__("Move Block To")}</Span>
		</Button>
	);
};
