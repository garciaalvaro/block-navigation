import l from "../../utils/#";

const Div = ({ children, ...rest }) => <div {...rest}>{children}</div>;
const Span = ({ children, ...rest }) => <span {...rest}>{children}</span>;
const H3 = ({ children, ...rest }) => <h3 {...rest}>{children}</h3>;
const Hr = ({ ...rest }) => <hr {...rest} />;

export default Div;
export { Span, H3, Hr };
