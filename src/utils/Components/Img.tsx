import { prepareProps } from "utils/tools";

export const Img: React.ComponentType<ComponentProps> = props => {
	const { children, ...rest } = props;

	return <img {...prepareProps(rest)} />;
};
