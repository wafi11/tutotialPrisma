"use client";
import React from "react";
import PertandinganClient from "../PertandinganClient";

const Page = ({ params }: { params: { query: string } }) => {
  return (
    <div>
      <PertandinganClient params={params} />
    </div>
  );
};

export default Page;
