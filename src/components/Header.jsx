import React, { useEffect, useState } from "react";

const Header = () => {
  const [dateTimeNow, setDateTimeNow] = useState("");
  const getWeekDay = (now) => {
    switch (now) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "Sun";
    }
  };
  useEffect(() => {
    var currentdate = new Date();
    var datetime =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1) +
      "-" +
      currentdate.getDate() +
      " " +
      getWeekDay(currentdate.getUTCDay()) +
      " " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    setDateTimeNow(datetime);
  }, []);

  return (
    <div id="header" className="panel-box">
      <div className="btn-area">
        <button className="btn">Main</button>
        <button className="btn">Energy</button>
        <button className="btn">Network</button>
        <button className="btn">Security</button>
      </div>
      <div className="info-area">
        <span>{dateTimeNow}</span>
        <img src="./layout/logout.svg" alt="" />
      </div>
    </div>
  );
};

export default Header;
