import TitleSection from "@/components/title-section/titleSection";
import TransactionForm from "@/components/transaction-form";

export default function NewTransaction() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mt-8">
        <TransactionForm />
      </div>
    </div>
  );
}
