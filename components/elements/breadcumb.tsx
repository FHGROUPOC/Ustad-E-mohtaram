import Link from "next/link";
import Image from "next/image";

export default function Breadcumb({
  page_current,
  title,
  count_articles,
  description,
}: {
  page_current: string;
  title: string;
  description: string;
  count_articles: string;
}) {
  return (
    <>
      {/* Breadcumb */}
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={15}
                        height={15}
                        viewBox="0 0 15 15"
                        fill="none"
                      >
                        <path
                          d="M6.125 4.5625L9.5625 7.84375L6.125 11.125"
                          stroke="#626568"
                          strokeWidth="0.9375"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </li>
                  <li
                    className="breadcrumb-item active text-dark fs-7"
                    aria-current="page"
                  >
                    {page_current}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row align-items-end">
            <div className="col-lg-6 col-12">
              <div className="title">
                <h4 className="mb-0 ds-4">
                  {title}
                  <span className="text-600 fw-regular fs-6 bg-white rounded-8 p-2 ms-2">
                    {count_articles}
                  </span>
                </h4>
                <p className="fs-7 mb-0">{description}</p>
              </div>
            </div>
            {/* <div className="col-lg-6">
              <div className="d-none d-lg-flex justify-content-end">
                <div className="block-author align-items-center position-relative">
                  <span className="position-absolute bottom-100 start-0 p-2 fs-8">
                    Top Authors
                  </span>
                  <div className="avatar avatar-md rounded-circle overflow-hidden border-3 border-white z-5">
                    <Image
                      src="/assets/imgs/template/author/author-11.png"
                      alt="magzin"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="avatar avatar-md rounded-circle overflow-hidden border-3 border-white z-4">
                    <Image
                      src="/assets/imgs/template/author/author-12.png"
                      alt="magzin"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="avatar avatar-md rounded-circle overflow-hidden border-3 border-white z-3">
                    <Image
                      src="/assets/imgs/template/author/author-13.png"
                      alt="magzin"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="avatar avatar-md rounded-circle overflow-hidden border-3 border-white z-1">
                    <Image
                      src="/assets/imgs/template/author/author-14.png"
                      alt="magzin"
                      width={500}
                      height={500}
                    />
                  </div>
                  <div className="avatar avatar-md rounded-circle overflow-hidden border-3 border-white z-0">
                    <Image
                      src="/assets/imgs/template/author/author-15.png"
                      alt="magzin"
                      width={500}
                      height={500}
                    />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
