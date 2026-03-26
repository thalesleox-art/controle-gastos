import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../../api/api";
import type { Categoria, Pessoa, TipoTransacao, Transacao } from "../../types";

export function useTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [tipo, setTipo] = useState<TipoTransacao>(1);
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);
  const [erro, setErro] = useState("");

  async function carregar() {
    try {
      setErro("");

      const [listaTransacoes, listaPessoas, listaCategorias] =
        await Promise.all([
          apiGet<Transacao[]>("/Transacoes"),
          apiGet<Pessoa[]>("/Pessoas"),
          apiGet<Categoria[]>("/Categorias"),
        ]);

      setTransacoes(listaTransacoes);
      setPessoas(listaPessoas);
      setCategorias(listaCategorias);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar dados.");
    }
  }

  useEffect(() => {
    (async () => {
      await carregar();
    })();
  }, []);

  const categoriasFiltradas = useMemo(() => {
    return categorias.filter((categoria) => {
      if (categoria.finalidade == 3) return true;
      if (tipo == 1) return categoria.finalidade == 1;
      return categoria.finalidade == 2;
    });
  }, [categorias, tipo]);

  function alterarTipo(novoTipo: TipoTransacao) {
    setTipo(novoTipo);

    const categoriaAtualAindaEhValida = categorias.some((categoria) => {
      if (categoria.id != categoriaId) return false;
      if (categoria.finalidade == 3) return true;
      if (novoTipo == 1) return categoria.finalidade == 1;
      return categoria.finalidade == 2;
    });

    if (!categoriaAtualAindaEhValida) {
      setCategoriaId(0);
    }
  }

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    try {
      await apiPost("/Transacoes", {
        descricao,
        valor,
        tipo,
        pessoaId,
        categoriaId,
      });

      limparFormulario();
      await carregar();
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao salvar transação.");
    }
  }

  function limparFormulario() {
    setDescricao("");
    setValor(0);
    setTipo(1);
    setPessoaId(0);
    setCategoriaId(0);
  }

  function obterTipoTexto(tipoValor: number) {
    return tipoValor == 1 ? "Despesa" : "Receita";
  }

  return {
    transacoes,
    pessoas,
    categoriasFiltradas,
    descricao,
    valor,
    tipo,
    pessoaId,
    categoriaId,
    erro,
    setDescricao,
    setValor,
    alterarTipo,
    setPessoaId,
    setCategoriaId,
    salvar,
    limparFormulario,
    obterTipoTexto,
  };
}
