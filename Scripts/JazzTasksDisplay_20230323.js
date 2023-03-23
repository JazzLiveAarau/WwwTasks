// File: JazzTasksDisplay.js
// Date: 2023-03-23
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Hauptfunktionen der Applikation Intranet & Aufgaben

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object corresponding to XML file JazzTasks.xml
var g_display_xml = null;

// XML objects for all XML files JazzProgramm_2021_2022.xml, JazzProgramm_2022_2023.xml, ..
var g_season_xml = null;

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

// The tasks display list button
var g_task_display_list_button = null;

// The tasks display help button
var g_task_display_help_button = null;

// The calendar check box
var g_calendar_check_box = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML object for XML file JazzTasks.xml and call loadSeasonXml
function initJazzTasksDisplay()
{
    g_display_xml = new JazzTasksXml(loadSeasonXml);

} // initJazzTasksDisplay

// Load the season XML object and call initJazzTasksDisplayAfterLoadOfXml
function loadSeasonXml()
{
    var calendar_active_start_year = Calendar.getCalenderActiveSeasonStartYear();

    g_season_xml = new JazzSeasonXml(calendar_active_start_year, initJazzTasksDisplayAfterLoadOfXml);
}

// Initialization after load of the XML object for the XML file JazzTask.xml
// 1. Creation of the JazzTasksTable object.
function initJazzTasksDisplayAfterLoadOfXml()
{
    g_display_table = new JazzTasksTable(g_display_xml);

    g_search = new JazzTasksSearch(g_display_table);

    g_display_number = 1;

    g_active_record = g_display_table.getJazzTaskRecord(g_display_number);

    setActiveRecordDiv();

    createTextBoxSearch();

    createCheckBoxCalendar();

    createTasksDisplayIntranetButton();

    createTasksDisplayAdminButton();

    createTasksDisplayListButton();

    createTasksDisplayHelpButton();

    closeActiveRecord();

    var search_str= '';

    searchDisplayResultList(search_str);

    // testSeasonXml();

} // initJazzTasksDisplayAfterLoadOfXml


// Search and display search result
// 1. Set the search control text box
// 2. Get an array of record numbers for a given search string. Call of JazzTaskSearch.search
// 3. Get a list of records as an HTML string for the array of record numbers.
//    Call of getListOfTasksHtmlString
// 4. Get the <div> element where the list shall be displayed. Call of getDivElementSearchTaskList
// 5. Display the list. Set attribute innerHTML of the display <div> element
function searchDisplayResultList(i_search_str)
{
    g_search_text_box.setValue(i_search_str)

    var result_registration_numbers = g_search.search(i_search_str);

    var list_str = "";

    if (g_calendar_check_box.getCheck() == "TRUE")
    {

        var calendar_object = new Calendar(result_registration_numbers, g_season_xml, g_display_table);

        list_str = calendar_object.getListOfTasksHtmlString();
    }
    else
    {
        list_str = getListOfTasksHtmlString(result_registration_numbers);
    }

    var el_list = getDivElementSearchTaskList();

    el_list.innerHTML = list_str;

} // searchSetResultList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User klicked the button close the display of the active record
function onClickCloseActiveRecord()
{
    closeActiveRecord();

} // onClickCloseActiveRecord

// User clicked a task record
function onClickTaskRecord(i_reg_number)
{
    g_display_number = g_display_table.getTaskNumberFromRegistrationNumber(i_reg_number);

    g_active_record = g_display_table.getJazzTaskRecord(g_display_number);

    setActiveRecordDiv();

    displayActiveRecord();

    window.scrollTo(0, 0);

} // onClickTaskRecord

// User clicked edit the task record
// https://www.w3schools.com/jsref/prop_loc_search.asp
function onClickEditActiveRecord()
{
    var reg_number = g_active_record.getJazzTaskRegNumber();

    var loc_search_str = '?' + reg_number;

    var admin_url = 'JazzTasks.htm' + loc_search_str;

    window.open(admin_url);

} // onClickEditActiveRecord

// User clicked the Intranet button
function onClickOfDisplayIntranetButton()
{
    var intranet_url = 'https://jazzliveaarau.ch/Intranet.htm';

    window.location.href = intranet_url;

} // onClickOfDisplayIntranetButton

