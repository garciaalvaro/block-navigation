import { prepareProps } from "utils/tools/prepareProps";

export const Div: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <div {...prepareProps(rest)}>{children}</div>;
};
