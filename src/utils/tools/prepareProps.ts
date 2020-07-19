import { addPrefix } from "utils/tools/addPrefix";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prepareProps = (props: ComponentProps): Record<string, any> => {
	const { id, className, ...rest } = props;

	return {
		id: addPrefix(id) || undefined,
		className: addPrefix(className) || undefined,
		...rest,
	};
};
