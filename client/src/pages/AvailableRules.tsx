import { useState, useEffect } from "react";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import RuleCard from "../components/RuleCard";
import { BACKEND_URI, axiosInstance } from "../config/config";
import { notify } from "../utils";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const AvailableRulesPage = (): React.JSX.Element => {
  
  const [existingRules, setExistingRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await axiosInstance.get(`${BACKEND_URI}/api/v1/rule`, {
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
      setExistingRules(response.data.data);
    } catch (error) {
      notify("Something went wrong", {
        icon: <ErrorIcon />,
      });
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchRules();
    }
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <div className="overflow-y-auto h-full">
      <h1 className="text-xl font-semibold text-indigo-700 mb-2 pt-3 pl-3">Available Rules (Scroll left and right)</h1>
      <Carousel infiniteLoop useKeyboardArrows={true} animationHandler={"slide"} showThumbs={false} labels={{
        leftArrow: 'Previous Rule',
        rightArrow: 'Next Rule',
        item: 'Rule'
      }}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {existingRules.map((rule: any) => (
          <RuleCard key={rule._id} name={rule.name} ruleString={rule.ruleString} ast={rule.ast} />
        ))}
      </Carousel>
      {/* <div className="flex flex-row space-x-2 overflow-x-auto p-2" style={{ transform: "rotate(180deg)" }}>
      </div> */}
    </div>
  );
}

export default AvailableRulesPage;