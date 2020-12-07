import { __ } from "@wordpress/i18n";

type ColorScheme = {
	value: string;
	label: string;
	type: "light" | "dark";
	name:
		| "wp"
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

// For backward compatibility we use type-name as value
export const color_schemes: ColorScheme[] = [
	{
		value: "light-wp",
		name: "wp",
		label: __("WordPress admin"),
		type: "light",
	},
	{
		value: "light-banana",
		name: "banana",
		label: __("Banana (light)"),
		type: "light",
	},
	{
		value: "light-melon",
		name: "melon",
		label: __("Melón (light)"),
		type: "light",
	},
	{
		value: "light-melocoton",
		name: "melocoton",
		label: __("Melocotón (light)"),
		type: "light",
	},
	{
		value: "light-coco",
		name: "coco",
		label: __("Coco (light)"),
		type: "light",
	},
	{
		value: "light-mandarina",
		name: "mandarina",
		label: __("Mandarina (light)"),
		type: "light",
	},
	{
		value: "light-pistacho",
		name: "pistacho",
		label: __("Pistacho (light)"),
		type: "light",
	},
	{
		value: "dark-higo",
		name: "higo",
		label: __("Higo (dark)"),
		type: "dark",
	},
	{
		value: "dark-mango",
		name: "mango",
		label: __("Mango (dark)"),
		type: "dark",
	},
	{
		value: "dark-endrina",
		name: "endrina",
		label: __("Endrina (dark)"),
		type: "dark",
	},
	{
		value: "dark-castana",
		name: "castana",
		label: __("Castaña (dark)"),
		type: "dark",
	},
	{
		value: "dark-naranja",
		name: "naranja",
		label: __("Naranja (dark)"),
		type: "dark",
	},
	{
		value: "dark-ciruela",
		name: "ciruela",
		label: __("Ciruela (dark)"),
		type: "dark",
	},
];
