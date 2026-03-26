import { usePessoas } from "./PessoasPage";

export default function PessoasPage() {
  const {
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
  } = usePessoas();

  return (
    <div>
      <h2>Pessoas</h2>

      <form
        onSubmit={salvar}
        style={{ display: "grid", gap: 8, marginBottom: 20 }}
      >
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          maxLength={200}
          required
        />

        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(Number(e.target.value))}
          placeholder="Idade"
          required
        />

        <div style={{ display: "flex", gap: 8 }}>
          <button type="submit">
            {editandoId != null ? "Atualizar" : "Cadastrar"}
          </button>
          {editandoId != null && (
            <button type="button" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </div>
      </form>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <table width="100%" border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map(
            (pessoa: { id: number; nome: string; idade: number }) => (
              <tr key={pessoa.id}>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.idade}</td>
                <td>
                  <button onClick={() => editar(pessoa)}>Editar</button>{" "}
                  <button onClick={() => excluir(pessoa.id)}>Excluir</button>
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}
