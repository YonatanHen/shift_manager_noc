export default (report) => {
    let newArr = []
    newArr = newArr.concat(report.production.alerts ? report.production.alerts : [],
        report.production.follows ? report.production.follows : [],
        report.staging.alerts ?  report.staging.alerts : [],
        report.staging.follows ? report.staging.follows : [])
    return newArr
}