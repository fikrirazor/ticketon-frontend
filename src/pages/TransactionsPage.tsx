// src/pages/TransactionsPage.tsx
import React from "react";
import { Layout } from "../components/Layout";

const TransactionsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6">My Transactions</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">
            Daftar transaksi yang kamu lakukan akan muncul di sini.
          </p>
          {/* Implementasi daftar transaksi */}
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsPage;
