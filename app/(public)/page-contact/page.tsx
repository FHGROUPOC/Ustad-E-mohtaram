import Layout from "@/components/layout/Layout";

import Section1 from "@/components/sections/home/Section11";
import Link from "next/link";
export default function Page_Contact() {
    return (
        <>
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
                                        About Us
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-12">
                            <div className="contact-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18917.178328898015!2d-81.87205212082073!3d36.244635574266084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8850f355d556abbf%3A0x7fb25598fe987c21!2s1342%20Laurel%20Creek%20Rd%2C%20Sugar%20Grove%2C%20NC%2028679%2C%20Hoa%20K%E1%BB%B3!5e0!3m2!1svi!2s!4v1752052708066!5m2!1svi!2s" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                            </div>
                        </div>
                    </div>
                    <div className="row py-5">
                        <div className="col-md-10 mx-auto">
                            <div className="row">
                                <div className="col-md-4">
                                    <h5 className="mb-2">Address</h5>
                                    <p className="m-0">1342 Laurel Creek Rd</p>
                                    <p className="m-0">Boone, North Carolina (NC), 28607</p>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="mb-2">Contact</h5>
                                    <p className="m-0">+1 (234) 567-8901</p>
                                    <p className="m-0">+1 (234) 567-8901</p>
                                </div>
                                <div className="col-md-4">
                                    <h5 className="mb-2">Email</h5>
                                    <p className="m-0">Monay - Friday: 08:00 - 17:00</p>
                                    <p className="m-0">Saturday - Sunday: 10:00 - 16:00</p>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-12">
                                    <h4 className="mt-5 mb-2 pb-4 pt-3">Get in touch</h4>
                                    <div className="row wow img-custom-anim-left g-3 border-top">
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-group d-flex align-items-center">
                                                <div className="icon-input ps-3">
                                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path className="stroke-dark" d="M12 11.25C13.7949 11.25 15.25 9.79493 15.25 8C15.25 6.20507 13.7949 4.75 12 4.75C10.2051 4.75 8.75 6.20507 8.75 8C8.75 9.79493 10.2051 11.25 12 11.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path className="stroke-dark" d="M6.84723 19.25H17.1522C18.2941 19.25 19.1737 18.2681 18.6405 17.2584C17.856 15.7731 16.0677 14 11.9997 14C7.93174 14 6.1434 15.7731 5.35897 17.2584C4.8257 18.2681 5.70531 19.25 6.84723 19.25Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <input type="text" className="form-control ms-0" name="name" placeholder="Your name *" aria-label="username" />
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-lg-4">
                                            <div className="input-group d-flex align-items-center">
                                                <div className="icon-input ps-3">
                                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M5.5 6.5L12 12.25L18.5 6.5" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <input type="text" className="form-control ms-0" name="name" placeholder="info@webmail.com" aria-label="email" />
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="input-group d-flex align-items-center">
                                                <div className="icon-input ps-3">
                                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path className="stroke-dark" d="M6.75 19.25H17.25C18.3546 19.25 19.25 18.3546 19.25 17.25V9.75001L12 4.75L4.75 9.75001V17.25C4.75 18.3546 5.64544 19.25 6.75 19.25Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path className="stroke-dark" d="M9.75 15.7495C9.75 14.6449 10.6455 13.7495 11.75 13.7495H12.25C13.3546 13.7495 14.25 14.6449 14.25 15.7495V19.2495H9.75V15.7495Z" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <input type="text" className="form-control ms-0" name="name" placeholder="Website" aria-label="website" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group d-flex">
                                                <div className="icon-input pt-2 ps-3 align-items-start border border-end-0 rounded-1 rounded-end-0">
                                                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                                        <path className="stroke-dark" d="M5.5 2.14844H3C1.89543 2.14844 1 3.04387 1 4.14844V14.6484C1 15.753 1.89543 16.6484 3 16.6484H13.5C14.6046 16.6484 15.5 15.753 15.5 14.6484V12.1484" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path
                                                            className="fill-dark"
                                                            d="M17.3285 1.20344L16.4448 0.319749C16.0185 -0.106583 15.3248 -0.106583 14.8984 0.319749L7.82915 7.38907C7.76373 7.45449 7.71914 7.53782 7.70096 7.62854L7.2591 9.83772C7.22839 9.99137 7.27647 10.1502 7.38729 10.261C7.47605 10.3498 7.59561 10.3983 7.71864 10.3983C7.74923 10.3983 7.77997 10.3953 7.81053 10.3892L10.0197 9.94732C10.1104 9.92917 10.1938 9.88455 10.2592 9.81913L17.3285 2.74984C17.3285 2.74984 17.3286 2.74984 17.3286 2.74981C17.7549 2.32351 17.7549 1.6298 17.3285 1.20344ZM9.69678 9.05607L8.31606 9.33225L8.59224 7.95153L14.3461 2.19754L15.4507 3.30214L9.69678 9.05607ZM16.6658 2.0871L16.1135 2.6394L15.0089 1.53479L15.5612 0.982524C15.6221 0.921601 15.7212 0.92157 15.7821 0.982493L16.6658 1.86618C16.7267 1.92707 16.7267 2.0262 16.6658 2.0871Z"
                                                            fill="black"
                                                        />
                                                    </svg>
                                                </div>
                                                <textarea className="form-control" name="name" placeholder="Your message...." aria-label="With textarea" defaultValue={""} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-dark rounded-8 gap-2">
                                                Send Message
                                                <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                    <path className="stroke-white" d="M21.1059 12.2562H0.5V11.7443H21.1059H22.313L21.4594 10.8907L17.0558 6.48705L17.4177 6.12508L23.2929 12.0002L17.4177 17.8754L17.0558 17.5134L21.4594 13.1098L22.313 12.2562H21.1059Z" stroke="white" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Section1 />
                <div className="bg-50 pb-70"></div>
            </Layout>
        </>
    );
}
