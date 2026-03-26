const API_URL = "http://localhost:5000/api";

export async function apiGet<T>(rota: string): Promise<T> {
  const response = await fetch(`${API_URL}${rota}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar dados.");
  }

  return response.json();
}

export async function apiPost<T>(rota: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${rota}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const textoErro = await response.text();
    throw new Error(textoErro || "Erro ao salvar.");
  }

  return response.json();
}

export async function apiPut<T>(rota: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_URL}${rota}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const textoErro = await response.text();
    throw new Error(textoErro || "Erro ao atualizar.");
  }

  return response.json();
}

export async function apiDelete(rota: string): Promise<void> {
  const response = await fetch(`${API_URL}${rota}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const textoErro = await response.text();
    throw new Error(textoErro || "Erro ao excluir.");
  }
}