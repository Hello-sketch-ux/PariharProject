import React, { useEffect } from "react";
import SustainableGoal from "./sustainableGoals.png";
import { useState } from "react";

interface Goal {
    title: string;
    description: string;
}

const SustainableGoals: React.FC = () => {
    const[windowWidth , setWindowWidth] = useState(window.innerWidth);
    const goals: Goal[] = [
        {
            title: "SDG 9: Industry, Innovation, and Infrastructure",
            description:
                "Parihar India embodies innovation within the healthcare and hygiene industry, developing new products that meet market needs while promoting cleanliness and sustainability.",
        },
        {
            title: "SDG 3: Good Health and Well-being",
            description:
                "By producing hygienic toilet seat covers, Parihar India promotes better sanitation, reducing the spread of germs and diseases, and improving public health.",
        },
        {
            title: "SDG 13: Climate Action",
            description:
                "Parihar India contributes to SDGs by reducing carbon footprint through sustainable materials, ecofriendly production, and waste reduction practices.",
        },
        {
            title: "SDG 12: Responsible Consumption and Production",
            description:
                "With a focus on sustainable materials and eco-friendly packaging, our company supports responsible production practices and encourages consumers to use products that minimize environmental impact.",
        },
        {
            title: "SDG 6: Clean Water and Sanitation",
            description:
                "Our product directly contributes to improved sanitation in public restrooms, a core aspect of SDG 6, which aims for equitable access to sanitation and hygiene for all.",
        },
    ];

    useEffect(()=>
    {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          // Add the resize event listener
          window.addEventListener("resize", handleResize);
      
          // Clean up on unmount
          return () => {
            window.removeEventListener("resize", handleResize);
          };

    },[])

    return (
        <div className="max-w-6xl flex flex-col justify-start items-center gap-4  text-center ">
            {
               window.innerWidth>=800 ? (
                    <div>
                        <img src={SustainableGoal} className="p-[4rem]" alt="Sustainable Development Goals" />
                        <div className="flex justify-center items-start flex-wrap w-[100vw] p-8 max-sm:p-6">
                            <div className="gap-8 flex flex-wrap justify-center items-stretch">
                                {goals.map((goal, index) => (
                                <div key={index} className="flex flex-col bg-white rounded-[3px] border-t-4 border-green-600 shadow-sm  transition-shadow duration-300 p-6 w-[20rem] max-md:w-[80%] max-sm:w-[100%] hover:bg-[#ecffe6] ">
                                <h3 className="font-semibold text-lg  text-gray-800 mb-4">{goal.title}</h3>
                                <p className="text-gray-700 text-lg max-sm:text-[0.9rem] mb-6">{goal.description}</p>
                                </div>
                                
                                ))}
                            </div>
                        </div>
                    </div>
                )
                :
                (
                    <div>
                        <h2 className="text-3xl max-md:text-2xl  font-semibold mb-8 max-md:mb-0 p-8 max-sm:p-4">Our Sustainable Development Goals (SDGs)</h2>
                        <div className="px-6 md:px-16 py-10">
                            <div className="space-y-6 text-gray-800 max-w-[600px]">
                                {goals.map((item, index) => (
                                <div key={index} className={`flex flex-col justify-start items-center gap-4  ${index==4 ? "mb-4" : "mb-12"}`}>
                                    <div className="w-[15px] h-[15px] rounded-full bg-green-700"></div>
                                    <span className="font-semibold text-[1.25rem] text-green-700">{item.title}:</span>{" "}
                                    <span className="text-gray-700">{item.description}</span>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                )
            }
            
            
            
        </div>
    );
};

export default SustainableGoals;