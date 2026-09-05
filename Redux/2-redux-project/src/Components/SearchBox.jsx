import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../features/searchSlice'


const SearchBox = () => {
  
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));
    setText("");
  }


  return (
    <div>
        <form  onSubmit={(e) => handleSubmit(e)}
        className="flex bg-gray-900 gap-5 py-10 px-15 text-white">
            
            <input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            required 
            className="w-full border-2 px-6 py-3 text-xl rounded outline-none"
            type="text" placeholder="Search..." />
            
            
            <button type="submit" className="border-2 px-6 py-3 text-xl rounded outline-none cursor-pointer active:scale-95">
                Search
            </button>
        </form>
      
    </div>
  )
}

export default SearchBox
