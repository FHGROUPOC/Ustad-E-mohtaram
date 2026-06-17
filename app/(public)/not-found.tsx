import Layout from "@/components/layout/Layout";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <Layout headerStyle={2} footerStyle={4}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
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
                                    Page not found
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="row pt-70 pb-300">
                    <div className="col-lg-6 col-md-8 col-12 mx-auto">
                        <div className="text-center">
                            <div className="swiper slider-1 author-slide mb-4">
                                <div className="swiper-wrapper">
                                    <div className="swiper-slide">
                                        <Image src="/assets/imgs/template/author/author-20.png" alt="magzin" width={200} height={300} />
                                    </div>
                                </div>
                            </div>
                            <h5>We’re sorry, we seem to have lost this page, but we don’t want to lose you.</h5>
                            <form action="#" className="d-flex flex-wrap flex-lg-nowrap gap-2 ">
                                <input className="form-control" type="text" placeholder="Enter keywords" />
                                <button className="btn btn-dark" type="submit">
                                    Search
                                </button>
                            </form>
                            <p className="mt-5 mb-0">
                                Visit the{" "}
                                <a href="#" className="text-dark">
                                    Home page
                                </a>{" "}
                                or{" "}
                                <a href="#" className="text-dark">
                                    Report the broken link here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
