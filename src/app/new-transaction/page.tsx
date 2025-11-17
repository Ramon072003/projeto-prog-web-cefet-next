import TransactionForm from "@/components/transaction-form";
import DashboardLayout from "@/components/DashboardLayout";

export default function NewTransaction() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mt-8">
          <TransactionForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
