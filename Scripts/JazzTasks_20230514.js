// File: JazzTasks.js
// Date: 2023-05-15
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Hauptfunktionen der Applikation Aufgaben

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The object of the class JazzTasksXml. The object of the class is created in the onload
// function initJazzTasks(). This object must also be available in the function 
// initJazzTasksAfterLoadOfXml. Therefore the object is put in a global variable g_xml.
// Global variables are available in all functions. 
// It is not nessecary to assign the value 'null' to the variable. A variable that not 
// has been assigned a value has the value 'null'. But doing it makes the program clearer
// (more easy to understand).
var g_xml = null;

// Object with get functions for the XML file JazzApplication.xml
var g_application_xml = null;

// JazzTasksTable object that hold all JazzTask records 
var g_table = null;

// Active jazz task record number
var g_record_active_number = -12345;

// Active jazz task
var g_record_active_task = null;

// The active reference number
var g_active_reference_number = 1;

// The active deputy number
var g_active_deputy_number = 1;

// Flag telling if the user has changed data on the input form for the task record
var g_record_was_changed = false;

// Prompt string when user tries to change to another task, reference or Deputy
// without first saving
var g_record_was_changed_str = 
    'Daten sind zugefügt oder geändert. Bitte Daten speichern bevor eine neue' + 
    'Aufgabe, Referenz oder Stellvertreter gewählt wird.';

var g_record_changed_original_data_set_str =
    'Die urprüngliche Daten wurden geholt.';

// Object that handles the user name
var g_user_name_object = null;

// Object that have functions handling login and logout
var g_login_logout = null;

// Flag telling if the user has logged in.
// Initial value is false. After succesful login it will be set to true
// After logout it will be set to false.
var g_user_has_logged_in = false;

// Returns the flag telling if the user has logged in
function userHasLoggedIn()
{
    if (g_login_logout != null)
    {
        var b_user_is_logged_in = g_login_logout.userIsLoggedIn();

        if (b_user_is_logged_in != g_user_has_logged_in)
        {
            alert("Error userHasLoggedIn Flag LogoutLogin = " + b_user_is_logged_in.toString() 
                    + " not equal to g_user_has_logged_in");
        }
    }

    return g_user_has_logged_in;
    
} // userHasLoggedIn

// Returns true if the user hasn't logged in and tells him to try to login	
// Reset of values also for this case
function userIsNotLoggedIn()
{
    if (!userHasLoggedIn())
    {
		setControlValues();
		
		alert(LoginLogout.changeNotPossibleOtherIsloggedIn());
		
        return true;
    }
	
	return false;

} // userIsNotLoggedIn

// Sets the flag telling if the user has logged in
function setUserHasLoggedIn(i_b_has_logged_in)
{
    g_user_has_logged_in = i_b_has_logged_in;

    g_login_logout.setUserIsLoggedIn(i_b_has_logged_in);

} // setUserHasLoggedIn

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Main (onload) function for the application Tasks.
// Before displaying data on the web page, the file JazzXml.xml must be loaded, which means
// that the file must be converted to an XML "file-object" that holds all the data of the file.
// The Class JazzTasksXml has functions that creates and stores this XML "file-object".  
// Data from the XML file can only be displayed after the load of of the XML file. Before
// loading there is no data available. Waiting for something is with JavaScript implemented
// with a callback function. The function in Class JazzTasksXml will call this function when
// the loading has been done.
// Input for the creation of an object of the class JazzTasksXml is the name of the callback
// function.   
// Please observe that the name and the path for the XML file is hardcoded in JazzTasksXml
// For developing and testing there is a second XML file. This file name is also hardcoded.
// 1. Create the XML "file-object". This is done by the constructor function when the object
//    of the class JazzTasksXml is created (with the word 'new'). The constructor function
//    calls the (callback) function initJazzTasksAfterLoadOfXml when the creation is finished.  
function initJazzTasks()
{
    g_xml = new JazzTasksXml(initApplicationXmlAfterLoadOfJazzTasksXml);

} // initJazzTasks

