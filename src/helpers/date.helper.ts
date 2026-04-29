export function formatarData(data: Date | string): string {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleDateString('pt-BR');
}

export function formatarDataHora(data: Date | string): string {
  if (!data) return '';
  const d = new Date(data);
  return d.toLocaleString('pt-BR');
}
