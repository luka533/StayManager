import BookingsList from "../features/bookings/BookingsList";

function Bookings() {
  return (
    <div className="pt-5">
      <h3 className="text-3xl font-semibold">All Bookings</h3>
      <BookingsList />
    </div>
  );
}

export default Bookings;
