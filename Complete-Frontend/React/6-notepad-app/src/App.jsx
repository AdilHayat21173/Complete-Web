import React, { useState } from 'react'

const App = () => {

 const [title, settitle] = useState('')
  const [detail, setdetail] = useState('')
  const [task, settask] = useState([])

  const SubmitHandler = (e) => {
    e.preventDefault()

    const copytask = [...task]

    copytask.push({
      title: title,
      detail: detail
    })

    settask(copytask)

    settitle("")
    setdetail("")
  }

  const Delete=(idx)=>{
    const copytask=[...task];
    copytask.splice(idx,1)

    settask(copytask)


  }

  return (
    <div className="h-screen lg:flex bg-black text-white">

      <form
        onSubmit={SubmitHandler}
        className="flex lg:w-1/2 gap-4 flex-col items-start p-10"
      >
        <h1 className="text-3xl font-bold">Add Notes</h1>

        <input
          type="text"
          placeholder="Enter Notes Heading"
          className="px-5 w-full py-2 font-medium border-2 outline-none rounded"
          value={title}
          onChange={(e) => {
            settitle(e.target.value)
          }}
        />

        <textarea
          placeholder="Write Details"
          className="px-5 w-full h-40 py-2 font-medium border-2 outline-none rounded"
          value={detail}
          onChange={(e) => {
            setdetail(e.target.value)
          }}
        />

        <button
          className="bg-white active:bg-amber-900 w-full font-medium outline-none text-black px-5 py-2 rounded"
        >
          Add Note
        </button>
      </form>

      <div className="lg:w-1/2 lg:border-l-2 p-10">
        <h1 className="text-3xl font-bold">Your Notes</h1>

        <div className="flex flex-wrap items-start justify-start gap-5 h-[90%] mt-5 overflow-auto">

          {task.map(function (elem, idx) {

            return (
              <div
                key={idx}
                className="flex justify-between flex-col items-start relative h-65 w-40 bg-cover rounded-xl text-black pt-9 pb-4 px-4 bg-[url('https://static.vecteezy.com/system/resources/previews/037/152/677/non_2x/sticky-note-paper-background-free-png.png')] "
              >

                <h3 className="leading-tight text-xl font-bold">
                  {elem.title}
                </h3>

                <p className="mt-3 leading-tight text-sm text-gray-500 font-medium">
                  {elem.detail}
                </p>
                <button  onClick={()=>{
                  Delete(idx)

                }
                } className="w-full cursor-pointer active:scale-95 bg-red-500 py-1 text-xs rounded font-bold text-white">
                  Delete
                </button>

              </div>
            )

          })}

        </div>
      </div>

    </div>
  )
}


export default App