// Load of JazzApplication.xml
function initApplicationXmlAfterLoadOfJazzTasksXml()
{
   // Number of directory levels to top directory for directory /www/XML/
   var n_level_xml = 1;

    g_application_xml = new JazzApplicationXml(initJazzTasksAfterLoadOfXml, n_level_xml);

} // initApplicationXmlAfterLoadOfJazzTasksXml

// Continue initialization after loading of the XML file JazzTasks.xml 
// (creation of the XML "file-object")
// An object of the class JazzTasksTable will be created This class 
// defines a table of (an array of) JazzTask objects (records).
// At the generation of the class (with the statement new) the constructor
// will create the table from the input XML object (g_xml).  
// 1. Login and logout initialization. Call of initLoginLogout
// 2. Creation of the JazzTasksTable object.
// 3. Create all controls: Dropdowns, text boxes and buttons. Call of createControls
// 4. Set the jazz task active record number to one (1). Set also the dropdown
//    to this value. Call of JazzDropdown.setSelectOptionNumber
// 5. Get and set the active task record that shall be displayed and that can
//    be edited by the user. Call of JazzTasksTable.getJazzTaskRecord
// 6. Set (display) all controls with data from the JazzTask object. 
//    Call of setControlValues
// 7. Set the flag g_record_was_changed to false telling that user has made no 
//    text changes to the active jazz task record
// 8. Hide the cancel button. Call of hideCancelButton
// 9. Make a backup of the XML file. Call of makeXmlBackup. 
function initJazzTasksAfterLoadOfXml()
{
    debugJazzTasks('initJazzTasksAfterLoadOfXml Enter');

    initLoginLogout();

    g_table = new JazzTasksTable(g_xml);

    setActiveRecordNumberFromLocationSearchString();

    g_record_active_task = g_table.getJazzTaskRecord(g_record_active_number);

    createControls();

    g_task_drop_down.setSelectOptionNumber(g_record_active_number);

    setControlValues();

    g_record_was_changed = false;

    hideCancelButton();

    debugJazzTasks('initJazzTasksAfterLoadOfXml Call makeXmlBackup');

    makeXmlBackup();

    var b_logged_in = false;

    hideDisplayDivElementAdminRecordContent(b_logged_in);

    debugJazzTasks('initJazzTasksAfterLoadOfXml Exit');

} // initJazzTasksAfterLoadOfXml

// Initialization for login and logout
function initLoginLogout()
{
    debugJazzTasks('initLoginLogout Enter');

    g_user_name_object = new JazzUserName(g_application_xml);

    var user_name = g_user_name_object.getUserName();

    if (user_name == JazzUserName.getUserNameNotYetSet())
    {
        user_name = LoginLogout.UserNameIsUndefined();
    }

    var b_only_read_data = false;

    g_login_logout = new LoginLogout( getIdLoginLogoutTextBox(), getIdLoginLogoutButton(), 
                                      getIdDivLoginLogout(), "onClickLoginLogoutButton",
                                      user_name, b_only_read_data);

    if (user_name != LoginLogout.UserNameIsUndefined())
    {
        g_login_logout.loginIfPossible(callbackLoginIfPossible);
    }

} // initLoginLogout

// Callback function for LoginLogout.loginIfPossible
function callbackLoginIfPossible(i_logged_in_name, i_b_user_has_logged_in)
{
    setUserHasLoggedIn(i_b_user_has_logged_in);

    g_login_logout.createSetControls(i_logged_in_name);

    hideDisplayDivElementAdminRecordContent(i_b_user_has_logged_in);

} // callbackLoginIfPossible