// User clicked the Aufgaben Admin button
function onClickOfDisplayAdminButton()
{
    var tasks_admin_url = 'JazzTasks.htm';

    window.open(tasks_admin_url);

} // onClickOfDisplayAdminButton

// User clicked the Aufgaben List button
function onClickOfDisplayListButton()
{
    var tasks_list_url = 'JazzTasksList.htm';

    window.open(tasks_list_url);

} // onClickOfDisplayListButton

// User clicked the jazz tasks display button
function onClickOfDisplayHelpButton()
{
    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0047.pdf';

    window.open(help_url);

} // onClickOfDisplayHelpButton

// Download the DOC document
function onClickDownloadDoc()
{
    var doc_path_file_name = g_active_record.getJazzTaskLinkDoc();

    if (doc_path_file_name.length == 0)
    {
        return;
    }

    var doc_file_name = getFileBasename(doc_path_file_name);

    var doc_url = getFullPathTaskDocumentServerDirectory() + doc_file_name;

    window.open(doc_url);

} // onClickDownloadDoc

// Download the DOC document
function onClickDownloadPdf()
{
    var pdf_path_file_name = g_active_record.getJazzTaskLinkPdf();

    if (pdf_path_file_name.length == 0)
    {
        return;
    }

    var pdf_file_name = getFileBasename(pdf_path_file_name);

    var pdf_url = getFullPathTaskDocumentServerDirectory() + pdf_file_name;

    window.open(pdf_url);

} // onClickDownloadPdf

// Open reference one URL
function onClickOpenUrlOne()
{
    var reference_number = 1;

    var url_ref_one = g_active_record.getJazzTaskRefLink(reference_number);

    window.open(url_ref_one);

} // onClickOpenUrlOne

// Open reference two URL
function onClickOpenUrlTwo()
{
    var reference_number = 2;

    var url_ref_two = g_active_record.getJazzTaskRefLink(reference_number);

    window.open(url_ref_two);

} // onClickOpenUrlTwo

// Open reference three URL
function onClickOpenUrlThree()
{
    var reference_number = 3;

    var url_ref_three = g_active_record.getJazzTaskRefLink(reference_number);

    window.open(url_ref_three);

} // onClickOpenUrlThree

// Open reference four URL
function onClickOpenUrlFour()
{
    var reference_number = 4;

    var url_ref_four = g_active_record.getJazzTaskRefLink(reference_number);

    window.open(url_ref_four);

} // onClickOpenUrlFour

// User made a change in the search text box
function oninputSearch()
{
    var search_str = g_search_text_box.getValue();

    searchDisplayResultList(search_str);

} // oninputSearch

// User clicked the calendar check box
function eventClickCheckBoxCalendar()
{
    // alert("Kalender wird implementiert. Noch nicht fertig"); 

    var search_str = g_search_text_box.getValue();

    searchDisplayResultList(search_str);

} // eventClickCheckBoxCalendar

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls Functions /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the search text box
function createTextBoxSearch()
{
    g_search_text_box = new JazzTextBox("id_search_text_box", getIdDivElementTextBoxSearch());

    g_search_text_box.setLabelText("Suchen in Intranet und Aufgaben");

    g_search_text_box.setLabelTextPositionAbove();

    g_search_text_box.setSize("26");

    g_search_text_box.setTitle("Suchwörter eingeben");

    g_search_text_box.setOninputFunctionName("oninputSearch");
  
} // createTextBoxSearch

// Creates the check box control calendar
function createCheckBoxCalendar()
{
    g_calendar_check_box = new JazzCheckBox("id_check_box_calendar", getIdDivElementCheckBoxCalendar());

    g_calendar_check_box.setOninputFunctionName("eventClickCheckBoxCalendar");

    g_calendar_check_box.setLabelText("Kalender");
	
	g_calendar_check_box.setLabelTextPositionAbove();

     g_calendar_check_box.setTitle("Terminkalender anzeigen");

     g_calendar_check_box.setCheck("FALSE");

} // createCheckBoxCalendar

