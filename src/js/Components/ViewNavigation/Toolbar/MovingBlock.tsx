import { Div, Span } from "utils/components";

interface WithSelectProps extends Pick<BlockProps, "block_type"> {}

interface OwnProps {
	block_name: State["moving_block"]["block_name"];
}

interface Props extends WithSelectProps, OwnProps {}

const { withSelect } = wp.data;
const { Icon } = wp.components;
const { Fragment } = wp.element;

export const MovingBlock: React.ComponentType<OwnProps> = withSelect<
	WithSelectProps,
	OwnProps
>((select, { block_name }) => ({
	block_type: select("core/blocks").getBlockType(block_name)
}))((props: Props) => {
	const { block_type } = props;

	if (!block_type) {
		return null;
	}

	const { icon, title } = block_type;

	return (
		<Fragment>
			{icon.src && (
				<Div classes="block-icon">
					<Icon icon={icon.src} />
				</Div>
			)}
			<Span classes="block-title">{title}</Span>
		</Fragment>
	);
});
