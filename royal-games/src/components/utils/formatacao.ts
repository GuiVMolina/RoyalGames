export function formatarPreco(valor: number) {
  if (valor == 0) {
    return "Jogo de Graça"
  } else {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }
}