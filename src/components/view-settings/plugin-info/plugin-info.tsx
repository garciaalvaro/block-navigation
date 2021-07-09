import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";

import styles from "./plugin-info.styl";
import { Logo } from "@/components/logo";
import { plugin_title } from "@/utils/data";

export const PluginInfo: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Logo />
			</div>

			<div className={styles.info}>
				<h3 className={styles.name}>{plugin_title}</h3>

				<p className={styles.description}>
					{__("Block Navigation panel with useful features.")}
				</p>
			</div>
		</div>
	);
};
