import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { CheckboxControl } from "@wordpress/components";

import { store_slug } from "@/utils/data";

export const DevMode: FunctionComponent = () => {
	const is_dev = useSelect(select => select(store_slug).isDev());
	const { setDev } = useDispatch(store_slug);

	return (
		<CheckboxControl
			label={__("Enable developer mode")}
			help={__("This mode includes extra actions in the Block menu.")}
			checked={is_dev}
			onChange={setDev}
		/>
	);
};
