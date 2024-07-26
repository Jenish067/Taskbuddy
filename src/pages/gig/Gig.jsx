import React from "react";
import "./Gig.scss";
import { useState , useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function Gig() {
  const { id } = useParams();
  const [projectData, setProjectData] = useState({
    projectid: '',
    title: '',
    clientid: ''
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig", id],  // Include `id` in the queryKey to ensure unique queries
    queryFn: () =>
      newRequest.get(`/project/getProject?projectid=${id}`).then((res) => {
        // const fetchedData = res.data;
        // setProjectData({
        //   projectid: fetchedData.projectid,
        //   title: fetchedData.title,
        //   clientid: fetchedData.client.clientid
        // });

        return res.data;

      }),
  });
  useEffect(() => {
    if (data) {
      setProjectData({
        projectid: data.project_id,
        title: data.title,
        clientid: data.client.clientid
      });
    }
  }, [data]);
  return (

    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            <div className="user">
              <img className="pp" src={"/img/noavatar.jpg"} alt="Client Avatar" />
              <span>{data.client.name}</span>
            </div>
            <h2>About This Gig</h2>
            <p>{data.description}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img src={"/img/noavatar.jpg"} alt="Seller Avatar" />
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.title}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.description}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="Clock Icon" />
                <span>{data.time_period} Days Delivery</span>
              </div>
            </div>
            <div className="features">
              {/* Add features here if needed */}
            </div>
            <Link to='/proposal' 
            
            state={{
            clientid: data.client.clientid,
            projectid: data.project_id,
            title: data.title,
            }}>
              <button>Submit Proposal</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
