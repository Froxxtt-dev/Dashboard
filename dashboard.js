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

// Sales Insights: Calculate Best Performing Product and Render Chart
const productSales = dashboardData.sales.reduce((acc, sale) => {
    acc[sale.product] = (acc[sale.product] || 0) + sale.quantitySold;
    return acc;
}, {});
const bestProduct = Object.keys(productSales).reduce((a, b) => productSales[a] > productSales[b] ? a : b);
document.getElementById('best-product').textContent = `${bestProduct} (${productSales[bestProduct]} units sold)`;
console.log('Best Product:', bestProduct, productSales[bestProduct]); // Debug log

// Daily Sales Chart
const dailySales = dashboardData.sales.reduce((acc, sale) => {
    acc[sale.date] = (acc[sale.date] || 0) + sale.totalSales;
    return acc;
}, {});
const salesDates = Object.keys(dailySales).sort();
const salesValues = salesDates.map(date => dailySales[date]);
const salesChart = new Chart(document.getElementById('sales-chart'), {
    type: 'line',
    data: {
        labels: salesDates,
        datasets: [{
            label: 'Daily Sales (GHS)',
            data: salesValues,
            borderColor: '#ff6f61',
            backgroundColor: 'rgba(255, 111, 97, 0.2)',
            fill: true,
            tension: 0.3
        }]
    },
    options: {
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Populate Inventory Table with Stock Indicator
const inventoryTableBody = document.getElementById('inventory-table-body');
dashboardData.inventory.forEach(item => {
    const status = item.closingStock <= item.reorderLevel ? 'Low - Reorder Needed' : 'Sufficient';
    const stockPercentage = (item.closingStock / (item.openingStock || 1)) * 100;
    const barClass = item.closingStock <= item.reorderLevel ? 'stock-bar low' : 'stock-bar safe';
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${item.product}</td>
        <td>${item.openingStock}</td>
        <td>${item.stockIn}</td>
        <td>${item.stockOut}</td>
        <td>${item.closingStock}</td>
        <td>${item.reorderLevel}</td>
        <td><div class="${barClass}" style="width: ${stockPercentage}%"></div></td>
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

// Customer Order Insights
const totalOrders = dashboardData.orders.length;
const statusCounts = dashboardData.orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
}, {});
console.log('Status Counts:', statusCounts); // Debug log
const deliveredPercentage = ((statusCounts['Delivered'] || 0) / totalOrders * 100).toFixed(1);
const pendingPercentage = ((statusCounts['Pending'] || 0) / totalOrders * 100).toFixed(1);
const cancelledPercentage = ((statusCounts['Cancelled'] || 0) / totalOrders * 100).toFixed(1);
document.getElementById('delivered-percentage').textContent = deliveredPercentage;
document.getElementById('pending-percentage').textContent = pendingPercentage;
document.getElementById('cancelled-percentage').textContent = cancelledPercentage;

// Most Frequent Customer with Date-Based Tiebreaker
const customerCounts = dashboardData.orders.reduce((acc, order) => {
    acc[order.customer] = (acc[order.customer] || 0) + 1;
    return acc;
}, {});
const latestOrderDates = dashboardData.orders.reduce((acc, order) => {
    if (!acc[order.customer] || order.date > acc[order.customer]) {
        acc[order.customer] = order.date;
    }
    return acc;
}, {});
const frequentCustomer = Object.keys(customerCounts).reduce((a, b) => {
    if (customerCounts[a] > customerCounts[b]) return a;
    if (customerCounts[a] < customerCounts[b]) return b;
    // Tiebreaker: latest order date
    return latestOrderDates[a] > latestOrderDates[b] ? a : b;
});
document.getElementById('frequent-customer').textContent = `${frequentCustomer} (${customerCounts[frequentCustomer]} orders)`;
console.log('Frequent Customer:', frequentCustomer, customerCounts[frequentCustomer]); // Debug log
