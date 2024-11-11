import { AiFillGithub, AiFillInstagram, AiFillYoutube } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";

const socialLinks = [
  { icon: <AiFillGithub size={20} />, link: "https://github.com/Wakype" },
  {
    icon: <AiFillInstagram size={20} />,
    link: "https://www.instagram.com/im.waky/",
  },
  {
    icon: <AiFillYoutube size={20} />,
    link: "https://www.youtube.com/channel/UC7JSaEVgUPKkirPf3fKmKrg",
  },
  { icon: <FaTiktok size={20} />, link: "https://www.tiktok.com/@im.wakype" },
];

export default function SocialLinks() {
  function openNewTab(url) {
    window.open(url, "_blank");
  }

  return (
    <section className="flex xl:flex-col flex-row space-x-3 xl:space-x-0 xl:space-y-3">
      {socialLinks.map((item, i) => (
        <div
          key={i}
          className="rounded-lg p-2 glass cursor-pointer"
          onClick={() => openNewTab(item.link)}
        >
          {item.icon}
        </div>
      ))}
    </section>
  );
}
