const { __ } = wp.i18n;
const { ClipboardButton } = wp.components;

const MenuItemBlockClientId = ({ client_id }) => {
	return (
		<ClipboardButton className="copy-block_clientId" text={client_id}>
			{__("Block clientId - Copy to the Clipboard")}
		</ClipboardButton>
	);
};

export default MenuItemBlockClientId;
