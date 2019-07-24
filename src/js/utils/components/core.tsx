import { icons } from "utils/data/icons";
import { addPrefix } from "utils/tools/addPrefix";

type ComponentProps = Object & {
	children?: React.ReactNode;
	id?: string | null;
	classes?: string | (string | null)[];
};

export type HTMLProps = ComponentProps & {
	html_tag: string;
};

type IconProps = { icon: keyof typeof icons };

export const Icon: React.ComponentType<IconProps> = props =>
	icons[props.icon] ? icons[props.icon] : null;

export const Div: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="div" />
);

export const Span: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="span" />
);

export const Button: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="button" />
);

export const H3: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="h3" />
);

export const Img: React.ComponentType<ComponentProps> = props => (
	<HTML {...props} html_tag="img" />
);

const HTML: React.ComponentType<HTMLProps> = props_raw => {
	const { children, id, classes = [], html_tag, ...rest } = props_raw;

	const props = {
		id: id ? addPrefix(id) : undefined,
		className: classes && classes.length ? addPrefix(classes) : undefined,
		...rest
	};

	switch (html_tag) {
		case "div":
			return <div {...props}>{children}</div>;
			break;

		case "span":
			return <span {...props}>{children}</span>;
			break;

		case "button":
			return <button {...props}>{children}</button>;
			break;

		case "h3":
			return <h3 {...props}>{children}</h3>;
			break;

		case "img":
			return <img {...props} />;
			break;

		default:
			return null;
			break;
	}
};
