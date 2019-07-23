import { Button, Div, Icon, Span } from "utils/components";
import { MenuProps } from "./Menu";
import copy from "copy-text-to-clipboard";

const { __ } = wp.i18n;

export const ButtonCopyId: React.ComponentType<MenuProps> = props => {
	const { id, close } = props;

	return (
		<Button
			classes={["button", "button-menu", "button-copy_clientId"]}
			onClick={() => {
				close();
				copy(id);
			}}
		>
			<Div classes="menu-icon">
				<Icon icon="copy" />
			</Div>
			<Span>{__("Copy Block clientId")}</Span>
		</Button>
	);
};
