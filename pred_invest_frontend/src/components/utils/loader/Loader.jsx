import "./loader.css";

const DEFAULT_WIDTH = 130;
const DEFAULT_HEIGHT = 130;

export default function Loader({width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT}) {
    const loaderSizes = {
        width: `${width}px`,
        height: `${height}px`,
    };

    return <span className="loader" style={loaderSizes}></span>;
}
