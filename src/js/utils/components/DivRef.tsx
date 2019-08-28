import { HTMLProps } from "./core";
import { addPrefix } from "utils/tools/addPrefix";

export const DivRef = wp.element.forwardRef(
	(props_raw: HTMLProps, ref: any) => {
		const { children, id, classes = [], ...rest } = props_raw;

		const props = {
			id: id ? addPrefix(id) : undefined,
			className: classes && classes.length ? addPrefix(classes) : undefined,
			...rest
		};

		return (
			<div ref={ref} {...props}>
				{children}
			</div>
		);
	}
);
