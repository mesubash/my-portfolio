import React, { useState } from "react";
import { FaEnvelope, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Footer = () => {
  const [copied, setCopied] = useState(false); // State to track if email is copied

  // Function to copy email to clipboard
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("subashdhamee@gmail.com");
      setCopied(true); // Update state to show "Copied!"
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };

  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <a href="#landingpage" className="link link-hover">Home</a>
        <a href="#about" className="link link-hover">About Me</a>
        <a href="#projects" className="link link-hover">Projects</a>
        <a href="#contact" className="link link-hover">Contact Me</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-8">
          {/* Email Link with Copiable Tooltip */}
          <div
            data-tooltip-id="email-tooltip"
            data-tooltip-content={copied ? "Copied!" : "subashdhamee@gmail.com"}
          >
            <a
              href="mailto:subashdhamee@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300"
            >
              <FaEnvelope className="w-6 h-6 fill-current" />
            </a>
          </div>

          {/* Other Social Links with Normal Hover */}
          <a
            href="https://x.com/subashdhamee"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300"
            data-tooltip-id="twitter-tooltip"
            data-tooltip-content="Twitter"
          >
            <FaTwitter className="w-6 h-6 fill-current" />
          </a>

          <a
            href="https://www.linkedin.com/in/subashsdhami/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transform hover:scale-150 hover:-rotate-12 transition-transform duration-400"
            data-tooltip-id="linkedin-tooltip"
            data-tooltip-content="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 fill-current" />
          </a>

          <a
            href="https://github.com/mesubash"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transform hover:scale-150 hover:rotate-12 transition-transform duration-300"
            data-tooltip-id="github-tooltip"
            data-tooltip-content="GitHub"
          >
            <FaGithub className="w-6 h-6 fill-current" />
          </a>

          <a
            href="https://www.instagram.com/da.subashh/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-500 transform hover:scale-150 hover:-rotate-12 transition-transform duration-300"
            data-tooltip-id="instagram-tooltip"
            data-tooltip-content="Instagram"
          >
            <FaInstagram className="w-6 h-6 fill-current" />
          </a>
        </div>
      </nav>

      {/* Tooltips */}
      <ReactTooltip
        id="email-tooltip"
        place="top"
        effect="solid"
        delayShow={200} // Delay before showing the tooltip
        delayHide={200} // Delay before hiding the tooltip
        clickable // Allow tooltip to stay open when clicked
        className="cursor-pointer" // Make tooltip clickable
        globalEventOff="click" // Close tooltip on click outside
        afterShow={() => {
          // Add click event listener to the tooltip content
          const tooltipContent = document.querySelector("#email-tooltip");
          if (tooltipContent) {
            tooltipContent.addEventListener("click", copyEmail);
          }
        }}
        afterHide={() => {
          // Remove click event listener from the tooltip content
          const tooltipContent = document.querySelector("#email-tooltip");
          if (tooltipContent) {
            tooltipContent.removeEventListener("click", copyEmail);
          }
        }}
      />
      <ReactTooltip id="twitter-tooltip" place="top" effect="solid" />
      <ReactTooltip id="linkedin-tooltip" place="top" effect="solid" />
      <ReactTooltip id="github-tooltip" place="top" effect="solid" />
      <ReactTooltip id="instagram-tooltip" place="top" effect="solid" />

      <aside>
        <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;