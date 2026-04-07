import React, { useState, useEffect } from "react";

export default function CouponForms({ onSubmit, editData }) {
  const [form, setForm] = useState({
    code: "",
    type: "Percentage",
    value: "",
    expiryDate: "",
    status: "Active",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.code || form.code.length < 5)
      return "Coupon code must be 5+ chars";
    if (form.value <= 0) return "Value must be > 0";
    if (form.type === "Percentage" && form.value > 100)
      return "Max 100% allowed";
    if (new Date(form.expiryDate) < new Date())
      return "Expiry cannot be past";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    onSubmit(form);
    setForm({
      code: "",
      type: "Percentage",
      value: "",
      expiryDate: "",
      status: "Active",
    });
    setError("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        name="code"
        placeholder="Coupon Code"
        value={form.code}
        onChange={handleChange}
      />

      <select name="type" value={form.type} onChange={handleChange}>
        <option>Percentage</option>
        <option>Flat</option>
      </select>

      <input
        type="number"
        name="value"
        placeholder="Value"
        value={form.value}
        onChange={handleChange}
      />

      <input
        type="date"
        name="expiryDate"
        value={form.expiryDate}
        onChange={handleChange}
      />

      <select name="status" value={form.status} onChange={handleChange}>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <button type="submit">
        {editData ? "Update" : "Add"} Coupon
      </button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}