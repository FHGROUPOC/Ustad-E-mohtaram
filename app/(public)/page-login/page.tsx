import Layout from "@/components/layout/Layout";
import Image from "next/image";

import Section1 from "@/components/sections/home/Section11";
export default function Page_Login() {
    return (
        <>
            <Layout headerStyle={2} footerStyle={4}>
                <div className="container pt-70 pb-300">
                    <div className="row">
                        <div className="col-lg-5 col-md-8 mx-auto text-center">
                            <h3 className="mb-2">Welcome back!</h3>
                            <p className="mb-4">Create an account today and start using our platform</p>
                            <div className="d-flex flex-column gap-3">
                                <a href="#" className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 border-300 bg-white rounded-8 hover-border-500">
                                    <Image src="/assets/imgs/template/icons/google.svg" width={27} height={26} alt="magzin" />
                                    <span className="fw-semi-bold fs-7">Sign in with Google</span>
                                </a>
                                <a href="#" className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 border-300 bg-white rounded-8 hover-border-500">
                                    <Image className="dark-mode-invert" width={26} height={26} src="/assets/imgs/template/icons/apple.svg" alt="magzin" />
                                    <span className="fw-semi-bold fs-7">Sign in Apple ID</span>
                                </a>
                                <a href="#" className="w-100 d-flex align-items-center justify-content-center gap-2 py-3 border-300 bg-white rounded-8 hover-border-500">
                                    <Image className="dark-mode-invert" width={22} height={22} src="/assets/imgs/template/icons/twitter.svg" alt="magzin" />
                                    <span className="fw-semi-bold fs-7">Sign in with X</span>
                                </a>
                            </div>
                            <div className="border-top mt-5 mb-2 position-relative">
                                <p className="position-absolute top-50 start-50 translate-middle bg-50 px-2 m-0">or sign up by email</p>
                            </div>
                            <div className="col-12 text-start mt-5">
                                <label htmlFor="name" className="form-label text-dark">
                                    Username *
                                </label>
                                <div className="input-group d-flex align-items-center mt-2">
                                    <div className="icon-input ps-3">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path className="stroke-dark" d="M12 11.25C13.7949 11.25 15.25 9.79493 15.25 8C15.25 6.20507 13.7949 4.75 12 4.75C10.2051 4.75 8.75 6.20507 8.75 8C8.75 9.79493 10.2051 11.25 12 11.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path className="stroke-dark" d="M6.84723 19.25H17.1522C18.2941 19.25 19.1737 18.2681 18.6405 17.2584C17.856 15.7731 16.0677 14 11.9997 14C7.93174 14 6.1434 15.7731 5.35897 17.2584C4.8257 18.2681 5.70531 19.25 6.84723 19.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input type="text" className="form-control ms-0" name="name" placeholder="Enter your username" id="name" aria-label="username" />
                                </div>
                            </div>
                            <div className="col-12 text-start mt-3">
                                <label htmlFor="password" className="form-label text-dark">
                                    Password *
                                </label>
                                <div className="input-group d-flex align-items-center mt-2">
                                    <div className="icon-input ps-3">
                                        <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path className="stroke-dark" d="M4.75 5.75C4.75 5.19772 5.19772 4.75 5.75 4.75H9.25C9.80228 4.75 10.25 5.19772 10.25 5.75V9.25C10.25 9.80228 9.80228 10.25 9.25 10.25H5.75C5.19772 10.25 4.75 9.80228 4.75 9.25V5.75Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path className="stroke-dark" d="M4.75 14.75C4.75 14.1977 5.19772 13.75 5.75 13.75H9.25C9.80228 13.75 10.25 14.1977 10.25 14.75V18.25C10.25 18.8023 9.80228 19.25 9.25 19.25H5.75C5.19772 19.25 4.75 18.8023 4.75 18.25V14.75Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path className="stroke-dark" d="M13.75 5.75C13.75 5.19772 14.1977 4.75 14.75 4.75H18.25C18.8023 4.75 19.25 5.19772 19.25 5.75V9.25C19.25 9.80228 18.8023 10.25 18.25 10.25H14.75C14.1977 10.25 13.75 9.80228 13.75 9.25V5.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path className="stroke-dark" d="M13.75 14.75C13.75 14.1977 14.1977 13.75 14.75 13.75H18.25C18.8023 13.75 19.25 14.1977 19.25 14.75V18.25C19.25 18.8023 18.8023 19.25 18.25 19.25H14.75C14.1977 19.25 13.75 18.8023 13.75 18.25V14.75Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <input type="passqword" className="form-control ms-0" name="name" placeholder="at least 8 characters" id="password" aria-label="password" />
                                </div>
                            </div>
                            <div className="col-12 mt-2 d-flex justify-content-between mt-3">
                                <div className="form-check text-start">
                                    <input className="form-check-input" type="checkbox" id="gridCheck" />
                                    <label className="form-check-label text-500 fs-7" htmlFor="gridCheck">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" className="text-500 fs-7">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="col-12 mt-5">
                                <button type="submit" className="btn btn-dark w-100 gap-2">
                                    Sign In
                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                        <path d="M21.6059 12.256H1V11.744H21.6059H22.813L21.9594 10.8905L17.5558 6.4868L17.9177 6.12484L23.7929 12L17.9177 17.8751L17.5558 17.5132L21.9594 13.1095L22.813 12.256H21.6059Z" stroke="white" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-500 fs-7 mt-5">
                                Don't have an account?{" "}
                                <a href="#" className="text-900 text-decoration-underline fs-7">
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <Section1 />
                <div className="bg-50 pb-70"></div>
            </Layout>
        </>
    );
}
