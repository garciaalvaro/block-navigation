import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { Fragment } from "@wordpress/element";

import { Div, Icon, Button, Span } from "utils/Components";

export const ButtonsMove: React.ComponentType<MenuProps> = props => {
	const { id, closeMenu } = props;

	const parent_id =
		useSelect(select => select("core/block-editor").getBlockRootClientId(id)) ||
		"";

	const index = useSelect(select =>
		select("core/block-editor").getBlockIndex(id, parent_id)
	);

	const can_move =
		useSelect(select =>
			select("core/block-editor").getTemplateLock(parent_id)
		) !== "all";

	const sibling_ids = useSelect<string[]>(select =>
		select("core/block-editor").getBlockOrder(parent_id)
	);

	const { moveBlockToPosition } = useDispatch("core/block-editor");

	const move_up_is_disabled = !can_move || index === 0;

	const move_down_is_disabled = !can_move || index + 1 === sibling_ids.length;

	const onClickUp = () => {
		if (move_up_is_disabled) {
			return;
		}

		closeMenu();
		moveBlockToPosition(id, parent_id, parent_id, index - 1);
	};

	const onClickDown = () => {
		if (move_down_is_disabled) {
			return;
		}

		closeMenu();
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
