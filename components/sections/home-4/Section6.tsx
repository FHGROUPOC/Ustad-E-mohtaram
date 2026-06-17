
export default function Section6() {
  return (
    <>
      {/*Home 4 Section 6*/}
      <section className="sec-6-home-4">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <div className="block-newsletter bg-transparent border-0 position-relative">
                <div className="newsletter text-center">
                  <div className="block-title">
                    <h4 className="mb-3">Subscribe to our newsletter</h4>
                    <p className="mb-4">
                      Subscribe to our email newsletter to get the latest <br className="d-none d-lg-block" />
                      posts delivered right to your email.
                    </p>
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
