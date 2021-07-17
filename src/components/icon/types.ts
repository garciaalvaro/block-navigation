import { FunctionComponent } from "react";

export type IconName =
	| "detach"
	| "close"
	| "remove"
	| "copy"
	| "log"
	| "edit"
	| "collapse"
	| "expand"
	| "menu"
	| "move";

interface Props {
	icon: IconName;
}

export type Component = FunctionComponent<Props>;
