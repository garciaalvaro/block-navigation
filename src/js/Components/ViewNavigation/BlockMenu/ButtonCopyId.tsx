import { Button, Div, Icon, Span } from "utils/components";
import copy from "copy-text-to-clipboard";

interface OwnProps extends MenuProps {}

interface Props extends OwnProps {}

const { __ } = wp.i18n;

export const ButtonCopyId: React.ComponentType<OwnProps> = (props: Props) => {
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
