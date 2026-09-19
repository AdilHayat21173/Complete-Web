import "remixicon/fonts/remixicon.css";
// const Card = () => {
//   return (
//      <div className="card">
//       <div className="top">
//         <img
//           src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1331&auto=format&fit=crop"
//           alt="Profile"
//         />

//         <button>
//           Save
//           <i className="ri-bookmark-line "></i>
//         </button>
//       </div>

//       <div className="center">
//         <h3>Amazon <span>5 days ago</span></h3>
//         <h2>Senior UI/UX Designer</h2>
//         <div className="tag">
//           <h4>Part-Time</h4>
//           <h4>Senior Level</h4>
//         </div>
//       </div>

//       <div className="bottom">
//           <div>
//             <h3>$120/hr</h3>
//             <p>Mumbai,India</p>
//           </div>
//           <button>Apply now</button>
//         </div>
//     </div>
//   )
// }
const Card = (props) => {
  return (
    <div className="card">
      <div className="top">
        <img
          src={props.brandLogo}
          alt={props.companyName}
        />

        <button>
          Save
          <i className="ri-bookmark-line"></i>
        </button>
      </div>

      <div className="center">
        <h3>
          {props.companyName} <span>{props.datePosted}</span>
        </h3>

        <h2>{props.post}</h2>

        <div className="tag">
          <h4>{props.tag1}</h4>
          <h4>{props.tag2}</h4>
        </div>
      </div>

      <div className="bottom">
        <div>
          <h3>{props.pay}</h3>
          <p>{props.location}</p>
        </div>

        <button>Apply now</button>
      </div>
    </div>
  );
};

export default Card;

