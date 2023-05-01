// File: JazzTasksCalendar.js
// Date: 2023-04-30
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Calendar functions

// Class holding data for one calendar entry
class CalendarEntry
{
    constructor(i_reg_number, i_title, i_responsible, i_year, i_month, i_day)
    {
        this.m_reg_number = i_reg_number;

        this.m_title = i_title;

        this.m_responsible = i_responsible;

        this.m_year = i_year;

        this.m_month = i_month;

        this.m_day = i_day;

        this.m_calendar_date = null;

        this.setCalendarDate();

    } // constructor

    // Creates and sets the calendar date object
    setCalendarDate()
    {
        this.m_calendar_date = new CalendarDate(this.m_year, this.m_month, this.m_day);

    } // setCalendarDate

    // Returns the calendar date object
    getCalendarDate()
    {
        return this.m_calendar_date;

    } // getCalendarDate

    // Returns the registration number
    getRegNumber()
    {
        return this.m_reg_number;
    }

    // Returns the title
    getTitle()
    {
        return this.m_title;
    }

} // CalendarEntry

// Holds a calendar date
class CalendarDate
{
    constructor(i_year, i_month, i_day)
    {
        this.m_year = i_year;

        this.m_month = i_month;

        this.m_day = i_day;
    }

    getYear()
    {
        return this.m_year;
    }

    getMonth()
    {
        return this.m_month;
    }
    getDay()
    {
        return this.m_day;
    }

    getDate()
    {
        var ret_date = new Date(this.getYear(), this.getMonth()-1, this.getDay());

        return ret_date;

    } // getDate

    getDateSwissString()
    {
        return getSwissDateString(this.getYear(), this.getMonth(), this.getDay());

    } // getDateSwissString


} // CalendarDate

// Class holding calendar entries
class Calendar
{
    // Input is an array of task registration numbers.
    constructor(i_task_reg_numbers, i_season_xml, i_display_table, i_display_all_entries)
    {
        // Input array of task registration numbers
        this.m_task_reg_numbers = i_task_reg_numbers;

        this.m_season_xml = i_season_xml;

        this.m_display_table = i_display_table;

        // Flag telling if all calendar entries shall be displayed or only for coming dates
        this.m_display_all_entries = i_display_all_entries;

        // Array of calendar entries
        this.entry_array = [];

        this.setCalendarEntryArray();

    } // constructor

    // Sets the calendar entry array (entry_array)
    setCalendarEntryArray()
    {
        var index_out = 0;

        var n_records = this.m_task_reg_numbers.length;
    
        for (var result_index=0; result_index < n_records; result_index++)
        {
    
            var reg_number = this.m_task_reg_numbers[result_index];
    
            var task_number = this.m_display_table.getTaskNumberFromRegistrationNumber(reg_number);
    
            var current_record = this.m_display_table.getJazzTaskRecord(task_number);

            if (this.isCalendarEntry(current_record))
            {
                if (this.isOneFixDate(current_record))
                {
                    var current_season_str = 'current';

                    this.appendCalendarEntry(reg_number, current_record, current_season_str);

                    current_season_str = 'next';

                    this.appendCalendarEntry(reg_number, current_record, current_season_str);

                    if ( this.m_display_all_entries)
                    {
                        current_season_str = 'previous';

                        this.appendCalendarEntry(reg_number, current_record, current_season_str);
                    }
                }
                else if (this.isConcertDate(current_record))
                {
                    this.appendCalendarEntries(reg_number, current_record);
                }
                else
                {
                    alert("setCalendarEntryArray Error");
                }

            } // isCalendarEntry

        } // result_index

        this.entry_array = this.getSortedCalendarEntryArray();

    } // setCalendarEntryArray

