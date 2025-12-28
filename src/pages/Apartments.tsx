import ApartmentList from "../features/apartments/ApartmentList";
import ApartmentTableOperations from "../features/apartments/ApartmentTableOperations";

function Apartments() {
  return (
    <>
      <div className="flex justify-between pt-5 pb-5">
        <h3 className="text-3xl font-semibold">All Apartments</h3>
        <ApartmentTableOperations />
      </div>
      <ApartmentList />
    </>
  );
}

export default Apartments;
