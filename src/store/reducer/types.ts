import type { Action } from "../actions";
import type { State } from "../state";

export interface Reducer {
	(state: State | undefined, action: Action): State;
}
