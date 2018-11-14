<?php
/**
 * Plugin Name: Block Navigation
 * Plugin URI: https://wordpress.org/plugins/block-navigation/
 * Description: Block Navigation panel with useful features.
 * Author: melonpan
 * Version: 1.1.1
 * License: GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

namespace BLOCKNAVIGATION;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'BLOCKNAVIGATION_PLUGIN_VERSION' ) ) {
	define( 'BLOCKNAVIGATION_PLUGIN_VERSION', '1.1.1' );
}
if ( ! defined( 'BLOCKNAVIGATION_BUILD_DIR' ) ) {
	define( 'BLOCKNAVIGATION_BUILD_DIR', plugins_url( 'build/', __FILE__ ) );
}

/**
 * Enqueue the plugin styles and scripts.
 *
 * @since 1.0.0
 */
function enqueue() {

	wp_enqueue_style(
		'block-navigation-css',
		BLOCKNAVIGATION_BUILD_DIR . 'block-navigation.css',
		array(),
		BLOCKNAVIGATION_PLUGIN_VERSION
	);

	wp_enqueue_script(
		'block-navigation-js',
		BLOCKNAVIGATION_BUILD_DIR . 'block-navigation.js',
		array(
			'jquery',
			'lodash',
			'wp-i18n',
			'wp-compose',
			'wp-element',
			'wp-components',
			'wp-editor',
			'wp-edit-post',
			'wp-plugins',
			'wp-data',
			'wp-rich-text',
		),
		BLOCKNAVIGATION_PLUGIN_VERSION,
		true // Enqueue in the footer.
	);

}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue' );