// Sets the active record number (g_record_active_number) from the location search string
// https://www.w3schools.com/jsref/prop_loc_search.asp
function setActiveRecordNumberFromLocationSearchString()
{
    g_record_active_number = 1;

    var loc_search_str = location.search;

    if (loc_search_str.length == 0)
    {
        g_record_active_number = 1;

        return;
    }

    var reg_number_str = loc_search_str.substring(1);

    record_number = g_table.getTaskNumberFromRegistrationNumber(reg_number_str);

    if (record_number < 0)
    {
        alert("setActiveRecordNumberFromLocationSearchString getTaskNumberFromRegistrationNumber failed for " + reg_number_str);
    }

    g_record_active_number = record_number;

} // setActiveRecordNumberFromLocationSearchString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Display Record ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Hides or display the admin record <div> 
function hideDisplayDivElementAdminRecordContent(i_b_logged_in)
{
    var el_record = getDivElementAdminRecordContent();

    if (i_b_logged_in)
    {
        el_record.style.display = 'block';
    }
    else
    {
        el_record.style.display = 'none';
    }

} // hideDisplayDivElementAdminRecordContent

// Returns the element admin record content <div> element
function getDivElementAdminRecordContent()
{
    return document.getElementById(getIdDivElementAdminRecordContent());

} // getDivElementAdminRecordContent

//Returns the identity of the admin record content <div> element
function getIdDivElementAdminRecordContent()
{
    return 'id_div_admin_record_content';

} // getIdDivElementAdminRecordContent

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Hide Display Record ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The user has selected a DOC local file that shall be uploaded
// 1. Set the selected file name and activate the upload file function.
//    Call setSelectedFileNameActivateUploadFileFunction
// 2. Check if the selected file is OK. Call of JazzUploadFile.checkSelectedFileName
//    Return if the file is unvalid. The check function has displayed an error message
// 3. Set the server full file name in the DOC text box. Please note however that the
//    actual server directory name is set by UploadFileToServer.php
//    Call of JazzUploadFile.getSelectedFileServerUrl and JazztextBox.setValue
// 4. Return with the message that upload cannot be done with VSC Live server
//    Call of execApplicationOnServer
// 5. Set the active record full file name. Call of getUserInputFromFormSetActiveRecordLinkDoc
//    Return from php uses this value
// 6. Set the caption for the button that the user shall klick to upload the selected file
//    Call of JazzUploadFile.displayButtonCaption
function eventUserSelectedDoc()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    g_doc_upload.setSelectedFileNameActivateUploadFileFunction();

    var b_check = g_doc_upload.checkSelectedFileName(g_record_active_task.getJazzTaskRegNumber());

    if (b_check)
    {
        var case_str = "DOC";

        createBackupIfFileExistsOnServer(case_str);

        var file_server_url = g_doc_upload.getSelectedFileServerUrl();

        g_doc_text_box.setValue(file_server_url);

        displayButtonCancelSetChangedFlag();

        var b_server_exec = execApplicationOnServer();
        if (!b_server_exec)
        {
            alert("DOC kann nicht lokal (mit Visual Studio Code) aufgeladen werden");

            return;
        }

        if (!getUserInputFromFormSetActiveRecordLinkDoc()) 
        {
            alert("eventUserSelectedDoc getUserInputFromFormSetActiveRecordLinkDoc failed");
        }

        g_doc_upload.displayButtonCaption();
        
    } // b_check
 
} // eventUserSelectedDoc

// The user selected a PDF that shall be uploaded
function eventUserSelectedPdf()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }
    
    if (userIsNotLoggedIn())
    {
        return;
    }

    g_pdf_upload.setSelectedFileNameActivateUploadFileFunction();

    var b_check = g_pdf_upload.checkSelectedFileName(g_record_active_task.getJazzTaskRegNumber());

    if (b_check)
    {
        var case_str = "PDF";

        createBackupIfFileExistsOnServer(case_str);

        var file_server_url = g_pdf_upload.getSelectedFileServerUrl();

        g_pdf_text_box.setValue(file_server_url);

        displayButtonCancelSetChangedFlag();

        var b_server_exec = execApplicationOnServer();
        if (!b_server_exec)
        {
            alert("PDF kann nicht lokal (mit Visual Studio Code) aufgeladen werden");

            return;
        }

        if (!getUserInputFromFormSetActiveRecordLinkPdf()) 
        {
            alert("eventUserSelectedDoc getUserInputFromFormSetActiveRecordLinkPdf failed");
        }

        g_pdf_upload.displayButtonCaption();
        
    } // b_check

} // eventUserSelectedPdf

