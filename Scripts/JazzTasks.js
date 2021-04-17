// File: JazzTasks.js
// Date: 2021-04-17
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
    g_xml = new JazzTasksXml(initJazzTasksAfterLoadOfXml);

} // initJazzTasks

// Continue initialization after loading of the XML file JazzTasks.xml 
// (creation of the XML "file-object")
// An object of the class JazzTasksTable will be created This class 
// defines a table of (an array of) JazzTask objects (records).
// At the generation of the class (with the statement new) the constructor
// will create the table from the input XML object (g_xml).  
// 1. Creation of the JazzTasksTable object.
// 2. Create all controls: Dropdowns, text boxes and buttons. Call of createControls
// 3. Set the jazz task active record number to one (1). Set also the dropdown
//    to this value. Call of JazzDropdown.setSelectOptionNumber
// 4. Get and set the active task record that shall be displayed and that can
//    be edited by the user. Call of JazzTasksTable.getJazzTaskRecord
// 5. Set (display) all controls with data from the JazzTask object. 
//    Call of setControlValues
function initJazzTasksAfterLoadOfXml()
{
    g_table = new JazzTasksTable(g_xml);

    createControls();

    g_record_active_number = 1;

    g_task_drop_down.setSelectOptionNumber(g_record_active_number);

    g_record_active_task = g_table.getJazzTaskRecord(g_record_active_number);

    setControlValues();

    g_record_was_changed = false;

    hideCancelButton();

} // initJazzTasksAfterLoadOfXml


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
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
    if (g_record_was_changed)
    {
        alert(g_record_was_changed_str);
        
        return;
    }

    g_active_reference_number = g_ref_drop_down.getSelectOptionNumber();

    setControlValues();

} // eventSelectReferenceDropDown

// User selected deputy
function eventSelectDeputyDropDown()
{
    if (g_record_was_changed)
    {
        alert(g_record_was_changed_str);
        
        return;
    }

    g_active_deputy_number = g_deputy_drop_down.getSelectOptionNumber();

    setControlValues();

} // eventSelectDeputyDropDown

// User clicked the delete button
function eventClickButtonDelete()
{
    var msg_str = 'Willst du wirklich Aufgabe "' + g_record_active_task.getJazzTaskTitle() + '" löschen?';

    var b_confirm = confirm(msg_str);

    if (!b_confirm)
    {
        return;
    }

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

// User clicked the save button
function eventClickButtonSave()
{
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
            alert("eventClickButtonSave JazzTasksTable.setJazzTaskRecord failed")
            return;
        }

        var b_set_xml = g_table.setJazzTaskRecordXml(g_record_active_number, g_record_active_task);

        if (!b_set_xml)
        {
            alert("eventClickButtonSave JazzTasksTable.setJazzTaskRecordXml failed")

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
    g_doc_upload.hideUploadDiv(false);

    g_pdf_upload.hideUploadDiv(true);    

} // eventClickUploadDoc

// User clicked the upload PDF button
function eventClickUploadPdf()
{
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

    var doc_url = 'https://jazzliveaarau.ch/Tasks/Documents/' + doc_file_name;

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

    var pdf_url = 'https://jazzliveaarau.ch/Tasks/Documents/' + pdf_file_name;

    window.open(pdf_url);

} // eventClickDownloadPdf

// The user clicked the help button
function onClickOfHelpButton()
{
    var help_url = 'https://jazzliveaarau.ch/Tasks/JazzTasksHelp.htm';

    window.open(help_url);

} // onClickOfHelpButton

// Event function when user added or deleted a character in the title text box
function oninputTitle()
{
    //alert("New value is" + g_title_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);    

} // oninputTitle

// Event function when user added or deleted a character in the doc text box
function oninputDoc()
{
    // alert("New value is" + g_doc_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    //TODO Check by save if value is empty or 'right'

} // oninputDoc

// Event function when user added or deleted a character in the pdf text box
function oninputPdf()
{
    // alert("New value is" + g_pdf_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    // TODO Check by save if value is empty or 'right'

} // oninputPdf

// Event function when user added or deleted a character in the description text box
function oninputDescription()
{
    //alert("New value is" + g_description_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputDescription

// Event function when user added or deleted a character in the deputy name text box
function oninputDeputyName()
{
    //alert("New value is" + g_deputy_name_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputDeputyName


// Event function when user added or deleted a character in the remark text box
function oninputRemark()
{
    //alert("New value is" + g_remark_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputRemark

// Event function when user added or deleted a character in the responsible text box
function oninputResponsible()
{
    //alert("New value is" + g_responsible_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputResponsible

// Event function when user added or changed remind date
function eventUserSelectedRemindDate()
{
    //alert("New value is" + g_responsible_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // eventUserSelectedRemindDate

// Event function when user added or changed due (finish) date
function eventUserSelectedDueDate()
{
    //alert("New value is" + g_responsible_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // eventUserSelectedDueDate

//  Event function when user added or deleted a character in the reference link text box
function oninputReferenceUrl()
{
    //alert("New value is" + g_ref_link_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputReferenceUrl

//  Event function when user added or deleted a character in the reference description text box
function oninputReferenceDescription()
{
    //alert("New value is" + g_ref_descr_text_box.getValue());

    displayButtonCancelSetChangedFlag();

    g_doc_upload.hideUploadDiv(true);
	
    g_pdf_upload.hideUploadDiv(true);

} // oninputReferenceDescription

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////





