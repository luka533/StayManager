import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="range"
      options={[
        { value: "all-time", label: "All time" },
        { value: "356", label: "Last year" },
        { value: "30", label: "Last month" },
        { value: "7", label: "Last week" },
        { value: "1", label: "Yesterday" },
      ]}
    />
  );
}

export default DashboardFilter;
