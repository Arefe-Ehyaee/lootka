import React, { useState } from 'react';
import moment from 'jalali-moment';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const weekdays = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
moment.locale('fa');

const Calendar = () => {
    const [startDate, setStartDate] = useState<moment.Moment | null>(moment());
    const [returnDate, setReturnDate] = useState<moment.Moment | null>(null);
    const [currentMonth, setCurrentMonth] = useState<moment.Moment>(moment());

    const generateDays = (month: moment.Moment) => {
        const startOfMonth = month.clone().startOf('jMonth');
        const endOfMonth = month.clone().endOf('jMonth');
        const days = [];
        let day = startOfMonth.clone().startOf('week');

        while (day.isBefore(endOfMonth, 'day') || day.isSame(endOfMonth, 'day')) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(day.clone());
                day.add(1, 'day');
            }
            days.push(week);
        }

        return days;
    };

    const isSelected = (day: moment.Moment) => {
        return (
            (startDate && day.isSame(startDate, 'day')) ||
            (returnDate && day.isSame(returnDate, 'day'))
        );
    };

    const isBetween = (day: moment.Moment) => {
        return (
            startDate &&
            returnDate &&
            day.isAfter(startDate, 'day') &&
            day.isBefore(returnDate, 'day')
        );
    };

    const handleDayClick = (day: moment.Moment) => {
        if (!startDate || (startDate && returnDate)) {
            setStartDate(day);
            setReturnDate(null);
        } else if (startDate && day.isAfter(startDate, 'day')) {
            setReturnDate(day);
        }
    };

    const prevMonth = () => {
        setCurrentMonth(prev => prev.clone().subtract(1, 'jMonth'));
    };

    const nextMonth = () => {
        setCurrentMonth(prev => prev.clone().add(1, 'jMonth'));
    };

    const goToToday = () => {
        const today = moment();
        setCurrentMonth(today);
    };

    const renderMonth = (month: moment.Moment, isLeft: boolean) => {
        const days = generateDays(month);
        return (
            <div className="w-full md:w-1/2 p-1 font-myIranSansFaNumMedium text-[#222222] text-[12.56px]">
                <div className="flex justify-between items-center mb-[11px]">
                    {isLeft ? (
                        <button onClick={prevMonth}>
                            <ChevronRight size={18} />
                        </button>
                    ) : (
                        <span className="w-[18px]" />
                    )}

                    <span>
                        {month.format('jMMMM')} {month.format('jYYYY')}
                    </span>

                    {!isLeft ? (
                        <button onClick={nextMonth}>
                            <ChevronLeft size={18} />
                        </button>
                    ) : (
                        <span className="w-[18px]" />
                    )}
                </div>

                <div className="grid grid-cols-7 text-center mb-[6.84px]">
                    {weekdays.map((d, i) => (
                        <div key={i} className="text-[12.56px] text-[#757575]">
                            {d}
                        </div>
                    ))}
                </div>

                {days.map((week, i) => (
                    <div key={i} className="grid grid-cols-7 text-center font-myIranSansFaNumRegular">
                        {week.map((day, j) => {
                            const inMonth = day.jMonth() === month.jMonth();
                            const selected = isSelected(day);
                            const between = isBetween(day);
                            return (
                                <div
                                    key={j}
                                    className={`p-2 m-1 cursor-pointer text-[10.76px]
                                        ${selected ? 'bg-[#648A33] text-white ' : ''}
                                        ${between ? 'bg-[#648A33]/20' : ''}
                                        ${!inMonth ? 'text-white' : 'text-black'}
                                    `}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day.jDate()}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-2 font-myIranSansFaNumRegular mt-[10px]">
            <div className="flex flex-row items-center justify-start mb-1">
                <button
                    onClick={goToToday}
                    className="text-green-700 text-xs font-medium hover:underline w-[15%]"
                >
                    برو به امروز
                </button>
                <div className='border-t border-[#EDEDED] w-full'></div>
            </div>

            <div className="flex flex-row gap-4">
                {renderMonth(currentMonth, true)}
                {renderMonth(currentMonth.clone().add(1, 'jMonth'), false)}
            </div>

            <div className='flex flex-row justify-between mt-1'>
                <label className='flex flex-row items-center justify-center gap-2 text-[#333] font-myIranSansRegular text-xs'>
                    <input
                        type="checkbox"
                        className="w-4 h-4 accent-[#648A33]"
                    />
                    زمان سفرم هنوز مشخص نیست
                </label>

                <div className="text-center text-xs font-medium text-gray-800">
                    {startDate && returnDate
                        ? `رفت ${startDate.format('jD jMMMM')} - برگشت ${returnDate.format('jD jMMMM')}`
                        : ''}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
