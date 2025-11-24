const BASE_URL = 'https://fakestoreapi.com/products';

/**
*
* @returns {Promise<Array>} 
*/
export async function getProducts() {
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok)
            throw new Error("Erro ao buscar produtos");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error em getproducts: ", error);
        return [];
    }
}

/**
 *  Get - Ler um produto pelo ID
 * @param {number} id - ID DO PRODUTO
 * @returns {Promise<Object>} - Produto encontrado
 */
export async function getProductById(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok)
            throw new Error ("Erro ao buscar produto");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error em getProductById: ", error);
        return null;
    }
}

/**
 * POST - Criar um novo produto
 * @param {Object} product - Dados do produto
 * @returns {Promise<Object>} - Produto criado
 */
export async function createProduct(product) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(product)
        })
        if (!response.ok)
            throw new Error("Erro ao criar produto");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error em createProduct: ", error);
        return null;
    }
}

/**
 * PUT - Atualizar um produto existente
 * @param {number} id - ID do produto
 * @param {Object} product - Dados atualizados do produto
 * @returns {Promise<Object>} - Produto atualizado
 */
export async function updateProduct(id, product) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`,{
            method: 'put',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(product),
        });
        if (!response.ok)
            throw new Error("Erro ao atualizar produto");
        const data = response.json();
        return data;
    } catch (error) {
        console.error("Error em updateProduct: ", error);
        return null;
    }
}

/**
 * DELETE - Deletar um produto
 * @param {number} id - ID do produto
 * @returns {Promise<Object>} true se excluindo, false caso contrario
 */
export async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'delete',
        });
        if (!response.ok)
            throw new Error("Erro ao excluir produto");
        return true;
    } catch (error) {
        console.error("Error em deleteProduct: ", error);
        return false;
    }
}