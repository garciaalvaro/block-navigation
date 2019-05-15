import { pr } from "./data-plugin";

const { isUndefined, isString, compact } = lodash;

const addPrefix = (items, separator = "-") => {
	if (isUndefined(items)) {
		return null;
	}

	if (isString(items)) {
		return pr + separator + items;
	}

	items = compact(items);
	items = items.map(item => {
		if (item.startsWith("#")) {
			return item.replace("#", "");
		}

		return pr + separator + item;
	});
	items = items.join(" ");

	return items;
};

export default addPrefix;
