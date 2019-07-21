import { plugin_namespace, plugin_title } from "utils/data/plugin";
import { Icon } from "utils/components";
// import { Tree } from "./Tree";
import { Root } from "Components/Root/Root";

const { Fragment } = wp.element;
const { PluginSidebar, PluginSidebarMoreMenuItem } = wp.editPost;

wp.plugins.registerPlugin(plugin_namespace, {
	icon: <Icon icon="logo" />,
	render: () => (
		<Fragment>
			<PluginSidebar name={plugin_namespace} title={plugin_title}>
				<Root />
				{/* <Tree /> */}
			</PluginSidebar>
			<PluginSidebarMoreMenuItem target={plugin_namespace}>
				{plugin_title}
			</PluginSidebarMoreMenuItem>
		</Fragment>
	)
});
