import { FunctionComponent } from "react";

export type IconName =
	| "duplicate"
	| "collapse_all"
	| "expand_all"
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
