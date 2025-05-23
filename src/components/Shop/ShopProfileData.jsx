import { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../features/product/productThunks";
import { getAllEventsShop } from "../../features/event/eventThunks";
import Ratings from "../Products/Ratings";
import { backendUrl } from "../../server";
// import Ratings from "../Products/Ratings";

/* eslint-disable react/prop-types */
function ShopProfileData({ isOwner }) {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.product);
  const { events } = useSelector((state) => state.event);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id));
  }, [dispatch, id]);

  const allReviews =
    products && products.map((product) => product.reviews).flat();

  const timeAgo = (timestamp) => {
    const now = Date.now();
    const secondsAgo = Math.floor((now - new Date(timestamp)) / 1000);

    if (secondsAgo < 60) return "just now";
    if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} min ago`;
    if (secondsAgo < 86400)
      return `${Math.floor(secondsAgo / 3600)} hour${
        Math.floor(secondsAgo / 3600) > 1 ? "s" : ""
      } ago`;
    if (secondsAgo < 2592000)
      return `${Math.floor(secondsAgo / 86400)} day${
        Math.floor(secondsAgo / 86400) > 1 ? "s" : ""
      } ago`;
    if (secondsAgo < 31536000)
      return `${Math.floor(secondsAgo / 2592000)} month${
        Math.floor(secondsAgo / 2592000) > 1 ? "s" : ""
      } ago`;

    return `${Math.floor(secondsAgo / 31536000)} year${
      Math.floor(secondsAgo / 31536000) > 1 ? "s" : ""
    } ago`;
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>

          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div
                  className={`${styles.button} cursor-pointer !mt-0 !rounded-[4px] !h-[42px]`}
                >
                  <span className="text-white">Go to Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      <br />

      <div
        className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0 ${
          active === 1 ? "block" : "hidden"
        }`}
      >
        {products &&
          products.map((i, index) => (
            <ProductCard key={index} data={i} isShop={true} />
          ))}
      </div>

      <div>
        {active === 2 && events && events.length !== 0 ? (
          <div className={`w-full ${active === 2 ? "block" : "hidden"}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
              {events &&
                events.map((i, index) => (
                  <ProductCard
                    data={i}
                    key={index}
                    isShop={true}
                    isEvent={true}
                  />
                ))}
            </div>
          </div>
        ) : (
          <div className={`w-full ${active === 2 ? "block" : "hidden"}`}>
            <h5 className="w-full flex items-center justify-center h-[50vh]">
              No active events for this shop!
            </h5>
          </div>
        )}
      </div>

      <div>
        {active === 3 && (
          <div className="w-full">
            {allReviews &&
              allReviews.map((item, index) => (
                <div className="w-full flex my-4" key={index}>
                  <img
                    src={`${backendUrl}${item?.user?.avatar?.url}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="flex w-full items-center">
                      <h1 className="pr-2 font-[600]">{item.user.name}</h1>
                      <Ratings rating={item.rating} />
                    </div>
                    <p className="font-[400] text-[#000000a7]">
                      {item?.comment}
                    </p>
                    <p className="text-[#000000a7] text-[14px]">
                      {timeAgo(item?.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            {allReviews && allReviews.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No reviews yet for this shop!
              </h5>
            )}
          </div>
          // REMOVE THE FOLLOWING DIV AFTER IMPLEMENTING THE ABOVE CODE
          // <div className="w-full flex items-center justify-center h-[50vh]">
          //   <h1>Reviews are to be implemented yet.</h1>
          // </div>
        )}
      </div>
    </div>
  );
}

export default ShopProfileData;
