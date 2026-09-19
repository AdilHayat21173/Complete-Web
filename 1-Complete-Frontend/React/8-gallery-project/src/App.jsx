import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Components/Card'

const App = () => {

  const [Userdata,SetUserdata]=useState([])

  const [index,setindex]=useState(1)

  const getdata =async ()=>{
    const response=await axios.get( `https://picsum.photos/v2/list?page=${index}&limit=21`)
      SetUserdata(response.data)


  }

  useEffect (function(){
    getdata()
  },[index])

  let printUserData= <h2 className='text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading Data</h2>
  if(Userdata.length>0){
    printUserData=Userdata.map(function(elem,idx){
      return <div>
       <Card elem={elem}/>
        

      </div>
        
    })
  }
  return (
    <div className='bg-black p-4 overflow-auto h-screen text-white'>
    <div className='flex flex-wrap gap-4 p-2'>
      {printUserData}
    </div>
    <div className='flex  justify-center items-center gap-6  '>
      <button className='bg-amber-400 px-4 py-2 rounded text-black font-semibold  cursor-pointer text-sm active:scale-90 ' onClick={()=>{
        if(index>1){
          setindex(index-1)
          SetUserdata([])
        }
      }}>Prev</button>
      <h4>Page {index}</h4>
      <button className='bg-amber-400 px-4 py-2 rounded text-black font-semibold  cursor-pointer text-sm active:scale-90 ' onClick={()=>{
        setindex(index+1)
        SetUserdata([])
      }}>Next</button>
    </div>
    </div>
  )
}

export default App
