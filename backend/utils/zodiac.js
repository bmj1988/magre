const { CalendarChinese } = require('date-chinese');

let cal = new CalendarChinese()

// We get a gregorian year and turn it into a chinese year

// cal.fromGregorian(2020, 12, 1)

// properties
// cal.cycle  //> 78
// cal.year   //> 1
// cal.month  //> 10
// cal.leap   //> true // is leap month
// cal.day    //> 9

const earthlyBranches = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig']
const heavenlyStems = ['Jia', 'Yi', 'Bing', 'Ding', 'Wu', 'Ji', 'Geng', 'Xin', 'Ren', 'Gui']

const chineseZodiacGenerator = (birthDate) => {
    /// JAVASCRIPT OBJECT BASED ON DATE INPUTS
    cal.fromDate(birthDate)

    const earthlyBranch = cal.year % 12
    const heavenlyStem = cal.year % 10

    return [earthlyBranch, heavenlyStem]
}

// console.log(zodiacGenerator(new Date('December 30, 1988')))
module.exports = chineseZodiacGenerator;
