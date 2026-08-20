

import React, { useState } from "react";

const App = () => {

  function btnclass(){
    console.log("clicked")

  }

  function click(){
    console.log("Explored")
  }

  return (
    <div>
      <button onClick={btnclass}>click here</button>
      
      <button onClick={ function click(){
        console.log("Explored")
       }}>Explore here</button>
    
      
      <input onChange={function(elem){console.log(elem.target.value)}} type="text" placeholder="Enter Name"/>

    </div>
  )
}



const App = () => {
  const [num, setNum] = useState({
    user: "Sarthak",
    age: 20,
  });

  const btnClicked = () => {
    const newNum = { ...num };

    newNum.user = "Aman";
    newNum.age = 29;

    setNum(newNum);
  };

  return (
    <div>
      <h1>
        {num.user}, {num.age}
      </h1>

      <button onClick={btnClicked}>
        Click
      </button>
    </div>
  );
};


export default App
