import { AiFillGithub } from "react-icons/ai";

const socialLinks = [
  { icon: <AiFillGithub size={18} />, link: "https://github.com/Wakype" },
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
          className="rounded-xl p-2.5 glass cursor-pointer text-fuchsia-200/80 hover:text-white hover:bg-white/10 hover:scale-110 hover:border-hud-fuchsia/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 shadow-lg border border-white/10"
          onClick={() => openNewTab(item.link)}
        >
          {item.icon}
        </div>
      ))}
    </section>
  );
}
