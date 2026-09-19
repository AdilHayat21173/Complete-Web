import { useState } from "react";


// Simple form submittion 
// const App = () => {
//   function submithandler(e){
//     e.preventDefault()
//     console.log("Form submitted")
//   }
//   return (
//     <div>
//       <form onSubmit={(e)=>{
//         submithandler(e)
//       }}>
//         <input type="text" placeholder='Enter your name' />
//         <button>submit</button>
//       </form>
//     </div>
//   )
// }


// Two way Bindding
function App() {
  const [name, setName] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    console.log("Name:", name);
    setName("")
  }

  return (
    <div>
      <form onSubmit={submitHandler}>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">
          Submit
        </button>

      </form>
    </div>
  );
}

export default App
