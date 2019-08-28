import { Icons, icons } from "../data/icons";

interface Props {
	icon: keyof Icons;
}

const { Fragment } = wp.element;

export const Icon: React.ComponentType<Props> = props => {
	const { icon } = props;

	return <Fragment>{icon && icons[icon] ? icons[icon] : null}</Fragment>;
};
