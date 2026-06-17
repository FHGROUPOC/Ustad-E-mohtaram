import Link from "next/link";


export default function Section1() {
  return (
    <>
      {/* Breadcumb Search Results */}
      <section className="sec-breadcumb" id="toppagination">
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
                    Search Results
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-6 col-12">
              <div className="title">
                <h4 className="mb-0 ds-4">
                  “Hello world”
                  <span className="text-600 fw-regular fs-6 bg-white rounded-8 p-2">85</span>
                </h4>
                <p className="fs-7 mb-0">We found 85 results for “Hello world”</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
