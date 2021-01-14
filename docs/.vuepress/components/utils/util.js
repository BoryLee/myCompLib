//获取年
export const getYears = (start, end) => {
        const years = [];
        while (start <= end) {
            years.push(start);
            ++start;
        }
        return years;
    }
    //获取月
export const getMonths = () => {
        let index = 1;
        const months = [];
        while (index <= 12) {
            if (index < 10) {
                months.push('0' + index);
            } else {
                months.push(index);
            }
            ++index;
        }
        return months;
    }
    //获取日
export const getDays = (year, month) => {
    const days = [];
    //获取当月有几天
    const count = new Date(year, month, 0).getDate();
    let index = 1;
    while (index <= count) {
        if (index < 10) {
            days.push('0' + index);
        } else {
            days.push(index);
        }
        ++index;
    }
    return days;
}

//获取小时
export const getHours = () => {
        return createArray(24);
    }
    //获取分钟
export const getMinutes = () => {
        return createArray(60);
    }
    //获取秒
export const getSeconds = () => {
        return createArray(60);
    }
    //根据日期获取年月日时分秒
export const getDateTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [String(year), String(addZero(month)), String(addZero(day)), String(addZero(hour)), String(addZero(minute)),
        String(addZero(second))
    ];
}

export const getDateStringTime = (dateString) => {
    return dateString.split('-').map(item => addZero(item)).join('-')
}

//创建确定长度的数组
export const createArray = count => {
        return Array.from({
            length: count
        }, (value, index) => addZero(index))
    }
    //<10的数前面加0
export const addZero = (num) => {
    return num < 10 ? '0' + num : num;
}

/**
 *  YYYY 2020
 * 	MM   01-12
 * 	DD   01-31
 * 	HH	 01-24
 * 	mm   00-59
 * 	ss   00-59
 * 	根据传入的时间数组和类型转化为不同格式的时间字符串
 */
export const formateTime = (array, type) => {
    const types = [
        "YYYY",
        "YYYY-MM",
        "YYYY-MM-DD",
        "YYYY-MM-DD HH:mm",
        "YYYY-MM-DD HH:mm:ss",
    ];
    const index = types.findIndex((item) => item === type);
    if (index > -1) {
        const len = index;
        if (len > 2) {
            array.length = len + 2;
            return `${array.slice(0, 3).join("-")} ${array.slice(3).join(":")}`;
        } else {
            array.length = len + 1;
            return `${array.slice(0, 3).join("-")}`;
        }
    }
    return "";
}

/**
 * 古时十二时辰
 */
export const chinaHours = [{
        name: ' 子时',
        startTime: '23:00:00',
        endTime: '00:59:59',
    },
    {
        name: '丑时',
        startTime: '01:00:00',
        endTime: '02:59:59',
    },
    {
        name: '寅时',
        startTime: '03:00:00',
        endTime: '04:59:59',
    },
    {
        name: '卯时',
        startTime: '05:00:00',
        endTime: '06:59:59',
    },
    {
        name: '辰时',
        startTime: '07:00:00',
        endTime: '08:59:59',
    },
    {
        name: '巳时',
        startTime: '09:00:00',
        endTime: '10:59:59',
    },
    {
        name: '午时',
        startTime: '11:00:00',
        endTime: '12:59:59',
    },
    {
        name: '未时',
        startTime: '13:00:00',
        endTime: '14:59',
    },
    {
        name: '申时',
        startTime: '15:00:00',
        endTime: '16:59:59',
    },
    {
        name: '酉时',
        startTime: '17:00:00',
        endTime: '18:59:59',
    },
    {
        name: ' 戌时',
        startTime: '19:00:00',
        endTime: '20:59:59',
    },
    {
        name: '亥时',
        startTime: '21:00:00',
        endTime: '22:59:59',
    },

]

/**
 * time: 传入时间
 * 返回：时辰
 */
export const getChinaTime = (time) => {
        const currentSeconds = timeToSeconds(time);
        const index = chinaHours.findIndex((item, index) => {
            const startSeconds = timeToSeconds(item.startTime);
            const endSeconds = timeToSeconds(item.endTime);
            if (index == 0) {
                const startEndSeconds = timeToSeconds('23:59:59');
                const endStartSeconds = timeToSeconds('00:00:00');
                return (currentSeconds >= startSeconds && currentSeconds <= startEndSeconds) || (currentSeconds >=
                    endStartSeconds && currentSeconds <= endSeconds);
            } else {
                return currentSeconds >= startSeconds && currentSeconds <= endSeconds;
            }
        })
        return chinaHours[index];
    }
    //将时间转化为秒数
export const timeToSeconds = (time) => {
    const timeArray = time.split(':');
    const currentTimeSeconds = timeArray.reduce((accumulator, currentValue, index) => {
        if (index == timeArray.length - 1) {
            return accumulator + Number(currentValue);
        } else if (index == 0) {
            return accumulator + Number(currentValue) * 3600;
        }
        return accumulator + Number(currentValue) * 60
    }, 0)
    return currentTimeSeconds;
}

export const getCurrentPageDays = (calendar, days, type, year, month, monthDays, day) => {
    let ary = [];
    for (let i = 1; i <= days; i++) {
        let lunarData, item = {};
        if (type === 'past') {
            lunarData = calendar.solar2lunar(year, month, monthDays - days + i);
            item['isSelect'] = lunarData.isToday;
        } else if (type === 'today') {
            lunarData = calendar.solar2lunar(year, month, i);
            item['isSelect'] = lunarData.isToday;
            if (i === day) {
                item['isSelect'] = true;
            }
        } else {
            lunarData = calendar.solar2lunar(year, month, i);
            item['isSelect'] = lunarData.isToday;
        }
        item['solaYear'] = lunarData.cYear;
        item['lunarYear'] = lunarData.gzYear;
        item['solarMonth'] = lunarData.cMonth;
        item['lunarlYear'] = lunarData.lYear;
        item['lunarlMonth'] = lunarData.lMonth;
        item['lunarlDay'] = lunarData.lDay;
        item['gzMonth'] = lunarData.gzMonth;
        item['gzDay'] = lunarData.gzDay;
        item['astro'] = lunarData.astro;
        item['animal'] = lunarData.Animal;
        item['lunarMonth'] = lunarData.IMonthCn;
        item['isToday'] = lunarData.isToday;
        item['weekDay'] = lunarData.nWeek;
        item['chinaWeekDay'] = lunarData.ncWeek;
        item['date'] = lunarData.date;
        item['lunarDate'] = lunarData.lunarDate;
        item['solarDay'] = lunarData.cDay;;
        item['isLeap'] = lunarData.isLeap;
        item['isTerm'] = lunarData.isTerm;
        item['term'] = lunarData.Term;
        item['festival'] = lunarData.festival;
        item['lunarFestival'] = lunarData.lunarFestival;
        item['lunarDay'] = calendar.toChinaDay(lunarData.lDay);
        if (type === 'past') {
            item['isPast'] = true;
        }
        if (type === 'future') {
            item['isFuture'] = true;
        }
        ary.push(item);
    }
    return ary;
}

export const getOtherMonthDate = (date, type) => {
    let [year, month, day, hours, minutes, seconds] = getDateList(date);
    if (type === 'last') {
        if (month === 0) {
            year -= 1;
            month = 11;
        } else {
            month -= 1;
        }
    } else if (type === 'next') {
        if (month === 11) {
            year += 1;
            month = 0;
        } else {
            month += 1;
        }
    }
    return new Date(year, month, day, hours, minutes, seconds);
}


export const getDateList = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return [year, month, day, hours, minutes, seconds];
}