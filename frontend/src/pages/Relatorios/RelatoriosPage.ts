import { useEffect, useState } from "react";
import { apiGet } from "../../api/api";
import type {
  ResumoTotais,
  TotalPorCategoria,
  TotalPorPessoa,
} from "../../types";

export function useRelatorios() {
  const [totaisPorPessoa, setTotaisPorPessoa] =
    useState<ResumoTotais<TotalPorPessoa> | null>(null);
  const [totaisPorCategoria, setTotaisPorCategoria] =
    useState<ResumoTotais<TotalPorCategoria> | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      setErro("");

      const [pessoas, categorias] = await Promise.all([
        apiGet<ResumoTotais<TotalPorPessoa>>("/Relatorios/totais-por-pessoa"),
        apiGet<ResumoTotais<TotalPorCategoria>>(
          "/Relatorios/totais-por-categoria",
        ),
      ]);

      setTotaisPorPessoa(pessoas);
      setTotaisPorCategoria(categorias);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar relatórios.");
    }
  }

  useEffect(() => {
    (async () => {
      await carregar();
    })();
  }, []);

  return {
    totaisPorPessoa,
    totaisPorCategoria,
    erro,
  };
}
