import { useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_URI, axiosInstance } from "../config/config";
import { notify } from "../utils";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { CodeiumEditor } from "@codeium/react-code-editor";

const EvaluateRulePage = (): React.JSX.Element => {
  const [data, setData] = useState({
    json: "",
    ast: ""
  });

  const [output, setOutput] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${BACKEND_URI}/api/v1/rule/evaluate`, 
        {
          ast: JSON.parse(data.ast),
          data: JSON.parse(data.json)
        },
        {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.error) {
        notify(response.data.message, {
          icon: <ErrorIcon />,
        });
        return;
      }
      const result = response.data.data;
      setOutput(result);
      notify(response.data.message, {
        icon: <CheckmarkIcon />,
      })
    } catch (error) {
      notify("Something went wrong", {
        icon: <ErrorIcon />,
      })
    }
  };

  return (
    <div className="flex items-center justify-center flex-col p-6 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-3xl font-semibold text-indigo-700">Evaluate String</h1>
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="ast">
            Enter AST (You can copy one of the <Link to="/available-rules" className="text-blue-900 underline">Available ASTs</Link>) 
          </label>
          <CodeiumEditor language="json" value={data.ast} onChange={value => setData({ ...data, ast: value ? value : "" })} className="w-full p-2 border border-indigo-300 rounded-md outline-none focus-within:outline-none min-h-[100px]" theme="vs-dark" />
        </div>
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="json">
            Enter JSON data
          </label>
          <CodeiumEditor language="json" value={data.json} onChange={value => setData({ ...data, json: value ? value : "" })} className="w-full p-2 border border-indigo-300 rounded-md outline-none focus-within:outline-none min-h-[100px]" theme="vs-dark" />
        </div>
        <button
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mt-4"
          onClick={handleSubmit}
        >
          Evaluate
        </button>
        <div className="mt-5">
          <div className="block text-indigo-600 font-bold mb-2">
            Output
          </div>
          {output !== null && <div className="h-[200px] bg-indigo-100 rounded-md p-2 overflow-y-auto">{output ? "Data is valid" : "Data is invalid"}</div>}
        </div>
      </div>
    </div>
  )
}

export default EvaluateRulePage;