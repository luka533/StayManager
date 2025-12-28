import type { Apartments } from "../../types/apartments";
import SpinnerMini from "../../ui/SpinnerMini";
import ApartmentForm from "./ApartmentForm";

import { useAddApartment } from "./useAddApartment";

function AddApartment({ closeForm }: { closeForm: (value: boolean) => void }) {
  const { addApartment, isCreating } = useAddApartment();

  const onSubmit = (data: Apartments) => {
    addApartment(data);
    closeForm(false);
  };

  if (isCreating) return <SpinnerMini />;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Edit Apartment</h3>
      <ApartmentForm
        onSubmit={onSubmit}
        closeForm={() => closeForm(false)}
        saveButtonText="Add Apartment"
      />
    </div>
  );
}

export default AddApartment;
