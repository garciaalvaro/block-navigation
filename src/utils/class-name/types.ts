export type ClassNameProps = (
	| string
	| null
	| undefined
	| Record<string, boolean>
)[];

export type Util = (...classNames: ClassNameProps) => string;
