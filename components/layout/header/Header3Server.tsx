import Link from "next/link";
import Image from "next/image";
import MainMenu from "@/components/layout/MainMenuServer";
import ThemeSwitcher from "@/util/ThemeSwitcherServer";
import SideBar from "@/components/layout/SideBarServer";
import Header3Interactive from "./Header3Interactive";

export default function Header3Server() {
    return (
        <>
            <header>
                <nav className="navbar style-3">
                    <div className="container">
                        <div className="header d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <Link className="navbar-brand fw-bold fs-3" href="/index-3">
                                    <Image className="dark-mode-invert" src="/assets/imgs/template/logo/logo-dark.svg" width={143} height={18} alt="logo" />
                                </Link>
                            </div>
                            <div className="navbar-collapse d-none d-lg-block" id="navbarNav">
                                <MainMenu />
                            </div>
                            <div className="d-flex align-items-center gap-4">
                                <a href="#" className="search-btn fs-7 d-none d-md-flex link-effect-2" aria-label="Open search">
                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                                        <path d="M25.6667 25.6667L20.6667 20.6667M6.33337 14.6667C6.33337 10.0643 10.0643 6.33337 14.6667 6.33337C19.2691 6.33337 23 10.0643 23 14.6667C23 19.2691 19.2691 23 14.6667 23C10.0643 23 6.33337 19.2691 6.33337 14.6667Z" stroke="#0E0E0F" strokeWidth="1.74463" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Search
                                </a>
                                <div className="group-btn-right d-flex align-items-center">
                                    <ThemeSwitcher />
                                    <a href="#" className="navbar-toggler">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={26} height={26} viewBox="0 0 26 26" fill="none">
                                            <path d="M6.5 5.19999C6.5 4.48205 7.08206 3.89999 7.8 3.89999H24.7C25.4179 3.89999 26 4.48205 26 5.19999C26 5.91794 25.4179 6.49999 24.7 6.49999H7.8C7.08206 6.49999 6.5 5.91789 6.5 5.19999ZM24.7 11.7H1.3C0.582055 11.7 0 12.2821 0 13C0 13.7179 0.582055 14.3 1.3 14.3H24.7C25.4179 14.3 26 13.7179 26 13C26 12.2821 25.4179 11.7 24.7 11.7ZM24.7 19.5H13C12.2821 19.5 11.7 20.082 11.7 20.8C11.7 21.5179 12.2821 22.1 13 22.1H24.7C25.4179 22.1 26 21.5179 26 20.8C26 20.082 25.4179 19.5 24.7 19.5Z" fill="#0E0E0F" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <SideBar />

            {/* Client component for interactive logic */}
            <Header3Interactive />
        </>
    );
}
