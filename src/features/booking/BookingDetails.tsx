import { useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBooking.ts";
import { useDeleteBooking } from "./useDeleteBooking.ts";
import { useUpdateBooking } from "./useUpdateBooking.ts";

function BookingDetails() {
  const navigate = useNavigate();
  const { bookingId } = useParams();

  const { booking, isLoading } = useBooking();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const { updateBooking, isUpdating } = useUpdateBooking();

  if (isLoading || isDeleting || isUpdating || !booking) return <Spinner />;

  const {
    startDate,
    endDate,
    numNights,
    numGuests,
    hasBreakfast,
    observations,
    isPaid,
    status,
    apartmentPrice,
    extrasPrice,
    totalPrice,
    apartments,
    guests,
  } = booking || {};

  const statusStyles: {
    "checked-out": string;
    "checked-in": string;
    unconfirmed: string;
  } = {
    "checked-out": "bg-stone-200 text-stone-700",
    "checked-in": "bg-emerald-100 text-emerald-700",
    unconfirmed: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="text-xl text-stone-600 hover:text-stone-900 cursor-pointer"
        >
          ← Back to Bookings
        </button>

        <span
          className={`px-3 py-1 text-sm rounded-full font-semibold
            ${statusStyles[status]}
          `}
        >
          {status.replace("-", " ")}
        </span>
      </div>

      {/* Apartment hero */}
      <div className="flex gap-6">
        <img
          src={apartments.image}
          alt={apartments.name}
          className="w-64 h-40 object-cover rounded-xl shadow"
        />

        <div>
          <h1 className="text-2xl font-semibold">
            Apartment {apartments.name}
          </h1>
          <p className="text-stone-600 mt-1">
            Hosted for <span className="font-medium">{guests.fullName}</span>
          </p>
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-[2fr_1fr] gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <Section title="Stay details">
            <Detail label="Dates">
              {format(new Date(startDate), "MMM d yyyy")} →{" "}
              {format(new Date(endDate), "MMM d yyyy")}
            </Detail>
            <Detail label="Nights">{numNights}</Detail>
            <Detail label="Guests">{numGuests}</Detail>
            <Detail label="Breakfast">
              {hasBreakfast ? "Included" : "Not included"}
            </Detail>
          </Section>

          <Section title="Guest notes">
            <p className="text-stone-600">
              {observations || "No additional notes"}
            </p>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="rounded-xl border border-stone-200 bg-stone-50 p-6 space-y-4">
          <h3 className="font-semibold text-lg">Price summary</h3>

          <PriceRow
            label="Cabin price"
            value={`${formatCurrency(apartmentPrice)}`}
          />
          <PriceRow label="Extras" value={`${formatCurrency(extrasPrice)}`} />
          <div className="border-t pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          {/*if already checked-out or paid no payment will be required*/}

          <div
            className={`text-xl font-medium ${
              isPaid || status === "checked-out"
                ? "text-emerald-700"
                : "text-red-600"
            }`}
          >
            {isPaid || status === "checked-out"
              ? "Paid"
              : "Payment pending (Will pay at reception)"}
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            {status === "unconfirmed" && (
              <button
                onClick={() => {
                  const newData: { status: "checked-in" } = {
                    status: "checked-in",
                  };
                  updateBooking({ bookingId: Number(bookingId), newData });
                }}
                className="flex-1 rounded-md bg-emerald-600 text-white py-2 hover:bg-emerald-700 cursor-pointer"
              >
                Check in
              </button>
            )}
            {status === "checked-in" && (
              <button
                onClick={() => {
                  const newData: { status: "checked-out" } = {
                    status: "checked-out",
                  };
                  updateBooking({ bookingId: Number(bookingId), newData });
                }}
                className="flex-1 rounded-md bg-stone-700 text-white py-2 hover:bg-stone-800 cursor-pointer"
              >
                Check out
              </button>
            )}
            <button
              onClick={() => {
                deleteBooking(Number(bookingId));
              }}
              className="flex-1 rounded-md bg-red-500 text-white py-2 hover:bg-red-700 cursor-pointer"
            >
              Delete Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <h2 className="font-semibold text-lg mb-4">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone-500">{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-stone-500">{label}</span>
      <span>{value}</span>
    </div>
  );
}
