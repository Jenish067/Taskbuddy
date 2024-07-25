import React, { useState } from "react";
import "./Gig.scss";
// import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
// import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();
  // const [proposal, setProposal] = useState({
  //   description: "",
  //   price: 0,
  //   timeperiod: "",
  // });

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      newRequest.get(`/project/getProject?projectid=${id}`).then((res) => {
        return res.data;
      }),
  });
  console.log(data);
  // const userId = data?.userId;
  // const clientId = 52; 

  // const {
  //   isLoading: isLoadingUser,
  //   error: errorUser,
  //   data: dataUser,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () =>
  //     newRequest.get(`/users/${userId}`).then((res) => {
  //       return res.data;
  //     }),
  //   enabled: !!userId,
  // });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await newRequest.post(`https://taskbuddy-axo5.onrender.com/proposal/submit`, {
  //       clientid: clientId,
  //       projectid: id,
  //       proposal: proposal.description,
  //       price: proposal.price,
  //       timeperiod: proposal.timeperiod,
  //     });
  //     console.log(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {/* {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : ( */}
              <div className="user">
                <img
                  className="pp"
                  src={"/img/noavatar.jpg"}
                  alt=""
                />
                <span>{data.client.name}</span>
                {/* {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src="/img/star.png" alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )} */}
              </div>
            {/* )} */}
            {/* <Slider slidesToShow={1} arrowsScroll={1} className="slider"> */}
              {/* {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))} */}
            {/* </Slider> */}
            <h2>About This Gig</h2>
            <p>{data.description}</p>
            {/* {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : ( */}
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={"/img/noavatar.jpg"} alt="" />
                  {/* <div className="info">
                    <span>{data.client.name}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div> */}
                </div>
                <div className="box">
                  <div className="items">
                    {/* <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{data.client.country}</span>
                    </div> */}
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
                  {/* <p>{data.client.description}</p> */}
                </div>
              </div>
            {/* )} */}
            {/* <Reviews gigId={id} /> */}
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.title}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.description}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.time_period} Days Delivery</span>
              </div>
              {/* <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div> */}
            </div>
            <div className="features">
              {/* {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))} */}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
            {/* <form onSubmit={handleSubmit} className="proposal-form">
              <h3>Submit a Proposal</h3>
              <textarea
                value={proposal.description}
                onChange={(e) =>
                  setProposal({ ...proposal, description: e.target.value })
                }
                placeholder="Describe your proposal"
              ></textarea>
              <input
                type="number"
                value={proposal.price}
                onChange={(e) =>
                  setProposal({ ...proposal, price: Number(e.target.value) })
                }
                placeholder="Price"
              />
              <input
                type="text"
                value={proposal.timeperiod}
                onChange={(e) =>
                  setProposal({ ...proposal, timeperiod: e.target.value })
                }
                placeholder="Time Period"
              />
              <button type="submit">Submit Proposal</button>
            </form> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
