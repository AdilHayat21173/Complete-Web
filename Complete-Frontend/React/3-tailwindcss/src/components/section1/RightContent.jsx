
import 'remixicon/fonts/remixicon.css'
import RightCard from './RightCard'
const RightContent = (props) => {
  return (
    <div id="Right" className='h-full w-2/3 p-6 rounded-4xl flex flex-nowrap gap-10 overflow-x-auto'>
      {props.users.map(function(elem,idx){
        return <RightCard key={idx} id={idx} img={elem.img} tag={elem.tag} intro={elem.intro}/>
      })}
    


      
    </div>
  )
}

export default RightContent
