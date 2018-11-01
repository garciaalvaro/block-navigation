import gulp from "gulp";
import zip from "gulp-zip";
import header from "gulp-header";
import rename from "gulp-rename";
import replace from "gulp-replace";
import run from "gulp-run-command";
import pot from "gulp-wp-pot";
import fs from "fs";
import merge2 from "merge2";
import pkg from "./package.json";

const pot_package_name = pkg.name_title;
const main_plugin_file = `${pkg.name}.php`;

gulp.task(
	"parcel",
	run(
		`parcel build src/index.js -o ${
			pkg.name
		}.min.js -d build --no-source-maps`
	)
);

gulp.task("version", () => {
	const main_php = gulp
		.src(main_plugin_file)
		.pipe(replace(/( \* Version: )\d+\.\d+\.\d+/g, "$1" + pkg.version))
		.pipe(
			replace(
				/(define.*?PLUGIN_VERSION.*?)\d+\.\d+\.\d+/g,
				"$1" + pkg.version
			)
		)
		.pipe(gulp.dest("."));

	const readme_txt = gulp
		.src("readme.txt")
		.pipe(replace(/(Stable tag: )\d+\.\d+\.\d+/g, "$1" + pkg.version))
		.pipe(gulp.dest("."));

	return merge2(main_php, readme_txt);
});

gulp.task("pot", () => {
	return gulp
		.src(["**/*.php", "!.*/**", "!node_modules/**", "!_extras/**"])
		.pipe(
			pot({
				domain: pkg.name,
				package: pot_package_name
			})
		)
		.pipe(gulp.dest(`languages/${pkg.name}.pot`));
});

gulp.task("zip", () => {
	const js_with_header = gulp
		.src([`build/${pkg.name}.min.js`], { base: "../" })
		.pipe(
			header(fs.readFileSync("./src/js/#header", "utf8"), {
				pkg: pkg
			})
		);

	const css_with_header = gulp
		.src([`build/${pkg.name}.min.css`], { base: "../" })
		.pipe(
			header(fs.readFileSync("./src/css/#header", "utf8"), {
				pkg: pkg
			})
		);

	const renamed = merge2(js_with_header, css_with_header).pipe(
		rename(function(path) {
			path.basename = pkg.name;
		})
	);

	return merge2(
		renamed,
		gulp.src(
			[
				"**",
				"!.*",
				"!.*/**",
				"!node_modules/**",
				"!_extras/**",
				"!gulp*",
				"!yarn*",
				"!src/**/#header",
				"!package*",
				"!build/**",
				"!src/index.*"
			],
			{ base: "../" }
		)
	)
		.pipe(zip(`${pkg.name}-${pkg.version}.zip`))
		.pipe(gulp.dest("_extras/releases"));
});

gulp.task("backup", () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const zip_name = `${pkg.name} - ${
		pkg.version
	} - ${year}.${month}.${day}.${hour}.${minute}`;

	return gulp
		.src(
			[
				"**",
				".*",
				"!.git/**",
				"!.cache/**",
				"!node_modules/**",
				"!_extras/**",
				"!build/**"
			],
			{ base: "../" }
		)
		.pipe(zip(`${zip_name}.zip`))
		.pipe(gulp.dest("_extras/backups"));
});

gulp.task("release", gulp.series("parcel", "version", "zip"));
