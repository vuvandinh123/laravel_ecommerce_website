export default function formathDate(date) {
    if(!date) {
        return '';
    }
    const inputDate = new Date(date);
    const formattedDate = `${inputDate.getHours()}:${inputDate.getMinutes()} ${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()}`;
    return formattedDate;
}