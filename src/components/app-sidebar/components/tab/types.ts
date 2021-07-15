import type { FunctionComponent, MouseEventHandler } from "react";

interface Props {
	is_active: boolean;
	label: string;
	onClick: MouseEventHandler;
}

export type Component = FunctionComponent<Props>;
