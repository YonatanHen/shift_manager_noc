import axios from "axios";

export default async(uname) => {
    let data
    await axios.get(`/get-user-shifts/${uname}`)
    .then(res => {
        data = res.data
    })
    .catch(err => {
        console.log(err)
    })
    
    console.log(data)
} 

const shiftSalary = (dateOne, dateTwo) => {
    const dateOneObj = new Date(dateOne);
    const dateTwoObj = new Date(dateTwo);
    // const milisec = Math.abs(data.end - data.start)
    //convert time from milisec to hours
    const totalHours = Math.abs(dateTwoObj.getTime() - dateOneObj.getTime()) / 3600000
    
    const perHour = 45
    let sum = 0
    
    const addittionlaHours = totalHours - 8
    console.log(addittionlaHours)

    let j = 1, i = dateOneObj.getHours()
    for (; i < totalHours + dateOneObj.getHours() - addittionlaHours ; i++, j++) {
        console.log(sum)
        if ( dateOneObj.getDay() === 6 ) {
            if ( i > 7 && i <= 15) {
                sum += (perHour * 1.25)
            }
            else if  ( i > 15 && i <= 23) {
                sum += (perHour * 1.5)
            }
        }
        else {
            if ( i >= 15 && i < 23) {
                sum += perHour
            }
            else if  ( i >= 23 ) {
                sum += (perHour * 1.5)
            }
        }
    }

    //Calculate addittional hours
    if (j > 8 && j <=10) {
        sum += (perHour * 1.25 * addittionlaHours)
    }
    else if (j > 10 && j <= 12) {
        sum += perHour * 1.25 * 2 + perHour * 1.5 * (addittionlaHours - 2)
    }

    return sum
}