import Image from "next/image";

export default function Section8() {
  return (
    <>
      {/*Home 2 Section 8*/}
      <section className="sec-8-home-2 bg-white">
        <div className="decorate-1">
          <Image src="/assets/imgs/template/decorate-4.png" alt="magzin" width={250} height={250} />
        </div>
        <div className="container position-relative z-1">
          <div className="row g-4">
            <div className="col-lg-6 col-12">
              <div className="block-title d-flex align-items-center gap-1 fs-7 text-600">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <path d="M12 11.25C13.7949 11.25 15.25 9.79493 15.25 8C15.25 6.20507 13.7949 4.75 12 4.75C10.2051 4.75 8.75 6.20507 8.75 8C8.75 9.79493 10.2051 11.25 12 11.25Z" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6.84747 19.25H17.1525C18.2944 19.25 19.174 18.2681 18.6408 17.2584C17.8563 15.7731 16.068 14 12 14C7.93198 14 6.14364 15.7731 5.35921 17.2584C4.82594 18.2681 5.70555 19.25 6.84747 19.25Z" stroke="#0E0E0F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="fs-7 fw-regular">Start your writing journey today.</span>
              </div>
              <div className="block-title">
                <h4 className="mb-4 ds-5">Become an author</h4>
              </div>
              <form action="#" className="position-relative">
                <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center mb-3">
                  <input className="form-control" type="text" placeholder="Your email address" />
                  <button className="btn btn-dark" type="submit">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-5 col-12 ms-lg-auto position-relative z-1">
              <div className="d-flex align-items-center justify-content-center gap-1">
                <Image className="rounded-16 mb-3 d-none d-md-block" src="/assets/imgs/page/img-80.png" alt="magzin" width={115} height={148} />
                <Image className="rounded-16" src="/assets/imgs/page/img-81.png" alt="magzin" width={170} height={220} />
                <Image className="rounded-16" src="/assets/imgs/page/img-82.png" alt="magzin" width={133} height={172} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
