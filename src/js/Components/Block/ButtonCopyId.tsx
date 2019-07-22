import { Button, Div, Icon, Span } from "utils/components";
import copy from "copy-text-to-clipboard";

type Props = {
	id: string;
	parent_id: string;
	template_lock: string | undefined;
	block: import("wordpress__blocks").BlockInstance;
	can_move: boolean;
	index: number;
	close: Function;
};

const { __ } = wp.i18n;

export const ButtonCopyId: React.ComponentType<Props> = props => {
	const { id, close } = props;

	return (
		<Button
			classes={["button-text", "button-menu", "button-copy_clientId"]}
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
