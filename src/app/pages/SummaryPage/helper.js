import dayjs from 'dayjs'

export const generateReport = (year, month, index, setData) => {
  let dataInMonth = {data: [], total: month.length}
  let data = new Array(dayjs(`${year}-${index}`).daysInMonth())
  for (let i = 0; i < data.length; i++) {
    data[i] = {day: i+1, reports: month.filter(report => report.dayCreated === i+1), amount: month.filter(report => report.dayCreated === i+1).length}
  }
  dataInMonth.data = data
  setData(dataInMonth)
}

export const generateUser = (year, month, index, setData) => {
  let dataInMonth = {data: [], total: month.length}
  let data = new Array(dayjs(`${year}-${index}`).daysInMonth())
  for (let i = 0; i < data.length; i++) {
    data[i] = {day: i+1, users: month.filter(user => dayjs(user.createdAt).date() === i+1), amount: month.filter(user => dayjs(user.createdAt).date() === i+1).length}
  }
  dataInMonth.data = data
  setData(dataInMonth)
}

export const monthlyAmount = (month, amount) => ({"x": month, "y": amount})

export const generateYearData = (data, months) => {

    let yearData = [...data]

    yearData[0] = monthlyAmount("Jan", months[0] ? months[0].total : 0)
    yearData[1] = monthlyAmount("Feb", months[1] ? months[1].total : 0)
    yearData[2] = monthlyAmount("Mar", months[2] ? months[2].total : 0)
    yearData[3] = monthlyAmount("Apr", months[3] ? months[3].total : 0)
    yearData[4] = monthlyAmount("May", months[4] ? months[4].total : 0)
    yearData[5] = monthlyAmount("Jun", months[5] ? months[5].total : 0)
    yearData[6] = monthlyAmount("Jul", months[6] ? months[6].total : 0)
    yearData[7] = monthlyAmount("Aug", months[7] ? months[7].total : 0)
    yearData[8] = monthlyAmount("Sep", months[8] ? months[8].total : 0)
    yearData[9] = monthlyAmount("Oct", months[9] ? months[9].total : 0)
    yearData[10] = monthlyAmount("Nov", months[10] ? months[10].total : 0)
    yearData[11] = monthlyAmount("Dec", months[11] ? months[11].total : 0)

    return yearData

}

export const generateMonthlyData = (datas, setMonthlyData) => setMonthlyData.map((set, i) => set(datas.filter(data => data.monthCreated === i)))