    // Returns a list of <div> elements for all records
    getListOfTasksHtmlString()
    {
        var ret_list_tasks_str = '';

        var n_records = this.entry_array.length;

        // n_records = 1; 

        for (var result_index=0; result_index < n_records; result_index++)
        {
            var calendar_entry = this.entry_array[result_index];

            var reg_number = calendar_entry.getRegNumber();

            var task_number = this.m_display_table.getTaskNumberFromRegistrationNumber(reg_number);

            var current_record = this.m_display_table.getJazzTaskRecord(task_number);
        
            var title_str = current_record.getJazzTaskTitle();

            var responsibles_str = current_record.getJazzTaskResponsible();

            var deputies_str = current_record.getJazzTaskDeputiesLabelString();

            if (responsibles_str == 'Termin')
            {
                responsibles_str = current_record.getJazzTaskRemark();
            }

            var calendar_date = calendar_entry.getCalendarDate();

            var date_str = calendar_date.getDateSwissString();

            ret_list_tasks_str = ret_list_tasks_str + this.getOneResultTaskString(reg_number, title_str, responsibles_str + deputies_str, date_str);

        }

        return ret_list_tasks_str;

    } // getListOfTasksHtmlString    

    // Returns the string with <div> elements corresponding to one task
    getOneResultTaskString(i_reg_number, i_title_str, i_responsibles_str, i_date_str)
    {
        var ret_one_task_str = '';

        var click_str = getOnClickTaskRecordString(i_reg_number);

        ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record" >';

        ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_date"' + click_str + '>';

        ret_one_task_str = ret_one_task_str + i_date_str;

        ret_one_task_str = ret_one_task_str + '</div>';

        ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_title"' + click_str + '>';

        ret_one_task_str = ret_one_task_str + '<b>' + i_title_str + '</b>';

        ret_one_task_str = ret_one_task_str + '</div>';

        ret_one_task_str = ret_one_task_str + '</div>';

        ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_responsible"' + click_str + '>';

        ret_one_task_str = ret_one_task_str + i_responsibles_str;

        ret_one_task_str = ret_one_task_str + '</div>';

        return ret_one_task_str;

    } // getOneResultTaskString    

    // Sort and remove passed calendar entries
    // 1. Create a copy of the 
    getSortedCalendarEntryArray()
    {
        var sorted_array = [];

        var index_out = 0;

        var copy_array = [];

        for (var index_copy=0; index_copy < this.entry_array.length; index_copy++)
        {
            var calendar_entry = this.entry_array[index_copy];

            var entry_date = calendar_entry.getCalendarDate();

            copy_array[index_copy] = new CalendarEntry("NotUsedEntry", "NotUsedEntry", "NotUsedEntry", 
                        entry_date.getYear(), entry_date.getMonth(), entry_date.getDay());
        }

        var used_calendar_entry = new CalendarEntry("UsedEntry", "UsedEntry", "UsedEntry", 2040, 1, 1);

        for (var index_entry=0; index_entry < copy_array.length; index_entry++)
        {
           var index_min = this.indexMinNumberDays(copy_array);

           if (index_min >= 0)
           {
                sorted_array[index_out] = this.entry_array[index_min];

                index_out = index_out + 1;

                copy_array[index_min] = used_calendar_entry;
           }
           else
           {
               break;
           }
            
        }

        return sorted_array;

    } // getSortedCalendarEntryArray

    // Returns the index for minimum number of days. 
    // Negative index means that all records have been used
    indexMinNumberDays(i_entry_array)
    {
        var ret_index = -1;

        var now_calendar_date = this.getCalenderDateNow();

        var min_days = 5000000;

        for (var index_entry=0; index_entry < i_entry_array.length; index_entry++)
        {
            var current_entry = i_entry_array[index_entry];

            var title_str = current_entry.getTitle();

            if (title_str == "NotUsedEntry")
            {
                var current_date = current_entry.getCalendarDate();

                var diff_days = Calendar.daysBetweenDates(now_calendar_date, current_date);
    
                if (this.m_display_all_entries)
                {
                    if (diff_days < min_days)
                    {
                        ret_index = index_entry;
        
                        min_days = diff_days;
                    }  
                }
                else
                {
                    if (diff_days >= 0 && diff_days < min_days)
                    {
                        ret_index = index_entry;
        
                        min_days = diff_days;
                    }              
                }
            } // NotUsedEntry


            
        } // index_entry

        return ret_index;

    } // indexMinNumberDays

