import l from "../../utils/#";

const TitleText = ({ title, content }) => {
	return (
		<div className="block-title content_type-text">
			<span className="block-name">{title}</span>
			<span className="block-content">{content}</span>
		</div>
	);
};

export default TitleText;
