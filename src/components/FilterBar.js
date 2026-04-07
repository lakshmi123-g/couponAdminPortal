export default function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Search code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <select onChange={(e) => setTypeFilter(e.target.value)}>
        <option value="">All Types</option>
        <option>Percentage</option>
        <option>Flat</option>
      </select>
    </div>
  );
}