import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { Fragment, useMemo } from "@wordpress/element";

import { Div, Icon, Button, Span } from "utils/Components";

export const ButtonsMove: React.ComponentType<MenuProps> = props => {
	const { can_move, id, parent_id, index, close } = props;

	const sibling_ids = useSelect<string[]>(select =>
		select("core/block-editor").getBlockOrder(parent_id)
	);
	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const move_up_is_disabled = useMemo(() => !can_move || index === 0, [
		can_move,
		index
	]);

	const move_down_is_disabled = useMemo(
		() => !can_move || index + 1 === sibling_ids.length,
		[can_move, index, sibling_ids]
	);

	const onClickUp = () => {
		if (move_up_is_disabled) {
			return;
		}

		close();
		moveBlockToPosition(id, parent_id, parent_id, index - 1);
	};

	const onClickDown = () => {
		if (move_down_is_disabled) {
			return;
		}

		close();
		moveBlockToPosition(id, parent_id, parent_id, index + 1);
	};

	return (
		<Fragment>
			<Button
				className={[
					"button",
					"button-menu",
					move_up_is_disabled ? "is_disabled" : null
				]}
				onClick={onClickUp}
			>
				<Div className="menu-icon">
					<Icon icon="collapse" />
				</Div>

				<Span>{__("Move Block Up")}</Span>
			</Button>

			<Button
				className={[
					"button",
					"button-menu",
					move_down_is_disabled ? "is_disabled" : null
				]}
				onClick={onClickDown}
			>
				<Div className="menu-icon">
					<Icon icon="expand" />
				</Div>

				<Span>{__("Move Block Down")}</Span>
			</Button>
		</Fragment>
	);
};
