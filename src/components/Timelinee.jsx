import React from "react";
import { Timeline } from 'antd';

export function arrayToItems(array) {
  return array.map((item) => {
    return { children: item };
  });
}

export function Timelinee(props){
  const stepsarray = props.steps || []; // überprüfen, ob props.steps definiert ist

  return(
    <>
      <Timeline items={arrayToItems(stepsarray)} />
    </>
  )
}