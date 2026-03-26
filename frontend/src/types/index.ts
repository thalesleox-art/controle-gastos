export type TipoTransacao = 1 | 2;
export type FinalidadeCategoria = 1 | 2 | 3;

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Categoria {
  id: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  pessoaId: number;
  pessoaNome: string;
  categoriaId: number;
  categoriaDescricao: string;
}

export interface TotalPorPessoa {
  pessoaId: number;
  nomePessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface TotalPorCategoria {
  categoriaId: number;
  descricaoCategoria: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface ResumoTotais<T> {
  itens: T[];
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}