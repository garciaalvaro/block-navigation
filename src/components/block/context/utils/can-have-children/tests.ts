import { mockSelect } from "@/utils-test";

import { canHaveChildren } from "./can-have-children";

jest.mock("@wordpress/data");

test("canHaveChildren returns correctly when moving_block has value", () => {
	mockSelect({ canInsertBlockType: () => true, is_expanded: () => true });

	const moving_block = {
		id: "",
		parent_id: "",
		name: "",
	};

	expect(canHaveChildren("", moving_block)).toBe(true);

	mockSelect({ canInsertBlockType: () => false, is_expanded: () => true });

	expect(canHaveChildren("", moving_block)).toBe(false);
});

test("canHaveChildren returns correctly when moving_block is null", () => {
	mockSelect({ canInsertBlockType: () => true, is_expanded: () => true });

	const moving_block = null;

	expect(canHaveChildren("", moving_block)).toBe(false);

	mockSelect({ canInsertBlockType: () => false, is_expanded: () => true });

	expect(canHaveChildren("", moving_block)).toBe(false);
});
