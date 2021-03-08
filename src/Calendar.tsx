import React, { Fragment, useCallback, useLayoutEffect, useState } from "react";
import {
  render10YearsDecArrow,
  renderHeader,
  renderMonthDecArrow,
  renderMonthIncArrow,
  renderYearDecArrow,
  renderYearIncArrow,
} from "./calendar-components";
import {
  renderEmptyCell,
  renderSingleIncArrow,
  renderSolidLine,
  renderValueCell,
} from "./calendar-helpers";
import { months } from "./utils";

export default function Calendar(props: any) {
  const [curYear, setCurYear] = useState(new Date().getFullYear());
  const [curMonth, setCurMonth] = useState(new Date().getMonth());
  const [curDay, setCurDay] = useState(new Date().getDate());
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const [calYears, setCalYears] = useState<Array<number[]> | null>(null);
  const [showTenYears, setShowTenYears] = useState(false);
  const [tenYearIndex, setTenYearIndex] = useState<number | null>(null);
  const [minDay] = useState(props.minDay || 1);
  const [minMonth] = useState(props.minMonth || 0);
  const [minYear] = useState(props.minYear || null);
  const [maxMonth] = useState(props.maxMonth || 0);
  const [maxYear] = useState(props.maxYear || null);

  const daysMap: { [k: string]: string } = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
  };

  const CAL_YEAR = new Date().getFullYear();
  const getCalYears = useCallback(() => {
    const maxYearsToShow = 200;
    const startYear = CAL_YEAR;
    const years = [];
    let tenYears: number[] = [];
    for (let i = 0; i <= maxYearsToShow; i++) {
      tenYears.push(startYear + i);
      if (tenYears.length === 10) {
        years.push(tenYears);
        tenYears = [];
      }
    }
    return years;
  }, [curYear]);

  useLayoutEffect(() => {
    setCalYears(getCalYears());
  }, [getCalYears]);

  const renderDaysOfWeek = () => {
    return (
      <Fragment>
        {Object.keys(daysMap).map((day, i) => (
          <div className="calendar-weekday" key={i * 12}>
            {daysMap[day]}
          </div>
        ))}
      </Fragment>
    );
  };

  const getBlankBoxes = () => {
    const blanks = [];
    const firstDay = new Date(curYear, curMonth, 1).getDay();
    for (let i = 0; i < firstDay; i++) blanks.push(-1);
    return blanks;
  };

  const formRows = (allDays: number[]) => {
    const rows: Array<number[]> = [];
    let cells = [];
    for (let i = 0; i < allDays.length; i += 1) {
      cells.push(allDays[i]);
      if (cells.length === 7) {
        rows.push(cells.slice());
        cells = [];
      }
      if (i === allDays.length - 1) {
        rows.push(cells.slice());
        cells = [];
      }
    }
    return rows;
  };

  const renderDaysInMonth = () => {
    const allDays = [...getBlankBoxes()];
    const noOfDaysinMonth = new Date(curYear, curMonth + 1, 0).getDate();
    for (let i = 1; i <= noOfDaysinMonth; i += 1) allDays.push(i);
    return formRows(allDays);
  };

  const onSelectDate = (cellValue: any) => {
    setCurDay(cellValue);
  };

  const onMonthDec = (e: any) => {
    if (curMonth !== 0) setCurMonth(curMonth - 1);
    else {
      setCurMonth(11);
      setCurYear(curYear - 1);
    }
  };

  const onMonthInc = (e: any) => {
    if (curMonth === 11) {
      setCurYear(curYear + 1);
      setCurMonth(0);
    } else setCurMonth(curMonth + 1);
  };

  const onYearDec = (e: any) => setCurYear(curYear - 1);

  return (
    <div className="calendar-main-div">
      <div className="calendar-header">
        {/** ----Render  Year Decrement Arrows ----- */}

        {!showMonths &&
          !showYears &&
          !showTenYears &&
          renderYearDecArrow(curYear, minYear, onYearDec)}

        {/** ----- Render Month Decrement Arrow ---- */}

        {!showMonths &&
          !showYears &&
          !showTenYears &&
          renderMonthDecArrow(onMonthDec, curYear, curMonth, minYear, minMonth)}

        {/** --- If 10 years calendar window is selected Render ten years duration Decrement Arrow ---- */}
        {showTenYears && !showMonths && !showYears && (
          <div style={{ minWidth: 20, maxWidth: 20, width: 20 }}>
            {showTenYears &&
              !showYears &&
              !showMonths &&
              !!tenYearIndex &&
              tenYearIndex !== 0 &&
              render10YearsDecArrow(setTenYearIndex, tenYearIndex)}
          </div>
        )}

        {/** ------ Render Header based on the calendar window ------ */}

        {/** ---Header  for 10 year window ---- */}
        {showTenYears &&
          !showMonths &&
          !showYears &&
          renderHeader(
            setShowTenYears,
            setShowYears,
            setShowMonths,
            months[curMonth],
            curYear,
            minYear,
            maxYear,
            minMonth,
            curMonth,
            "calendar-10year-header-content"
          )}

        {/** ------ Header for calendar month window ----- */}
        {showMonths &&
          !showTenYears &&
          !showYears &&
          renderHeader(
            setShowTenYears,
            setShowYears,
            setShowMonths,
            months[curMonth],
            curYear,
            minYear,
            maxYear,
            minMonth,
            curMonth,
            "calendar-month-header-content"
          )}

        {/** ----- Header for calendar year window ---- */}
        {!showMonths &&
          !showTenYears &&
          showYears &&
          renderHeader(
            setShowTenYears,
            setShowYears,
            setShowMonths,
            months[curMonth],
            curYear,
            minYear,
            maxYear,
            minMonth,
            curMonth,
            "calendar-year-header-content"
          )}

        {/** ------ Header for normal calendar window ---- */}
        {!showMonths &&
          !showTenYears &&
          !showYears &&
          renderHeader(
            setShowTenYears,
            setShowYears,
            setShowMonths,
            months[curMonth],
            curYear,
            minYear,
            maxYear,
            minMonth,
            curMonth,
            "calendar-header-content"
          )}

        {showTenYears &&
          !showYears &&
          !showMonths &&
          calYears &&
          tenYearIndex !== null &&
          calYears.length - 1 !== tenYearIndex && (
            <div
              className="calendar-inc-ten-years-arrow"
              onClick={() => {
                setTenYearIndex(tenYearIndex + 1);
              }}
            >
              {renderSingleIncArrow()}
            </div>
          )}
        {!showMonths &&
          !showYears &&
          !showTenYears &&
          renderMonthIncArrow(onMonthInc, curYear, curMonth)}
        {!showMonths &&
          !showYears &&
          !showTenYears &&
          renderYearIncArrow(setCurYear, curYear)}
      </div>
      {!showTenYears && !showYears && !showMonths && (
        <div className="calendar-week-days">{renderDaysOfWeek()}</div>
      )}

      {/** Solid Line  */}
      {renderSolidLine()}

      {!showMonths && !showYears && !showTenYears && (
        <div className="calendar-days-content">
          {renderDaysInMonth().map((row, i) => {
            return (
              <div className="calendar-date-row" key={i * 5}>
                {row.map((cell, j) => {
                  const isSelected = cell === curDay;
                  const activeCls = isSelected
                    ? "calendar-valuecell selected"
                    : "calendar-valuecell";
                  if (cell === -1) return renderEmptyCell(j);
                  else return renderValueCell(j, onSelectDate, cell, activeCls);
                })}
              </div>
            );
          })}
        </div>
      )}

      {showMonths && !showYears && (
        <div className="calendar-months-select">
          {months.map((month) => (
            <div
              key={month}
              className={
                months[curMonth] === month
                  ? "calendar-month highlight"
                  : "calendar-month"
              }
              onClick={() => {
                setCurMonth(months.indexOf(month));
                setShowMonths(false);
                setShowYears(false);
                setShowTenYears(false);
              }}
            >
              {month}
            </div>
          ))}
        </div>
      )}

      {showYears && calYears && !showMonths && (
        <div className="calendar-100-years">
          {calYears.map((tenYears, i) => (
            <div
              onClick={() => {
                setShowYears(false);
                setShowTenYears(true);
                setTenYearIndex(i);
              }}
              className={
                tenYears.indexOf(curYear) !== -1
                  ? " calendar-10-year highlight"
                  : "calendar-10-year"
              }
              key={i * 80}
            >
              {tenYears[0]} - {tenYears[tenYears.length - 1]}
            </div>
          ))}
        </div>
      )}

      {showTenYears &&
        !!calYears &&
        tenYearIndex !== null &&
        tenYearIndex >= 0 &&
        !showMonths &&
        !showYears && (
          <div className="calendar-10-years">
            {calYears[tenYearIndex].map((year) => (
              <div
                className={
                  year === curYear ? "calendar-year highlight" : "calendar-year"
                }
                onClick={() => {
                  setCurYear(year);
                  setShowMonths(false);
                  setShowTenYears(false);
                  setShowYears(false);
                }}
                key={year}
              >
                {year}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
