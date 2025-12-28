import { useEffect } from "react";
import { useApartment } from "./useApartment";
import { useEditApartment } from "./useEditApartment";

import { useForm } from "react-hook-form";
import SpinnerMini from "../../ui/SpinnerMini";
import type { Apartments } from "../../types/apartments";

function EditAddApartment({
  id,
  handleClose,
}: {
  id: number;
  handleClose: () => void;
  edit?: boolean;
}) {
  const { apartment, isLoading } = useApartment(id);
  const { editApartment, isEditing } = useEditApartment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Apartments>();

  // old defaultValues persist therefore we reset them everytime we open a new edit modal
  useEffect(() => {
    if (apartment) {
      reset(apartment);
    }
  }, [apartment, reset]);

  if (isLoading || isEditing || !apartment) return <SpinnerMini />;

  const onSubmit = (data: Apartments) => {
    editApartment({ id, data });
    handleClose();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6">Edit Apartment</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="text"
            // defaultValue={oldApartment?.image}
            {...register("image", { required: true })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.image?.type === "required" && (
            <p className="text-red-400" role="alert">
              Image is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            // defaultValue={oldApartment?.name}
            {...register("name", { required: true })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-400" role="alert">
              First name is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input
            type="number"
            // defaultValue={oldApartment?.maxCapacity}
            {...register("maxCapacity", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.maxCapacity?.type === "required" && (
            <p className="text-red-400" role="alert">
              Capacity is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            // defaultValue={oldApartment?.regularPrice}
            {...register("regularPrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.regularPrice?.type === "required" && (
            <p className="text-red-400" role="alert">
              Price is required
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Discount</label>
          <input
            type="number"
            // defaultValue={oldApartment?.discount}
            {...register("discount", { required: true, valueAsNumber: true })}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.discount?.type === "required" && (
            <p className="text-red-400" role="alert">
              Discount is required
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            // defaultValue={oldApartment?.description}
            {...register("description", { required: true })}
            rows={4}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          {errors.description?.type === "required" && (
            <p className="text-red-400" role="alert">
              Description is required
            </p>
          )}
        </div>

        <div className="col-span-2 flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-stone-300 hover:bg-stone-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-stone-800 text-white hover:bg-stone-700"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditAddApartment;
