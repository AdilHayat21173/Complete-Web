

import Card from "./components/Card";

const App = () => {
  const jobOpenings = [
  {
    brandLogo: "https://cdn.simpleicons.org/google",
    companyName: "Google",
    datePosted: "5 days ago",
    post: "Software Engineer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$45/hour",
    location: "Mountain View, USA",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFxfgtmC43i_LmI_cLo9Mb4rFbtSFGdUGS8lXA9OAeQ&s=10",
    companyName: "Microsoft",
    datePosted: "1 week ago",
    post: "AI Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$55/hour",
    location: "Redmond, USA",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJW-Kq9gfty56z8kGjFSbD8c4qkG3HmSul4stGRc3jig&s=10",
    companyName: "Amazon",
    datePosted: "3 days ago",
    post: "Backend Developer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$42/hour",
    location: "Seattle, USA",
  },
  {
    brandLogo: "https://cdn.simpleicons.org/meta",
    companyName: "Meta",
    datePosted: "2 weeks ago",
    post: "Frontend Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$60/hour",
    location: "Menlo Park, USA",
  },
  {
    brandLogo: "https://cdn.simpleicons.org/apple",
    companyName: "Apple",
    datePosted: "10 days ago",
    post: "iOS Developer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$50/hour",
    location: "Cupertino, USA",
  },
  {
    brandLogo: "https://cdn.simpleicons.org/netflix",
    companyName: "Netflix",
    datePosted: "4 days ago",
    post: "Machine Learning Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$65/hour",
    location: "Los Gatos, USA",
  },
  {
    brandLogo: "https://cdn.simpleicons.org/nvidia",
    companyName: "NVIDIA",
    datePosted: "3 weeks ago",
    post: "AI/ML Engineer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$48/hour",
    location: "Santa Clara, USA",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqRcN38lCDcvWWfbPwpSSnCzEvQlBu6mgALa4jck3EYA&s=10",
    companyName: "Adobe",
    datePosted: "6 days ago",
    post: "React Developer",
    tag1: "Part Time",
    tag2: "Junior Level",
    pay: "$35/hour",
    location: "San Jose, USA",
  },
  {
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiD9IodEq2mlphCGkjjSZElrH6O5jHY2vahrD3bq2cJg&s=10",
    companyName: "Salesforce",
    datePosted: "5 weeks ago",
    post: "Cloud Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$52/hour",
    location: "San Francisco, USA",
  },
  {
    brandLogo: "https://1000logos.net/wp-content/uploads/2017/02/Color-IBM-Logo.jpg",
    companyName: "IBM",
    datePosted: "10 weeks ago",
    post: "Data Engineer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$40/hour",
    location: "New York, USA",
  },
];
  return (
    <div className="parent">
      {jobOpenings.map((job, index) => (
        <Card
          key={index}
          brandLogo={job.brandLogo}
          companyName={job.companyName}
          datePosted={job.datePosted}
          post={job.post}
          tag1={job.tag1}
          tag2={job.tag2}
          pay={job.pay}
          location={job.location}
        />
      ))}
    </div>
  );
};

export default App;