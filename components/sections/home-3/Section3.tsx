
export default function Section3() {
  return (
    <>
      {/* Home 3 Section 3 */}
      <section className="sec-3-home-3 pt-5 position-relative">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="block-newsletter style-2 position-relative" data-background="/assets/imgs/page/bg-home3-sec3.png">
                <div className="newsletter text-center">
                  <div className="decorate position-absolute top-0 end-0 m-4">
                    <svg className="dark-mode-invert" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                      <path d="M0.582044 11.7285C8.79451 13.4712 10.252 14.8614 12.125 22.7372C13.8067 14.8768 15.2308 13.4992 23.4018 11.8279C15.1894 10.0852 13.7319 8.69503 11.8589 0.81924C10.1769 8.67956 8.75306 10.0571 0.582044 11.7285Z" fill="#0E0E0F" />
                    </svg>
                  </div>
                  <div className="block-title">
                    <h4 className="mb-4">Subscribe to our newsletter</h4>
                  </div>
                  <form action="#" className="position-relative">
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-center gap-2 align-items-center mb-4">
                      <input className="form-control" type="text" placeholder="Your email address" />
                      <button className="btn btn-dark" type="submit">
                        Subscribe
                      </button>
                    </div>
                    <span className="fs-7 fw-regular">You’ll only receive valuable news updates—no spam.</span>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
