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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto"
    >
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Image URL *</label>
        <input
          type="text"
          {...register("image", { required: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.image && <p className="text-red-400 mt-1">Image is required</p>}
      </div>

      {["image2", "image3", "image4"].map((field) => (
        <div key={field}>
          <label className="block text-sm font-medium mb-1">{`Image ${field.slice(
            -1
          )} (optional)`}</label>
          <input
            type="text"
            {...register(field as keyof Apartments)}
            className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium mb-1">Name *</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.name && <p className="text-red-400 mt-1">Name is required</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Capacity *</label>
        <input
          type="number"
          {...register("maxCapacity", { required: true, valueAsNumber: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.maxCapacity && (
          <p className="text-red-400 mt-1">Capacity is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price *</label>
        <input
          type="number"
          {...register("regularPrice", { required: true, valueAsNumber: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.regularPrice && (
          <p className="text-red-400 mt-1">Price is required</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Discount *</label>
        <input
          type="number"
          {...register("discount", { required: true, valueAsNumber: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.discount && (
          <p className="text-red-400 mt-1">Discount is required</p>
        )}
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          GPS Location (lat,lng) *
        </label>
        <input
          type="text"
          placeholder="e.g., 52.5200, 13.4050"
          {...register("location", { required: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea
          {...register("description", { required: true })}
          rows={3}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.description && (
          <p className="text-red-400 mt-1">Description is required</p>
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
