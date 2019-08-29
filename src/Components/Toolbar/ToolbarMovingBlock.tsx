import { Div, Span } from "utils/Components";

interface WithSelectProps extends Pick<BlockProps, "block_type"> {}

interface OwnProps {
	block_name: State["moving_block"]["block_name"];
}

const { withSelect } = wp.data;
const { Icon } = wp.components;
const { Fragment } = wp.element;

export const ToolbarMovingBlock: React.ComponentType<OwnProps> = withSelect<
	WithSelectProps,
	OwnProps
>((select, { block_name }) => ({
	block_type: select("core/blocks").getBlockType(block_name)
}))(props => {
	const { block_type } = props;

	if (!block_type) {
		return null;
	}

	const { icon, title } = block_type;

	return (
		<Fragment>
			{icon.src && (
				<Div className="block-icon">
					<Icon icon={icon.src} />
				</Div>
			)}
			<Span className="block-title">{title}</Span>
		</Fragment>
	);
});