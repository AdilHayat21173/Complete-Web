const RightCardContent = (props) => {
  return (
     <div className="absolute top-0   h-full w-full p-10 flex flex-col justify-between">
           <h2 className=" flex bg-white rounded-full h-10 w-10 justify-center items-center text-1xl font-bold">{props.id+1}</h2>
           <div>
            <p className="text-lg leading-relaxed text-white mb-14">{props.intro}</p>
            <div className="flex justify-between ">
                <button className="bg-blue-600 text-white font-medium px-8 py-2 rounded-full">{props.tag}</button>
                <button className="bg-blue-600 text-white font-medium px-3 py-2 rounded-full"> <i className="ri-arrow-right-line"></i></button>
            </div>
           </div>
        </div>
  )
}

export default RightCardContent
