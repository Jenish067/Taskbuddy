import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  // const { isLoading, error, data } = useQuery({
  //   queryKey: [item.userId],
  //   queryFn: () =>
  //     newRequest.get(`/users/${item.userId}`).then((res) => {
  //       return res.data;
  //     }),
  // });
  return (
    <Link to={`/project/getProject/${item.projectid}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
         
            {/* <div className="user">
              <img src={item.img || "/img/noavatar.jpg"} alt="" />
              <span>{i.username}</span>
            </div> */}
          <p>{item.description}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
      </Link>
 
  );
};

export default GigCard;
