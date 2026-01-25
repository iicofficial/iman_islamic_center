import React, { useState, useEffect } from 'react';
import './DateTimePicker.css';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';

export const DatePicker = ({ value, onChange, label, required = false, minDate = null, name = 'date' }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || '');
    const [currentMonth, setCurrentMonth] = useState(new Date());

    useEffect(() => {
        if (value) setSelectedDate(value);
    }, [value]);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { firstDay, daysInMonth };
    };

    const handleDateClick = (day) => {
        const year = currentMonth.getFullYear();
        const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        const dateString = `${year}-${month}-${dayStr}`;
        setSelectedDate(dateString);

        // Instant selection - No confirm button needed
        onChange({ target: { name: name, value: dateString } });
        setShowPicker(false);
    };

    const formatDisplayDate = (dateStr) => {
        if (!dateStr) return 'Select Date';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isDateDisabled = (day) => {
        if (!minDate) return false;
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const checkDate = new Date(year, month, day);
        const min = new Date(minDate);
        return checkDate < min;
    };

    const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const isSelected = selectedDate &&
            new Date(selectedDate + 'T00:00:00').getDate() === day &&
            new Date(selectedDate + 'T00:00:00').getMonth() === currentMonth.getMonth() &&
            new Date(selectedDate + 'T00:00:00').getFullYear() === currentMonth.getFullYear();

        const isDisabled = isDateDisabled(day);

        days.push(
            <div
                key={day}
                className={`calendar-day ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleDateClick(day)}
            >
                {day}
            </div>
        );
    }

    // handleConfirm removed

    return (
        <div className="datetime-picker-wrapper">
            {label && <label className="form-label">{label}</label>}
            <div className="datetime-input-group" onClick={() => setShowPicker(!showPicker)}>
                <FaCalendarAlt className="datetime-icon" />
                <input
                    type="text"
                    className="form-control datetime-display"
                    value={formatDisplayDate(selectedDate)}
                    readOnly
                    required={required}
                />
            </div>

            {showPicker && (
                <>
                    <div className="datetime-overlay" onClick={() => setShowPicker(false)}></div>
                    <div className="datetime-picker-dropdown date-picker">
                        <div className="datetime-picker-header">Select Date</div>
                        <div className="calendar-header">
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="calendar-nav-btn"
                            >
                                ‹
                            </button>
                            <div className="calendar-month-year-select" onClick={(e) => e.stopPropagation()}>
                                <select
                                    value={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
                                    onChange={(e) => {
                                        const [m, y] = e.target.value.split('-').map(Number);
                                        setCurrentMonth(new Date(y, m));
                                    }}
                                >
                                    {Array.from({ length: 48 }, (_, i) => {
                                        const d = new Date();
                                        d.setMonth(d.getMonth() - 24 + i);
                                        const m = d.getMonth();
                                        const y = d.getFullYear();
                                        return (
                                            <option key={`${m}-${y}`} value={`${m}-${y}`}>
                                                {months[m]} {y}
                                            </option>
                                        );
                                    })}
                                    {/* Add a few more years back for birth dates if needed */}
                                    {currentMonth.getFullYear() < new Date().getFullYear() - 2 && (
                                        <option value={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}>
                                            {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                        </option>
                                    )}
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="calendar-nav-btn"
                            >
                                ›
                            </button>
                        </div>
                        <div className="calendar-weekdays">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="calendar-weekday">{day}</div>
                            ))}
                        </div>
                        <div className="calendar-days">
                            {days}
                        </div>
                        {/* Footer removed for DatePicker */}
                    </div>
                </>
            )}
        </div>
    );
};

export const TimePicker = ({ value, onChange, label, required = false, name = 'time' }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedTime, setSelectedTime] = useState(value || '');
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [period, setPeriod] = useState('PM');

    useEffect(() => {
        if (value) {
            setSelectedTime(value);
            // Parse 24-hour format to 12-hour
            const [h, m] = value.split(':');
            const hourNum = parseInt(h);
            setHour(String(hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum).padStart(2, '0'));
            setMinute(m);
            setPeriod(hourNum >= 12 ? 'PM' : 'AM');
        }
    }, [value]);

    const handleTimeSelect = () => {
        let hour24 = parseInt(hour);
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        if (period === 'AM' && hour24 === 12) hour24 = 0;

        const timeString = `${String(hour24).padStart(2, '0')}:${minute}`;
        setSelectedTime(timeString);
        onChange({ target: { name: name, value: timeString } });
        setShowPicker(false);
    };

    const formatDisplayTime = (timeStr) => {
        if (!timeStr) return 'Select Time';
        const [h, m] = timeStr.split(':');
        const hourNum = parseInt(h);
        const hour12 = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        return `${hour12}:${m} ${ampm}`;
    };

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = ['00', '30'];

    return (
        <div className="datetime-picker-wrapper">
            {label && <label className="form-label">{label}</label>}
            <div className="datetime-input-group" onClick={() => setShowPicker(!showPicker)}>
                <FaClock className="datetime-icon" />
                <input
                    type="text"
                    className="form-control datetime-display"
                    value={formatDisplayTime(selectedTime)}
                    readOnly
                    required={required}
                />
            </div>

            {showPicker && (
                <>
                    <div className="datetime-overlay" onClick={() => setShowPicker(false)}></div>
                    <div className="datetime-picker-dropdown time-picker">
                        <div className="datetime-picker-header">Select Time</div>
                        <div className="time-picker-body">
                            <div className="time-column">
                                <div className="time-column-label">Hour</div>
                                <div className="time-scroll">
                                    {hours.map(h => (
                                        <div
                                            key={h}
                                            className={`time-option ${hour === h ? 'selected' : ''}`}
                                            onClick={() => setHour(h)}
                                        >
                                            {h}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="time-separator">:</div>
                            <div className="time-column">
                                <div className="time-column-label">Minute</div>
                                <div className="time-scroll">
                                    {minutes.map(m => (
                                        <div
                                            key={m}
                                            className={`time-option ${minute === m ? 'selected' : ''}`}
                                            onClick={() => setMinute(m)}
                                        >
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="time-column">
                                <div className="time-column-label">Period</div>
                                <div className="time-scroll">
                                    {['AM', 'PM'].map(p => (
                                        <div
                                            key={p}
                                            className={`time-option ${period === p ? 'selected' : ''}`}
                                            onClick={() => setPeriod(p)}
                                        >
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="datetime-picker-footer">
                            <button type="button" className="btn btn-primary" onClick={handleTimeSelect}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
