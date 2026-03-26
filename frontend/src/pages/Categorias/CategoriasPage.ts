import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../../api/api";
import type { Categoria, FinalidadeCategoria } from "../../types";

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<FinalidadeCategoria>(3);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      setErro("");
      const data = await apiGet<Categoria[]>("/Categorias");
      setCategorias(data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar categorias.");
    }
  }

  useEffect(() => {
    (async () => {
      await carregar();
    })();
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      await apiPost("/Categorias", { descricao, finalidade });
      limparFormulario();
      await carregar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar categoria.");
    }
  }

  function limparFormulario() {
    setDescricao("");
    setFinalidade(3);
  }

  function obterTextoFinalidade(finalidadeValor: number) {
    if (finalidadeValor == 1) return "Despesa";
    if (finalidadeValor == 2) return "Receita";
    return "Ambas";
  }

  return {
    categorias,
    descricao,
    finalidade,
    erro,
    setDescricao,
    setFinalidade,
    salvar,
    limparFormulario,
    obterTextoFinalidade,
  };
}