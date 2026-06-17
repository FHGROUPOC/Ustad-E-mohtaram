"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Rating } from "react-simple-star-rating";

export default function SectionReviews({
  reviews,
  author,
}: {
  reviews: any[];
  author: any;
}) {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    name: "",
  });
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setFormData((prev) => ({ ...prev, name: session.user.name || "" }));
    }
  }, [session]);

  const canReply =
    session &&
    (session.user?.email === author.email ||
      session.user?.id === author._id ||
      session.user?.id === author.parentId);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authorId: author._id,
          adminId: author.parentId,
          reviewerName: formData.name,
          reviewerEmail: session.user?.email,
          reviewerImage: session.user?.image,
          rating: formData.rating,
          comment: formData.comment,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        // Show the specific message from the API (e.g., "Already submitted")
        alert(result.message || "Something went wrong");
        return;
      }

      if (res.ok) window.location.reload();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-[#fafafa]">
      <div className="container max-w-5xl">
        <div className="row g-5">
          {/* LEFT COLUMN: THE FLOATING FORM */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "100px", zIndex: 10 }}>
              <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                {!session ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">✍️</span>
                    </div>
                    <h4 className="font-black text-slate-900 mb-2">
                      Join the Discussion
                    </h4>
                    <p className="text-slate-400 text-sm mb-6">
                      Sign in to share your thoughts with{" "}
                      {author.name.split(" ")[0]}.
                    </p>
                    <button
                      onClick={() => signIn("google")}
                      className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
                    >
                      <img
                        src="https://authjs.dev/img/providers/google.svg"
                        width="18"
                        alt="G"
                      />
                      Continue with Google
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-black text-slate-900 text-xl tracking-tight">
                        Your Rating
                      </h4>
                      <button
                        type="button"
                        onClick={() => signOut()}
                        className="text-[10px] uppercase tracking-widest font-bold text-slate-300 hover:text-red-400 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-slate-900 overflow-hidden shrink-0 mb-2 mx-auto">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-xl font-black">
                          {session.user.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="mb-6 bg-slate-50 p-4 rounded-2xl flex flex-col items-center">
                      <Rating
                        onClick={(rate) =>
                          setFormData({ ...formData, rating: rate })
                        }
                        initialValue={formData.rating}
                        size={28}
                        fillColor="#111827"
                        emptyColor="#e2e8f0"
                        transition
                        SVGstyle={{ display: "inline-block" }}
                      />
                      <span className="text-[10px] font-black text-slate-400 mt-2 uppercase italic">
                        {formData.rating > 0
                          ? `${formData.rating} / 5 Stars`
                          : "Tap to rate"}
                      </span>
                    </div>

                    <textarea
                      className="w-full p-4 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-slate-900/5 min-h-[120px] text-sm mb-4 placeholder:text-slate-300"
                      placeholder="Tell the world about your experience..."
                      value={formData.comment}
                      onChange={(e) =>
                        setFormData({ ...formData, comment: e.target.value })
                      }
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting || formData.rating === 0}
                      className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-30 disabled:translate-y-0"
                    >
                      {isSubmitting ? "Syncing..." : "Submit Review"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE FEED */}
          <div className="col-lg-8">
            <div className="flex items-end justify-between mb-12 px-4">
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                  Community
                </h3>
                <p className="text-slate-400 font-medium">
                  Real feedback from verified readers.
                </p>
              </div>
              <div className="text-5xl font-black text-slate-100">
                {reviews.length}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {reviews.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100 text-slate-300 font-bold">
                  No stories shared yet.
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className="relative bg-white p-8 rounded-[2rem] border border-slate-50 hover:border-slate-200 transition-all duration-500"
                  >
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-slate-900 overflow-hidden shrink-0 shadow-lg shadow-slate-900/20">
                        {review.reviewerImage ? (
                          <img
                            src={review.reviewerImage}
                            alt={review.reviewerName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white text-xl font-black">
                            {review.reviewerName?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-slate-900 text-lg mb-0">
                              {review.reviewerName}
                            </h5>
                            <div className="flex gap-0.5 text-[10px] text-amber-400 mb-2">
                              {[...Array(review.rating)].map((_, i) => (
                                <span key={i}>★</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                            {new Date(review.createdAt).toLocaleDateString(
                              undefined,
                              { month: "short", day: "numeric" },
                            )}
                          </span>
                        </div>
                        <p className="text-slate-500 leading-relaxed text-sm italic">
                          "{review.comment}"
                        </p>

                        {/* AUTHOR REPLY */}
                        {review.reply && (
                          <div className="mt-6 p-5 rounded-2xl bg-[#111827] text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="h-5 w-5 rounded-full bg-white text-[#111827] flex items-center justify-center text-[8px] font-black">
                                {author.name?.charAt(0)}
                              </div>
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Author Response
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                              {review.reply}
                            </p>
                          </div>
                        )}

                        {/* REPLY ACTION FOR AUTHOR */}
                        {canReply && !review.reply && (
                          <div className="mt-4 flex gap-2">
                            <input
                              type="text"
                              placeholder="Write a quick response..."
                              className="flex-1 bg-slate-50 border-0 rounded-xl px-4 text-xs outline-none focus:ring-1 focus:ring-slate-200"
                              value={replyText[review._id] || ""}
                              onChange={(e) =>
                                setReplyText({
                                  ...replyText,
                                  [review._id]: e.target.value,
                                })
                              }
                            />
                            <button
                              onClick={() => handleReplySubmit(review._id)}
                              className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all active:scale-90"
                            >
                              <svg
                                width="16"
                                height="16"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
