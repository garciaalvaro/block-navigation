<?php
/**
 * Plugin Name: Block Navigation
 * Plugin URI: https://wordpress.org/plugins/block-navigation/
 * Description: Block Navigation sidebar panel for the new Block editor.
 * Author: melonpan
 * Version: 3.3.1
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace BLOCKNAVIGATION;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

if (!defined(__NAMESPACE__ . "\PLUGIN_VERSION")) {
	define(__NAMESPACE__ . "\PLUGIN_VERSION", "3.3.1");
}
if (!defined(__NAMESPACE__ . "\PLUGIN_NAME")) {
	define(__NAMESPACE__ . "\PLUGIN_NAME", "block-navigation");
}
if (!defined(__NAMESPACE__ . "\DIST_DIR")) {
	define(__NAMESPACE__ . "\DIST_DIR", plugins_url("dist/", __FILE__));
}

/**
 * Enqueue the plugin styles and scripts.
 *
 * @since 1.0.0
 */
add_action("enqueue_block_editor_assets", __NAMESPACE__ . '\enqueue');
function enqueue()
{
	wp_enqueue_style(
		PLUGIN_NAME,
		DIST_DIR . PLUGIN_NAME . ".css",
		[],
		PLUGIN_VERSION
	);

	wp_enqueue_script(
		PLUGIN_NAME,
		DIST_DIR . PLUGIN_NAME . ".js",
		[
			"lodash",
			"wp-components",
			"wp-compose",
			"wp-data",
			"wp-edit-post",
			"wp-element",
			"wp-hooks",
			"wp-i18n",
			"wp-plugins",
			"wp-rich-text",
		],
		PLUGIN_VERSION,
		true // Enqueue in the footer.
	);
}
