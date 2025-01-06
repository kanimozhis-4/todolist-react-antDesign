import React, { useState ,useContext } from "react";
import { RightOutlined, DownOutlined ,EllipsisOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";
import { ProjectsContext } from "../../../contexts/ProjectContext";
import ShowProjects from "../projects/ShowProjects";
const Favorites = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const { allProjects,selectedProject,setSelectedProject,colorMapping } = useContext(ProjectsContext);
  const [activeTooltip, setActiveTooltip] = useState(null); 
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-gray-500">Favorites</h1>
        {!showFavorites ? (
          <RightOutlined
            className="text-gray-500 opacity-0 
              transition-opacity group-hover:opacity-100 group-focus:opacity-100 cursor-pointer"
            onClick={(e) => {
              setShowFavorites(!showFavorites);
            }}
          />
        ) : (
          <DownOutlined
            className="text-gray-500"
            onClick={(e) => {
              setShowFavorites(!showFavorites);
            }}
          />
        )}
      </div>
      {showFavorites &&
       <ShowProjects show={"favorites"}/>
      }
        </div>
      // )}
     
    // </div> 
  );
};

export default Favorites;
