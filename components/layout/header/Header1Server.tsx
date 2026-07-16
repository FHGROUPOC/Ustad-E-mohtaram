import Link from "next/link";
import Image from "next/image";
import MainMenu from "@/components/layout/MainMenuServer";
import { getBlogs } from "@/lib/functions";
import ThemeSwitcher from "@/util/ThemeSwitcherServer";
import SideBar from "@/components/layout/SideBarServer";
import Header1Interactive from "./Header1Interactive";

export default async function Header1Server() {
  const blogsArray = await getBlogs();
  // Get current date for the topbar
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <header>
        <div className="topbar d-none d-lg-block p-3">
          <div className="overflow-hidden">
            <div className="d-flex justify-content-between align-items-center">
              <div className="left">
                <ul className="list-unstyled d-inline-flex gap-3">
                  <li>
                    <a href="#" className="btn btn-sm fs-7 border-700">
                      <span className="text-white dark-mode-invert">
                        Breaking
                      </span>
                    </a>
                  </li>
                  <li className="mw-350px">
                    <div
                      className="swiper-container swiper-topbar"
                      style={{ height: "27px", overflow: "hidden" }}
                    >
                      <Header1Interactive blogs={blogsArray} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="right">
                <ul className="list-unstyled d-flex ps-0 align-items-center">
                  <li>
                    <div className="d-flex align-items-center gap-1 text-white fs-7">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={14}
                        height={15}
                        viewBox="0 0 14 15"
                        fill="none"
                      >
                        <path
                          d="M11.0943 1.85763H10.5967V1.35416C10.5967 1.06651 10.3635 0.833328 10.0759 0.833328C9.78823 0.833328 9.55505 1.06651 9.55505 1.35416V1.85763H4.44495V1.35416C4.44495 1.06651 4.21177 0.833328 3.92412 0.833328C3.63646 0.833328 3.40328 1.06651 3.40328 1.35416V1.85763H2.90575C1.48567 1.85763 0.330353 3.01295 0.330353 4.433V11.5913C0.330353 13.0114 1.48567 14.1667 2.90575 14.1667H11.0943C12.5144 14.1667 13.6697 13.0114 13.6697 11.5913V4.433C13.6697 3.01295 12.5144 1.85763 11.0943 1.85763Z"
                          fill="white"
                        />
                      </svg> */}
                      <span className="dark-mode-invert ms-1">
                        {currentDate}
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar style-1">
          <div className="d-flex align-items-center">
            <Link className=" fw-bold fs-3 py-2" href="/">
              <Image
                className="mx-auto"
                style={{ maxWidth: "130px" }}
                src="https://res.cloudinary.com/dgtk4rthy/image/upload/v1784194573/Dar-Ul-Iqaan_lco9zf.png"
                alt="Dar-Ul-Iqaan Logo"
                width={250}
                height={32}
              />
            </Link>
            <span className="text-muted fs-7 d-none d-lg-block">
              The colors of Life.
            </span>
          </div>

          <div className="navbar-collapse d-none d-lg-block">
            {/* MainMenu is now a valid async server component */}
            <MainMenu blogsArray={blogsArray} />
          </div>
          <div className="d-flex align-items-center gap-4">
            <a
              href="#"
              className="search-btn fs-7 d-none d-md-flex"
              aria-label="Open search"
            >
              <svg
                className="dark-mode-invert"
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M25.6667 25.6667L20.6667 20.6667M6.33337 14.6667C6.33337 10.0643 10.0643 6.33337 14.6667 6.33337C19.2691 6.33337 23 10.0643 23 14.6667C23 19.2691 19.2691 23 14.6667 23C10.0643 23 6.33337 19.2691 6.33337 14.6667Z"
                  stroke="#0E0E0F"
                  strokeWidth="1.74463"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Search
            </a>
            <div className="group-btn-right d-flex align-items-center">
              <ThemeSwitcher />
              <a href="#" className="navbar-toggler">
                <svg
                  className="dark-mode-invert"
                  xmlns="http://www.w3.org/2000/svg"
                  width={26}
                  height={26}
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    d="M6.5 5.19999C6.5 4.48205 7.08206 3.89999 7.8 3.89999H24.7C25.4179 3.89999 26 4.48205 26 5.19999C26 5.91794 25.4179 6.49999 24.7 6.49999H7.8C7.08206 6.49999 6.5 5.91789 6.5 5.19999ZM24.7 11.7H1.3C0.582055 11.7 0 12.2821 0 13C0 13.7179 0.582055 14.3 1.3 14.3H24.7C25.4179 14.3 26 13.7179 26 13C26 12.2821 25.4179 11.7 24.7 11.7ZM24.7 19.5H13C12.2821 19.5 11.7 20.082 11.7 20.8C11.7 21.5179 12.2821 22.1 13 22.1H24.7C25.4179 22.1 26 21.5179 26 20.8C26 20.082 25.4179 19.5 24.7 19.5Z"
                    fill="#0E0E0F"
                  />
                </svg>
              </a>
            </div>
          </div>
          {/* <div className="d-flex align-items-center gap-4">
            <div className="group-btn-right d-flex align-items-center">
              <ThemeSwitcher />
              <Header1Interactive />{" "}
              
            </div>
          </div> */}
        </nav>
      </header>
      <SideBar blogs={blogsArray} />
    </>
  );
}
