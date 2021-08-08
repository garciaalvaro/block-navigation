import type { FunctionComponent, MouseEventHandler } from "react";

import type { IconName } from "@/components/icon";

interface Props {
	icon: IconName;
	onClick: MouseEventHandler;
	className?: string;
	is_disabled?: boolean;
}

export type Component = FunctionComponent<Props>;
