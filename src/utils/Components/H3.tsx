import { prepareProps } from "utils/tools/prepareProps";

export const H3: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <h3 {...prepareProps(rest)}>{children}</h3>;
};
