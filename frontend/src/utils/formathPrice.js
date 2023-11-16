export default function formatPrice(value) {
    const formattedNumber = value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD' // Định dạng thành tiền USD
    });
    return formattedNumber
}
