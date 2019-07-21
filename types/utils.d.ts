declare interface Object {
	[key: string]: any;
}

// https://stackoverflow.com/a/49286056 | CC BY-SA 3.0
type ValueOf<T> = T[keyof T];
