import React, { useState } from "react";
import { RightOutlined, DownOutlined } from "@ant-design/icons";
import ShowProjects from "../projects/ShowProjects";
const Favorites = () => {
  const [showFavorites, setShowFavorites] = useState(false);

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
      {showFavorites && <ShowProjects show={"favorites"} />}
    </div>
  );
};

export default Favorites;
