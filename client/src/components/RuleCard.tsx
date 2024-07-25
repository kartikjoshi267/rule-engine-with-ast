import JSONViewer from "./JSONViewer"

const RuleCard = ({
  name,
  ruleString,
  ast,
}: {
  name: string,
  ruleString: string,
  ast: object
}): React.JSX.Element => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="bg-indigo-200 p-5 rounded-lg shadow-md w-11/12">
        <h1 className="text-2xl font-semibold text-indigo-700">{name}</h1>
        <div className="mt-5">
          <label className="text-indigo-600 font-bold mb-2" htmlFor="rule">
            Rule String
          </label>
          <textarea
            id="rule"
            name="rule"
            value={ruleString}
            className="w-full p-2 border border-indigo-900 rounded-md h-[150px]"
            readOnly
          />
        </div>  
        <div className="mt-5">
          <label className="block text-indigo-600 font-bold mb-2" htmlFor="ast">
            AST
          </label>
          <div className="h-[200px] bg-indigo-100 rounded-md p-2 overflow-y-auto">
            <JSONViewer src={ast as JSON} />
          </div>
        </div>
      </div>
    </div>
  );  
}

export default RuleCard