import type { Apartments } from "../../types/apartments";
import LongMenu from "./LongMenu";

function Apartment({ apt }: { apt: Apartments }) {
  const gridCols = "grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]";

  return (
    <div
      className={`grid ${gridCols} gap-x-6 items-center py-2 border-b border-stone-100`}
    >
      <img
        src={apt.image}
        alt={apt.name}
        className="w-16 h-16 object-cover rounded"
      />
      <div>{apt.name}</div>
      <div>{apt.maxCapacity}</div>
      <div>{apt.regularPrice}</div>
      <div>{apt.discount}</div>
      <LongMenu id={apt.id} />
    </div>
  );
}

export default Apartment;
