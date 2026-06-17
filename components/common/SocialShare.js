"use client";
import {
  Facebook,
  Linkedin,
  Twitter,
  Link as LinkIcon,
  Send,
} from "lucide-react";

export default function SocialShare({ title, slug }) {
  const url = `https://multi-blogs-web.vercel.app/blog/${slug}`;

  const handleShare = (e, platformUrl) => {
    e.preventDefault();
    window.open(platformUrl, "_blank", "width=600,height=400");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!"); // Replace with a toast for better UX
  };
  const platforms = [
    {
      name: "X",
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0077b5] hover:text-white",
    },
    {
      name: "WhatsApp",
      icon: <Send size={18} />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`,
      color: "hover:bg-[#25D366] hover:text-white",
    },
  ];

  return (
    <div className="text-center flex flex-col gap-3 py-6 my-10 border-t border-b border-gray-100">
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        Share this story
      </span>
      <div className="flex gap-2 justify-center">
        {platforms.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-300 ${link.color}`}
          >
            {link.icon}
          </a>
        ))}
        <handleShare
          onClick={copyToClipboard}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all duration-300 hover:bg-black hover:text-white"
        >
          <LinkIcon size={18} />
        </handleShare>
      </div>
    </div>
  );
}
