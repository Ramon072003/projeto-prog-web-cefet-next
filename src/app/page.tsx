import Button from "@/components/button/button";
import Card from "@/components/card";
import TitleSection from "@/components/title-section/titleSection";

interface ListTransactionsProps {
  info: string;
  value: string;
  type?: "income" | "expense";
}

function ListTransactions({ info, value, type }: ListTransactionsProps) {
  return (
    <li className="flex flex-row justify-between gap-8 text-[1rem] font-bold">
      <p className="text-black">{info}</p>
      <p
        style={type === "expense" ? { color: "#dc2626" } : { color: "#16a34a" }}
      >
        {value}
      </p>
    </li>
  );
}

export default function Home() {
  return (
    <div>
      <TitleSection>Dashboard</TitleSection>
      <div className="flex flex-col gap-[5rem]">
        <div className="mt-[3rem] grid grid-cols-3 max-[75rem]:grid max-[75rem]:grid-cols-2 max-[75rem]:gap-8">
          <Card title="Saldo Total" info="R$ 1.500,00" color="#16a34a" />
          <Card title="Receitas" info="R$ 2.500,00" color="#16a34a" />
          <Card title="Despesas" info="R$ 1.200,00" color="#dc2626" />
        </div>
        <div className="h-[45.5rem]">
          <Card
            className="h-full w-full"
            title="Últimas Transações"
            info=""
            color=""
          >
            <div className="flex justify-end p-10">
              <Button>
                <a href="/new-transaction" target="_self">
                  + NOVA TRANSAÇÃO
                </a>
              </Button>
            </div>
            <div className="p-[2.5rem]">
              <ul className="flex flex-col gap-16">
                <ListTransactions
                  info="SUPERMERCADO"
                  value="-R$ 157,80"
                  type="expense"
                />
                <ListTransactions
                  info="ACADEMIA"
                  value="-R$ 157,80"
                  type="expense"
                />
                <ListTransactions
                  info="ESCOLA"
                  value="-R$ 157,80"
                  type="expense"
                />
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
