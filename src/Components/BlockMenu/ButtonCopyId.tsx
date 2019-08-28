import copy from "copy-text-to-clipboard";

import { Button, Div, Icon, Span } from "utils/Components";

const { __ } = wp.i18n;
const { useCallback } = wp.element;

export const ButtonCopyId: React.ComponentType<MenuProps> = props => {
	const { id, close } = props;
	const onClick = useCallback(() => {
		close();
		copy(id);
	}, []);

	return (
		<Button
			className={["button", "button-menu", "button-copy_clientId"]}
			onClick={onClick}
		>
			<Div className="menu-icon">
				<Icon icon="copy" />
			</Div>
			<Span>{__("Copy Block clientId")}</Span>
		</Button>
	);
};
