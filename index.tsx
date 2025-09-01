
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// Type Definitions
interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartItem {
    product: Product;
    quantity: number;
    discount?: {
        percentage: number;
        description: string;
    };
}

interface ReturnTransaction {
    transactionId: string;
    terminal: string;
    employee: string;
    date: string;
    amount: number;
}

interface SaleTransaction {
    transactionId: string;
    date: string;
    amount: number;
}

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    { id: 1242, name: 'Playera Azul', price: 300.50 },
    { id: 32, name: 'Pantalón Gris', price: 375.00 },
    { id: 42, name: 'Camisa blanca', price: 200.50 },
    { id: 230, name: 'Zapatos Negros', price: 800.00 },
    { id: 56, name: 'Vestido Floral', price: 750.00 },
    { id: 98, name: 'Chamarra de Piel', price: 1200.00 },
    { id: 421, name: 'Camisa', price: 350.00 },
    { id: 53221, name: 'Suéter gris', price: 1234.43 },
    { id: 2312, name: 'Lapiceras', price: 50.00 },
    { id: 31, name: 'Zapatos', price: 900.00 },
];

const MOCK_RETURN_TRANSACTIONS: ReturnTransaction[] = [
    { transactionId: '32', terminal: '21', employee: '22', date: '12/11/2024 12:21', amount: 5153.00 },
    { transactionId: '32', terminal: '66', employee: '543', date: '15/11/2024 12:21', amount: 754.23 },
    { transactionId: '32', terminal: '42', employee: '212', date: '16/11/2024 12:21', amount: 643.23 },
];

const MOCK_SALES_TRANSACTIONS: SaleTransaction[] = [
    { transactionId: '101', date: '17/11/2024 10:15', amount: 450.50 },
    { transactionId: '102', date: '17/11/2024 11:30', amount: 1200.00 },
    { transactionId: '103', date: '17/11/2024 14:45', amount: 875.25 },
    { transactionId: '104', date: '17/11/2024 16:20', amount: 3250.00 },
    { transactionId: '105', date: '17/11/2024 18:05', amount: 150.75 },
];

