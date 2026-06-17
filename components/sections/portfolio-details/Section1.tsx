import Link from "next/link";
import Image from "next/image";
export default function Section1() {
    return (
        <>
            {/* Portfolio Archive Section 1*/}
            <section className="sec-1-portfolio-archive pb-100" data-background="/assets/imgs/page/bg-home1-sec1.png">
                {/* Breadcumb */}
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
                                        <Link href="/portfolio-archive-1">Portfolio</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span className="icon-shape icon-xxs">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" fill="none">
                                                <path d="M6.125 4.5625L9.5625 7.84375L6.125 11.125" stroke="#626568" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </li>
                                    <li className="breadcrumb-item active text-dark fs-7" aria-current="page">
                                        Moiri Perfume
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="row align-items-end">
                        <div className="col-lg-7 col-12">
                            <div className="title">
                                <h4 className="mb-0 ds-4">
                                    <span className="text-anime-style-2 text-uppercase">Lummi Perfume</span>
                                </h4>
                                <p className="fs-7 mb-0 text-anime-style-1">A refined fragrance branding project, combining elegance with a modern, timeless identity that reflects sophistication.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-container-3 mt-5">
                    <div className="d-flex justify-content-center">
                        <div className="block-banner rounded-16 overflow-hidden">
                            <Image src="/assets/imgs/other/portfolio/img-pdetails-1.png" alt="" width={1500} height={730} />
                        </div>
                    </div>
                </div>
                <div className="container pt-100">
                    <div className="row g-lg-5 g-4">
                        <div className="col-lg-4 pe-lg-5">
                            <div className="block-brief rounded-16 p-4 border-200 bg-white">
                                <div className="title border-bottom-200 pb-2 mb-4 m-2">
                                    <h5 className="mb-0">Project brief</h5>
                                </div>
                                <div className="content">
                                    <ul className="text-secondary ps-3 fs-18 m-2">
                                        <li>
                                            Client:
                                            <span className="text-dark">Lummi Perfume</span>
                                        </li>
                                        <li>
                                            Project Type:
                                            <span className="text-dark">Brand Identity</span>
                                        </li>
                                        <li>
                                            Platform:
                                            <span className="text-dark">Print &amp; Digital</span>
                                        </li>
                                        <li>
                                            Timeline:
                                            <span className="text-dark">6 weeks</span>
                                        </li>
                                        <li>
                                            Budget:
                                            <span className="text-dark">$9,800</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="block-discover article p-5 changeless mt-4" data-background="/assets/imgs/other/portfolio/img-pdetails-2.png">
                                <h5 className="text-white mb-4 position-relative z-2 text-anime-style-2">Have an idea for a new project ?</h5>
                                <a href="#" className="view-more white z-3 w-12rem">
                                    <span className="circle" aria-hidden="true">
                                        <span className="icon arrow" />
                                    </span>
                                    <span className="button-text fw-semi-bold">Contact me</span>
                                </a>
                                <div className="card-corner no-border dark-mode-invert">
                                    <a href="#" className="arrow-box">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                            <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M19 12H4.75" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                    <div className="curve-one" />
                                    <div className="curve-two" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="d-flex flex-column gap-4">
                                <span className="fs-5 text-dark">Lummi Perfume is a luxury fragrance brand that seeks to convey elegance, purity, and timeless sophistication. The project focused on creating a complete brand identity system, including logo, typography, color palette, and packaging design, all aligned to reflect the refined nature of the product.</span>
                                <div className="block-content">
                                    <div className="title">
                                        <h4 className="mb-0">Project overview</h4>
                                    </div>
                                    <div className="content">
                                        <p className="fs-6 text-dark">The goal was to build a distinctive brand identity that stands out in the competitive perfume market. Lummi Perfume wanted to evoke a sense of exclusivity and femininity, while remaining modern and approachable for contemporary audiences.</p>
                                    </div>
                                </div>
                                <div className="block-content">
                                    <div className="title">
                                        <h4 className="mb-0">Design Process</h4>
                                    </div>
                                    <div className="content">
                                        <ul className="text-dark fw-semi-bold list-unstyled ps-0">
                                            <li>
                                                Research &amp; Inspiration
                                                <span className="fw-regular text-dark">- Studied luxury perfume branding trends, classical design elements, and consumer perceptions of elegance.</span>
                                            </li>
                                            <li>
                                                Concept Development
                                                <span className="fw-regular text-dark">- Explored different visual directions focusing on minimalism, femininity, and sophistication.</span>
                                            </li>
                                            <li>
                                                Logo &amp; Typography
                                                <span className="fw-regular text-dark">- Crafted a sleek, flowing logo combined with refined serif typography to express both modernity and timelessness.</span>
                                            </li>
                                            <li>
                                                Color Palette
                                                <span className="fw-regular text-dark">- Selected a harmonious palette with soft neutrals, muted gold, and subtle gradients to highlight luxury and purity.</span>
                                            </li>
                                            <li>
                                                Packaging Design
                                                <span className="fw-regular text-dark">- Developed minimal yet striking packaging concepts, integrating premium finishes such as embossing and metallic foils.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="block-image">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <div className="rounded-16 overflow-hidden">
                                                <Image src="/assets/imgs/other/portfolio/img-pdetails-3.png" alt="" width={380} height={350} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="rounded-16 overflow-hidden">
                                                <Image src="/assets/imgs/other/portfolio/img-pdetails-4.png" alt="" width={380} height={350} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="rounded-16 overflow-hidden">
                                                <Image src="/assets/imgs/other/portfolio/img-pdetails-5.png" alt="" width={790} height={350} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="block-content">
                                    <div className="title">
                                        <h4 className="mb-0">Outcome</h4>
                                    </div>
                                    <div className="content">
                                        <p className="fs-6 text-dark">The final identity for Lummi Perfume successfully blends modern aesthetics with classic luxury. The cohesive visual system enhances brand recognition, strengthens its premium positioning, and creates an emotional connection with its audience. The result is a brand identity that feels elegant, sophisticated, and enduring, just like the fragrance it represents.</p>
                                    </div>
                                </div>
                                <div className="border-top mb-1" />
                                <div className="d-flex flex-wrap gap-4 align-items-center justify-content-between pb-5">
                                    <div className="d-flex align-items-center gap-2">
                                        <a href="#" className="tag-item">
                                            <span>Perfume</span>
                                        </a>
                                        <a href="#" className="tag-item">
                                            <span>Branding</span>
                                        </a>
                                        <a href="#" className="tag-item">
                                            <span>Design</span>
                                        </a>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-dark">Share:</span>
                                        <div className="d-inline-flex group-social-icons bg-50 mt-0 rounded-8">
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
                                                    <path d="M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391s.497.426.641.747c.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922s.461.957.461 1.563c0 .496-.105.922-.285 1.278a2.3 2.3 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.3 5.3 0 0 1-1.278.176L0 12.803V3zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a1 1 0 0 0-.32-.355 1.8 1.8 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305zm6.858-.035q.428.427 1.278.426c.39 0 .746-.106 1.032-.286q.426-.32.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.1 4.1 0 0 1-1.527-.285 2.8 2.8 0 0 1-1.137-.782 2.85 2.85 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4 4 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396m2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176s-.356.25-.496.39a.96.96 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978z"></path>
                                                </svg>
                                            </a>
                                        </div>
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
