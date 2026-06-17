import Link from "next/link";

export default function Section2({
  categories = [],
}: {
  categories: string[];
}) {
  return (
    <section className="sec-2-home-4 py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-lg-auto">
            <p className="text-center mb-4 fw-bold text-uppercase fs-9 ls-2">
              Expertise
            </p>
            <ul className="list-unstyled d-flex justify-content-center flex-wrap gap-3 ps-0">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <Link
                    href={`/category/${cat.toLowerCase()}`}
                    className="text-capitalize tag-item style-2 rounded-pill px-4 py-2 border text-decoration-none"
                  >
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
