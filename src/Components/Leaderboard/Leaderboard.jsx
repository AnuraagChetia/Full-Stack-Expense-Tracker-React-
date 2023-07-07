import React from "react";
import "./leaderboard.css";
const leaders = [
  { name: "Me", totalExpense: 10 },
  { name: "John Doe", totalExpense: 8 },
  { name: "Jane Smith", totalExpense: 6 },
  { name: "Bob Johnson", totalExpense: 4 },
  { name: "Alice Williams", totalExpense: 2 },
];

const Leaderboard = () => {
  return (
    <div className="leaderboard-container">
      <div className="leaderboard">
        <h1 className="title">Leaderboard</h1>
        <table className="table">
          <tr className="tHeads">
            <th>Rank</th>
            <th>Name</th>
            <th>Expenditure</th>
          </tr>
          {leaders.map((leader, index) => (
            <tr className="leader">
              <td>{++index}</td>
              <td>{leader.name}</td>
              <td>₹{leader.totalExpense}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
