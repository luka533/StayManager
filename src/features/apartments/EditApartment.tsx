import { useApartment } from "./useApartment";
import { useEditApartment } from "./useEditApartment";

import SpinnerMini from "../../ui/SpinnerMini";
import ApartmentForm from "./ApartmentForm";
import type { Apartments } from "../../types/apartments";

function EditApartment({
  id,
  handleClose,
}: {
  id: number;
  handleClose: () => void;
}) {
  const { apartment, isLoading } = useApartment(id);
  const { editApartment, isEditing } = useEditApartment();

  if (isLoading || isEditing) return <SpinnerMini />;

  const onSubmit = (data: Apartments) => {
    editApartment({ id, data });
    handleClose();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Edit Apartment</h3>
      <ApartmentForm
        data={apartment}
        saveButtonText="Save changes"
        onSubmit={onSubmit}
        closeForm={handleClose}
      />
    </div>
  );
}

export default EditApartment;
