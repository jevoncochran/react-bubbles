import React, { useState, useEffect } from "react";

import { Bubbles, ColorList } from "./index";
import axiosWithAuth from "../utils/axiosWithAuth";

export const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // console.log(colorList);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        // console.log(res);
        setColorList(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

