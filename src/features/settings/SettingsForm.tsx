import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useSettings } from "./useSettings.ts";
import { useEditSettings } from "./useEditSettings.ts";
import type { Settings } from "../../types/settings.ts";
import Spinner from "../../ui/Spinner.tsx";

function SettingsForm() {
  const { settings, isLoading } = useSettings();
  const { updateSettings, isUpdating } = useEditSettings();

  function onSubmit(updatedSettings: Settings) {
    updateSettings(updatedSettings);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: settings || {},
  });

  // reset if settings change
  useEffect(() => {
    if (settings) reset(settings);
  }, [settings, reset]);

  if (isLoading || isUpdating) return <Spinner />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto grid grid-cols-2 gap-6"
    >
      {/* Minimum nights */}
      <div>
        <label className="block text-sm font-medium mb-1">Minimum nights</label>
        <input
          type="number"
          {...register("minNights", { required: true, min: 1 })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.minNights && (
          <p className="text-red-400">Minimum nights is required</p>
        )}
      </div>

      {/* Maximum nights */}
      <div>
        <label className="block text-sm font-medium mb-1">Maximum nights</label>
        <input
          type="number"
          {...register("maxNights", { required: true, min: 1 })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.maxNights && (
          <p className="text-red-400">Maximum nights is required</p>
        )}
      </div>

      {/* Maximum guests */}
      <div>
        <label className="block text-sm font-medium mb-1">Maximum guests</label>
        <input
          type="number"
          {...register("maxGuests", { required: true, min: 1 })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.maxGuests && (
          <p className="text-red-400">Maximum guests is required</p>
        )}
      </div>

      {/* Breakfast price */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Breakfast price
        </label>
        <input
          type="number"
          {...register("breakfastPrice", { required: true, min: 0 })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.breakfastPrice && (
          <p className="text-red-400">Breakfast price is required</p>
        )}
      </div>

      {/* Cleaning fee */}
      <div>
        <label className="block text-sm font-medium mb-1">Cleaning fee</label>
        <input
          type="number"
          {...register("cleaningFee", { required: true, min: 0 })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.cleaningFee && (
          <p className="text-red-400">Cleaning fee is required</p>
        )}
      </div>

      {/* Check-in time */}
      <div>
        <label className="block text-sm font-medium mb-1">Check-in time</label>
        <input
          type="time"
          {...register("checkInTime", { required: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.checkInTime && (
          <p className="text-red-400">Check-in time is required</p>
        )}
      </div>

      {/* Check-out time */}
      <div>
        <label className="block text-sm font-medium mb-1">Check-out time</label>
        <input
          type="time"
          {...register("checkOutTime", { required: true })}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
        {errors.checkOutTime && (
          <p className="text-red-400">Check-out time is required</p>
        )}
      </div>

      {/* Additional notes */}
      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          Additional notes
        </label>
        <textarea
          {...register("notes")}
          rows={4}
          className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
        />
      </div>

      {/* Buttons */}
      <div className="col-span-2 flex justify-end gap-3 mt-4">
        <button
          type="button"
          className="px-4 py-2 rounded-md border border-stone-300 hover:bg-stone-100 cursor-pointer"
          onClick={() => reset(settings)}
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition duration-200 ease-in-out cursor-pointer"
        >
          Save Settings
        </button>
      </div>
    </form>
  );
}

export default SettingsForm;
