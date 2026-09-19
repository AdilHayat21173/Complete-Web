
import RightContent from './RightContent'
import LeftContent from "./LeftContent";

const PageContent1 = (props) => {
  return (
    <div className='px-18 pb-16 pt-6 flex items-center gap-10 h-[90vh]'>
      <LeftContent/>
      <RightContent users ={props.users}/>
    </div>
  )
}

export default PageContent1
