import Filter from "../../ui/Filter";

function ApartmentTableOperations() {
  return (
    <div>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "discount", label: "Discount" },
          { value: "no-discount", label: "No discount" },
        ]}
      />
    </div>
  );
}

export default ApartmentTableOperations;
