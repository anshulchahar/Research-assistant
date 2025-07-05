'use client';

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useTaskStore } from '@/store/taskStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Timeline = () => {
  const { tasks } = useTaskStore();

  const events = tasks.map(task => ({
    title: task.title,
    start: task.createdAt,
    end: task.createdAt,
    allDay: true,
  }));

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default Timeline;
