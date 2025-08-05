async function fetchProdutos(produtos){
    try {
        const response = await fetch('https://6890dee0944bf437b5979983.mockapi.io/api/produtos/products')
        const mock = await response.json()
        return mock
    } catch (error) {
        console.error('Failed to fetch produtos:', error);
    }
}
export { fetchProdutos };