// Creates the intranet button control
function createTasksDisplayIntranetButton()
{
    g_task_display_intranet_button = new JazzButton("id_display_button_intranet", getIdDivElementDisplayIntranetButton());

    g_task_display_intranet_button.setOnclickFunctionName("onClickOfDisplayIntranetButton");

    g_task_display_intranet_button.setCaption("Intranet");

    g_task_display_intranet_button.setLabelText("");

    g_task_display_intranet_button.setTitle("Link zur Intranet Webseite");

} // createTasksDisplayIntranetButton

// Creates the admin button control
function createTasksDisplayAdminButton()
{
    g_task_display_admin_button = new JazzButton("id_display_button_admin", getIdDivElementDisplayAdminButton());

    g_task_display_admin_button.setOnclickFunctionName("onClickOfDisplayAdminButton");

    g_task_display_admin_button.setCaption("Admin");

    g_task_display_admin_button.setLabelText("");

    g_task_display_admin_button.setTitle("Link zur Aufgaben Admin Webseite");

} // createTasksDisplayAdminButton

// Creates the list button control
function createTasksDisplayListButton()
{
    g_task_display_list_button = new JazzButton("id_display_button_list", getIdDivElementDisplayListButton());

    g_task_display_list_button.setOnclickFunctionName("onClickOfDisplayListButton");

    g_task_display_list_button.setCaption("Liste");

    g_task_display_list_button.setLabelText("");

    g_task_display_list_button.setTitle("Aufgaben-Liste");

} // createTasksDisplayListButton

// Creates the help button control
function createTasksDisplayHelpButton()
{
    g_task_display_help_button = new JazzButton("id_display_button_help", getIdDivElementDisplayHelpButton());

    g_task_display_help_button.setOnclickFunctionName("onClickOfDisplayHelpButton");

    g_task_display_help_button.setCaption("Help");

    g_task_display_help_button.setLabelText("");

    g_task_display_help_button.setTitle("Information über diese Applikation");

} // createTasksDisplayHelpButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start List Tasks Functions //////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns a list of <div> elements for all records
function getListOfTasksHtmlString(i_result_registration_numbers)
{
    var ret_list_tasks_str = '';

    var array_case = 'title';

    var result_titles = g_display_table.getJazzTasksNameArray(array_case); // QQQ Temporary

    var n_records = i_result_registration_numbers.length;

    // n_records = 1; 

    for (var result_index=0; result_index < n_records; result_index++)
    {

        var reg_number = i_result_registration_numbers[result_index];

        var task_number = g_display_table.getTaskNumberFromRegistrationNumber(reg_number);

        var current_record = g_display_table.getJazzTaskRecord(task_number);
    
        var title_str = current_record.getJazzTaskTitle();

        var responsibles_str = current_record.getJazzTaskResponsiblesString("NotYetUsed");

        ret_list_tasks_str = ret_list_tasks_str + getOneResultTaskString(reg_number, title_str, responsibles_str);

    }

    return ret_list_tasks_str;

} // getListOfTasksHtmlString

// Returns the string with <div> elements corresponding to one task
function getOneResultTaskString(i_reg_number, i_title_str, i_responsibles_str)
{
    var ret_one_task_str = '';

    var click_str = getOnClickTaskRecordString(i_reg_number);

    ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record" >';

    ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_title"' + click_str + '>';

    ret_one_task_str = ret_one_task_str + '<b>' + i_title_str + '</b>';

    ret_one_task_str = ret_one_task_str + '</div>';

    //ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_number"' + click_str + '>';

    //ret_one_task_str = ret_one_task_str + i_reg_number;

    //ret_one_task_str = ret_one_task_str + '</div>';

    ret_one_task_str = ret_one_task_str + '</div>';

    ret_one_task_str = ret_one_task_str + '<div class= "cl_list_record_responsible"' + click_str + '>';

    ret_one_task_str = ret_one_task_str + i_responsibles_str;

    ret_one_task_str = ret_one_task_str + '</div>';

    return ret_one_task_str;

} // getOneResultTaskString

