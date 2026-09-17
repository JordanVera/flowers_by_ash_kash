'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'sonner';
import { products } from '@/lib/content';

type Item = { id: string; quantity: number };

const C = createContext<{
  items: Item[];
  add: (id: string) => void;
  update: (id: string, n: number) => void;
}>({
  items: [],
  add: () => {},
  update: () => {},
});

function productName(id: string) {
  return products.find((p) => p.id === id)?.name ?? 'Item';
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, set] = useState<Item[]>([]);
  const [ready, R] = useState(false);

  useEffect(() => {
    try {
      const a = JSON.parse(localStorage.getItem('fiore-cart') || '[]');
      if (Array.isArray(a))
        set(
          a
            .filter(
              (x) =>
                typeof x.id === 'string' &&
                Number.isInteger(x.quantity) &&
                x.quantity > 0,
            )
            .map((x) => ({ ...x, quantity: Math.min(20, x.quantity) })),
        );
    } catch {}
    R(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem('fiore-cart', JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback(
    (id: string) => {
      const name = productName(id);
      set((a) => {
        const existing = a.find((x) => x.id === id);
        if (existing) {
          return a.map((x) =>
            x.id === id ? { ...x, quantity: Math.min(20, x.quantity + 1) } : x,
          );
        }
        return [...a, { id, quantity: 1 }];
      });
      const existing = items.find((x) => x.id === id);
      toast.success(
        existing
          ? `Added one more ${name} to your bag`
          : `Added ${name} to your bag`,
      );
    },
    [items],
  );

  const update = useCallback(
    (id: string, n: number) => {
      const name = productName(id);
      const current = items.find((x) => x.id === id);
      if (!current) return;

      if (n <= 0) {
        toast(`Removed ${name} from your bag`);
      } else if (n > current.quantity) {
        toast.success(`Added one more ${name} to your bag`);
      } else if (n < current.quantity) {
        toast(`Removed one ${name} from your bag`);
      }

      set((a) => {
        const item = a.find((x) => x.id === id);
        if (!item) return a;
        if (n <= 0) return a.filter((x) => x.id !== id);
        return a.map((x) =>
          x.id === id ? { ...x, quantity: Math.min(20, n) } : x,
        );
      });
    },
    [items],
  );

  const value = useMemo(() => ({ items, add, update }), [items, add, update]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export const useCart = () => useContext(C);
