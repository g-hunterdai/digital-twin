import React from "react";

const BottomTable = () => {
  return (
    <div id="bottom-table-panel" className="panel-box">
      <div className="row ais">
        <img src="./layout/burger.svg" alt="" />
        <div className="col">
          <div className="row jcsb">
            <span>Event Browser</span>
            <div className="label-box row">
              <div className="row">
                <div className="label"></div> CR | 1
              </div>
              <div className="row">
                <div className="label"></div> MA | 1
              </div>
              <div className="row">
                <div className="label"></div> MI | 1
              </div>
              <div className="row">
                <div className="label"></div> WA | 2
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>System</th>
                <th>Sub System</th>
                <th>Asset Name</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Occur Time</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span class="dot critical"></span>Critical
                </td>
                <td>FMS</td>
                <td>保全系統</td>
                <td>通信室門2</td>
                <td>中和機房</td>
                <td>14F</td>
                <td>2023-05-31 14:50:30</td>
                <td>test 1</td>
              </tr>
              <tr>
                <td>
                  <span class="dot major"></span>Major
                </td>
                <td>FMS</td>
                <td>電力系統</td>
                <td>電表1</td>
                <td>中和機房</td>
                <td>5F</td>
                <td>2023-05-31 14:50:30</td>
                <td>test 2</td>
              </tr>
              <tr>
                <td>
                  <span class="dot minor"></span>Minor
                </td>
                <td>FRS</td>
                <td>電力系統</td>
                <td>電表2</td>
                <td>中和機房</td>
                <td>5F</td>
                <td>2023-05-31 14:50:30</td>
                <td>test 3</td>
              </tr>
              <tr>
                <td>
                  <span class="dot warning"></span>Warning
                </td>
                <td>FMS</td>
                <td>電力系統</td>
                <td>電表3</td>
                <td>中和機房</td>
                <td>5F</td>
                <td>2023-05-31 14:50:30</td>
                <td>test 4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BottomTable;
