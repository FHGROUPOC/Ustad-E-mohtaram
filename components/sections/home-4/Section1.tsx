"use client";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Section1({ author }: { author: any }) {
  const socialIcons = [
    {
      link: author.socials?.facebook,
      icon: <FaFacebookF />,
      bg: "#1877F2",
    },
    {
      link: author.socials?.instagram,
      icon: <FaInstagram />,
      bg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    },
    {
      link: author.socials?.twitter,
      icon: <FaTwitter />,
      bg: "#1DA1F2",
    },
    {
      link: author.socials?.linkedin,
      icon: <FaLinkedinIn />,
      bg: "#0A66C2",
    },
    {
      link: author.socials?.youtube,
      icon: <FaYoutube />,
      bg: "#FF0000",
    },
  ];

  return (
    <section className="sec-1-home-4 py-5 relative overflow-hidden">
      <div className="container border-bottom pb-3">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="card border-0 bg-transparent text-center">
              <div className="mb-4 flex justify-center">
                <Image
                  className="rounded-circle object-fit-cover border border-4 border-white shadow-sm"
                  src={
                    author.image ||
                    `https://ui-avatars.com/api/?size=160&name=${author.name}&background=random&color=fff`
                  }
                  alt={author.name}
                  width={150}
                  height={150}
                />
              </div>
              <h2 className="mb-3 fw-bold text-slate-900">
                Hi there! I’m {author.name}
              </h2>
              <p
                className="mx-auto fs-6 text-muted"
                style={{ maxWidth: "650px" }}
              >
                {author.description || "Expert Content Creator and Authority."}
              </p>
            </div>

            <div className="flex justify-center gap-3 mt-4">
              {socialIcons.map(
                (social, index) =>
                  social.link && (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      // Inline style ensures the background color ALWAYS works
                      style={{ background: social.bg }}
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:brightness-110"
                    >
                      <span className="fs-5 flex items-center justify-center">
                        {social.icon}
                      </span>
                    </a>
                  ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
