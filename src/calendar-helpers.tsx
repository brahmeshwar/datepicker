import React, { Fragment } from "react";
export const renderSingleDecArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      cursor="pointer"
      stroke="#757575"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  );
};

export const renderDoubleIncArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      cursor="pointer"
      stroke="#757575"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="13 17 18 12 13 7"></polyline>
      <polyline points="6 17 11 12 6 7"></polyline>
    </svg>
  );
};

export const renderDoubleDecArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#757575"
      cursor="pointer"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="11 17 6 12 11 7"></polyline>
      <polyline points="18 17 13 12 18 7"></polyline>
    </svg>
  );
};

export const renderSingleIncArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#757575"
      strokeWidth="2"
      cursor="pointer"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export const renderEmptyCell = (j: number) => {
  return <div key={j * 25} className="calendar-emptycell"></div>;
};

export const renderValueCell = (
  j: number,
  onSelect: Function,
  cell: number,
  activeCls: string
) => {
  return (
    <Fragment key={j * 30}>
      <div
        onClick={(e: any) => onSelect(cell)}
        key={j * 25}
        className={activeCls}
      >
        {cell}
      </div>
    </Fragment>
  );
};

export const renderSolidLine = () => (
  <div
    style={{
      width: "100%",
      borderBottom: "1px solid lightgray",
    }}
  ></div>
);
