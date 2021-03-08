import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Calendar from "./Calendar";
import "./styles.css";

interface IDatePickerProps {
  delimeter?: string;
  format?: string;
  onSelectDate: (val: string) => void;
}

export function DatePicker(props: IDatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const inputEle = useRef<HTMLInputElement | null>(null);
  const datePickerDiv = useRef<HTMLDivElement | null>(null);
  const calendarDiv = useRef<HTMLDivElement | null>(null);
  const [minDate] = useState<string | null>(null);
  const [minDay, setMinDay] = useState<number | null>(null);
  const [minMonth, setMinMonth] = useState<number | null>(null);
  const [minYear, setMinYear] = useState<number | null>(null);
  const [maxDate] = useState<string | null>(null);
  const [maxDay, setMaxDay] = useState<number | null>(null);
  const [maxMonth, setMaxMonth] = useState<number | null>(null);
  const [maxYear, setMaxYear] = useState<number | null>(null);
  const [hasError, setHasError] = useState<string | null>(null);
  const [delimeter] = useState<string | null>(props.delimeter || null);
  const [resultFormat, setResultFormat] = useState<string | null>(
    props.format || null
  );

  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];
  const validateDelPoints = (arg: string) => {
    const points = [];
    for (let i = 0; i < arg.length; i += 1)
      if (isNaN(parseInt(arg[i], 10))) points.push(i);
    return (
      points.length === 2 &&
      points.indexOf(4) !== -1 &&
      points.indexOf(7) !== -1
    );
  };

  const isLeapYear = (year: number) =>
    year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

  const validateDateValues = useCallback(
    (arg: string, argType: string) => {
      const vals = arg.split(arg[4]);
      let success = true;
      let errMessage: null | string = null;
      for (let i = 0; i < vals.length; i += 1) {
        for (let j = 0; j < vals[i].length; j += 1) {
          if (isNaN(parseInt(vals[i][j], 10))) {
            success = false;
            break;
          }
        }
        if (!success) {
          if (i === 0) errMessage = `invalid year value in prop ${argType}`;
          else if (i === 1)
            errMessage = `invalid month value in prop ${argType}`;
          else if (i === 2)
            errMessage = `invalid date value in prop ${argType}`;
          break;
        } else {
          if (i === 0) {
            const last100 = new Date().getFullYear() - 100;
            const next100 = new Date().getFullYear() + 99;
            const yearVal = parseInt(vals[i], 10);
            if (yearVal >= last100 && yearVal < next100) {
              if (argType === "minDate") setMinYear(yearVal);
              if (argType === "maxDate") setMaxYear(yearVal);
            } else {
              success = false;
              errMessage = `In ${argType} prop, year value must be specified between ${last100} and ${next100}`;
              break;
            }
          } else if (i === 1) {
            const monthVal = parseInt(vals[i], 10);
            if (monthVal >= 1 && monthVal <= 12) {
              if (argType === "minDate") setMinMonth(monthVal - 1);
              if (argType === "maxDate") setMaxMonth(monthVal - 1);
            } else {
              success = false;
              errMessage = `In ${argType} prop, month value must be specified between 1 and 12`;
              break;
            }
          } else if (i === 2) {
            const yearValue = parseInt(vals[0], 10);
            const monthValue = parseInt(vals[1], 10);
            const dateValue = parseInt(vals[i], 10);
            if (
              isLeapYear(yearValue) &&
              monthValue === 2 &&
              dateValue >= 1 &&
              dateValue <= 29
            ) {
              if (argType === "minDate") setMinDay(dateValue);
              else if (argType === "maxDate") setMaxDay(dateValue);
            } else if (
              !isLeapYear(yearValue) &&
              monthValue === 2 &&
              dateValue >= 1 &&
              dateValue <= 28
            ) {
              if (argType === "minDate") setMinDay(dateValue);
              else if (argType === "maxDate") setMaxDay(dateValue);
            } else if (
              monthsWith30Days.indexOf(monthValue) !== -1 &&
              dateValue >= 1 &&
              dateValue <= 30
            ) {
              if (argType === "minDate") setMinDay(dateValue);
              else if (argType === "maxDate") setMaxDay(dateValue);
            } else if (
              monthsWith31Days.indexOf(monthValue) !== -1 &&
              dateValue >= 1 &&
              dateValue <= 30
            ) {
              if (argType === "minDate") setMinDay(dateValue);
              else if (argType === "maxDate") setMaxDay(dateValue);
            } else {
              success = false;
              errMessage = `In ${argType} prop, date value is invalid for provided month and year`;
            }
          }
        }
      }
      return { success, errMessage };
    },
    [monthsWith31Days, monthsWith30Days]
  );

  const validateMinMaxDates = useCallback(() => {
    if (minDate) {
      if (minDate.length === 10) {
        if (validateDelPoints(minDate)) {
          const { success, errMessage } = validateDateValues(
            minDate,
            "minDate"
          );
          if (!success && errMessage) setHasError(errMessage);
        } else setHasError("invalid prop minDate format");
      } else setHasError("invalid prop minDate");
    }
    if (maxDate) {
      if (maxDate.length === 10) {
        if (validateDelPoints(maxDate)) {
          const { success, errMessage } = validateDateValues(
            maxDate,
            "maxDate"
          );
          if (!success && errMessage) setHasError(errMessage);
        } else setHasError("invalid prop maxDate format");
      } else setHasError("invalid prop maxDate");
    }
  }, [minDate, maxDate, validateDateValues]);

  const validateMinAndMaxDates = useCallback(() => {
    if (minDate && maxDate) {
      const minDateVals = minDate.split(minDate[4]);
      const maxDateVals = maxDate.split(maxDate[4]);
      const minYearVal = parseInt(minDateVals[0], 10);
      const maxYearVal = parseInt(maxDateVals[0], 10);
      const minMonthVal = parseInt(minDateVals[1], 10);
      const maxMonthVal = parseInt(maxDateVals[1], 10);
      const minDayVal = parseInt(minDateVals[2], 10);
      const maxDayVal = parseInt(maxDateVals[2], 10);
      if (minYearVal <= maxYearVal) {
        if (minYearVal === maxYearVal) {
          if (minMonthVal <= maxMonthVal) {
            if (minMonthVal === maxMonthVal) {
              if (!(minDayVal < maxDayVal))
                setHasError(
                  "minDate prop day value should always be less than maxDate prop day value as month and year values are same."
                );
            }
          } else
            setHasError(
              "minDate prop month value should always be less than or equal to maxDate prop month value as year values are same."
            );
        }
      } else
        setHasError(
          "minDate prop year value should always be less than or equal to maxDate prop year value."
        );
    }
  }, [minDate, maxDate]);

  useLayoutEffect(() => {
    validateMinMaxDates();
    validateMinAndMaxDates();
  }, [validateMinMaxDates, validateMinAndMaxDates]);

  const onInputFocus = (e: any) => {
    if (inputEle && inputEle.current) {
      inputEle.current.focus();
      setShowCalendar(true);
    }
  };

  const handleCalendarToggle = (e: any) => {
    if (
      datePickerDiv.current &&
      datePickerDiv.current.contains(calendarDiv.current) &&
      calendarDiv.current &&
      !calendarDiv.current.contains(e.target)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (e: any) => handleCalendarToggle(e));
  }, []);

  const onPickDate = () => {};

  return (
    <div className="datepicker">
      {hasError && <h1 className="date-picker-error">{hasError}</h1>}
      {!hasError && (
        <div className="date-picker-main" ref={datePickerDiv}>
          {!showCalendar && (
            <div className="date-picker">
              <div className="date-picker-input-box">
                <input
                  onFocus={onInputFocus}
                  onBlur={() => setShowCalendar(false)}
                  ref={inputEle}
                  readOnly
                  type="date-picker-input"
                />
              </div>
            </div>
          )}
          {showCalendar && (
            <div
              className="date-picker-calendar"
              ref={calendarDiv}
              style={{ width: 260 }}
            >
              <Calendar
                minDay={minDay}
                minMonth={minMonth}
                minYear={minYear}
                maxYear={maxYear}
                maxMonth={maxMonth}
                maxDay={maxDay}
                delimeter={delimeter}
                onPickDate={onPickDate}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
