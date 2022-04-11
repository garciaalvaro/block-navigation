<?php
/**
 * Plugin Name: Block Navigation
 * Plugin URI: https://wordpress.org/plugins/block-navigation/
 * Description: Block Navigation sidebar panel for the new Block editor.
 * Author: melonpan
 * Version: 4.1.1
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace BLOCKNAVIGATION;

// Exit if accessed directly.
if (!defined("ABSPATH")) {
	exit();
}

/**
 * Enqueue the plugin styles and scripts.
 *
 * @since 1.0.0
 */
\add_action("enqueue_block_editor_assets", __NAMESPACE__ . '\enqueue');
function enqueue()
{
	$plugin_name = "block-navigation";
	$plugin_version = "4.1.1";
	$dist_dir = \plugins_url("dist/", __FILE__);

	// This check will prevent the script from loading in a screen
	// that is not a post/cpt edit screen, like the widgets screen.
	if (
		function_exists("get_current_screen") &&
		empty(\get_current_screen()->post_type)
	) {
		return;
	}

	\wp_enqueue_style(
		$plugin_name,
		$dist_dir . $plugin_name . ".css",
		[],
		$plugin_version
	);

	\wp_enqueue_script(
		$plugin_name,
		$dist_dir . $plugin_name . ".js",
		[
			"lodash",
			"wp-block-editor",
			"wp-blocks",
			"wp-components",
			"wp-data",
			"wp-edit-post",
			"wp-element",
			"wp-hooks",
			"wp-i18n",
			"wp-plugins",
			"wp-rich-text",
		],
		$plugin_version,
		true // Enqueue in the footer.
	);
}
