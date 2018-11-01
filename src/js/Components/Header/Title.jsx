import l from "../../utils/#";
import TitleUtils from "./_TitleUtils";
import TitleNone from "./TitleNone";
import TitleImage from "./TitleImage";
import TitleText from "./TitleText";

const { isEmpty } = lodash;

const Title = ({ attributes, name, title }) => {
	return (
		<TitleUtils attributes={attributes} name={name}>
			{({ content, type }) => {
				if (type === "image" && !isEmpty(content)) {
					return <TitleImage title={title} content={content} />;
				} else if (type === "text" && !isEmpty(content)) {
					return <TitleText title={title} content={content} />;
				}

				return <TitleNone title={title} />;
			}}
		</TitleUtils>
	);
};

export default Title;
