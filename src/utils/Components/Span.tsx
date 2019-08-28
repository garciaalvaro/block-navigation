import { prepareProps } from "utils/tools/prepareProps";

export const Span: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <span {...prepareProps(rest)}>{children}</span>;
};
