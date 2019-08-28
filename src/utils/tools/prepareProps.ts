import { addPrefix } from "utils/tools/addPrefix";

export const prepareProps = (props: ComponentProps) => {
	const { id, className, ...rest } = props;

	return {
		id: addPrefix(id) || undefined,
		className: addPrefix(className) || undefined,
		...rest
	};
};
