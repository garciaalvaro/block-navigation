import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";

import styles from "./plugin-info.styl";
import { Logo } from "@/components/logo";

export const PluginInfo: FunctionComponent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.logo}>
				<Logo />
			</div>

			<div className={styles.info}>
				<h3 className={styles.name}>{__("Block Navigation")}</h3>

				<p className={styles.description}>
					{__("Block Navigation panel with useful features.")}
				</p>
			</div>
		</div>
	);
};
