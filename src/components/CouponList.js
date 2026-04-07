export default function CouponList({
  coupons,
  onDelete,
  onEdit,
  onToggle,
}) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Code</th>
          <th>Type</th>
          <th>Value</th>
          <th>Expiry</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {coupons.map((c) => (
          <tr key={c.id} className={c.expired ? "expired" : ""}>
            <td>{c.code}</td>
            <td>{c.type}</td>
            <td>{c.value}</td>
            <td>{c.expiryDate}</td>

            <td>
              {c.expired ? "Expired" : c.status}
            </td>

            <td>
              <button onClick={() => onEdit(c)}>Edit</button>
              <button onClick={() => onDelete(c.id)}>Delete</button>
              {!c.expired && (
                <button onClick={() => onToggle(c.id)}>
                  Toggle
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}