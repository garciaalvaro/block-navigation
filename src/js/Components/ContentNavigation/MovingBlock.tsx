import { Div, Span } from "utils/components";

interface WithSelectProps {
	block_type: import("wordpress__blocks").Block | undefined;
}

type OwnProps = {
	block_name: State["moving_block"]["block_name"];
};

type Props = WithSelectProps & OwnProps;

const { withSelect } = wp.data;
const { Icon } = wp.components;
const { Fragment } = wp.element;

export const MovingBlock = withSelect<WithSelectProps, OwnProps>(
	(select, { block_name }) => ({
		block_type: select("core/blocks").getBlockType(block_name)
	})
)((props: Props) => {
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
			<Span classes="block-text">{title}</Span>
		</Fragment>
	);
});
