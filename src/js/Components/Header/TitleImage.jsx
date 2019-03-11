import l from "../../utils";

const TitleImage = ({ title, content }) => {
	const images = content.map((url, index) => (
		<div key={index} className="block-image-container">
			<img className="block-image" src={url} />
		</div>
	));

	return (
		<div className="block-title content_type-image">
			<span className="block-name">{title}</span>
			<div className="block-content">{images}</div>
		</div>
	);
};

export default TitleImage;
