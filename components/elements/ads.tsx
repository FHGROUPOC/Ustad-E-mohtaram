import Image from "next/image";

export default function Ads() {
    return (
        <>
            <div className="block-ads bg-200">
                <div data-background="/assets/imgs/page/bg-archive1.png" className="banner-ads">
                    <Image src="/assets/imgs/template/logo/logo-gradient.svg" width={70} height={10} alt="magzin" priority={true} />
                    <h4 className="mt-3">
                        Modern Magazine &amp; Blog <br className="d-none d-lg-block" />
                        theme with <span>Outstanding</span> performance
                    </h4>
                    <div className="d-flex flex-wrap align-items-center gap-lg-4 gap-3">
                        <div className="tag-ads">
                            <Image src="/assets/imgs/template/icons/icon-1.svg" width={34} height={34} alt="magzin" priority={true} />
                            <div className="tag-ads__content">
                                <h6 className="fw-medium fs-18 m-0">Google</h6>
                                <p className="fs-7 m-0">PageSpeed Insidghts</p>
                            </div>
                        </div>
                        <div className="tag-ads">
                            <Image src="/assets/imgs/template/icons/icon-2.svg" width={29} height={29} alt="magzin" priority={true} />
                            <div className="tag-ads__content">
                                <h6 className="fw-medium fs-18 m-0">Core Web Vitals</h6>
                                <p className="fs-7 m-0">Assessment Passed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
