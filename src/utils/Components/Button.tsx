import { prepareProps } from "utils/tools/prepareProps";

export const Button: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return (
		<button type="button" {...prepareProps(rest)}>
			{children}
		</button>
	);
};
