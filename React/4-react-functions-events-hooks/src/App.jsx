

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

export default App