// The user selected a new task with the dropdown control
function eventSelectTaskDropDown()
{
    if (g_record_was_changed)
    {
        alert(g_record_was_changed_str);

        return;
    }

    g_record_active_number = g_task_drop_down.getSelectOptionNumber();

    var b_append = g_task_drop_down.selectedOptionNumberIsAppendItem(g_record_active_number);

    if (!b_append)
    {
        g_record_active_task = g_table.getJazzTaskRecord(g_record_active_number);
    }
    else
    {
        g_record_active_task = new JazzTask();

        var append_reg_number = g_table.getAppendRegistrationNumber();

        g_record_active_task.setJazzTaskRegNumber(append_reg_number);

        createStartDocPdfDocumentsSetRecord(append_reg_number, g_record_active_task);

        // Should perhaps save directly
        // showCancelButton();
        // g_record_was_changed = true;
    }

    initReferenceAndDeputyDropdowns();
    
    setControlValues();

    g_doc_upload.hideButtonCaption();

    g_doc_upload.initSelectedFileName();

    g_doc_upload.hideUploadDiv(true);

    g_pdf_upload.hideButtonCaption();

    g_pdf_upload.initSelectedFileName();

    g_pdf_upload.hideUploadDiv(true);

} // eventSelectTaskDropDown

// User selected reference
function eventSelectReferenceDropDown()
{
    g_active_reference_number = g_ref_drop_down.getSelectOptionNumber();

    setControlValues();

} // eventSelectReferenceDropDown

// User selected deputy
function eventSelectDeputyDropDown()
{
    g_active_deputy_number = g_deputy_drop_down.getSelectOptionNumber();

    setControlValues();

} // eventSelectDeputyDropDown

// User clicked the delete button
function eventClickButtonDelete()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    var msg_str = 'Willst du wirklich Aufgabe "' + g_record_active_task.getJazzTaskTitle() + '" löschen?';

    var b_confirm = confirm(msg_str);

    if (!b_confirm)
    {
        return;
    }

    backupDocumentFileAndDeleteFile("DOC");

    backupDocumentFileAndDeleteFile("PDF");

    g_table.deleteJazzTaskRecord(g_record_active_number);

    g_table.deleteJazzTaskRecordXml(g_record_active_number);

    g_table.saveJazzTasksXmlOnServer();

    reCreateTaskDropdown(1);

    initReferenceAndDeputyDropdowns();

    debugDisplayXmlAsText();

} // eventClickButtonDelete

// Sets the reference and deputy dropdown numbers to one
function initReferenceAndDeputyDropdowns()
{
    g_active_reference_number = 1;

    g_active_deputy_number = 1;    

    g_ref_drop_down.setSelectOptionNumber(g_active_reference_number);

    g_deputy_drop_down.setSelectOptionNumber(g_active_deputy_number);

} // initReferenceAndDeputyDropdowns



// User clicked the cancel button
function eventClickButtonCancel()
{
    setControlValues();

    g_record_was_changed = false;

    hideCancelButton();

    alert(g_record_changed_original_data_set_str);

} // eventClickButtonCancel

// Display button cancel when the user has made a change to data
function displayButtonCancelSetChangedFlag()
{
    showCancelButton();

    g_record_was_changed = true;
}

// User clicked the upload DOC button
function eventClickUploadDoc()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }

	if (userIsNotLoggedIn())
    {
        return;
    }

    g_doc_upload.hideUploadDiv(false);

    g_pdf_upload.hideUploadDiv(true);    

} // eventClickUploadDoc

// User clicked the upload PDF button
function eventClickUploadPdf()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    g_pdf_upload.hideUploadDiv(false);

    g_doc_upload.hideUploadDiv(true);

} // eventClickUploadPdf

// User clicked the download DOC button
function eventClickDownloadDoc()
{
    var doc_path_file_name = g_record_active_task.getJazzTaskLinkDoc();

    if (doc_path_file_name.length == 0)
    {
        return;
    }
    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

    var doc_file_name = getFileBasename(doc_path_file_name);

    var doc_url = getFullPathTaskDocumentServerDirectory() + doc_file_name;

    window.open(doc_url);

} // eventClickDownloadDoc

