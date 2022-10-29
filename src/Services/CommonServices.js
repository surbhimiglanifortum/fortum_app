
export const  getFormatedDate = (datetime) => {
    // datetime =   datetime.replace("Z","")
    var date = new Date(datetime);
    // return new Date(datetime).toDateString() + " " + new Date(datetime).toTimeString();

    // return datetime + date.getHours();
    return `${date.getDate()}/${[date.getMonth()]}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'} `

}