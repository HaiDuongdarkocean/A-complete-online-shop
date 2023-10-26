const deleteProductBtnElements = document.querySelectorAll('.product-item button');

async function deleteProduct(e) {
    const buttonElement = e.target;
    const productId = buttonElement.dataset.productid;
    const csrfToken = buttonElement.dataset.csrf;
    const response = await fetch('/admin/products/' + productId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Error deleting product:', errorData.message);
        alert('Something went wrong!');
        return;
    }

    buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
    
}

for (const deleteProductBtnElement of deleteProductBtnElements) {
    deleteProductBtnElement.addEventListener('click', deleteProduct);
}