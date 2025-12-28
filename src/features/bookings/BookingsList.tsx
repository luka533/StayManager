// apartments[0].name is correct according to the type but throws an error
// apartments.name works instead but ts does not like its

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { formatCurrency, subtractDates } from "../../utils/helpers";

import { format } from "date-fns";

import Spinner from "../../ui/Spinner";
import LongMenu from "./LongMenu";
import { useBookings } from "./useBookings";

function BookingsList() {
  // In bookings the apartment and guests objects are single arrays.
  // There is nothing we can do about it therefore we need to write: bookings.apartment[0].name for example
  const { bookings, isLoading } = useBookings();

  if (isLoading || !bookings) return <Spinner />;

  const statusStyles = {
    "checked-out": "bg-stone-200 text-stone-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    unconfirmed: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="mt-10 rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-[1fr_2fr_2.5fr_1.5fr_1.5fr_1fr] gap-x-6 px-6 py-4 text-sm font-semibold text-stone-600 border-b border-stone-200">
        <span className="text-center">Apartment</span>
        <span>Guest</span>
        <span>Dates</span>
        <span>Status</span>
        <span>Amount</span>
        <span className="text-right">Settings</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-stone-200">
        {bookings.data.map((booking) => {
          const {
            id,
            apartments,
            guests,
            startDate,
            endDate,
            status,
            totalPrice,
          } = booking;

          return (
            <div
              key={id}
              className="grid grid-cols-[1fr_2fr_2.5fr_1.5fr_1.5fr_1fr] gap-x-6 px-6 py-4 items-center hover:bg-stone-50 transition"
            >
              {/* Apartment */}
              <div className="font-medium text-stone-800 text-center">
                <span className="grow text-2xl text-center">
                  {apartments.name}
                </span>
                <img className="grow" src={apartments.image} />
              </div>

              {/* Guest */}
              <div>
                <p className="font-medium">{guests.fullName}</p>
                <p className="text-sm text-stone-500">{guests.email}</p>
              </div>

              {/* Dates */}
              <div className="text-sm">
                <p>
                  {format(new Date(startDate), "MMM d yyyy")} →{" "}
                  {format(new Date(endDate), "MMM d yyyy")}
                </p>
                <p className="text-stone-500">
                  {subtractDates(endDate, startDate)} nights
                </p>
              </div>

              {/* Status */}
              <div>
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full
                    ${statusStyles[status]}
                  `}
                >
                  {status}
                </span>
              </div>

              {/* Amount */}
              <div className="font-semibold">{formatCurrency(totalPrice)}</div>
              <div className="text-right pl-3">
                <LongMenu id={id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookingsList;
