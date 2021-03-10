import React, { useState } from "react";
import { DatePicker } from "./datepicker";

function App() {
  const [date, setDate] = useState<string | null>(null);
  return (
    <div className="App">
      <DatePicker
        format={"dd-mm-yyyy"}
        onSelectDate={(s: string) => {
          setDate(date);
        }}
      />
    </div>
  );
}

export default App;
