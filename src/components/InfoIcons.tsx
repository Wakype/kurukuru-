import { BiNews } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

export default function InfoIcons({
  onOpenModal1,
  onOpenModal2,
}: {
  onOpenModal1: () => void;
  onOpenModal2: () => void;
}) {
  const infoIcons = [
    { icon: <BiNews size={18} />, onClick: onOpenModal1 },
    { icon: <FaInfoCircle size={18} />, onClick: onOpenModal2 },
  ];

  return (
    <section className="flex xl:flex-col flex-row space-x-3 xl:space-x-0 xl:space-y-3">
      {infoIcons.map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-2.5 glass cursor-pointer text-fuchsia-200/80 hover:text-white hover:bg-white/10 hover:scale-110 hover:border-hud-fuchsia/50 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 shadow-lg border border-white/10"
          onClick={item.onClick}
        >
          {item.icon}
        </div>
      ))}
    </section>
  );
}
