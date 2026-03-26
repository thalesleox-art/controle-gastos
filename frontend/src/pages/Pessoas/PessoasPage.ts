import { useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost, apiPut } from "../../api/api";
import type { Pessoa } from "../../types";

export function usePessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      setErro("");
      const data = await apiGet<Pessoa[]>("/Pessoas");
      setPessoas(data);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar pessoas.");
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
      const payload = { nome, idade };

      if (editandoId != null) {
        await apiPut(`/Pessoas/${editandoId}`, payload);
      } else {
        await apiPost("/Pessoas", payload);
      }

      limparFormulario();
      await carregar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar pessoa.");
    }
  }

  function editar(pessoa: Pessoa) {
    setEditandoId(pessoa.id);
    setNome(pessoa.nome);
    setIdade(pessoa.idade);
  }

  async function excluir(id: number) {
    try {
      setErro("");
      await apiDelete(`/Pessoas/${id}`);

      if (editandoId == id) {
        limparFormulario();
      }

      await carregar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao excluir pessoa.");
    }
  }

  function limparFormulario() {
    setNome("");
    setIdade(0);
    setEditandoId(null);
  }

  return {
    pessoas,
    nome,
    idade,
    editandoId,
    erro,
    setNome,
    setIdade,
    salvar,
    editar,
    excluir,
    limparFormulario,
  };
}