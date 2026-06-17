import React from "react";
import Image from "next/image";
export default function Loading() {
  return (
    <>
      {/*Preloader*/}
      <div id="preloader">
        <div id="loader" className="loader">
          <div className="loader-container">
            <div className="loader-icon">
              <Image src="https://res.cloudinary.com/dmzhgg4m1/image/upload/v1776253531/logo-removebg-preview_guzxar.png" alt="Preloader" width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/*Preloader-end */}
    </>
  );
}
