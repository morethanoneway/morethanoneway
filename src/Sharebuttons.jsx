import React, { useState } from 'react';
import { Link2, Twitter, Facebook, Linkedin, Mail, Check } from 'lucide-react';

const ShareButtons = ({ 
  title = "Check out this resource from MoreThanOneWay.org",
  message = "Know someone who could use this?",
  showMessage = true,
  className = ""
}) => {
  const [copied, setCopied] = useState(false);
  
  // Get current page URL
  const currentUrl = window.location.href;
  
  // Copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Share on Twitter
  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };
  
  // Share on Facebook
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };
  
  // Share on LinkedIn
  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };
  
  // Share via Email
  const handleEmailShare = () => {
    const emailSubject = encodeURIComponent(title);
    const emailBody = encodeURIComponent(`I thought you might find this helpful:\n\n${currentUrl}\n\nFrom MoreThanOneWay.org - Free resources for students`);
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
<div className={`bg-gray-50 border border-gray-200 rounded-xl p-6 ${className}`}>
      {showMessage && (
        <div className="text-center mb-4">
          <p className="text-gray-800 font-medium text-base mb-1">
  💙 Know someone who might find this helpful?
</p>
<p className="text-gray-500 text-sm">
  Sharing is optional — but appreciated.
</p>
        </div>
      )}
      
      <div className="flex flex-wrap justify-center gap-3">
        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
         className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2
           text-sm rounded-lg font-medium
           shadow-sm hover:shadow
           opacity-90 hover:opacity-100 transition-all"
          title="Copy link to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span className="font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4" />
              <span className="font-medium">Copy Link</span>
            </>
          )}
        </button>

        {/* Twitter Button */}
        <button
          onClick={handleTwitterShare}
          style={{ backgroundColor: '#1DA1F2' }}
          className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2
           text-sm rounded-lg font-medium
           shadow-sm hover:shadow
           opacity-90 hover:opacity-100 transition-all"
          title="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
          <span className="font-medium">Twitter</span>
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookShare}
          style={{ backgroundColor: '#4267B2' }}
          className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2
           text-sm rounded-lg font-medium
           shadow-sm hover:shadow
           opacity-90 hover:opacity-100 transition-all"
          title="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
          <span className="font-medium">Facebook</span>
        </button>

        {/* LinkedIn Button */}
        <button
          onClick={handleLinkedInShare}
          style={{ backgroundColor: '#0077B5' }}
         className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2
           text-sm rounded-lg font-medium
           shadow-sm hover:shadow
           opacity-90 hover:opacity-100 transition-all"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
          <span className="font-medium">LinkedIn</span>
        </button>

        {/* Email Button */}
        <button
          onClick={handleEmailShare}
         className="flex items-center gap-2 bg-gray-700 text-white px-3 py-2
           text-sm rounded-lg font-medium
           shadow-sm hover:shadow
           opacity-90 hover:opacity-100 transition-all"
          title="Share via email"
        >
          <Mail className="w-4 h-4" />
          <span className="font-medium">Email</span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;