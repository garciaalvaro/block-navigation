export type UseButton = (type?: "icon" | "text") => {
	attributes: {
		type: "button";
	};
	className: string;
};
