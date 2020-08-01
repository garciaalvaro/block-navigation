const { name } = require("../package.json");
const copyfiles = require("copyfiles");

// Copy files to the _release folder
copyfiles(
	["dist/*", "README.txt", "LICENSE", `${name}.php`, "_release"],
	{},
	() => null
);
