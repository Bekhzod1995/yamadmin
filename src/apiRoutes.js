const host = `https://yamfood.herokuapp.com/api/admin`;
// const host = `${process.env.REACT_APP_API_HOST}/api/admin`;

export default {
    login: () => [host, 'auth/login/'].join('/'),
    clients: () => [host, 'clients/'].join('/'),
    // users: () => [host, 'users/'].join('/'),
    kitchens: () => [host, 'kitchens/'].join('/'),
    products: () => [host, 'products/'].join('/'),
    riders: () => [host, 'riders/'].join('/'),
    orderDetails: (id) => [host, `orders/${id}/`].join('/'),
    clientDetails: (id) => [host, `clients/${id}/`],
    orders: () => [host, 'orders/active/'].join('/'),
    admins: () => [host, 'admins/'].join('/'),
};