document.addEventListener('DOMContentLoaded', () => {
    // Main app elements
    const appContainer = document.getElementById('app');
    const bottomNav = document.querySelector('.bottom-nav');
    const navItems = document.querySelectorAll('.nav-item');
    const screens = document.querySelectorAll('.screen');

    // Login elements
    const loginScreen = document.getElementById('login-screen');
    const loginForm = document.getElementById('login-form');
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const passwordToggle = document.getElementById('password-toggle');

    // Logout modal elements
    const logoutNavItem = document.getElementById('logout-nav-item');
    const logoutModal = document.getElementById('logout-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const cancelLogoutBtn = document.getElementById('cancel-logout-btn');
    const confirmLogoutBtn = document.getElementById('confirm-logout-btn');

    // Compra screen elements
    const compraHeader = document.getElementById('compra-header');
    const mainActions = document.querySelector('.main-actions') as HTMLElement;
    const productListContainer = document.getElementById('product-list-container');
    const scanProductBtn = document.getElementById('scan-product-btn');
    const checkoutActions = document.getElementById('checkout-actions');
    const cancelPurchaseBtn = document.getElementById('cancel-purchase-btn');
    const cartSummaryTotals = document.getElementById('cart-summary-totals');
    const subtotalAmountEl = document.getElementById('subtotal-amount');
    const discountsAmountEl = document.getElementById('discounts-amount');
    const totalAmountEl = document.getElementById('total-amount');
    const cartNavigationActions = document.getElementById('cart-navigation-actions');
    const goToCheckoutBtn = document.getElementById('go-to-checkout-btn');
    const cancelPurchaseIntermediateBtn = document.getElementById('cancel-purchase-intermediate-btn');


    // Cancel Purchase Modal elements
    const cancelPurchaseModal = document.getElementById('cancel-purchase-modal');
    const confirmCancelBtn = document.getElementById('confirm-cancel-btn');
    const continuePurchaseBtn = document.getElementById('continue-purchase-btn');

    // SKU Modal elements
    const ingresarSkuBtn = document.getElementById('ingresar-sku-btn');
    const skuModal = document.getElementById('sku-modal');
    const skuInput = document.getElementById('sku-input') as HTMLInputElement;
    const skuAddedContainer = document.getElementById('sku-added-container');
    const skuPillsContainer = document.getElementById('sku-pills-container');
    const addSkuProductBtn = document.getElementById('add-sku-product-btn') as HTMLButtonElement;
    const addSkuToCartBtn = document.getElementById('add-sku-to-cart-btn');

    // Consultar Producto Modal elements
    const consultarProductoBtn = document.getElementById('consultar-producto-btn');
    const consultarProductoModal = document.getElementById('consultar-producto-modal');
    const consultarEscanearBtn = document.getElementById('consultar-escanear-btn');
    const consultarSkuBtn = document.getElementById('consultar-sku-btn');
    const consultarCancelarBtn = document.getElementById('consultar-cancelar-btn');
    
    // Product Details Screen elements
    const productDetailsTitle = document.getElementById('product-details-title');
    const productDetailsSku = document.getElementById('product-details-sku');
    const productDetailsPrice = document.getElementById('product-details-price');
    const addToCartDetailsBtn = document.getElementById('add-to-cart-details-btn');
    const regresarBtn = document.getElementById('regresar-btn');
    
    // Promotions Screen elements
    const promoProductTitle = document.getElementById('promo-product-title');
    const promoProductSku = document.getElementById('promo-product-sku');
    const promoProductPrice = document.getElementById('promo-product-price');
    const cambiarPromocionBtn = document.getElementById('cambiar-promocion-btn');
    const regresarPromoBtn = document.getElementById('regresar-promo-btn');

    // Payment Screen elements
    const paymentTotalAmountEl = document.getElementById('payment-total-amount');
    const realizarPagoBtn = document.getElementById('realizar-pago-btn');
    const markApprovedBtn = document.getElementById('mark-approved-btn');
    const markRejectedBtn = document.getElementById('mark-rejected-btn');

    // Transaction Complete Screen elements
    const transactionTotalAmountEl = document.getElementById('transaction-total-amount');
    const finalizeSaleBtn = document.getElementById('finalize-sale-btn');

    // Transaction Rejected Screen elements
    const retryPaymentBtn = document.getElementById('retry-payment-btn');
    const cancelSaleRejectedBtn = document.getElementById('cancel-sale-rejected-btn');
    
    // Cancellations screen elements
    const goToCancellationsBtn = document.getElementById('cancellations-btn');
    const cancelacionesBackBtn = document.getElementById('cancelaciones-back-btn');
    const searchTransactionBtn = document.getElementById('search-transaction-btn');
    const searchResultContainer = document.getElementById('search-result-container');
    const cancelFoundTransactionBtn = document.getElementById('cancel-found-transaction-btn');

    // Devoluciones screen elements
    const goToDevolucionesBtn = document.getElementById('go-to-devoluciones-btn');
    const devolucionesBackBtn = document.getElementById('devoluciones-back-btn');
    const buscarDevolucionBtn = document.getElementById('buscar-devolucion-btn');
    const devolucionesResultsContainer = document.getElementById('devoluciones-results-container');

    // Devolucion Detail Screen elements
    const devolucionCardNumberEl = document.getElementById('devolucion-card-number');
    const devolucionDatetimeEl = document.getElementById('devolucion-datetime');
    const devolucionReferenceEl = document.getElementById('devolucion-reference');
    const devolucionStanEl = document.getElementById('devolucion-stan');
    const devolucionTerminalEl = document.getElementById('devolucion-terminal');
    const devolucionAmountEl = document.getElementById('devolucion-amount');
    const devolucionSummaryAmountEl = document.querySelector('.devolucion-summary-amount');
    const confirmarDevolucionBtn = document.getElementById('confirmar-devolucion-btn');
    const cancelarDevolucionBtn = document.getElementById('cancelar-devolucion-btn');
    
    // Devolucion Pago Screen elements
    const devolucionPagoTotalAmountEl = document.getElementById('devolucion-pago-total-amount');
    const devolucionPagoAprobadaBtn = document.getElementById('devolucion-pago-aprobada-btn');
    const devolucionPagoRechazadaBtn = document.getElementById('devolucion-pago-rechazada-btn');

    // Devolucion Completa Screen elements
    const devolucionCompletaTotalAmountEl = document.getElementById('devolucion-completa-total-amount');
    const finalizeReturnBtn = document.getElementById('finalize-return-btn');

    // Devolucion Rechazada Screen elements
    const retryReturnBtn = document.getElementById('retry-return-btn');
    const cancelReturnRejectedBtn = document.getElementById('cancel-return-rejected-btn');

    // Devolucion Parcial Scan Screen elements
    const devolucionParcialHeader = document.getElementById('devolucion-parcial-header');
    const devolucionParcialListContainer = document.getElementById('devolucion-parcial-list-container');
    const devolucionEscanearBtn = document.getElementById('devolucion-escanear-btn');
    const devolucionSkuBtn = document.getElementById('devolucion-sku-btn');
    const devolucionParcialCancelarBtn = document.getElementById('devolucion-parcial-cancelar-btn');
    const devolucionParcialSplitActions = document.getElementById('devolucion-parcial-split-actions');
    const devolucionParcialCancelarSplitBtn = document.getElementById('devolucion-parcial-cancelar-split-btn');
    const devolucionParcialContinuarBtn = document.getElementById('devolucion-parcial-continuar-btn');

    // Cancellation confirmation modal elements
    const cancellationConfirmationModal = document.getElementById('cancellation-confirmation-modal');
    const confirmCancellationBtn = document.getElementById('confirm-cancellation-btn');
    const goBackFromCancellationBtn = document.getElementById('go-back-from-cancellation-btn');
    const finalizeCancellationBtn = document.getElementById('finalize-cancellation-btn');

    // Cancel Return Modal elements
    const cancelReturnModal = document.getElementById('cancel-return-modal');
    const confirmCancelReturnBtn = document.getElementById('confirm-cancel-return-btn');
    const goBackFromReturnBtn = document.getElementById('go-back-from-return-btn');

    // Reports screen elements
    const reportListContainer = document.getElementById('report-list-container');
    const reportTotalAmountEl = document.getElementById('report-total-amount');

    // Camera elements
    const cameraView = document.getElementById('camera-view');
    const cameraFeed = document.getElementById('camera-feed') as HTMLVideoElement;

    // App state
    let shoppingCart: CartItem[] = [];
    let partialReturnCart: CartItem[] = [];
    let cameraStream: MediaStream | null = null;
    let cameraMode: 'purchase' | 'consultation' | 'return' = 'purchase';
    let skuProducts: Product[] = [];
    let currentProductForDetails: Product | null = null;
    let currentItemForPromotion: CartItem | null = null;
    let currentTransactionForReturn: ReturnTransaction | null = null;
    let isCheckoutView = false;
    let currentReturnMode: 'total' | 'partial' = 'total';
    let onConfirmCancelReturn: (() => void) | null = null;
    
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    function showScreen(screenId: string) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Hide/show nav
        const screensWithoutNav = ['product-details-screen', 'promotions-screen', 'payment-screen', 'transaction-complete-screen', 'transaction-rejected-screen', 'cancelaciones-screen', 'cancellation-complete-screen', 'devoluciones-screen', 'devolucion-detalle-screen', 'devolucion-pago-screen', 'devolucion-completa-screen', 'devolucion-rechazada-screen', 'devolucion-parcial-scan-screen'];
        if (screensWithoutNav.includes(screenId)) {
            bottomNav?.classList.add('hidden');
        } else {
            bottomNav?.classList.remove('hidden');
        }
    }

    function switchTab(targetId: string) {
        showScreen(targetId);
        
        navItems.forEach(item => {
            if (item.getAttribute('data-target')) {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            }
        });

        const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
            targetNavItem.setAttribute('aria-current', 'page');
        }

        if (targetId === 'reportes-screen') {
            renderReports();
        }
    }

    function showModal() {
        if(modalOverlay && logoutModal) {
            modalOverlay.classList.add('active');
            logoutModal.classList.add('active');
        }
    }

    function hideModal() {
        if(modalOverlay && logoutModal) {
            modalOverlay.classList.remove('active');
            logoutModal.classList.remove('active');
        }
    }

    function login() {
        if (loginScreen && appContainer) {
            loginScreen.classList.add('hidden');
            appContainer.classList.remove('hidden');
            renderCart(); // Render cart on login
        }
    }

    function logout() {
        if (loginScreen && appContainer) {
            hideModal();
            appContainer.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        }
    }

    // --- Product Details Logic ---
    function showProductDetails(product: Product) {
        currentProductForDetails = product;
        if (productDetailsTitle) productDetailsTitle.textContent = product.name;
        if (productDetailsSku) productDetailsSku.textContent = product.name; // Using name as SKU for mock
        if (productDetailsPrice) productDetailsPrice.textContent = `$${product.price.toFixed(2)} MXN`;
        
        showScreen('product-details-screen');
    }
    
    function addProductFromDetails() {
        if (currentProductForDetails) {
            addProductToCart(currentProductForDetails);
        }
        showScreen('compra-screen');
    }

    // --- Promotions Screen Logic ---
    function showPromotionScreenForProduct(event: Event) {
        const button = event.currentTarget as HTMLElement;
        const productId = parseInt(button.dataset.productId || '0');
        const item = shoppingCart.find(i => i.product.id === productId);

        if (item && promoProductTitle && promoProductSku && promoProductPrice) {
            currentItemForPromotion = item;

            promoProductTitle.textContent = item.product.name;
            promoProductSku.textContent = item.product.id.toString();
            promoProductPrice.textContent = `${currencyFormatter.format(item.product.price)} MXN`;

            // Set radio button state
            const discountRadios = document.querySelectorAll('#promotions-screen input[name="discount"]') as NodeListOf<HTMLInputElement>;
            let matchingRadioFound = false;

            if (item.discount) {
                for (const radio of discountRadios) {
                    const label = radio.closest('.discount-option');
                    const tag = label?.querySelector('.discount-tag');
                    if (tag && tag.textContent === item.discount.description) {
                        radio.checked = true;
                        matchingRadioFound = true;
                        break;
                    }
                }
            }

            if (!matchingRadioFound) {
                const noneRadio = document.querySelector('#promotions-screen input[name="discount"][value="none"]') as HTMLInputElement;
                if (noneRadio) noneRadio.checked = true;
            }

            showScreen('promotions-screen');
        }
    }

    function applyPromotionAndGoBack() {
        if (!currentItemForPromotion) {
            isCheckoutView = true;
            renderCart();
            showScreen('compra-screen');
            return;
        }

        const selectedRadio = document.querySelector('#promotions-screen input[name="discount"]:checked') as HTMLInputElement;

        if (!selectedRadio || selectedRadio.value === 'none') {
            currentItemForPromotion.discount = undefined;
        } else {
            const value = selectedRadio.value;
            const label = selectedRadio.closest('.discount-option');
            const description = label?.querySelector('.discount-tag')?.textContent || 'Descuento';

            const itemSubtotal = currentItemForPromotion.product.price * currentItemForPromotion.quantity;
            let percentage = 0;

            if (value.startsWith('amount-')) {
                const amount = parseFloat(value.replace('amount-', ''));
                if (itemSubtotal > 0) {
                    percentage = (amount / itemSubtotal) * 100;
                }
            } else {
                percentage = parseFloat(value);
            }

            currentItemForPromotion.discount = {
                percentage: isNaN(percentage) ? 0 : percentage,
                description: description
            };
        }

        const itemIndex = shoppingCart.findIndex(item => item.product.id === currentItemForPromotion!.product.id);
        if (itemIndex > -1) {
            shoppingCart[itemIndex] = currentItemForPromotion;
        }

        currentItemForPromotion = null;
        isCheckoutView = true;
        renderCart();
        showScreen('compra-screen');
    }


    // --- SKU Modal Logic ---
    function renderSkuPills() {
        if (!skuPillsContainer || !skuAddedContainer || !addSkuToCartBtn) return;
        skuPillsContainer.innerHTML = '';

        if (skuProducts.length === 0) {
            skuAddedContainer.classList.add('hidden');
            addSkuToCartBtn.classList.add('hidden');
        } else {
            skuAddedContainer.classList.remove('hidden');
            addSkuToCartBtn.classList.remove('hidden');

            skuProducts.forEach(product => {
                const pillEl = document.createElement('div');
                pillEl.className = 'sku-pill';
                pillEl.innerHTML = `
                    <span>${product.id}-${product.name}</span>
                    <button class="remove-pill-btn" data-product-id="${product.id}" aria-label="Remover ${product.name}">
                        <span class="material-symbols-outlined">close</span>
                    </button>
                `;
                skuPillsContainer.appendChild(pillEl);
            });
            document.querySelectorAll('.remove-pill-btn').forEach(button => {
                button.addEventListener('click', handleRemoveSkuPill);
            });
        }
    }
    
    function handleRemoveSkuPill(event: Event) {
        const button = event.currentTarget as HTMLElement;
        const productId = parseInt(button.dataset.productId || '0');
        skuProducts = skuProducts.filter(p => p.id !== productId);
        renderSkuPills();
    }
    
    function addSkuProduct() {
        const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
        if (!skuProducts.find(p => p.id === randomProduct.id)) {
             skuProducts.push(randomProduct);
        }
        if (skuInput) skuInput.value = '';
        if (addSkuProductBtn) addSkuProductBtn.disabled = true;
        renderSkuPills();
    }
    
    function addSkuProductsToCart() {
        const targetCart = cameraMode === 'return' ? partialReturnCart : shoppingCart;
        const renderFunction = cameraMode === 'return' ? renderPartialReturnCart : renderCart;
        const addFunction = cameraMode === 'return' ? addProductToPartialReturn : addProductToCart;

        skuProducts.forEach(product => {
            addFunction(product);
        });
        hideSkuModal();
        renderFunction();
    }

    function showSkuModal() {
        if (modalOverlay && skuModal) {
            modalOverlay.classList.add('active');
            skuModal.classList.add('active');
        }
    }

    function hideSkuModal() {
        if (modalOverlay && skuModal) {
            modalOverlay.classList.remove('active');
            skuModal.classList.remove('active');
        }
        skuProducts = [];
        if (skuInput) skuInput.value = '';
        if (addSkuProductBtn) addSkuProductBtn.disabled = true;
        renderSkuPills();
    }

    // --- Consultar Producto Modal Logic ---
    function showConsultarProductoModal() {
        if (modalOverlay && consultarProductoModal) {
            modalOverlay.classList.add('active');
            consultarProductoModal.classList.add('active');
        }
    }

    function hideConsultarProductoModal() {
        if (modalOverlay && consultarProductoModal) {
            modalOverlay.classList.remove('active');
            consultarProductoModal.classList.remove('active');
        }
    }

    // --- Cancel Purchase Modal Logic ---
    function showCancelPurchaseModal() {
        if (modalOverlay && cancelPurchaseModal) {
            modalOverlay.classList.add('active');
            cancelPurchaseModal.classList.add('active');
        }
    }

    function hideCancelPurchaseModal() {
        if (modalOverlay && cancelPurchaseModal) {
            modalOverlay.classList.remove('active');
            cancelPurchaseModal.classList.remove('active');
        }
    }
    
    // --- Cancellation Confirmation Modal Logic ---
    function showCancellationConfirmationModal() {
        if (modalOverlay && cancellationConfirmationModal) {
            modalOverlay.classList.add('active');
            cancellationConfirmationModal.classList.add('active');
        }
    }

    function hideCancellationConfirmationModal() {
        if (modalOverlay && cancellationConfirmationModal) {
            modalOverlay.classList.remove('active');
            cancellationConfirmationModal.classList.remove('active');
        }
    }

    // --- Cancel Return Modal Logic ---
    function showCancelReturnModal(onConfirm: () => void) {
        onConfirmCancelReturn = onConfirm;
        if (modalOverlay && cancelReturnModal) {
            modalOverlay.classList.add('active');
            cancelReturnModal.classList.add('active');
        }
    }

    function hideCancelReturnModal() {
        onConfirmCancelReturn = null;
        if (modalOverlay && cancelReturnModal) {
            modalOverlay.classList.remove('active');
            cancelReturnModal.classList.remove('active');
        }
    }

    // --- Compra Screen Logic ---
    function handleQuantityChange(event: Event) {
        const button = event.currentTarget as HTMLElement;
        const productId = parseInt(button.dataset.productId || '0');
        const action = button.dataset.action;

        const item = shoppingCart.find(i => i.product.id === productId);
        if (!item) return;

        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease') {
            item.quantity--;
            if (item.quantity <= 0) {
                shoppingCart = shoppingCart.filter(i => i.product.id !== productId);
            }
        }
        renderCart();
    }

    function renderCart() {
        if (!productListContainer || !compraHeader || !checkoutActions || !mainActions || !cartSummaryTotals || !subtotalAmountEl || !discountsAmountEl || !totalAmountEl || !cartNavigationActions) return;

        productListContainer.innerHTML = '';

        if (shoppingCart.length === 0) {
            compraHeader.classList.remove('hidden');
            mainActions.classList.remove('hidden');
            checkoutActions.classList.add('hidden');
            cartSummaryTotals.classList.add('hidden');
            cartNavigationActions.classList.add('hidden');
            isCheckoutView = false; // Reset state
            return;
        }

        // Cart has items logic
        compraHeader.classList.add('hidden');
        mainActions.classList.remove('hidden');

        
        let subtotal = 0;
        let totalDiscounts = 0;

        shoppingCart.forEach(item => {
            const itemSubtotal = item.product.price * item.quantity;
            subtotal += itemSubtotal;
            if (item.discount) {
                const itemDiscount = itemSubtotal * (item.discount.percentage / 100);
                totalDiscounts += itemDiscount;
            }
        });
        const total = subtotal - totalDiscounts;

        if (isCheckoutView) {
            // --- FINAL SUMMARY VIEW ---
            mainActions.classList.add('hidden');
            cartNavigationActions.classList.add('hidden');
            checkoutActions.classList.remove('hidden');
            cartSummaryTotals.classList.remove('hidden');

            subtotalAmountEl.textContent = currencyFormatter.format(subtotal);
            discountsAmountEl.textContent = currencyFormatter.format(totalDiscounts);
            totalAmountEl.textContent = currencyFormatter.format(total);

            shoppingCart.forEach(item => {
                const wrapper = document.createElement('div');
                wrapper.className = 'cart-item-wrapper';

                const itemSubtotal = item.product.price * item.quantity;
                let finalPrice = itemSubtotal;
                
                if (item.discount) {
                    const itemDiscount = itemSubtotal * (item.discount.percentage / 100);
                    finalPrice -= itemDiscount;
                }

                wrapper.innerHTML = `
                    <div class="cart-item-details">
                        <div class="cart-item-info">
                            <p class="name">${item.product.name}</p>
                            <p class="details">SKU: ${item.product.id}</p>
                            <p class="details">Unidades: ${item.quantity}</p>
                        </div>
                        <div class="cart-item-pricing">
                            ${item.discount ? `<p class="original-price">${currencyFormatter.format(itemSubtotal)}</p>` : ''}
                            <p class="price">${currencyFormatter.format(finalPrice)}</p>
                        </div>
                    </div>
                    <div class="cart-item-promo">
                        ${item.discount 
                            ? `<span class="discount-tag">${item.discount.description}</span><button class="promo-link" data-product-id="${item.product.id}">Cambiar promoción</button>`
                            : `<button class="promo-link" data-product-id="${item.product.id}">Elegir promoción</button>`
                        }
                    </div>
                `;
                productListContainer.appendChild(wrapper);
            });
            
            document.querySelectorAll('.promo-link').forEach(button => {
                button.addEventListener('click', showPromotionScreenForProduct);
            });

        } else {
            // --- INTERMEDIATE VIEW (add/remove) ---
            checkoutActions.classList.add('hidden');
            cartSummaryTotals.classList.add('hidden');
            cartNavigationActions.classList.remove('hidden');

            shoppingCart.forEach(item => {
                const wrapper = document.createElement('div');
                wrapper.className = 'cart-item-wrapper';

                wrapper.innerHTML = `
                    <div class="cart-item-intermediate-content">
                        <div class="cart-item-details-intermediate">
                            <p class="name">${item.product.id} - ${item.product.name}</p>
                            <p class="price">${currencyFormatter.format(item.product.price)}</p>
                        </div>
                        <div class="quantity-stepper">
                            <button class="stepper-btn" data-product-id="${item.product.id}" data-action="decrease" aria-label="Disminuir cantidad de ${item.product.name}">-</button>
                            <span>${item.quantity}</span>
                            <button class="stepper-btn" data-product-id="${item.product.id}" data-action="increase" aria-label="Aumentar cantidad de ${item.product.name}">+</button>
                        </div>
                    </div>
                `;
                productListContainer.appendChild(wrapper);
            });

            document.querySelectorAll('.stepper-btn').forEach(button => {
                button.addEventListener('click', handleQuantityChange);
            });
        }
    }

    function addProductToCart(product: Product) {
        isCheckoutView = false; // Ensure we are in intermediate view
        const existingItem = shoppingCart.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            shoppingCart.push({ product: product, quantity: 1 });
        }
        renderCart();
    }

    function cancelPurchase() {
        shoppingCart = [];
        isCheckoutView = false; // Reset view
        renderCart();
    }

    // --- Payment Flow Logic ---
    function calculateTotal() {
        let subtotal = 0;
        let totalDiscounts = 0;
        shoppingCart.forEach(item => {
            const itemSubtotal = item.product.price * item.quantity;
            subtotal += itemSubtotal;
            if (item.discount) {
                const itemDiscount = itemSubtotal * (item.discount.percentage / 100);
                totalDiscounts += itemDiscount;
            }
        });
        return subtotal - totalDiscounts;
    }

    function calculatePartialReturnTotal() {
        return partialReturnCart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    }

    function showPaymentScreen() {
        const total = calculateTotal();
        if (paymentTotalAmountEl) {
            paymentTotalAmountEl.textContent = `${currencyFormatter.format(total)} MXN`;
        }
        showScreen('payment-screen');
    }

    function showTransactionCompleteScreen() {
        const total = calculateTotal();
         if (transactionTotalAmountEl) {
            transactionTotalAmountEl.textContent = currencyFormatter.format(total);
        }
        showScreen('transaction-complete-screen');
    }

    function showTransactionRejectedScreen() {
        showScreen('transaction-rejected-screen');
    }

    function completeTransaction() {
        cancelPurchase(); // This already clears the cart and resets the view
        switchTab('compra-screen'); // Ensure we are back on the main tab
    }
    
    // --- Devolucion Parcial Logic ---
    function renderPartialReturnCart() {
        if (!devolucionParcialListContainer || !devolucionParcialHeader || !devolucionParcialCancelarBtn || !devolucionParcialSplitActions) return;

        devolucionParcialListContainer.innerHTML = '';
        
        if (partialReturnCart.length === 0) {
            devolucionParcialHeader.classList.remove('hidden');
            devolucionParcialCancelarBtn.classList.remove('hidden');
            devolucionParcialSplitActions.classList.add('hidden');
        } else {
            devolucionParcialHeader.classList.add('hidden');
            devolucionParcialCancelarBtn.classList.add('hidden');
            devolucionParcialSplitActions.classList.remove('hidden');
            
            partialReturnCart.forEach(item => {
                const wrapper = document.createElement('div');
                wrapper.className = 'return-item-wrapper';
                const itemSubtotal = item.product.price * item.quantity;

                wrapper.innerHTML = `
                    <div class="return-item-details">
                        <div class="return-item-info">
                            <p class="name">${item.product.name}</p>
                            <p class="details">SKU: ${item.product.id}</p>
                            <p class="details">Unidades: ${item.quantity}</p>
                        </div>
                        <div class="return-item-pricing">
                            <p class="price">${currencyFormatter.format(itemSubtotal)}</p>
                        </div>
                    </div>
                `;
                devolucionParcialListContainer.appendChild(wrapper);
            });
        }
    }
    
    function addProductToPartialReturn(product: Product) {
        const existingItem = partialReturnCart.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            partialReturnCart.push({ product: product, quantity: 1 });
        }
        renderPartialReturnCart();
    }


    // --- Devoluciones Logic ---
    function showDevolucionDetalle(transaction: ReturnTransaction) {
        currentTransactionForReturn = transaction;
        if (
            devolucionCardNumberEl && devolucionDatetimeEl && devolucionReferenceEl &&
            devolucionStanEl && devolucionTerminalEl && devolucionAmountEl &&
            devolucionSummaryAmountEl
        ) {
            devolucionCardNumberEl.textContent = '123456******1234'; // Mocked card
            devolucionDatetimeEl.textContent = transaction.date;
            devolucionReferenceEl.textContent = `Referencia: 000004280117`; // Mocked
            devolucionStanEl.textContent = `STAN: ${transaction.transactionId}`; // Using tx Id as STAN for now
            devolucionTerminalEl.textContent = `Terminal: ${transaction.terminal}`;
            devolucionAmountEl.textContent = currencyFormatter.format(transaction.amount);
            devolucionSummaryAmountEl.textContent = currencyFormatter.format(transaction.amount);
        }
        showScreen('devolucion-detalle-screen');
    }

    function showDevolucionPagoScreen() {
        if (!devolucionPagoTotalAmountEl) return;
        
        let total = 0;
        if (currentReturnMode === 'total' && currentTransactionForReturn) {
            total = currentTransactionForReturn.amount;
        } else if (currentReturnMode === 'partial') {
            total = calculatePartialReturnTotal();
        }

        devolucionPagoTotalAmountEl.textContent = `${currencyFormatter.format(total)} MXN`;
        showScreen('devolucion-pago-screen');
    }

    function showDevolucionCompletaScreen() {
        if (!devolucionCompletaTotalAmountEl) return;
        
        let total = 0;
        if (currentReturnMode === 'total' && currentTransactionForReturn) {
            total = currentTransactionForReturn.amount;
        } else if (currentReturnMode === 'partial') {
            total = calculatePartialReturnTotal();
        }
        
        devolucionCompletaTotalAmountEl.textContent = currencyFormatter.format(total);
        showScreen('devolucion-completa-screen');
    }

    function showDevolucionRechazadaScreen() {
        showScreen('devolucion-rechazada-screen');
    }

    function finalizeReturn() {
        currentTransactionForReturn = null;
        partialReturnCart = [];
        const devolucionesForm = document.getElementById('devoluciones-form') as HTMLFormElement;
        if (devolucionesForm) {
            devolucionesForm.reset();
        }
        if (devolucionesResultsContainer) {
            devolucionesResultsContainer.innerHTML = '';
            devolucionesResultsContainer.classList.add('hidden');
        }
        showScreen('operaciones-screen');
    }

    function renderDevolucionesResults() {
        if (!devolucionesResultsContainer) return;

        devolucionesResultsContainer.innerHTML = '';
        devolucionesResultsContainer.classList.remove('hidden');

        MOCK_RETURN_TRANSACTIONS.forEach(tx => {
            const itemEl = document.createElement('div');
            itemEl.className = 'devolucion-item';

            const detailsGrid = document.createElement('div');
            detailsGrid.className = 'devolucion-item-details-grid';
            detailsGrid.innerHTML = `
                <p>No. de Tansacción: ${tx.transactionId}</p> <p class="align-right">${tx.date}</p>
                <p>Terminal: ${tx.terminal}</p>               <p class="align-right amount">${currencyFormatter.format(tx.amount)}</p>
                <p>Empleado: ${tx.employee}</p>
            `;

            const actionsEl = document.createElement('div');
            actionsEl.className = 'devolucion-item-actions';

            const partialBtn = document.createElement('button');
            partialBtn.className = 'btn btn-lavender';
            partialBtn.textContent = 'Devolución parcial';
            partialBtn.addEventListener('click', () => {
                currentReturnMode = 'partial';
                partialReturnCart = [];
                renderPartialReturnCart();
                showScreen('devolucion-parcial-scan-screen');
            });

            const totalBtn = document.createElement('button');
            totalBtn.className = 'btn btn-lavender';
            totalBtn.textContent = 'Devolución total';
            totalBtn.addEventListener('click', () => {
                currentReturnMode = 'total';
                showDevolucionDetalle(tx);
            });
            
            actionsEl.appendChild(partialBtn);
            actionsEl.appendChild(totalBtn);

            itemEl.appendChild(detailsGrid);
            itemEl.appendChild(actionsEl);
            devolucionesResultsContainer.appendChild(itemEl);
        });
    }

    // --- Reports Logic ---
    function renderReports() {
        if (!reportListContainer || !reportTotalAmountEl) return;

        reportListContainer.innerHTML = '';
        let totalSales = 0;

        MOCK_SALES_TRANSACTIONS.forEach(tx => {
            totalSales += tx.amount;
            const itemEl = document.createElement('div');
            itemEl.className = 'transaction-item';
            itemEl.innerHTML = `
                <div class="transaction-details">
                    <p>No. de Transacción: ${tx.transactionId}</p>
                    <p>${tx.date}</p>
                </div>
                <div class="transaction-info">
                    <p class="amount">${currencyFormatter.format(tx.amount)}</p>
                </div>
            `;
            reportListContainer.appendChild(itemEl);
        });

        reportTotalAmountEl.textContent = currencyFormatter.format(totalSales);
    }

    // --- Camera Logic ---
    async function openCamera() {
        if (!cameraView || !cameraFeed) return;
        cameraView.classList.remove('hidden');
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            cameraFeed.srcObject = cameraStream;
        } catch (err) {
            console.error("Error accessing camera:", err);
            closeCamera();
        }
    }

    function closeCamera() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        if (cameraView) {
            cameraView.classList.add('hidden');
        }
        cameraStream = null;
    }

    // --- Initial Event Listeners ---

    navItems.forEach(item => {
        const targetId = item.getAttribute('data-target');
        if (targetId) {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                switchTab(targetId);
            });
        }
    });

    logoutNavItem?.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
    });

    modalOverlay?.addEventListener('click', () => {
        if (logoutModal?.classList.contains('active')) hideModal();
        if (skuModal?.classList.contains('active')) hideSkuModal();
        if (consultarProductoModal?.classList.contains('active')) hideConsultarProductoModal();
        if (cancelPurchaseModal?.classList.contains('active')) hideCancelPurchaseModal();
        if (cancellationConfirmationModal?.classList.contains('active')) hideCancellationConfirmationModal();
        if (cancelReturnModal?.classList.contains('active')) hideCancelReturnModal();
    });
    cancelLogoutBtn?.addEventListener('click', hideModal);
    
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        login();
    });

    passwordToggle?.addEventListener('click', () => {
        if (passwordInput && passwordToggle) {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            passwordToggle.textContent = isPassword ? 'visibility_off' : 'visibility';
        }
    });

    confirmLogoutBtn?.addEventListener('click', logout);
    
    scanProductBtn?.addEventListener('click', () => {
        cameraMode = 'purchase';
        openCamera();
    });
    cancelPurchaseBtn?.addEventListener('click', showCancelPurchaseModal);
    cancelPurchaseIntermediateBtn?.addEventListener('click', showCancelPurchaseModal);
    
    goToCheckoutBtn?.addEventListener('click', () => {
        isCheckoutView = true;
        renderCart();
    });
    
    confirmCancelBtn?.addEventListener('click', () => {
        cancelPurchase();
        hideCancelPurchaseModal();
    });
    continuePurchaseBtn?.addEventListener('click', hideCancelPurchaseModal);
    
    ingresarSkuBtn?.addEventListener('click', () => {
        cameraMode = 'purchase';
        showSkuModal();
    });
    skuInput?.addEventListener('input', () => {
        if (addSkuProductBtn) {
            addSkuProductBtn.disabled = skuInput.value.trim() === '';
        }
    });
    addSkuProductBtn?.addEventListener('click', addSkuProduct);
    addSkuToCartBtn?.addEventListener('click', addSkuProductsToCart);

    consultarProductoBtn?.addEventListener('click', showConsultarProductoModal);
    consultarCancelarBtn?.addEventListener('click', hideConsultarProductoModal);
    consultarEscanearBtn?.addEventListener('click', () => {
        hideConsultarProductoModal();
        cameraMode = 'consultation';
        openCamera();
    });
    consultarSkuBtn?.addEventListener('click', () => {
        hideConsultarProductoModal();
        const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
        showProductDetails(randomProduct);
    });

    cameraView?.addEventListener('click', () => {
        closeCamera();
        const randomProduct = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
        switch (cameraMode) {
            case 'purchase':
                addProductToCart(randomProduct);
                break;
            case 'consultation':
                showProductDetails(randomProduct);
                break;
            case 'return':
                addProductToPartialReturn(randomProduct);
                break;
        }
    });

    // Screen navigation listeners
    regresarBtn?.addEventListener('click', () => showScreen('compra-screen'));
    addToCartDetailsBtn?.addEventListener('click', addProductFromDetails);
    
    const backToCompra = () => {
        currentItemForPromotion = null; // Always clear state on cancel
        isCheckoutView = true;
        renderCart();
        showScreen('compra-screen');
    };
    cambiarPromocionBtn?.addEventListener('click', applyPromotionAndGoBack);
    regresarPromoBtn?.addEventListener('click', backToCompra);
    
    // Payment screen listeners
    realizarPagoBtn?.addEventListener('click', showPaymentScreen);
    markApprovedBtn?.addEventListener('click', showTransactionCompleteScreen);
    markRejectedBtn?.addEventListener('click', showTransactionRejectedScreen);

    // Transaction complete screen listener
    finalizeSaleBtn?.addEventListener('click', completeTransaction);
    
    // Transaction rejected screen listeners
    retryPaymentBtn?.addEventListener('click', showPaymentScreen);
    cancelSaleRejectedBtn?.addEventListener('click', completeTransaction);

    // Cancellations screen listeners
    goToCancellationsBtn?.addEventListener('click', () => showScreen('cancelaciones-screen'));
    cancelacionesBackBtn?.addEventListener('click', () => showScreen('operaciones-screen'));
    searchTransactionBtn?.addEventListener('click', () => {
        searchResultContainer?.classList.remove('hidden');
    });
    cancelFoundTransactionBtn?.addEventListener('click', showCancellationConfirmationModal);
    goBackFromCancellationBtn?.addEventListener('click', hideCancellationConfirmationModal);
    confirmCancellationBtn?.addEventListener('click', () => {
        hideCancellationConfirmationModal();
        showScreen('cancellation-complete-screen');
    });
    finalizeCancellationBtn?.addEventListener('click', () => {
        if (searchResultContainer) {
            searchResultContainer.classList.add('hidden');
        }
        const searchInput = document.querySelector('#cancelaciones-screen .search-group input') as HTMLInputElement;
        if (searchInput) searchInput.value = '';
        showScreen('operaciones-screen');
    });

    // Devoluciones screen listeners
    goToDevolucionesBtn?.addEventListener('click', () => showScreen('devoluciones-screen'));
    devolucionesBackBtn?.addEventListener('click', () => showScreen('operaciones-screen'));
    buscarDevolucionBtn?.addEventListener('click', renderDevolucionesResults);
    cancelarDevolucionBtn?.addEventListener('click', () => {
        showCancelReturnModal(() => showScreen('devoluciones-screen'));
    });
    confirmarDevolucionBtn?.addEventListener('click', showDevolucionPagoScreen);
    
    // Devolucion Pago screen listeners
    devolucionPagoAprobadaBtn?.addEventListener('click', showDevolucionCompletaScreen);
    devolucionPagoRechazadaBtn?.addEventListener('click', showDevolucionRechazadaScreen);

    // Devolucion Completa screen listeners
    finalizeReturnBtn?.addEventListener('click', finalizeReturn);

    // Devolucion Rechazada screen listeners
    retryReturnBtn?.addEventListener('click', showDevolucionPagoScreen);
    cancelReturnRejectedBtn?.addEventListener('click', () => showCancelReturnModal(finalizeReturn));
    
    // Devolucion Parcial Scan screen listeners
    const cancelPartialReturn = () => {
        partialReturnCart = [];
        showScreen('devoluciones-screen');
    };
    devolucionParcialCancelarBtn?.addEventListener('click', () => showCancelReturnModal(cancelPartialReturn));
    devolucionParcialCancelarSplitBtn?.addEventListener('click', () => showCancelReturnModal(cancelPartialReturn));

    devolucionEscanearBtn?.addEventListener('click', () => {
        cameraMode = 'return';
        openCamera();
    });
    devolucionSkuBtn?.addEventListener('click', () => {
        cameraMode = 'return';
        showSkuModal();
    });
    devolucionParcialContinuarBtn?.addEventListener('click', showDevolucionPagoScreen);

    // Cancel Return Modal listeners
    goBackFromReturnBtn?.addEventListener('click', hideCancelReturnModal);
    confirmCancelReturnBtn?.addEventListener('click', () => {
        if (onConfirmCancelReturn) {
            onConfirmCancelReturn();
        }
        hideCancelReturnModal();
    });


    // Set initial state
    const initialActiveNavItem = document.querySelector('#app .nav-item.active');
    if (initialActiveNavItem) {
        const initialTargetId = initialActiveNavItem.getAttribute('data-target');
        if (initialTargetId) {
            switchTab(initialTargetId);
        }
    }
});