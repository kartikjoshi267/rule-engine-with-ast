import { useState } from "react";
import { notify } from "../utils";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { axiosInstance, BACKEND_URI } from "../config/config";
import JSONViewer from "../components/JSONViewer";

const CombineRulesPage = (): React.JSX.Element => {
  const [rules, setRules] = useState([{ id: Date.now(), text: '' }]);
  const [jsonOutput, setJsonOutput] = useState({});

  const addRule = () => {
    setRules([...rules, { id: Date.now(), text: '' }]);
  };

  const removeRule = (id: number) => {
    if (rules.length === 1) {
      notify("Cannot remove all rules", {
        icon: <ErrorIcon />,
      });
      return;
    }
    setRules(rules.filter(rule => rule.id !== id));
  };

  const handleInputChange = (id: number, value: string) => {
    const updatedRules = rules.map(rule => 
      rule.id === id ? { ...rule, text: value } : rule
    );
    setRules(updatedRules);
  };

  const combineRules = async () => {
    try {
      const response = await axiosInstance.post(`${BACKEND_URI}/api/v1/rule/combine`, {
        rules: rules.map(rule => rule.text)
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
      notify(response.data.message, {
        icon: <CheckmarkIcon />,
      });
      setJsonOutput(response.data.data);
      setRules([{ id: Date.now(), text: '' }]);
    } catch (error) {
      notify("Something went wrong", {
        icon: <ErrorIcon />,
      });
    }
  };

  return (
    <div className="flex items-center p-6 overflow-auto">
      <div className="bg-white p-8 rounded-lg shadow-md w-full">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-4">Combine Rules</h1>
        {rules.map((rule, index) => (
          <div key={rule.id} className="flex items-center mb-4">
            <input
              type="text"
              value={rule.text}
              placeholder={`Enter rule string ${index + 1}`}
              onChange={(e) => handleInputChange(rule.id, e.target.value)}
              className="w-full p-2 border border-indigo-300 rounded-md mr-2"
            />
            <button
              onClick={() => removeRule(rule.id)}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={addRule}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
        >
          Add Rule
        </button>
        <button
          onClick={combineRules}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 mt-4"
        >
          Combine Rules
        </button>
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="json">
            Output
          </label>
          {Object.is(jsonOutput, {}) ? <p className="text-gray-500">No output</p> : <JSONViewer src={jsonOutput as JSON} />}
        </div>
      </div>
    </div>
  );
}

export default CombineRulesPage;
