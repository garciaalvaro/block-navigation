<?php
/**
 * Plugin Name: Block Navigation
 * Plugin URI: https://wordpress.org/plugins/block-navigation/
 * Description: Block Navigation sidebar panel for the new Block editor.
 * Author: melonpan
 * Version: 3.4.0
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
	$plugin_version = "3.4.0";
	$dist_dir = \plugins_url("dist/", __FILE__);

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
