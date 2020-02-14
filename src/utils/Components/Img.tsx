import { prepareProps } from "utils/tools/prepareProps";

export const Img: React.ComponentType<ComponentProps> = props => {
	return <img {...prepareProps(props)} />;
};
