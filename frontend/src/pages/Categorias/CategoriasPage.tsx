import type { FinalidadeCategoria } from "../../types";
import { useCategorias } from "./CategoriasPage";

export default function CategoriasPage() {
  const {
    categorias,
    descricao,
    finalidade,
    erro,
    setDescricao,
    setFinalidade,
    salvar,
    limparFormulario,
    obterTextoFinalidade,
  } = useCategorias();

  return (
    <div>
      <h2>Categorias</h2>

      <form
        onSubmit={salvar}
        style={{ display: "grid", gap: 8, marginBottom: 20 }}
      >
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          maxLength={400}
          required
        />

        <select
          value={finalidade}
          onChange={(e) =>
            setFinalidade(Number(e.target.value) as FinalidadeCategoria)
          }
        >
          <option value={1}>Despesa</option>
          <option value={2}>Receita</option>
          <option value={3}>Ambas</option>
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
            <th>Finalidade</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria: (typeof categorias)[0]) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.descricao}</td>
              <td>{obterTextoFinalidade(categoria.finalidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
