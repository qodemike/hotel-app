
const currentDate = new Date();

const nextDate = new Date(`${currentDate.getFullYear}-${currentDate.getMonth()}-${currentDate.getDate()+1}`)

console.log(nextDate.toDateString())