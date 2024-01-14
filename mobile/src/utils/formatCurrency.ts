export function formatCurrency(value: number) {
    return new Intl.NumberFormat('pt', {
        style: 'currency',
        currency: 'EUR',
    }).format(value);
}
