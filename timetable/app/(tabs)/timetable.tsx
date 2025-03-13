import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIMES = [
  '08:00-08:50', '08:50-09:40', '09:40-10:30', 'Break',
  '10:45-11:35', '11:35-12:25', '12:25-01:15', 'Lunch',
  '02:05-02:55', '02:55-03:45', '03:45-04:35'
];

const TIMETABLE_DATA = {
  Monday: {
    '08:50-09:40': { subject: '23CSE211 (DAA)', type: 'regular' },
    '09:40-10:30': { subject: '23MAT216 (PROB)', type: 'regular' },
    '10:45-11:35': { subject: '23CSE212 (PFL)', type: 'regular' },
    '11:35-12:25': { subject: '23CSE213 (COA)', type: 'regular' },
    '12:25-01:15': { subject: '23CSE214 (OS)', type: 'regular' },
    '02:55-04:35': { subject: '23CSE211 (DAA)', type: 'regular' }, // Spanning two slots
  },
  Tuesday: {
    '10:45-12:25': { subject: '23CSE212 (PFL)', type: 'regular' }, // Spanning two slots
    '12:25-01:15': { subject: '23MAT216 (PROB)', type: 'regular' },
    '02:55-03:45': { subject: '23CSE214 (OS)', type: 'regular' },
    '03:45-04:35': { subject: '23CSE213 Tutorial (COA)', type: 'regular' },
  },
  Wednesday: {
    '08:50-09:40': { subject: 'Free Elective - I', type: 'regular' },
    '10:45-11:35': { subject: '22ADM201', type: 'regular' },
    '11:35-12:25': { subject: '23CSE211 (DAA)', type: 'regular' },
    '02:05-04:35': { subject: 'CIR', type: 'cir' }, // Spanning three slots
  },
  Thursday: {
    '08:50-09:40': { subject: '23MAT216 (PROB)', type: 'regular' },
    '09:40-10:30': { subject: '23CSE212 (PFL)', type: 'regular' },
    '10:45-11:35': { subject: '23CSE211 (DAA)', type: 'regular' },
    '11:35-12:25': { subject: '23CSE213 (COA)', type: 'regular' },
    '12:25-01:15': { subject: 'Mentoring', type: 'mentoring' },
    '02:05-03:45': { subject: '23CSE214 (OS)', type: 'regular' }, // Spanning two slots
  },
  Friday: {
    '08:50-09:40': { subject: '23CSE213 (COA)', type: 'regular' },
    '09:40-10:30': { subject: '23CSE214 (OS)', type: 'regular' },
    '11:35-12:25': { subject: 'Free Elective - I', type: 'regular' },
    '02:05-03:45': { subject: '23MAT216 (PROB)', type: 'regular' }, // Spanning two slots
  },
};

const SUBJECT_COLORS = {
  '23CSE211 (DAA)': '#FFD700',
  '23MAT216 (PROB)': '#ADFF2F',
  '23CSE212 (PFL)': '#00FFFF',
  '23CSE213 (COA)': '#FFA07A',
  '23CSE214 (OS)': '#20B2AA',
  'Mentoring': '#F2F2F2',
  'CIR': '#E6B8DE',
  'Free Elective - I': '#FFDD9E',
  '22ADM201': '#FFB6C1',
};

export default function Timetable() {
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('daily');
  const [currentDay, setCurrentDay] = useState(DAYS[new Date().getDay() - 1] || DAYS[0]);
  const getClassColor = (subject: string) => {
    return SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS] || '#ffffff';
  };

  const renderDailyView = () => {
    const daySchedule = TIMETABLE_DATA[currentDay as keyof typeof TIMETABLE_DATA] || {};
    return (
      <ScrollView style={styles.scheduleContainer}>
        {TIMES.map((time) => {
          const classInfo = daySchedule[time as keyof typeof daySchedule];
          if (time === 'Break' || time === 'Lunch') {
            return (
              <View key={time} style={styles.breakSlot}>
                <Text style={styles.breakText}>{time}</Text>
              </View>
            );
          }
          return (
            <View key={time} style={[
              styles.timeSlot,
              { backgroundColor: classInfo ? getClassColor(classInfo?.subject || '') : '#f5f5f5' }
            ]}>
              <Text style={styles.timeText}>{time}</Text>
              {classInfo && (
                <Text style={styles.subjectText}>{classInfo?.subject}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    );
  };

  const renderWeeklyView = () => (
    <ScrollView horizontal style={styles.weeklyContainer}>
      <ScrollView>
        <View style={styles.weeklyTable}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <View style={styles.timeCell}>
              <Text style={styles.headerText}>Time</Text>
            </View>
            {DAYS.map((day) => (
              <View key={day} style={styles.dayCell}>
                <Text style={styles.headerText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Time Slots */}
          {TIMES.map((time) => (
            <View key={time} style={styles.timeRow}>
              <View style={styles.timeCell}>
                <Text style={styles.timeCellText}>{time}</Text>
              </View>
              {DAYS.map((day) => {
                const classInfo = TIMETABLE_DATA[day as keyof typeof TIMETABLE_DATA]?.[time as keyof (typeof TIMETABLE_DATA)[keyof typeof TIMETABLE_DATA]];
                if (time === 'Break' || time === 'Lunch') {
                  return (
                    <View key={`${day}-${time}`} style={[styles.classCell, styles.breakCell]}>
                      <Text style={styles.breakCellText}>{time}</Text>
                    </View>
                  );
                }
                return (
                  <View
                    key={`${day}-${time}`}
                    style={[
                      styles.classCell,
                      { backgroundColor: classInfo ? getClassColor(classInfo?.subject || '') : '#f5f5f5' }
                    ]}>
                    {classInfo && (
                      <Text style={styles.classCellText}>{classInfo?.subject}</Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.viewToggle}
          onPress={() => setViewMode(viewMode === 'daily' ? 'weekly' : 'daily')}>
          <MaterialIcons name={viewMode === 'daily' ? 'view-week' : 'view-day'} size={24} color="white" />
          <Text style={styles.viewToggleText}>{viewMode === 'daily' ? 'Weekly' : 'Daily'}</Text>
        </TouchableOpacity>
        
        {viewMode === 'daily' && <Text style={styles.currentDay}>{currentDay}</Text>}
      </View>

      {viewMode === 'daily' ? renderDailyView() : renderWeeklyView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#111',
  },
  viewToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 20,
  },
  viewToggleText: {
    color: 'white',
    marginLeft: 8,
  },
  currentDay: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scheduleContainer: {
    flex: 1,
    padding: 16,
  },
  timeSlot: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  breakSlot: {
    backgroundColor: '#42a5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  timeText: {
    width: 120,
    fontSize: 14,
    color: '#333',
  },
  subjectText: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  breakText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weeklyContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  weeklyTable: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  timeCell: {
    width: 80,
    padding: 8,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCell: {
    width: 120,
    padding: 8,
    backgroundColor: '#FFEB9C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  classCell: {
    width: 120,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  breakCell: {
    backgroundColor: '#33CCFF',
  },
  timeCellText: {
    fontSize: 10,
    color: '#000',
  },
  classCellText: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
  },
  breakCellText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});
