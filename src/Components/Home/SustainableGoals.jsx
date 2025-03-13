import React from "react";
import SustainableGoal from "./sustainableGoals.png"

const SustainableGoals = () => {
  const goals = [
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

  return (
    <div className="max-w-6xl mx-auto text-center py-10 px-4">
      <img src={SustainableGoal} className="mb-[3rem]"/>
      <h2 className="text-4xl font-semibold mb-16">Our Sustainable Development Goals (SDGs)</h2>
      <div className="relative">
        {/* Timeline Line */}
        {/*<div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 w-full h-1 bg-green-500 hidden md:block"></div>*/}
        <div className="grid md:grid-cols-5 gap-6 w-full relative z-10">
          {goals.map((goal, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              <div className="w-4 h-4 bg-green-500 rounded-full mb-4 relative z-20"></div>
              <h3 className="font-semibold text-lg mb-2">{goal.title}</h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SustainableGoals;