    // Returns a calendar date now object
    getCalenderDateNow()
    {
        var now_date = new Date();

        var now_year = now_date.getFullYear();

        var now_month = now_date.getMonth() + 1;

        var now_day = now_date.getDate(); 

        var calender_date = new CalendarDate(now_year, now_month, now_day);

        return calender_date;

    } // getCalenderDateNow

    // Appends a calendry entry for one fix date
    appendCalendarEntry(i_reg_number, i_record, i_current_season_str)
    {
        var finish_month = i_record.getJazzTaskFinishMonth();

        var finish_day = i_record.getJazzTaskFinishDay();

        var finish_year = Calendar.getCalenderActiveSeasonStartYear();

        if (finish_month >= 1 && finish_month <= 3)
        {
            finish_year = finish_year + 1;
        }

        if (i_current_season_str == 'next')
        {
            if (i_record.getJazzTaskResponsible() == 'Termin')
            {
                return;
            }
            else if (finish_month >= 4 && finish_month <= 5)
            {
                finish_year = finish_year + 1;
            }     
            else
            {
                return;
            }         
        }

        if (i_current_season_str == 'previous')
        {
            if (finish_month >= 1 && finish_month <= 3)
            {
                finish_year = finish_year - 1;
            }            
            else if (finish_month >= 10 && finish_month <= 12)
            {
                finish_year = finish_year - 1;
            }  
            else
            {
                return;
            }         
        }

        var title_str = i_record.getJazzTaskTitle();

        var responsible_name = i_record.getJazzTaskResponsible();

        var calendar_entry = new CalendarEntry(i_reg_number, title_str, responsible_name, finish_year, finish_month, finish_day);

        var n_entries = this.entry_array.length;

        this.entry_array[n_entries] = calendar_entry;

    } // appendCalendarEntry

    // Appends calendry entries for concert dates
    appendCalendarEntries(i_reg_number, i_record)
    {
        var title_str = i_record.getJazzTaskTitle();

        var responsible_name = i_record.getJazzTaskResponsible();

        var date_array = this.getConcertDates();

        var days_before = i_record.getJazzTaskAfterConcert();

        var days_after = i_record.getJazzTaskBeforeConcert();

        var move_days = -12345;

        if (days_before.length > 0)
        {
            move_days = -parseInt(days_before);
        }
        else
        {
            move_days = parseInt(days_after);
        }

        for (var index_date=0; index_date < date_array.length; index_date++)
        {
            var date_concert = date_array[index_date];

            var date_moved = Calendar.dateMoveDays(date_concert, move_days);

            var calendar_entry = new CalendarEntry(i_reg_number, title_str, responsible_name, date_moved.getYear(), date_moved.getMonth(), date_moved.getDay());

            var n_entries = this.entry_array.length;

            this.entry_array[n_entries] = calendar_entry;
        }
        

    } // appendCalendarEntries

    // Returns the concert dates
    getConcertDates()
    {
        var ret_date_array = [];

        var n_concerts = this.m_season_xml.getNumberOfConcerts();

        for (var concert_number=1; concert_number <= n_concerts; concert_number++)
        {
            var concert_year = this.m_season_xml.getConcertYear(concert_number);

            var concert_month = this.m_season_xml.getConcertMonth(concert_number);
        
            var concert_day = this.m_season_xml.getConcertDay(concert_number);
            
            var concert_date = new CalendarDate(concert_year, concert_month, concert_day);

            ret_date_array[concert_number-1] = concert_date;
        }

        return ret_date_array;

    } // getConcertDates

