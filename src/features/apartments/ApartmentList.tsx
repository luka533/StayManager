import { useState } from "react";
import { useSearchParams } from "react-router";
import Spinner from "../../ui/Spinner";
import { useApartments } from "./useApartments";
// import LongMenu from "./LongMenu";
import TransitionsModal from "../../ui/TransitionModal";
import AddApartment from "./AddApartment";
import Apartment from "./Apartment";

function ApartmentList() {
  const { apartments, isLoading } = useApartments();
  const [searchParams] = useSearchParams();
  const [addApartment, setAddApartment] = useState<boolean>(false);

  if (isLoading || !apartments) return <Spinner />;

  const displayedApartments = apartments.filter((apt) => {
    const discountFilter = searchParams.get("discount") || "all";
    if (discountFilter === "all") return true;
    if (discountFilter === "discount") return +apt.discount > 0;
    if (discountFilter === "no-discount") return +apt.discount === 0;
    return true;
  });

  const gridCols = "grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr]";

  return (
    <div className="space-y-6">
      <button
        onClick={() => setAddApartment(true)}
        className="px-6 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200 ease-in-out"
      >
        Add Apartment
      </button>

      {addApartment && (
        <TransitionsModal setAddApartment={setAddApartment}>
          <AddApartment closeForm={setAddApartment} />
        </TransitionsModal>
      )}

      {/* Table header */}
      <div
        className={`grid ${gridCols} gap-x-6 border-b border-stone-200 pb-2 text-lg font-semibold`}
      >
        <div>Image</div>
        <div>Name</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div>Settings</div>
      </div>

      {/* Apartment rows */}
      {displayedApartments.map((apt) => (
        <Apartment key={apt.id} apt={apt} />
      ))}
    </div>
  );
}

export default ApartmentList;
