import { BiNews } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

export default function InfoIcons({ onOpenModal1, onOpenModal2 }) {
  const infoIcons = [
    { icon: <BiNews size={20} />, onClick: onOpenModal1 },
    { icon: <FaInfoCircle size={20} />, onClick: onOpenModal2 },
  ];

  return (
    <section className="flex xl:flex-col flex-row space-x-3 xl:space-x-0 xl:space-y-3">
      {infoIcons.map((item, i) => (
        <div
          key={i}
          className="rounded-lg p-2 glass cursor-pointer"
          onClick={item.onClick}
        >
          {item.icon}
        </div>
      ))}
    </section>
  );
}
