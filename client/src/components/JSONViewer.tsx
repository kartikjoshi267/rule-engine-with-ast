import JsonView from "react18-json-view";
import 'react18-json-view/src/style.css'

const JSONViewer = ({ src } : { src: JSON }): React.JSX.Element => {
  return (
    <>
      <JsonView
        src={src}
        displaySize={true}
        collapseStringMode="directly" 
        collapseStringsAfterLength={20}
        theme="atom"
      />
    </>
  );
}

export default JSONViewer