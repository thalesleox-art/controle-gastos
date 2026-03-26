import type { TipoTransacao } from "../../types";
import { useTransacoes } from "./TransacoesPage";


export default function TransacoesPage() {
  const {
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
  } = useTransacoes();

  return (
    <div>
      <h2>Transações</h2>

      <form onSubmit={salvar} style={{ display: "grid", gap: 8, marginBottom: 20 }}>
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          maxLength={400}
          required
        />

        <input
          type="number"
          step="0.01"
          min="0.01"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          placeholder="Valor"
          required
        />

        <select value={tipo} onChange={(e) => alterarTipo(Number(e.target.value) as TipoTransacao)}>
          <option value={1}>Despesa</option>
          <option value={2}>Receita</option>
        </select>

        <select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))} required>
          <option value={0}>Selecione uma pessoa</option>
          {pessoas.map((pessoa) => (
            <option key={pessoa.id} value={pessoa.id}>
              {pessoa.nome}
            </option>
          ))}
        </select>

        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(Number(e.target.value))}
          required
        >
          <option value={0}>Selecione uma categoria</option>
          {categoriasFiltradas.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.descricao}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={limparFormulario}>
            Limpar
          </button>
        </div>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <table width="100%" border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Pessoa</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((transacao) => (
            <tr key={transacao.id}>
              <td>{transacao.id}</td>
              <td>{transacao.descricao}</td>
              <td>{transacao.valor}</td>
              <td>{obterTipoTexto(transacao.tipo)}</td>
              <td>{transacao.pessoaNome}</td>
              <td>{transacao.categoriaDescricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}