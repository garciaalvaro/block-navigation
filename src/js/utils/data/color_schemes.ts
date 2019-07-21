const { __ } = wp.i18n;

export type ColorScheme = {
	label: string;
	type: "light" | "dark";
	value:
		| "banana"
		| "melon"
		| "melocoton"
		| "coco"
		| "mandarina"
		| "pistacho"
		| "higo"
		| "mango"
		| "endrina"
		| "castana"
		| "naranja"
		| "ciruela";
};

export const color_schemes: ColorScheme[] = [
	{
		value: "banana",
		label: __("Banana (light)"),
		type: "light"
	},
	{
		value: "melon",
		label: __("Melón (light)"),
		type: "light"
	},
	{
		value: "melocoton",
		label: __("Melocotón (light)"),
		type: "light"
	},
	{
		value: "coco",
		label: __("Coco (light)"),
		type: "light"
	},
	{
		value: "mandarina",
		label: __("Mandarina (light)"),
		type: "light"
	},
	{
		value: "pistacho",
		label: __("Pistacho (light)"),
		type: "light"
	},
	{
		value: "higo",
		label: __("Higo (dark)"),
		type: "dark"
	},
	{
		value: "mango",
		label: __("Mango (dark)"),
		type: "dark"
	},
	{
		value: "endrina",
		label: __("Endrina (dark)"),
		type: "dark"
	},
	{
		value: "castana",
		label: __("Castaña (dark)"),
		type: "dark"
	},
	{
		value: "naranja",
		label: __("Naranja (dark)"),
		type: "dark"
	},
	{
		value: "ciruela",
		label: __("Ciruela (dark)"),
		type: "dark"
	}
];
