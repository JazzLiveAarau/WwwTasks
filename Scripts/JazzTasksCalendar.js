// File: JazzTasksDisplay.js
// Date: 2021-05-12
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Hauptfunktionen der Applikation Aufgaben Display

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object corresponding to XML file JazzTasks.xml
var g_display_xml = null;

// JazzTasksTable object that hold all JazzTask records 
var g_display_table = null;

// JazzTasksSearch object for the search of objects
var g_search = null;

// Active jazz task record number
var g_display_number = -12345;

// Active jazz task
var g_active_record = null;

// Search text box
var g_search_text_box = null;

// The tasks display intranet button
var g_task_display_intranet_button = null;

// The tasks display admin button
var g_task_display_admin_button = null;

// The tasks display help button
var g_task_display_help_button = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML object for XML file JazzTasks.xml and call initJazzTasksCalendarAfterLoadOfXml
function initJazzTasksCalendar()
{
    g_display_xml = new JazzTasksXml(initJazzTasksCalendarAfterLoadOfXml);

} // initJazzTasksCalendar

// Initialization after load of the XML object for the XML file JazzTask.xml
// 1. Creation of the JazzTasksTable object.
function initJazzTasksCalendarAfterLoadOfXml()
{
    g_display_table = new JazzTasksTable(g_display_xml);

    g_search = new JazzTasksSearch(g_display_table);

    g_display_number = 1;

    g_active_record = g_display_table.getJazzTaskRecord(g_display_number);

    setActiveRecordDiv();

    createTextBoxSearch();

    createTasksDisplayIntranetButton();

    createTasksDisplayAdminButton();

    createTasksDisplayHelpButton();

    closeActiveRecord();

    var search_str= '';

    searchDisplayResultList(search_str);

} // initJazzTasksCalendarAfterLoadOfXml