// Returns the string for the on click task function
// https://stackoverflow.com/questions/9643311/pass-a-string-parameter-in-an-onclick-function
function getOnClickTaskRecordString(i_reg_number)
{
    return ' onclick= "onClickTaskRecord(\''+ i_reg_number + '\')" ';

} // getOnClickTaskRecordString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End List Tasks Functions ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Active Record Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the text of the active record <div> element
function setActiveRecordDiv()
{
    setActiveRecordDivTitle();

    setActiveRecordDivNumber();

    setActiveRecordDivResponsibles();

    setActiveRecordDivDescription();

    setActiveRecordDivRemark();

    setActiveRecordDivDocument();

    setActiveRecordDivReferenceOneUrl();

    setActiveRecordDivReferenceTwoUrl();

    setActiveRecordDivReferenceThreeUrl();

    setActiveRecordDivReferenceFourUrl();

    setActiveRecordDivReferenceOneDescription();

    setActiveRecordDivReferenceTwoDescription();

    setActiveRecordDivReferenceThreeDescription();

    setActiveRecordDivReferenceFourDescription();

    setActiveRecordDivRemindDueDate();

    setActiveRecordDueDaysConcert();

} // setActiveRecordDiv

// Sets the text of the active record title <div> element
function setActiveRecordDivTitle()
{
    var el_div_title = getDivElementActiveRecordTitle();

    var title_str = '';

    title_str = title_str + '<b>' + 'Titel' + '</b>' + '<br>';

    title_str = title_str + g_active_record.getJazzTaskTitle();

    el_div_title.innerHTML = title_str;

} // setActiveRecordDivTitle

// Sets the text of the active record number <div> element
function setActiveRecordDivNumber()
{
    var el_div_number = getDivElementActiveRecordNumber();

    var number_str = '';

    number_str = number_str + '<b>' + 'Nummer' + '</b>' + '<br>';

    number_str = number_str + g_active_record.getJazzTaskRegNumber();

    el_div_number.innerHTML = number_str;

} // setActiveRecordDivNumber

// Sets the text of the active record description <div> element
function setActiveRecordDivDescription()
{
    var el_div_description = getDivElementActiveRecordDescription();

    var description_str = '';

    description_str = description_str + '<b>' + 'Inhalt' + '</b>' + '<br>';

    if (g_active_record.getJazzTaskDescription().length > 0)
    {
        description_str = description_str + g_active_record.getJazzTaskDescription();
    }
    else
    {
        description_str = description_str + '&nbsp;&nbsp;';
    }

    el_div_description.innerHTML = description_str;

    hideActiveRecordDescription();

} // setActiveRecordDivDescription

// Sets the text of the active record remark <div> element
function setActiveRecordDivRemark()
{
    var el_div_remark = getDivElementActiveRecordRemark();

    if (g_active_record.getJazzTaskRemark().length == 0)
    {
        hideActiveRecordRemark();

        return;
    }
    else
    {
        displayActiveRecordRemark();
    }

    var remark_str = '';

    remark_str = remark_str + '<b>' + 'Bemerkung' + '</b>' + '<br>';

    remark_str = remark_str + g_active_record.getJazzTaskRemark();

    el_div_remark.innerHTML = remark_str;

} // setActiveRecordDivRemark

// Sets the text of the active record document <div> element
function setActiveRecordDivDocument()
{
    var el_div_document_name = getDivElementActiveRecordDocumentName();

    var document_name_str = '';

    if (activeTaskIsInformation())
    {
        document_name_str = document_name_str + '<b>' + 'Beschreibung ' + '</b>';
    }
    else if (activeTaskIsCalendarEntry())
    {
        document_name_str = document_name_str + '<b>' + 'Beschreibung Termin' + '</b>';
    }
    else
    {
        document_name_str = document_name_str + '<b>' + 'Aufgabebeschreibung ' + '</b>';
    }

    document_name_str = document_name_str + g_active_record.getJazzTaskRegNumber();

    el_div_document_name.innerHTML = document_name_str;

    hideActiveRecordDocumentDoc();

    hideTaskDescriptionDocumentIfNotUsed();

} // setActiveRecordDivDocument

// Hides the link to the task description document if the document not is used
function hideTaskDescriptionDocumentIfNotUsed()
{
    var flag_use = g_active_record.getJazzTaskUseDescription();

    if (flag_use == 'TRUE')
    {
        displayActiveRecordDocument();
    }
    else
    {
        hideActiveRecordDocument();
    }

} // hideTaskDescriptionDocumentIfNotUsed