// User clicked the download PDF button
function eventClickDownloadPdf()
{
    var pdf_path_file_name = g_record_active_task.getJazzTaskLinkPdf();

    if (pdf_path_file_name.length == 0)
    {
        return;
    }

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

    var pdf_file_name = getFileBasename(pdf_path_file_name);

    var pdf_url = getFullPathTaskDocumentServerDirectory() + pdf_file_name;

    window.open(pdf_url);

} // eventClickDownloadPdf

// The user clicked the help button
function onClickOfHelpButton()
{
    var help_url = 'https://jazzliveaarau.ch/Tasks/Documents/A0043.pdf';

    window.open(help_url);

} // onClickOfHelpButton

// Event function when user added or deleted a character in the title text box
function oninputTitle()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        setControlValues();
        
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);    

} // oninputTitle

// User clicked the check box
function eventClickCheckBoxUseDescription()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        setControlValues();

        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // eventClickCheckBoxUseDescription

// Event function when user added or deleted a character in the doc text box
function oninputDoc()
{
    alert("Dateiname kann nicht geändert werden (und Datei kann nicht gelöscht werden)");

    var task_doc = g_record_active_task.getJazzTaskLinkDoc();

    g_doc_text_box.setValue(task_doc);

} // oninputDoc

// Event function when user added or deleted a character in the pdf text box
function oninputPdf()
{
    alert("Dateiname kann nicht geändert werden (und Datei kann nicht gelöscht werden)");

    var task_pdf = g_record_active_task.getJazzTaskLinkPdf();

    g_pdf_text_box.setValue(task_pdf);

} // oninputPdf

// Event function when user added or deleted a character in the description text box
function oninputDescription()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputDescription

// Event function when user added or deleted a character in the deputy name text box
function oninputDeputyName()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputDeputyName


// Event function when user added or deleted a character in the remark text box
function oninputRemark()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputRemark

// Event function when user added or deleted a character in the responsible text box
function oninputResponsible()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputResponsible

// Event function when user added or changed remind date
function eventUserSelectedRemindDate()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // eventUserSelectedRemindDate

// Event function when user added or changed due (finish) date
function eventUserSelectedDueDate()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // eventUserSelectedDueDate

// Event function when user added or changed number of days before the concert
function oninputBeforeConcert()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    var before_days_str = g_before_concert_text_box.getValue();

    if (!JazzTask.stringContainsOnlyNumber(before_days_str))
    {
        alert("Nur Zahlen sind erlaubt");

        var only_numbers = JazzTask.keepOnlyNumbers(before_days_str);

        g_before_concert_text_box.setValue(only_numbers);

        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputBeforeConcert

// Event function when user added or changed number of days after the concert
function oninputAfterConcert()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    var after_days_str = g_after_concert_text_box.getValue();

    if (!JazzTask.stringContainsOnlyNumber(after_days_str))
    {
        alert("Nur Zahlen sind erlaubt");

        var only_numbers = JazzTask.keepOnlyNumbers(after_days_str);

        g_after_concert_text_box.setValue(only_numbers);

        return;
    }
    
    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputAfterConcert

//  Event function when user added or deleted a character in the reference link text box
function oninputReferenceUrl()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputReferenceUrl

//  Event function when user added or deleted a character in the reference description text box
function oninputReferenceDescription()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
		setControlValues();
		
        return;
    }

    if (userIsNotLoggedIn())
    {
        return;
    }

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputReferenceDescription

// User clicked the save button
function eventClickButtonSave()
{
    if (g_user_name_object.userNameIsNotSaved())
    {
        return;
    }

    g_login_logout.getLoggedInName(callbackEventClickButtonSave);

} // eventClickButtonSave

