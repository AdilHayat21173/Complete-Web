import Navbar from "./Navbar"
import PageContent1 from "./Page1Content"


const Section1 = (props) => {

  return (
    <div className="h-full w-full">
      <Navbar/>
      <PageContent1 users ={props.users}/>
    </div>
  )
}

export default Section1