// Sets the text of the active record reference one URL <div> element
function setActiveRecordDivReferenceOneUrl()
{
    var el_div_ref_one_url = getDivElementActiveRecordReferenceOneUrl();
	
	var reference_number = 1;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceOne();

        return;
    }
    else
    {
        displayActiveRecordReferenceOne();
    }

    var ref_one_url_str = '';

    // ref_one_url_str = ref_one_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_one_url_str = ref_one_url_str + url_str;

    el_div_ref_one_url.innerHTML = ref_one_url_str;

    hideActiveRecordReferenceOneUrl();

} // setActiveRecordDivReferenceOneUrl

// Sets the text of the active record reference two URL <div> element
function setActiveRecordDivReferenceTwoUrl()
{
    var el_div_ref_two_url = getDivElementActiveRecordReferenceTwoUrl();
	
	var reference_number = 2;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceTwo();

        return;
    }
    else
    {
        displayActiveRecordReferenceTwo();
    }

    var ref_two_url_str = '';

    // ref_two_url_str = ref_two_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_two_url_str = ref_two_url_str + url_str;

    el_div_ref_two_url.innerHTML = ref_two_url_str;

    hideActiveRecordReferenceTwoUrl();

} // setActiveRecordDivReferenceTwoUrl

// Sets the text of the active record reference three URL <div> element
function setActiveRecordDivReferenceThreeUrl()
{
    var el_div_ref_three_url = getDivElementActiveRecordReferenceThreeUrl();
	
	var reference_number = 3;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceThree();

        return;
    }
    else
    {
        displayActiveRecordReferenceThree();
    }

    var ref_three_url_str = '';

    // ref_three_url_str = ref_three_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_three_url_str = ref_three_url_str + url_str;

    el_div_ref_three_url.innerHTML = ref_three_url_str;

    hideActiveRecordReferenceThreeUrl();

} // setActiveRecordDivReferenceThreeUrl

// Sets the text of the active record reference four URL <div> element
function setActiveRecordDivReferenceFourUrl()
{
    var el_div_ref_four_url = getDivElementActiveRecordReferenceFourUrl();
	
	var reference_number = 4;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceFour();

        return;
    }
    else
    {
        displayActiveRecordReferenceFour();
    }

    var ref_four_url_str = '';

    // ref_four_url_str = ref_four_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_four_url_str = ref_four_url_str + url_str;

    el_div_ref_four_url.innerHTML = ref_four_url_str;

    hideActiveRecordReferenceFourUrl();

} // setActiveRecordDivReferenceFourUrl

// Sets the text of the active record reference one description <div> element
function setActiveRecordDivReferenceOneDescription()
{
    var el_div_ref_one_description = getDivElementActiveRecordReferenceOneDescription();
	
	var reference_number = 1;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_one_description_str = '';

    ref_one_description_str = ref_one_description_str + description_str;

    el_div_ref_one_description.innerHTML = ref_one_description_str;

} // setActiveRecordDivReferenceOneDescription

// Sets the text of the active record reference two description <div> element
function setActiveRecordDivReferenceTwoDescription()
{
    var el_div_ref_two_description = getDivElementActiveRecordReferenceTwoDescription();
	
	var reference_number = 2;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_two_description_str = '';

    ref_two_description_str = ref_two_description_str + description_str;

    el_div_ref_two_description.innerHTML = ref_two_description_str;

} // setActiveRecordDivReferenceTwoDescription

// Sets the text of the active record reference three description <div> element
function setActiveRecordDivReferenceThreeDescription()
{
    var el_div_ref_three_description = getDivElementActiveRecordReferenceThreeDescription();
	
	var reference_number = 3;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_three_description_str = '';

    ref_three_description_str = ref_three_description_str + description_str;

    el_div_ref_three_description.innerHTML = ref_three_description_str;

} // setActiveRecordDivReferenceThreeDescription

// Sets the text of the active record reference four description <div> element
function setActiveRecordDivReferenceFourDescription()
{
    var el_div_ref_four_description = getDivElementActiveRecordReferenceFourDescription();
	
	var reference_number = 4;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_four_description_str = '';

    ref_four_description_str = ref_four_description_str + description_str;

    el_div_ref_four_description.innerHTML = ref_four_description_str;

} // setActiveRecordDivReferenceFourDescription

