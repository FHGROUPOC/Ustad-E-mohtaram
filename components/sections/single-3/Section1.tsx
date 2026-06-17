import ArticleCard10 from "@/components/cards/ArticleCard10";

import DataCard from "@/public/data/cardHome-4.json";
import ContentSingle from "@/components/elements/ContentSingle";
import Link from "next/link";
import Image from "next/image";

export default function Section1() {
    return (
        <>
            {/*Single 3 Section 1*/}
            <section className="sec-1-single-3 pb-70 overflow-hidden">
                <div className="position-relative block-banner">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb list-unstyled d-flex flex-row gap-2 align-items-center m-0 ps-0 py-4">
                                        <li className="breadcrumb-item">
                                            <Link href="/" className="text-600 fs-7 hover-dark">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <span className="icon-shape icon-xxs">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" fill="none">
                                                    <path d="M6.125 4.5625L9.5625 7.84375L6.125 11.125" stroke="#626568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </span>
                                        </li>
                                        <li className="breadcrumb-item active text-dark fs-7" aria-current="page">
                                            Travel &amp; Culture
                                        </li>
                                    </ul>
                                </nav>
                                <div className="card-title">
                                    <div className="article card-info d-flex flex-wrap align-items-center gap-2 mt-4">
                                        <a href="#" className="badge bg-1 fs-8">
                                            Lifestyle
                                        </a>
                                        <a href="#" className="badge bg-2 fs-8">
                                            Culture
                                        </a>
                                        <ul className="d-flex align-items-center text-600 m-0 ps-3">
                                            <li>
                                                <p className="fs-8 m-0">6 mins read</p>
                                            </li>
                                        </ul>
                                        <h3>Embracing the art of slowing down in a fast-paced world</h3>
                                    </div>
                                    <div className="border-top" />
                                    <div className="bottom mt-auto d-flex flex-wrap align-items-center gap-2 pt-4">
                                        <a href="#" className="author d-flex align-items-center gap-2">
                                            <Image className="avatar avatar-md rounded-circle" src="/assets/imgs/template/author/author-9.png" alt="magzin" width={41} height={41} />
                                            <span className="fs-7 text-dark fw-regular">Evara Rose</span>
                                        </a>
                                        <ul className="d-flex align-items-center gap-4 text-600 m-0 ps-3">
                                            <li>
                                                <p className="fs-8 m-0">Jun 13, 2025</p>
                                            </li>
                                        </ul>
                                        <div className="ms-md-auto ms-5 d-flex align-items-center gap-3 me-5">
                                            <a href="#" className="comment d-flex align-items-center fs-8">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.50018 5.43423C2.50018 4.26961 3.44494 3.3255 4.61035 3.3255H15.39C16.5554 3.3255 17.5002 4.26961 17.5002 5.43422V13.1078C17.5002 14.2724 16.5554 15.2165 15.39 15.2165H6.3295L3.41902 17.3786C3.24443 17.5083 3.01159 17.5285 2.81722 17.4309C2.62285 17.3333 2.50018 17.1345 2.50018 16.9171V5.43423ZM4.61035 4.47571C4.08062 4.47571 3.65118 4.90485 3.65118 5.43423V15.7729L5.79569 14.1799C5.89495 14.1062 6.01534 14.0663 6.13902 14.0663H15.39C15.9197 14.0663 16.3492 13.6372 16.3492 13.1078V5.43422C16.3492 4.90485 15.9197 4.47571 15.39 4.47571H4.61035Z" fill="#626568" />
                                                </svg>
                                                <span>98 Comments</span>
                                            </a>
                                            <a href="#" className="readers d-flex align-items-center fs-8">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M17.186 10.3224C15.734 13.039 12.9803 14.7266 10.001 14.7266C7.01977 14.7266 4.26612 13.039 2.81407 10.3224C2.70224 10.1114 2.70224 9.88843 2.81407 9.67767C4.26612 6.96107 7.01977 5.27366 10.001 5.27366C12.9803 5.27366 15.7339 6.96107 17.186 9.67767C17.2998 9.88843 17.2998 10.1114 17.186 10.3224ZM18.1135 9.13905C16.4744 6.07185 13.366 4.16669 10.001 4.16669C6.63409 4.16669 3.52561 6.07185 1.88652 9.13905C1.59341 9.68631 1.59341 10.3137 1.88652 10.8606C3.52561 13.9278 6.63409 15.8334 10.001 15.8334C13.366 15.8334 16.4744 13.9278 18.1135 10.8606C18.4066 10.3138 18.4066 9.68631 18.1135 9.13905ZM10.001 12.2707C11.2025 12.2707 12.18 11.2522 12.18 9.99993C12.18 8.7477 11.2025 7.72912 10.001 7.72912C8.79769 7.72912 7.82002 8.7477 7.82002 9.99993C7.82002 11.2522 8.79773 12.2707 10.001 12.2707ZM10.001 6.62215C8.21147 6.62215 6.75752 8.13757 6.75752 9.99997C6.75752 11.8628 8.21151 13.3776 10.001 13.3776C11.7886 13.3776 13.2425 11.8627 13.2425 9.99997C13.2425 8.13757 11.7886 6.62215 10.001 6.62215Z"
                                                        fill="#626568"
                                                    />
                                                </svg>
                                                <span>162 views</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-5 g-4">
                        <div className="col-lg-8">
                            <div className="position-relative">
                                <Image className="rounded-8 w-100 mb-4 cover-image" src="/assets/imgs/page/img-116.png" alt="magzin" width={888} height={460} />
                            </div>
                            <ContentSingle image="/assets/imgs/page/img-115.png" />
                        </div>
                        <div className="col-lg-4">
                            <div className="row">
                                <div className="col-md-6 col-lg-12 col-12">
                                    <div className="author-card">
                                        <div className="card-img mb-4 text-center">
                                            <Image className="rounded-circle avatar-154" src="/assets/imgs/template/author/author-16.png" alt="magzin" width={154} height={154} />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5 className="mb-3">John Doe</h5>
                                            <p className="mb-4">Step into a space where thoughts bloom, stories breathe, and imagination roams free. Here, I write not just to share—but to connect, to wander, and to wonder.</p>
                                            <p className="text-dark mb-0">Follow me</p>
                                            <div className="d-inline-flex group-social-icons mt-2">
                                                <a href="#" className="icon-shape icon-46">
                                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={10} height={17} viewBox="0 0 10 17" fill="none">
                                                        <path d="M8.84863 9.20312H6.5415V16.0938H3.46533V9.20312H0.942871V6.37305H3.46533V4.18896C3.46533 1.72803 4.94189 0.34375 7.1875 0.34375C8.26416 0.34375 9.40234 0.559082 9.40234 0.559082V2.98926H8.14111C6.91064 2.98926 6.5415 3.72754 6.5415 4.52734V6.37305H9.2793L8.84863 9.20312Z" fill="black" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="icon-shape icon-46">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                                                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="icon-shape icon-46">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                                    </svg>
                                                </a>
                                                <a href="#" className="icon-shape icon-46">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-behance" viewBox="0 0 16 16">
                                                        <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-lg-12 col-12">
                                    <div className="d-flex align-items-center gap-2 mt-5 mt-lg-5 mt-md-0 mb-3">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M0.582044 11.7285C8.79451 13.4712 10.252 14.8614 12.125 22.7372C13.8067 14.8768 15.2308 13.4992 23.4018 11.8279C15.1894 10.0852 13.7319 8.69503 11.8589 0.81924C10.1769 8.67956 8.75306 10.0571 0.582044 11.7285Z" fill="#0E0E0F" />
                                        </svg>
                                        <h5 className="mb-0">Weekly trending</h5>
                                    </div>
                                    <div className="d-flex flex-wrap gap-3">
                                        <div className="d-flex flex-wrap gap-3">
                                            {DataCard.sec5Card10.map((card, index) => (
                                                <ArticleCard10 key={index} card={card} idx={index} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-12 col-12">
                                    <div className="d-flex align-items-center gap-2 mt-5 mb-3">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M0.582044 11.7285C8.79451 13.4712 10.252 14.8614 12.125 22.7372C13.8067 14.8768 15.2308 13.4992 23.4018 11.8279C15.1894 10.0852 13.7319 8.69503 11.8589 0.81924C10.1769 8.67956 8.75306 10.0571 0.582044 11.7285Z" fill="#0E0E0F" />
                                        </svg>
                                        <h5 className="mb-0">Popular tags</h5>
                                    </div>
                                    <ul className="list-unstyled d-flex flex-wrap gap-3 ps-0">
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Pepple</span>
                                                <span className="number">168</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Fashion</span>
                                                <span className="number">68</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Intelligence</span>
                                                <span className="number">116</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Food</span>
                                                <span className="number">78</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Business</span>
                                                <span className="number">26</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Design</span>
                                                <span className="number">25</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Technology</span>
                                                <span className="number">85</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Science</span>
                                                <span className="number">120</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="tag-item">
                                                <span>Innovation</span>
                                                <span className="number">63</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-6 col-lg-12 col-12">
                                    <div className="swiper slider-1 mt-5 rounded-16 overflow-hidden">
                                        <div className="swiper-wrapper">
                                            <div className="swiper-slide">
                                                <Image width={756} height={740} className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-84.png" alt="magzin" />
                                            </div>
                                            <div className="swiper-slide">
                                                <Image width={756} height={740} className="rounded-16 overflow-hidden cover-image" src="/assets/imgs/page/img-85.png" alt="magzin" />
                                            </div>
                                        </div>
                                        <div className="swiper-pagination mb-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
