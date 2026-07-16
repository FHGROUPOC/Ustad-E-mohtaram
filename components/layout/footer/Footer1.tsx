import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      {/* Footer */}
      <footer>
        <div className="section-footer sec-padding overflow-hidden">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <Link 
                // className="dark-mode-invert"
                 href="/">
                  <Image
                    className="mx-auto"
                    style={{ maxWidth: "200px" }}
                    src="https://res.cloudinary.com/dgtk4rthy/image/upload/v1784194573/Dar-Ul-Iqaan_lco9zf.png"
                    alt="Dar-Ul-Iqaan Logo"
                    width={250}
                    height={32}
                  />
                </Link>
                <p className="text-dark mb-5 mt-2">
                  The House of Faith
                </p>
                <div className="d-flex flex-wrap justify-content-center align-items-center gap-lg-5 gap-md-4">
                  <a href="#" className="text-600 hover-dark d-block p-2">
                    Privacy Policy
                  </a>
                  <a href="#" className="text-600 hover-dark d-block p-2">
                    Term of Use
                  </a>
                  <a href="#" className="text-600 hover-dark d-block p-2">
                    Careers
                  </a>
                  <a href="#" className="text-600 hover-dark d-block p-2">
                    Help
                  </a>
                  <a href="#" className="text-600 hover-dark d-block p-2">
                    Become author
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
