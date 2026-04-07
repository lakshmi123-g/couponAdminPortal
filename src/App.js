import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import CouponForms from "./components/CouponForm";
import FilterBar from "./components/FilterBar";
import CouponList from "./components/CouponList";
import "./App.css";

export default function App() {
  const [coupons, setCoupons] = useState([]);
  const [editData, setEditData] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Add / Update Coupon
  const handleSubmit = (data) => {
    if (editData) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === data.id ? data : c))
      );
      setEditData(null);
    } else {
      setCoupons([...coupons, { ...data, id: Date.now() }]);
    }
  };

  // Delete
  const handleDelete = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  // Edit
  const handleEdit = (coupon) => {
    setEditData(coupon);
  };

  // Toggle Status
  const toggleStatus = (id) => {
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" }
          : c
      )
    );
  };

  // Expiry Logic + Filter
  const filteredCoupons = useMemo(() => {
    return coupons
      .map((c) => {
        const isExpired = new Date(c.expiryDate) < new Date();
        return { ...c, expired: isExpired };
      })
      .filter((c) => {
        return (
          c.code.toLowerCase().includes(search.toLowerCase()) &&
          (statusFilter ? c.status === statusFilter : true) &&
          (typeFilter ? c.type === typeFilter : true)
        );
      });
  }, [coupons, search, statusFilter, typeFilter]);

  return (
    <div className="container">
      <Header />

      <CouponForms onSubmit={handleSubmit} editData={editData} />

      <FilterBar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      <CouponList
        coupons={filteredCoupons}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onToggle={toggleStatus}
      /> 
    </div>
  );
}