// Callback function for eventClickButtonSave
// 1. Check that the user name has been saved. If not, return telling the user to login
// 2. 
function callbackEventClickButtonSave(i_logged_in_name, i_b_user_has_logged_in)
{
    // debugJazzTasks('callbackEventClickButtonSave i_logged_in_name= ' + i_logged_in_name);

    // debugJazzTasks('callbackEventClickButtonSave i_b_user_has_logged_in= ' + i_b_user_has_logged_in.toString());

    if (i_logged_in_name == LoginLogout.UserNameIsUndefined())
    {
        alert(JazzUserName.getUserNameNotSavedError());

        return;
    }

    setUserHasLoggedIn(i_b_user_has_logged_in);

    g_login_logout.createSetControls(i_logged_in_name);
    
    if (!i_b_user_has_logged_in)
    {
        alert(LoginLogout.saveNotPossibleOtherIsloggedIn());

        return;
    }

    var b_check_set_input = getUserInputFromFormSetActiveRecord();
    
    if (!b_check_set_input)
    {
        return;
    }

    var b_append = g_task_drop_down.selectedOptionNumberIsAppendItem(g_record_active_number);

    if (!b_append)
    {
        var b_set_table = g_table.setJazzTaskRecord(g_record_active_number, g_record_active_task);

        if (!b_set_table)
        {
            alert("callbackEventClickButtonSave JazzTasksTable.setJazzTaskRecord failed")
            return;
        }

        var b_set_xml = g_table.setJazzTaskRecordXml(g_record_active_number, g_record_active_task);

        if (!b_set_xml)
        {
            alert("callbackEventClickButtonSave JazzTasksTable.setJazzTaskRecordXml failed")

            return;
        }        

        g_table.saveJazzTasksXmlOnServer();
    }
    else
    {
        g_table.appendJazzTaskRecord(g_record_active_task);

        g_table.appendJazzTaskRecordXml(g_record_active_task);

        g_table.saveJazzTasksXmlOnServer();

        // Save must preceed recreate
        reCreateTaskDropdown(g_record_active_number);

    }

    g_record_was_changed = false;

    hideCancelButton();

    g_doc_upload.hideUploadDiv(true);

    g_pdf_upload.hideUploadDiv(true);    

    debugDisplayXmlAsText();

} // eventClickButtonSave

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Login Logout Functions //////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User clicked the login-logout button. 
// The name of this function is defined at the creation of the JazzLogin object
// This function calls (must call) JazzLogin.clickLoginLogoutButton
// 1. Get the user name. Call of JazzUserName.getUserName
//    This call is for the case that the user name not yet is saved
// 2. Case: User name is not saved
// 2.a Request name and password from user and set user name. 
//     Call of JazzUserName.requestSetUserName
// 2.b Set user name. Call of LoginLogout.setUserName
// 2.c Login if possible. Call of LoginLogout.loginIfPossible
// 3. Case: User name is saved
// 3.a Call member function LoginLogout.clickLoginLogoutButton
function onClickLoginLogoutButton()
{
    var user_name = g_user_name_object.getUserName();

    debugJazzTasks('onClickLoginLogoutButton user_name= ' + user_name);

    if (user_name == JazzUserName.getUserNameNotYetSet())
    {
        var request_name =  g_user_name_object.requestSetUserName();

        if (request_name != JazzUserName.getUserNameNotYetSet())
        {
            g_login_logout.setUserName(request_name);

           g_login_logout.loginIfPossible(callbackLoginIfPossible);
        }
    }
    else
    {
        g_login_logout.clickLoginLogoutButton(callbackOnClickLoginLogoutButton);
    }

} // onClickLoginLogoutButton

// Callback function for LoginLogout.clickLoginLogoutButton
function callbackOnClickLoginLogoutButton(i_logged_in_name, i_b_user_has_logged_in, i_warning_msg)
{
    if (i_warning_msg.length > 0)
    {
        alert(i_warning_msg);
    }
    
    setUserHasLoggedIn(i_b_user_has_logged_in);

    g_login_logout.createSetControls(i_logged_in_name);

    hideDisplayDivElementAdminRecordContent(i_b_user_has_logged_in);

} // callbackOnClickLoginLogoutButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Login Logout Functions ////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugJazzTasks(i_msg_str)
{
    console.log('JazzTasks:' + i_msg_str);

} // debugJazzTasks

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////



