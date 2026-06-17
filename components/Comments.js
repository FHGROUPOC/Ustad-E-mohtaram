"use client";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Star, Send, MessageSquare, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

export default function Comments({ blogId, initialComments }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, parentCommentId: replyTo }),
      });
      if (res.ok) {
        toast.success("Feedback shared!");
        setText("");
        setReplyTo(null);
        window.location.reload();
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 font-sans !text-[#4A453E]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
        {/* LEFT COLUMN: THE CREAMY SUMMARY SIDEBAR */}
        <div className="lg:col-span-4">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 !text-[#2D2A26]">
            Average Rating
          </h3>
          <div className="!bg-[#FDFCF7] border border-[#EBE8E0] rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-5 mb-8">
              <h4 className="text-6xl font-black !text-[#2D2A26]">4.5</h4>
              <div>
                <div className="flex text-[#E6B325]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < 4 ? "#E6B325" : "none"}
                      strokeWidth={i < 4 ? 0 : 2}
                    />
                  ))}
                </div>
                <p className="text-[#A39E93] text-xs font-bold uppercase tracking-widest mt-2">
                  {comments.length} Reviews
                </p>
              </div>
            </div>

            {/* Rating Bars - Using a muted orange/gold from the image */}
            <div className="space-y-4 mb-10">
              {[
                { star: 5, val: "90%" },
                { star: 4, val: "60%" },
                { star: 3, val: "40%" },
                { star: 2, val: "20%" },
                { star: 1, val: "0%" },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-4">
                  <span className="text-xs font-black !text-[#4A453E] w-2">
                    {item.star}
                  </span>
                  <div className="flex-1 h-2 !bg-[#F4F1EA] rounded-full overflow-hidden">
                    <div
                      className="h-full !bg-[#F59E0B] rounded-full"
                      style={{ width: item.val }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-black !text-[#A39E93] w-8">
                    {item.val}
                  </span>
                </div>
              ))}
            </div>

            <div className="!bg-[#F9F7F2] p-6 rounded-[1.5rem] border border-[#EBE8E0]/50">
              <h5 className="font-black text-xs uppercase tracking-widest mb-2 !text-[#2D2A26]">
                Share your voice
              </h5>
              <p className="text-[#A39E93] text-[11px] leading-relaxed mb-6 font-medium">
                Help our community grow by sharing your authentic experience.
              </p>

              <button
                // onClick={() => {
                //   if (!session) signIn("google");
                //   else
                //     document
                //       .getElementById("commentForm")
                //       ?.scrollIntoView({ behavior: "smooth" });
                // }}
                onClick={() => signOut("google")}
                className="w-full py-4 !bg-[#2D2A26] !text-[#FDFCF7] text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:!bg-black transition-all active:scale-95 shadow-xl shadow-[#2D2A26]/10"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE CUSTOMER FEEDBACK LIST */}
        <div className="lg:col-span-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 !text-[#2D2A26]">
            Customer Feedback
          </h3>

          <div className="space-y-6">
            {/* Logged in Input Area */}
            {session ? (
              <form
                id="commentForm"
                onSubmit={handleSubmit}
                className="mb-12 !bg-[#FDFCF7] p-8 rounded-[2rem] border border-[#EBE8E0] shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={session.user.image}
                    className="w-8 h-8 rounded-full border border-[#EBE8E0]"
                    alt="user"
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest !text-[#A39E93]">
                    Drafting as {session.user.name}
                  </span>
                </div>
                <textarea
                  className="w-full bg-transparent border-none outline-none text-base !text-[#4A453E] placeholder:text-[#D1CDC2] resize-none font-medium"
                  placeholder={
                    replyTo
                      ? "Write your reply..."
                      : "Write your feedback here..."
                  }
                  rows="3"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#F4F1EA]">
                  {replyTo && (
                    <button
                      type="button"
                      onClick={() => setReplyTo(null)}
                      className="text-[10px] font-black uppercase tracking-widest text-[#A39E93]"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="!bg-[#2D2A26] text-white p-3 rounded-xl hover:opacity-90 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="mb-10 !bg-[#FDFCF7] p-8 rounded-[2rem] border border-[#EBE8E0] text-center">
                <p className="text-[#A39E93] text-xs font-bold uppercase tracking-widest mb-6">
                  Sign in to join the discussion
                </p>
                <button
                  onClick={() => signIn("google")}
                  className="inline-flex items-center gap-3 !bg-white border border-[#EBE8E0] px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-sm hover:!bg-[#F9F7F2] transition-all"
                >
                  <img
                    src="https://www.google.com/favicon.ico"
                    className="w-4 h-4"
                    alt="google"
                  />
                  Sign in with Google
                </button>
              </div>
            )}

            {/* Comments */}
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="!bg-[#FDFCF7] border border-[#EBE8E0] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)] transition-all"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <img
                        src={comment.img || "/user.png"}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-[#F59E0B] text-white p-1 rounded-md shadow-sm">
                        <Sparkles size={10} fill="white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-[#2D2A26] uppercase text-sm tracking-tight">
                        {comment.name}
                      </h4>
                      <p className="text-[10px] text-[#A39E93] font-bold uppercase tracking-widest mt-1">
                        {new Date(comment.postedAt).toLocaleDateString(
                          "en-US",
                          { month: "long", day: "numeric", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-[#E6B325]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#E6B325" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                <p className="text-[#6B665D] text-sm md:text-base leading-relaxed mb-8 font-medium">
                  {comment.message}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setReplyTo(comment._id);
                      document
                        .getElementById("commentForm")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2D2A26] hover:text-[#F59E0B] transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Nested Replies */}
                {comment.replies?.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-[#F4F1EA] space-y-6">
                    {comment.replies.map((reply) => (
                      <div
                        key={reply._id}
                        className="flex gap-5 items-start pl-6 md:pl-10 border-l-2 border-[#EBE8E0]"
                      >
                        <img
                          src={reply.img}
                          className="w-10 h-10 rounded-xl border border-white shadow-sm"
                        />
                        <div>
                          <h5 className="font-black text-[#2D2A26] uppercase text-xs tracking-tight">
                            {reply.name}
                          </h5>
                          <p className="text-[#6B665D] text-xs mt-1.5 leading-relaxed font-medium">
                            {reply.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
