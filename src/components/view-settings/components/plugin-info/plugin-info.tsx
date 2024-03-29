import React, { FunctionComponent } from "react";
import { __ } from "@wordpress/i18n";

import { Logo } from "@/components/logo";

import styles from "./styles.styl";

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
