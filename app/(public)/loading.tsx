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
              <Image src="https://res.cloudinary.com/dgtk4rthy/image/upload/v1784194573/Dar-Ul-Iqaan_lco9zf.png" alt="Dar-Ul-Iqaan Preloader" width={500} height={500} />
            </div>
          </div>
        </div>
      </div>
      {/*Preloader-end */}
    </>
  );
}
