=== Block Navigation ===
Contributors: melonpan
Tags: gutenberg, blocks, navigation, editor, drag-and-drop
Requires at least: 4.9.8
Tested up to: 5.0
Stable tag: 1.1.2
Requires PHP: 5.6
License: GPLv3
License URI: https://www.gnu.org/licenses/gpl-3.0.html

Block Navigation sidebar panel for the new Gutenberg editor.

== Description ==

Block Navigation provides a sidebar with the current post/page's blocks and some tools to facilitate the editing process in the new Gutenberg editor.
Inside the panel several utilities are included to enhance the UX, such as dragging blocks to a different location, moving them by click, selecting them, display a small snippet of the block's content, etc.
These functionalities are especially useful for nested blocks - blocks that are inside parent blocks which are difficult to select or move in the editor.
The plugin also provides some features for Plugin and Theme developers such as: click and Copy the block's clientId and click to console.log helpful block's data.

== Screenshots ==

1. Main view, dark scheme.
2. Dragging a block to a different position.
3. Opened block menu.
4. Development Tool, console log block data.
5. List of available color schemes, light and dark.

== Usage ==

Inside the Post editor on the right side of the top Block's Toolbar the plugin icon/button should appear (if not, please read the FAQ below).
Click the icon/button to open the plugin sidebar.

== Installation ==

Installation from the WordPress admin.

1. Log in to the WordPress admin and navigate to Plugins > Add New.
2. Type "Block Navigation" in the Search field.
3. In the results list Block Navigation plugin should appear, click **Install Now** button.
4. Once it finished installing, click the Activate button.
5. That's it, now you can go to any post where Gutenberg is enabled and start using the plugin.

== Frequently Asked Questions ==

= I do not see the plugin icon in the post editor =

Alternatively the Plugin can be opened from the Show More button (the 3 dots on the right side of the Editor Top Bar).
Click the More button and inside the menu list click on the plugin name "Block Navigation".

== Credits ==

Images from the readme banner and screenshots belong to [Sander Wehkamp](https://unsplash.com/@sanderwehkamp).

== Changelog ==

= 1.1.2 =
* Cleaned console log output and added "attributes-available".
* Fixed castaña scheme dark color.
* Updated cover block and added media-text block.
* Small typo and bug fixes.

= 1.1.1 =
* Make use of Rich Text WordPress package.
* Small typo and bug fixes.

= 1.1.0 =
* Added Development Mode. Currently it adds two extra actions inside each Block's menu: Copy the Block clientId to the Clipboard and Log to the browser's console some helpful Block related data.
* Clicking on an already selected block deselects it.

= 1.0.1 =
* Fix bug with jQuery variable
* Upgrade logo to SVG
* Schemes naming fix

= 1.0.0 =
* Initial release.
