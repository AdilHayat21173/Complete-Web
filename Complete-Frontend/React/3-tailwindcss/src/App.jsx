import React from 'react'

import Section1 from './components/section1/Section1'
// import PageContent1 from './components/section1/Page1Content'
const App = () => {
 const users = [
  {
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    intro:
      "Prime customers that have access to bank credit and are satisfied with the current product.",
    tag: "Satisfied",
  },
  {
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    intro:
      "Prime customers that have access to bank credit and are not satisfied with the current service.",
    tag: "Underserved",
  },
  {
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    intro:
      "Customers from near-prime and sub-prime segments with no access to bank credit.",
    tag: "Underbanked",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1677368597077-009727e906db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwd29tZW58ZW58MHx8MHx8fDA%3D",
    intro:
      "Customers who actively use digital banking products and are looking for better financial services.",
    tag: "Digital User",
  },
  {
    img: "https://images.unsplash.com/photo-1600275669439-14e40452d20b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmVzc2lvbmFsJTIwd29tZW58ZW58MHx8MHx8fDA%3D",
    intro:
      "Potential customers who may benefit from personalized banking products and financial support.",
    tag: "Potential",
  },
];
  return (
    <div>
      <Section1  users ={users}/>
      
    </div>
  )
}

export default App