// Sets the text of the active record remind and due date <div> element
function setActiveRecordDivRemindDueDate()
{
    var el_div_remind_due_date = getDivElementActiveRecordRemindDueDate();
	
	var remind_day = g_active_record.getJazzTaskRemindDay();
	
	var remind_month = g_active_record.getJazzTaskRemindMonth();
	
	var finish_day = g_active_record.getJazzTaskFinishDay();
	
	var finish_month = g_active_record.getJazzTaskFinishMonth();
	
	var remind_str = '';
	
	var finish_str = '';
	
	if (remind_day.length > 0)
	{
		remind_str = '<b>' + 'Erinnerung ' + '</b>' + 
			remind_day.toString() + '. ' + getMonthName(remind_month);
	}
	
	if (finish_day.length > 0)
	{
		finish_str = '<b>' + 'Fälligkeit ' + '</b>' + 
			finish_day.toString() + '. ' + getMonthName(finish_month);
	}	
	
	if (remind_str.length == 0 && finish_str.lenght == 0)
	{
		hideActiveRecordRemindDueDate();
		
		return;
	}
	else
	{
		displayActiveRecordRemindDueDate();
	}
	
    var date_str = '';

    date_str = date_str + remind_str;
	
	if (remind_str.length > 0)
	{
		date_str = date_str + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}

    date_str = date_str + finish_str;

    el_div_remind_due_date.innerHTML = date_str;

} // setActiveRecordDivRemindDueDate

// Sets the text of the active record remind and due date <div> element
function setActiveRecordDueDaysConcert()
{
    var el_div_due_days = getDivElementActiveRecordDueDaysConcert();
	
	var after_concert = g_active_record.getJazzTaskAfterConcert();
	
	var before_concert = g_active_record.getJazzTaskBeforeConcert();
	
	var after_str = '';
	
	var before_str = '';
	
	if (before_concert.length > 0)
	{
		after_str = 'Vor Konzert ' + before_concert.toString();
	}
	
	if (after_concert.length > 0)
	{
		before_str =  'Nach Konzert ' +  after_concert.toString();
	}	
	
	if (after_concert.length == 0 && before_concert.length == 0)
	{
		hideActiveRecordDueDaysConcert();
		
		return;
	}
	else
	{
		displayActiveRecordDueDaysConcert();
	}
	
    var due_days_str = '<b>Fälligkeit (Tage): </b>';

    due_days_str = due_days_str + after_str;
	
	if (after_str.length > 0)
	{
		due_days_str = due_days_str + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
	}

    due_days_str = due_days_str + before_str;

    el_div_due_days.innerHTML = due_days_str;

} // setActiveRecordDueDaysConcert

// Sets the text of the active record remind and due date <div> element
function setActiveRecordDivResponsibles()
{
    var el_div_responsibles = getDivElementActiveRecordResponsibles();
	
	var responsibles_str = g_active_record.getJazzTaskResponsiblesString("NotYetUsed");

    var html_str = '';

    html_str = html_str + '<b>' + 'Verantwortliche ' + '</b>' + '<br>';
	
    html_str = html_str + responsibles_str;

    el_div_responsibles.innerHTML = html_str;

    if (activeTaskIsInformation())
    {
        hideActiveRecordResponsibles();
    }
    else if (activeTaskIsCalendarEntry())
    {
        hideActiveRecordResponsibles();
    }
    else
    {
        displayActiveRecordResponsibles();
    }

} // setActiveRecordDivResponsibles

// Returns true if active task is of the type information and has no description
// how to do a taskk
function activeTaskIsInformation()
{
    var responsible_str = g_active_record.getJazzTaskResponsible();

    if (responsible_str == "Information")
    {
        return true;
    }
    else
    {
        return false;
    }

} // activeTaskIsInformation

// Returns true if active task is of the type calender entry and has no description
// how to do a taskk
function activeTaskIsCalendarEntry()
{
    var responsible_str = g_active_record.getJazzTaskResponsible();

    if (responsible_str == "Termin")
    {
        return true;
    }
    else
    {
        return false;
    }

} // activeTaskIsCalendarEntry

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Active Record Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

