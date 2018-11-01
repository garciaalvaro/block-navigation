import l, { icons, plugin_namespace } from "../../utils/#";
import withBeginMove from "../Utils/_withBeginMove";
import withMoveBlock from "../Utils/_withMoveBlock";
import MenuItemEdit from "./MenuItemEdit";
import MenuItemMoveTo from "./MenuItemMoveTo";
import MenuItemMoveUp from "./MenuItemMoveUp";
import MenuItemMoveDown from "./MenuItemMoveDown";

const { debounce } = lodash;
const { Button, Popover, MenuGroup } = wp.components;
const { compose } = wp.compose;
const { Component } = wp.element;
const { withSelect, withDispatch } = wp.data;

class Menu extends Component {
	toggle = debounce(
		close_menu => {
			const { client_id, toggleMenu } = this.props;

			if (close_menu) {
				toggleMenu(false);
			} else {
				toggleMenu(client_id);
			}
		},
		0,
		{
			leading: false,
			trailing: true
		}
	);

	render() {
		const {
			client_id,
			beginMove,
			moveBlock,
			is_menu_open,
			can_move,
			index,
			block_count
		} = this.props;

		return (
			<Button
				className="toggle-block-menu"
				onClick={() => this.toggle(is_menu_open)}
			>
				{is_menu_open && (
					<Popover
						className="bn-block-menu-container"
						focusOnMount={false}
						position="middle left"
						onClickOutside={() => this.toggle(true)}
					>
						<MenuGroup>
							<MenuItemEdit client_id={client_id} />
							<MenuItemMoveTo
								can_move={can_move}
								beginMove={beginMove}
							/>
							<MenuItemMoveUp
								can_move={can_move}
								moveBlock={moveBlock}
								index={index}
							/>
							<MenuItemMoveDown
								can_move={can_move}
								moveBlock={moveBlock}
								index={index}
								block_count={block_count}
							/>
						</MenuGroup>
					</Popover>
				)}
				{icons.menu}
			</Button>
		);
	}
}

export default compose([
	withSelect((select, { client_id, parent_client_id }) => {
		const { getBlockIndex, getBlockCount } = select("core/editor");
		const { isMenuOpen } = select(plugin_namespace);

		return {
			is_menu_open: isMenuOpen(client_id),
			index: getBlockIndex(client_id, parent_client_id),
			block_count: getBlockCount(parent_client_id)
		};
	}),
	withDispatch(dispatch => {
		const { toggleMenu } = dispatch(plugin_namespace);

		return {
			toggleMenu
		};
	}),
	withBeginMove,
	withMoveBlock
])(Menu);