    // Returns true if the task record is a calendar entry
    isCalendarEntry(i_record)
    {
        if (this.isOneFixDate(i_record) || this.isConcertDate(i_record))
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isCalendarEntry

    // Returns true if it is one calendar date
    isOneFixDate(i_record)
    {
        var finish_day = i_record.getJazzTaskFinishDay();

        if (finish_day.length > 0)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isOneFixDate

    // Returns true if it is a concert date
    isConcertDate(i_record)
    {
        var days_before = i_record.getJazzTaskAfterConcert();

        var days_after = i_record.getJazzTaskBeforeConcert();

        if (days_before.length > 0 || days_after.length > 0 )
        {
            return true;
        }
        else
        {
            return false;
        }

    } // isConcertDate

    // Returns the active current year 
    // 20230328 Changed day from 29 to 21
    // This is a weakness in the application. Calender events are
    // only displayed for the current season that is defined by this date
    static getCalenderActiveSeasonStartYear()
    {
        var ret_active_year = -12345;

        var current_date = new Date();

        var current_year = current_date.getFullYear();

        var season_end_month = 3;

        var season_end_day = 21;

        if (DateIsPassed(current_year, season_end_month, season_end_day))
        {
            ret_active_year = current_year;
        }
        else
        {
            ret_active_year = current_year - 1;
        }

        return ret_active_year;

    } // getTasksActiveSeasonStartYear    

    // Reurns the number of dates between two dates
    // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/
    static daysBetweenDates(i_date_1, i_date_2)
    {
        // new Date(year, monthIndex, day)

        var date_1 = new Date(i_date_1.getYear(), i_date_1.getMonth()-1, i_date_1.getDay());

        var date_2 = new Date(i_date_2.getYear(), i_date_2.getMonth()-1, i_date_2.getDay());

        var diff_time = date_2.getTime() - date_1.getTime();
  
        var diff_time_days = diff_time / (1000 * 3600 * 24);

        return diff_time_days;

    } // daysBetweenDates

    // Returns a date that has been moved (postponed or the opposite)
    static dateMoveDays(i_date, i_n_days)
    {
        var date_in = new Date(i_date.getYear(), i_date.getMonth()-1, i_date.getDay());

        var diff_time = i_n_days * (1000 * 3600 * 24);

        var date_out = new Date(date_in - diff_time);

        var out_year = date_out.getFullYear();
        
        var out_month = date_out.getMonth() + 1;
        
        var out_day = date_out.getDate();

        var calender_date = new CalendarDate(out_year, out_month, out_day);

        return calender_date;

    } // dateMoveDays

}// Calendar

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Calendar Tasks Functions //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns registration numbers for calendar tasks
function getCalendarTasks(i_task_reg_numbers)
{
    var ret_calendar_array = [];

    var index_out = 0;

    var n_records = i_task_reg_numbers.length;

    for (var result_index=0; result_index < n_records; result_index++)
    {

        var reg_number = i_task_reg_numbers[result_index];

        var task_number = g_display_table.getTaskNumberFromRegistrationNumber(reg_number);

        var current_record = g_display_table.getJazzTaskRecord(task_number);
    
        var title_str = current_record.getJazzTaskTitle();

        var finish_day = current_record.getJazzTaskFinishDay();

        var finish_month = current_record.getJazzTaskFinishMonth();

        var responsible_name = current_record.getJazzTaskResponsible();

        var days_before = current_record.getJazzTaskAfterConcert();

        var days_after = current_record.getJazzTaskBeforeConcert();

        if (finish_day.length > 0  || responsible_name == 'Termin' ||
            days_before.length > 0 || days_after.length > 0           )
        {
            ret_calendar_array[index_out] = reg_number;

            index_out = index_out + 1;
        }

    }

    return ret_calendar_array;

} // getCalendarTasks

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Calendar Tasks Functions ////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Test Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Temporary season XML test function
function testSeasonXml()
{
    var year_autumn = g_season_xml.getYearAutumn();

    var year_autumn_int = g_season_xml.getYearAutumnInt();

    var year_spring = g_season_xml.getYearSpring();

    var publish_program = g_season_xml.getPublishProgram();

    var publish_program_bool = g_season_xml.getPublishProgramBool();

    var number_concerts = g_season_xml.getNumberOfConcerts();

    var concert_cancelled = g_season_xml.getConcertCancelled(4);

    var concert_cancelled_bool = g_season_xml.ConcertIsCancelled(4);

    var flyer_publish = g_season_xml.FlyerTextCanBePublishedOnHomepage(4);

    var concert_year = g_season_xml.getConcertYear(4);

    var concert_month = g_season_xml.getConcertMonth(4);

    var concert_day = g_season_xml.getConcertDay(4);

    var number_musicians = g_season_xml.getNumberOfMusicians(4);

    var musician_name = g_season_xml.getMusicianName(4, 2);

    alert("concert_cancelled= " + concert_cancelled);

} // testSeasonXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Test Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////