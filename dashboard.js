// Populate Sales Table
const salesTableBody = document.getElementById('sales-table-body');
dashboardData.sales.forEach(sale => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${sale.date}</td>
        <td>${sale.product}</td>
        <td>${sale.quantitySold}</td>
        <td>${sale.unitPrice}</td>
        <td>${sale.totalSales}</td>
    `;
    salesTableBody.appendChild(row);
});

// Populate Summary Stats
const summary = dashboardData.summary[0];
document.getElementById('total-sales').textContent = summary.totalSales;
document.getElementById('total-orders').textContent = summary.totalOrders;
document.getElementById('top-selling-item').textContent = summary.topSellingItem;

// Populate Inventory Table
const inventoryTableBody = document.getElementById('inventory-table-body');
dashboardData.inventory.forEach(item => {
    const status = item.closingStock <= item.reorderLevel ? 'Low - Reorder Needed' : 'Sufficient';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.product}</td>
        <td>${item.openingStock}</td>
        <td>${item.stockIn}</td>
        <td>${item.stockOut}</td>
        <td>${item.closingStock}</td>
        <td>${item.reorderLevel}</td>
        <td class="${item.closingStock <= item.reorderLevel ? 'status-low' : ''}">${status}</td>
    `;
    inventoryTableBody.appendChild(row);
});

// Populate Customer Orders Table
const ordersTableBody = document.getElementById('orders-table-body');
dashboardData.orders.forEach(order => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${order.date}</td>
        <td>${order.customer}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.contact}</td>
        <td>${order.status}</td>
    `;
    ordersTableBody.appendChild(row);
});
