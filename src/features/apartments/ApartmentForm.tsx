import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Apartments } from "../../types/apartments";

function ApartmentForm({
  data,
  saveButtonText,
  onSubmit,
  closeForm,
}: {
  data?: Apartments | undefined;
  saveButtonText: string;
  onSubmit: (data: Apartments) => void;
  closeForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Apartments>();

  // old defaultValues persist therefore we reset them everytime we open a new edit modal
  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
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
          className="px-4 py-2 rounded-md border border-stone-300 hover:bg-stone-100 cursor-pointer"
          onClick={closeForm}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200 ease-in-out cursor-pointer"
        >
          {saveButtonText}
        </button>
      </div>
    </form>
  );
}

export default ApartmentForm;
