import { Dexie, type EntityTable } from "dexie";

interface Transaction {
  id?: number;
  title: string;
  amount: number;
  date: string;
  description?: string;
  type: string
}

const db =
  new Dexie("noteley") as Dexie &
  {
    transactions: EntityTable<Transaction, 'id'>,
  };

db.version(1).stores({
    transactions: '++id, title, amount, date, description, type',
});

export type { Transaction };

export default function () {
    return { db };
}