"use client";
import React from "react";

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-wrapper">
      {/* Header and Footer go here */}
      {children}
    </div>
  );
}
