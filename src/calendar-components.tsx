import React from "react";
import {
  renderDoubleDecArrow,
  renderDoubleIncArrow,
  renderSingleDecArrow,
  renderSingleIncArrow,
} from "./calendar-helpers";

export const renderYearDecArrow = (onYearDec: (e: any) => void) => {
  return (
    <div style={{ width: 18, minWidth: 18, maxWidth: 18 }}>
      <div
        className="calendar-year-dec-arrow"
        onClick={(e: any) => onYearDec(e)}
      >
        {renderDoubleDecArrow()}
      </div>
    </div>
  );
};

export const renderMonthDecArrow = (onMonthDec: (e: any) => void) => {
  return (
    <div style={{ width: 18, minWidth: 18, maxWidth: 18 }}>
      <div
        className="calendar-month-dec-arrow"
        onClick={(e: any) => onMonthDec(e)}
      >
        {renderSingleDecArrow()}
      </div>
    </div>
  );
};

export const render10YearsDecArrow = (
  setTenYearIndex: Function,
  tenYearIndex: number
) => (
  <div
    className="calendar-dec-ten-years-arrow"
    onClick={() => {
      setTenYearIndex(tenYearIndex - 1);
    }}
  >
    {renderSingleDecArrow()}
  </div>
);

export const renderHeader = (
  setShowTenYears: Function,
  setShowYears: Function,
  setShowMonths: Function,
  month: string,
  year: number,
  className: string
) => {
  return (
    <div className={className}>
      <div
        className="calendar-cur-month"
        onClick={() => {
          setShowTenYears(false);
          setShowYears(false);
          setShowMonths(true);
        }}
      >
        {month}
      </div>
      <div
        className="calendar-cur-year"
        onClick={() => {
          setShowMonths(false);
          setShowYears(true);
          setShowTenYears(false);
        }}
      >
        {year}
      </div>
    </div>
  );
};

export const renderMonthIncArrow = (
  onMonthInc: (e: any) => void,
  curYear: number,
  curMonth: number
) => {
  return (
    <div style={{ width: 18, minWidth: 18, maxWidth: 18 }}>
      <div
        className="calendar-month-inc-arrow"
        onClick={(e: any) => onMonthInc(e)}
      >
        {renderSingleIncArrow()}
      </div>
    </div>
  );
};

export const renderYearIncArrow = (setCurYear: Function, curYear: number) => {
  return (
    <div style={{ width: 18, minWidth: 18, maxWidth: 18 }}>
      <div
        className="calendar-year-inc-arrow"
        onClick={() => setCurYear(curYear + 1)}
      >
        {renderDoubleIncArrow()}
      </div>
    </div>
  );
};
