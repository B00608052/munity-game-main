import NFT_Holder from "../images/NFT_Holder.png";
import Total_Rewards from "../images/Total_Rewards.png";
import ETH_Staking from "../images/ETH_Staking.png";
import React, { useState, useEffect, useRef } from "react";
import "./styleDataFeed.css";

export const DataFeed = () => {
  // State variables for animated values
  const [ethValue, setEthValue] = useState(0);
  const [rewardsValue, setRewardsValue] = useState(0);
  const [nftValue, setNftValue] = useState(0);

  // State to track visible items
  const [visibleItems, setVisibleItems] = useState(0);

  // Ref to track visibility
  const feedWrapRef = useRef(null);

  // Function to animate numbers
  const animateNumber = (start, end, duration, setValue) => {
    const stepTime = Math.abs(Math.floor(duration / (end - start)));
    let current = start;
    const increment = start < end ? 1 : -1;

    const timer = setInterval(() => {
      current += increment;
      setValue(current);

      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  // Use Intersection Observer to trigger the animation when the section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let counter = 0;
          const timer = setInterval(() => {
            setVisibleItems((prev) => prev + 1);
            counter++;
            if (counter === 3) {
              clearInterval(timer);
            }
          }, 600); // 每 300 毫秒出現一個項目
        }
      },
      { threshold: 0.5 } // 確保只要 10% 區塊進入畫面就觸發動畫
    );

    if (feedWrapRef.current) {
      observer.observe(feedWrapRef.current);
    }

    return () => {
      if (feedWrapRef.current) {
        observer.unobserve(feedWrapRef.current);
      }
    };
  }, []);

  // Trigger number animations when items are visible
  useEffect(() => {
    if (visibleItems >= 1) animateNumber(0, 102, 1500, setEthValue); // ETH Locked
    if (visibleItems >= 2) animateNumber(0, 90, 1800, setRewardsValue); // Total Rewards
    if (visibleItems >= 3) animateNumber(0, 30, 2300, setNftValue); // NFT Holders
  }, [visibleItems]);

  // JSX with animated values
  return (
    <div id="DataFeedFrame">
      <div className="DataFeed" ref={feedWrapRef}>
        <div className="FeedWrap">
          <div className={`DataFrame ${visibleItems >= 1 ? "visible" : ""}`}>
            <div className="fontStyle1">Total ETH Locked</div>
            <img src={ETH_Staking} alt="ETH Icon" className="stat-icon" />
            <div className="fontStyle2">{ethValue} K</div>
          </div>
          <div className={`DataFrame ${visibleItems >= 2 ? "visible" : ""}`}>
            <div className="fontStyle1">Total Rewards</div>
            <img src={Total_Rewards} alt="Rewards" className="stat-icon" />
            <div className="fontStyle2">{rewardsValue} K</div>
          </div>
          <div className={`DataFrame ${visibleItems >= 3 ? "visible" : ""}`}>
            <div className="fontStyle1">NFT Holders</div>
            <img src={NFT_Holder} alt="NFT Holder" className="stat-icon" />
            <div className="fontStyle2">{nftValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
