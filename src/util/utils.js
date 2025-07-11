export function formatDateTime(timestamp) {
    const date = new Date(timestamp);

    // Get individual date and time components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Format to dd-mm-yyyy tt:tt
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
    return formattedDate;
}