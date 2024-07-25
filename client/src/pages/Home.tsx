import { Link } from "react-router-dom";

const HomePage = (): React.JSX.Element => {
  return (
    <>
      <div className="flex items-center justify-center flex-col p-6 overflow-auto">
        <div className="bg-white p-8 rounded-lg shadow-md w-full">
          <h1 className="text-3xl font-semibold text-indigo-700">This is a rule engine that uses AST</h1>
          <div className="mt-5 text-md font-semibold text-indigo-700">
            <p>Please visit <Link to="/create" className="text-blue-900 underline">Create AST</Link> page to create AST</p>
            <p>Please visit <Link to="/combine" className="text-blue-900 underline">Combine Rules</Link> page to combine rules</p>
            <p>Please visit <Link to="/evaluate" className="text-blue-900 underline">Evaluate Data</Link> page to evaluate data</p>
            <p>Please visit <Link to="/available-rules" className="text-blue-900 underline">Available Rules</Link> page to see available rules</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;