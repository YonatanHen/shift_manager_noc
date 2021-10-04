import axios from "axios";

export default async(uname, hourlySalary = 45) => {
    let data
    let hoursCounter = { morningOrNoon: 0, noon: 0, night: 0, fridayMorning: 0, fridayNoon: 0 }
    let salary = 0
    let totalHours = 0
    await axios.get(`/get-user-shifts/${uname}`)
    .then(res => {
        data = res.data
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })

    const currentMonth = new Date().getMonth()
    data = data.filter(item => (new Date(item.end).getMonth() === currentMonth && new Date(item.end).getDay() < 24 && new Date(item.end).getDay() >= 1)
                    || (new Date(item.end).getMonth() === currentMonth - 1 && new Date(item.end).getDay() >= 25))
    console.log(data)
    for(let i = 0 ; i < data.length ; i++) {

        totalHours += Math.abs(Date.parse(data[i].end) - Date.parse(data[i].start)) / 3600000
        salary += shiftSalary(data[i].start, data[i].end, hourlySalary, hoursCounter)

    }

    return {totalHours, salary, hoursCounter}
} 

const shiftSalary = (dateOne, dateTwo, hourlySalary, hoursCounter) => {
    const dateOneObj = new Date(dateOne);
    const dateTwoObj = new Date(dateTwo);
    let isCaclculated = false
    //convert time from milisec to hours
    const totalHours = Math.abs(dateTwoObj.getTime() - dateOneObj.getTime()) / 3600000
    console.log(totalHours)
    let sum = 0
    let addittionlaHours = 0
    if(totalHours > 8)
        addittionlaHours = totalHours - 8

    let j = 1, i = dateOneObj.getHours()
    console.log(i)
    for (; i < totalHours + dateOneObj.getHours() - addittionlaHours ; i++, j++) {
        if ( dateOneObj.getDay() === 6 ) {
            if ( i > 7 && i <= 15) {
                sum += (hourlySalary * 1.25)
                if (!isCaclculated) {
                    hoursCounter.fridayMorning += totalHours
                    isCaclculated = true
                } 
            }
            else if  ( i > 15 && i <= 23) {
                sum += (hourlySalary * 1.5)
                if (!isCaclculated) {
                    hoursCounter.fridayNoon += totalHours
                    isCaclculated = true
                } 
            }
        }
        else {
             if ( i >= 23  || i < 7) {
                sum += (hourlySalary * 1.5)
                if (!isCaclculated) {
                    hoursCounter.night += totalHours
                    isCaclculated = true
                } 
            }
            else {
                sum += hourlySalary

                if ( i >= 7 && i < 15 && !isCaclculated){
                    hoursCounter.morning +=totalHours
                    isCaclculated = true
                }
                else if (!isCaclculated) {
                    hoursCounter.noon += totalHours
                    isCaclculated = true
                }
            }
        }
    }

    //Calculate addittional hours
    if (j > 8 && j <=10) {
        sum += (hourlySalary * 1.25 * addittionlaHours)
    }
    else if (j > 10 && j <= 12) {
        sum += hourlySalary * 1.25 * 2 + hourlySalary * 1.5 * (addittionlaHours - 2)
    }

    return sum
}

// const 