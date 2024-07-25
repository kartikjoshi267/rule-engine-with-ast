import { useState } from "react";
import JSONViewer from "../components/JSONViewer";
import { BACKEND_URI, axiosInstance } from "../config/config";
import { notify } from "../utils";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";

const ASTCreationPage = (): React.JSX.Element => {
  const [data, setData] = useState({
    rule: "",
    name: "",
  });
  const [jsonOutput, setJsonOutput] = useState(null);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(`${BACKEND_URI}/api/v1/rule/create`, {
        ruleString: data.rule,
        name: data.name
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.error) {
        notify(response.data.message, {
          icon: <ErrorIcon />,
        });
        return;
      }
      setJsonOutput(response.data.data.ast);
      setData({
        rule: "",
        name: "",
      });
      notify(response.data.message, {
        icon: <CheckmarkIcon />,
      });
    } catch (error) {
      notify("Something went wrong", {
        icon: <ErrorIcon />,
      });
    }
  };

  return (
    <div className="flex items-center justify-center p-6 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-3xl font-semibold text-indigo-700">Create AST with Rule String</h1>
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="name">
            Enter Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            className="w-full p-2 border border-indigo-300 rounded-md"
            autoComplete="off"
          />
        </div>
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="rule">
            Enter Rule String
          </label>
          <textarea
            id="rule"
            name="rule"
            value={data.rule}
            onChange={onChangeHandler}
            className="w-full p-2 border border-indigo-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mt-4"
        >
          Submit
        </button>
        <div className="mt-6">
          {jsonOutput && (
            <JSONViewer src={jsonOutput} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ASTCreationPage