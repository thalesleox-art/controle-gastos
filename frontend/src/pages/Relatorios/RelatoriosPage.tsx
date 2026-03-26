import { useRelatorios } from "./RelatoriosPage";


export default function RelatoriosPage() {
  const { totaisPorPessoa, totaisPorCategoria, erro } = useRelatorios();

  return (
    <div>
      <h2>Relatórios</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <h3>Totais por Pessoa</h3>
      {totaisPorPessoa && (
        <table width="100%" border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {totaisPorPessoa.itens.map(
              (item: {
                pessoaId: string | number;
                nomePessoa: string;
                totalReceitas: number;
                totalDespesas: number;
                saldo: number;
              }) => (
                <tr key={item.pessoaId}>
                  <td>{item.nomePessoa}</td>
                  <td>{item.totalReceitas}</td>
                  <td>{item.totalDespesas}</td>
                  <td>{item.saldo}</td>
                </tr>
              ),
            )}
            <tr>
              <td>
                <strong>Total geral</strong>
              </td>
              <td>
                <strong>{totaisPorPessoa.totalReceitas}</strong>
              </td>
              <td>
                <strong>{totaisPorPessoa.totalDespesas}</strong>
              </td>
              <td>
                <strong>{totaisPorPessoa.saldo}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: 24 }}>Totais por Categoria</h3>
      {totaisPorCategoria && (
        <table width="100%" border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Categoria</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {totaisPorCategoria.itens.map(
              (item: {
                categoriaId: string | number;
                descricaoCategoria: string;
                totalReceitas: number;
                totalDespesas: number;
                saldo: number;
              }) => (
                <tr key={item.categoriaId}>
                  <td>{item.descricaoCategoria}</td>
                  <td>{item.totalReceitas}</td>
                  <td>{item.totalDespesas}</td>
                  <td>{item.saldo}</td>
                </tr>
              ),
            )}
            <tr>
              <td>
                <strong>Total geral</strong>
              </td>
              <td>
                <strong>{totaisPorCategoria.totalReceitas}</strong>
              </td>
              <td>
                <strong>{totaisPorCategoria.totalDespesas}</strong>
              </td>
              <td>
                <strong>{totaisPorCategoria.saldo}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
