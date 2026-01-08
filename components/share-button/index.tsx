"use client";

import { Phone, Share2, Navigation } from "lucide-react";

interface ShareButtonProps {
  phone?: string;
  address?: string;
  name?: string;
}

const ShareButton = ({ phone, address, name }: ShareButtonProps) => {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: name || "Distributor",
        text: `${name}\n${phone}\n${address}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="">
      <div className="flex flex-wrap justify-between gap-1 ">
        {/* Directions */}
        {address && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              address
            )}`}
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-cyan-100 text-cyan-900 text-[12px] font-medium whitespace-nowrap"
          >
            <Navigation size={13} />
            Directions
          </a>
        )}

       
        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-900 text-[12px] font-medium whitespace-nowrap"
          >
            <Phone size={13} />
            Call
          </a>
        )}

        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 text-cyan-900 text-[12px] font-medium whitespace-nowrap"
        >
          <Share2 size={13} />
          Share
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
