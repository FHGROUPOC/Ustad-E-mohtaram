import Image from "next/image";

export default function Section1({ author }: { author: any }) {
    return (
        <section className="sec-1-home-4 sec-padding">
            <div className="container border-bottom pb-5">
                <div className="row">
                    <div className="col-lg-8 mx-lg-auto">
                        <div className="card border-0 bg-transparent">
                            <div className="card-img mb-4 text-center">
                                <Image 
                                    className="rounded-circle object-fit-cover border border-4 border-white shadow-sm" 
                                    src={author.image || "/assets/imgs/page/default-author.png"} 
                                    alt={author.name} 
                                    width={160} 
                                    height={160} 
                                />
                            </div>
                            <div className="card-body text-center">
                                <h2 className="mb-3 fw-bold">Hi there! I’m {author.name}</h2>
                                <p className="mb-4 fs-6 text-muted mx-auto" style={{ maxWidth: '600px' }}>
                                    {author.description || "Expert Barber specialized in modern fades and classic styling. Bringing years of experience to every cut."}
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <span className="badge bg-light text-dark border px-3 py-2">Professional Barber</span>
                                    <span className="badge bg-light text-dark border px-3 py-2">Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}