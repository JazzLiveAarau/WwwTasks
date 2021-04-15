// File: JazzTasks.js
// Date: 2021-04-15
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

// The tasks dropdown control
var g_task_drop_down = null;

// The text box for the registration number
var g_reg_number_text_box = null;

// The text box for the title
var g_title_text_box = null;

// The text box for the remind date picker
var g_remind_date_text_box = null;

// The text box for the due date picker
var g_due_date_text_box = null;

// The text box for the document doc
var g_doc_text_box = null;

// The text box for the document pdf
var g_pdf_text_box = null;

// The object of class JazzUploadFile for the upload of the DOC file 
var g_doc_upload = null;

// The object of class JazzUploadFile for the upload of the PDF file 
var g_pdf_upload = null;

// Control upload of a DOC document to the server
var g_upload_doc_button = null;

// Control upload of a PDF document to the server
var g_upload_pdf_button = null;

// Control download of a DOC document from the server
var g_download_doc_button = null;

// Control download of a PDF document from the server
var g_download_pdf_button = null;

// The text box for the description
var g_description_text_box = null;

// The text box for a deputy name
var g_deputy_name_text_box = null;

// The text box for the remark
var g_remark_text_box = null;

// The button delete task
var g_task_delete_button = null;

// The button save task
var g_task_save_button = null;

// Reference drop down
var g_ref_drop_down = null;

// Deputy drop down
var g_deputy_drop_down = null;

// Reference link text box
var g_ref_link_text_box = null;

// Reference description text box
var g_ref_descr_text_box = null;

// Responsible text box
var g_responsible_text_box = null;

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

    debugDisplayXmlAsText();

} // eventClickButtonDelete

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

    debugDisplayXmlAsText();

} // eventClickButtonSave

// User clicked the upload DOC button
function eventClickUploadDoc()
{
    g_doc_upload.hideUploadDiv(false);

} // eventClickUploadDoc

// User clicked the upload PDF button
function eventClickUploadPdf()
{
    g_pdf_upload.hideUploadDiv(false);

} // eventClickUploadPdf

// User clicked the download DOC button
function eventClickDownloadDoc()
{
    var doc_path_file_name = g_record_active_task.getJazzTaskLinkDoc();

    if (doc_path_file_name.length == 0)
    {
        return;
    }

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

    var pdf_file_name = getFileBasename(pdf_path_file_name);

    var pdf_url = 'https://jazzliveaarau.ch/Tasks/Documents/' + pdf_file_name;

    window.open(pdf_url);

} // eventClickDownloadPdf

// Event function when user added or deleted a character in the title text box
function oninputTitle()
{
    //alert("New value is" + g_title_text_box.getValue());

} // oninputTitle

// Event function when user added or deleted a character in the doc text box
function oninputDoc()
{
    //alert("New value is" + g_doc_text_box.getValue());

} // oninputDoc

// Event function when user added or deleted a character in the pdf text box
function oninputPdf()
{
    //alert("New value is" + g_pdf_text_box.getValue());

} // oninputPdf

// Event function when user added or deleted a character in the description text box
function oninputDescription()
{
    //alert("New value is" + g_description_text_box.getValue());

} // oninputDescription

// Event function when user added or deleted a character in the deputy name text box
function oninputDeputyName()
{
    //alert("New value is" + g_deputy_name_text_box.getValue());

} // oninputDeputyName


// Event function when user added or deleted a character in the remark text box
function oninputRemark()
{
    //alert("New value is" + g_remark_text_box.getValue());

} // oninputRemark

// Event function when user added or deleted a character in the responsible text box
function oninputResponsible()
{
    //alert("New value is" + g_responsible_text_box.getValue());

} // oninputResponsible

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get User Form Input ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Gets, checks and sets the input data from the record form (the controls)
// Returns false for not valid input data
function getUserInputFromFormSetActiveRecord()
{
    if (!getUserInputFromFormSetActiveRecordTitle()) return false;

    if (!getUserInputFromFormSetActiveRecordDescription()) return false;

    if (!getUserInputFromFormSetActiveRecordRemark()) return false;

    if (!getUserInputFromFormSetActiveRecordRemindDay()) return false;

    if (!getUserInputFromFormSetActiveRecordFinishDay()) return false;

    if (!getUserInputFromFormSetActiveRecordRefLink()) return false;

    if (!getUserInputFromFormSetActiveRecordRefDescription()) return false;

    if (!getUserInputFromFormSetActiveRecordLinkDoc()) return false;

    if (!getUserInputFromFormSetActiveRecordResponsible()) return false;

    if (!getUserInputFromFormSetActiveRecordDeputyName()) return false;

    return true;

} // getUserInputFromFormSetActiveRecord

// Gets, checks and sets the input form data for the title
function getUserInputFromFormSetActiveRecordTitle()
{
    var task_title = g_title_text_box.getValue();

    if (!JazzTask.checkJazzTaskTitle(task_title))
    {
        alert("Title error");

        return false;
    }

    g_record_active_task.setJazzTaskTitle(task_title);

    return true;

} // getUserInputFromFormSetActiveRecordTitle

// Gets, checks and sets the input form data for the description
function getUserInputFromFormSetActiveRecordDescription()
{
     var task_description = g_description_text_box.getValue();

    if (!JazzTask.checkJazzTaskDescription(task_description))
    {
        alert("Description error");

        return false;
    }
	
	g_record_active_task.setJazzTaskDescription(task_description);

    return true;

} // getUserInputFromFormSetActiveRecordDescription

// Gets, checks and sets the input form data for the responsible
function getUserInputFromFormSetActiveRecordResponsible()
{
     var task_responible = g_responsible_text_box.getValue();

    if (!JazzTask.checkJazzTaskResponsible(task_responible))
    {
        alert("Responsible error");

        return false;
    }
	
	g_record_active_task.setJazzTaskResponsible(task_responible);

    return true;

} // getUserInputFromFormSetActiveRecordResponsible

// Gets, checks and sets the input form data for the remark
function getUserInputFromFormSetActiveRecordRemark()
{
    var task_remark = g_remark_text_box.getValue();

    if (!JazzTask.checkJazzTaskRemark(task_remark))
    {
        alert("Remark error");

        return false;
    }

    g_record_active_task.setJazzTaskRemark(task_remark);

    return true;

} // getUserInputFromFormSetActiveRecordRemark

// Gets, checks and sets the input form data for the remind day
function getUserInputFromFormSetActiveRecordRemindDay()
{
    var remind_date_str = g_remind_date_text_box.getValue();

    var remind_month = getMonthFromIsoDateString(remind_date_str);

    var remind_day = getDayFromIsoDateString(remind_date_str);

    g_record_active_task.setJazzTaskRemindMonth(remind_month);

    g_record_active_task.setJazzTaskRemindDay(remind_day);

    return true;

} // getUserInputFromFormSetActiveRecordRemindDay

// Gets, checks and sets the input form data for the finish (due) day
function getUserInputFromFormSetActiveRecordFinishDay()
{
    var finish_date_str = g_due_date_text_box.getValue();

    var finish_month = getMonthFromIsoDateString(finish_date_str);

    var finish_day = getDayFromIsoDateString(finish_date_str);

    g_record_active_task.setJazzTaskFinishMonth(finish_month);

    g_record_active_task.setJazzTaskFinishDay(finish_day);

    return true;

} // getUserInputFromFormSetActiveRecordFinishDay

// Gets, checks and sets the input form data for the reference link
function getUserInputFromFormSetActiveRecordRefLink()
{
    var ref_link_str = g_ref_link_text_box.getValue();

    g_record_active_task.setJazzTaskRefLink(g_active_reference_number, ref_link_str);

    return true;

} // getUserInputFromFormSetActiveRecordRefLink

// Gets, checks and sets the input form data for the reference description
function getUserInputFromFormSetActiveRecordRefDescription()
{
    var ref_descr_str = g_ref_descr_text_box.getValue();

    g_record_active_task.setJazzTaskRefDescription(g_active_reference_number, ref_descr_str);

    return true;

} // getUserInputFromFormSetActiveRecordRefDescription

// Gets, checks and sets the input form data for the link DOC document
function getUserInputFromFormSetActiveRecordLinkDoc()
{
    var link_doc_str = g_doc_text_box.getValue();

    g_record_active_task.setJazzTaskLinkDoc(link_doc_str);

    return true;

} // getUserInputFromFormSetActiveRecordLinkDoc

// Gets, checks and sets the input form data for the link DOC document
function getUserInputFromFormSetActiveRecordLinkPdf()
{
    var link_pdf_str = g_pdf_text_box.getValue();

    g_record_active_task.setJazzTaskLinkPdf(link_pdf_str);

    return true;

} // getUserInputFromFormSetActiveRecordLinkPdf

// Gets, checks and sets the input form data for the deputy name
function getUserInputFromFormSetActiveRecordDeputyName()
{
    var deputy_name = g_deputy_name_text_box.getValue();

    g_record_active_task.setJazzTaskDeputyByNumber(g_active_deputy_number, deputy_name);

    return true;

} // getUserInputFromFormSetActiveRecordDeputyName	

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get User Form Input /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Control Values ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set all control values with data from the input active record 
function setControlValues()
{
    var task_reg_number = g_record_active_task.getJazzTaskRegNumber();

    g_reg_number_text_box.setValue(task_reg_number);

    var task_title = g_record_active_task.getJazzTaskTitle();

    g_title_text_box.setValue(task_title);

    var task_description = g_record_active_task.getJazzTaskDescription();

    g_description_text_box.setValue(task_description);

    var task_responsible = g_record_active_task.getJazzTaskResponsible();

    g_responsible_text_box.setValue(task_responsible);   

    var task_remark = g_record_active_task.getJazzTaskRemark();

    g_remark_text_box.setValue(task_remark);

    var task_doc = g_record_active_task.getJazzTaskLinkDoc();

    g_doc_text_box.setValue(task_doc);

    var task_pdf = g_record_active_task.getJazzTaskLinkPdf();

    g_pdf_text_box.setValue(task_pdf);

    var remind_day = g_record_active_task.getJazzTaskRemindDay();

    var remind_month = g_record_active_task.getJazzTaskRemindMonth();

    var date_remind_str = getRemindFinishDateWithYear(remind_month, remind_day);

    g_remind_date_text_box.setValue(date_remind_str);

    var finish_day = g_record_active_task.getJazzTaskFinishDay();

    var finish_month = g_record_active_task.getJazzTaskFinishMonth();

    var date_finish_str = getRemindFinishDateWithYear(finish_month, finish_day);

    g_due_date_text_box.setValue(date_finish_str);
	
    var ref_link_str = g_record_active_task.getJazzTaskRefLink(g_active_reference_number);

    g_ref_link_text_box.setValue(ref_link_str);

    var ref_descr_str = g_record_active_task.getJazzTaskRefDescription(g_active_reference_number);

    g_ref_descr_text_box.setValue(ref_descr_str);

    var deputy_name = g_record_active_task.getJazzTaskDeputyByNumber(g_active_deputy_number);

    g_deputy_name_text_box.setValue(deputy_name);

} // setControlValues

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Control Values //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates all the controls for the web page
function createControls()
{
    createTaskDropdown();

    createTextBoxRegNumber();

    createTextBoxTitle();

    createTaskDeleteButton();

    createTextBoxDescription();

    createTextBoxResponsible();

    createTextBoxDeputyName();

    createTextBoxRemark();

    createTextBoxDoc();

    createTextBoxPdf();

    createTaskSaveButton();

    createUploadDocControl();

    createUploadPdfControl();

    createUploadDocButton();

    createUploadPdfButton();

    createDownloadDocButton();

    createDownloadPdfButton();

    createRemindDatePickerControl();

    createDueDatePickerControl();

    createReferenceDropdown();

    createDeputyDropdown();

    createTextBoxReferenceLink();

    createTextBoxReferenceDescription();

} // createControls

// Creates the task dropdown control
function createTaskDropdown()
{
    g_task_drop_down = new JazzDropdown("id_task_drop_down", getIdDivElementDropdown());

    var name_array = g_table.getJazzTasksNameArray('title');

    g_task_drop_down.setNameArray(name_array);

    g_task_drop_down.setOnchangeFunctionName("eventSelectTaskDropDown");

    g_task_drop_down.setLabelText("Aufgabe wählen");

    g_task_drop_down.setLabelTextPositionAbove();

    g_task_drop_down.setTitle("Aufgabe zum Editieren wählen");

    g_task_drop_down.setAppendString("Neue Aufgabe");

} // createTaskDropdown

// Creates the reference dropdown control
function createReferenceDropdown()
{
    g_ref_drop_down = new JazzDropdown(getIdElementRefDropdown(), getIdDivElementRefDropdown());

    var ref_name_array = [];
    ref_name_array[0] = 'Referenz 1';
    ref_name_array[1] = 'Referenz 2';
    ref_name_array[2] = 'Referenz 3';
    ref_name_array[3] = 'Referenz 4';

    g_ref_drop_down.setNameArray(ref_name_array);

    g_ref_drop_down.setOnchangeFunctionName("eventSelectReferenceDropDown");

    g_ref_drop_down.setLabelText("Referenz wählen");

    g_ref_drop_down.setLabelTextPositionRight();

    g_ref_drop_down.setTitle("Referenz zum Editieren wählen. \nBevor eine neue Referenz gewählt wird, \nbitte zuerst speichern wenn neue Daten \neingegeben wurden.");

} // createReferenceDropdown

// Creates the deputy dropdown control
function createDeputyDropdown()
{
    g_deputy_drop_down = new JazzDropdown(getIdElementDeputyDropdown(), getIdDivElementDeputyDropdown());

    var deputy_name_array = [];
    deputy_name_array[0] = 'Stellvertreter 1';
    deputy_name_array[1] = 'Stellvertreter 2';
    deputy_name_array[2] = 'Stellvertreter 3';
    deputy_name_array[3] = 'Stellvertreter 4';

    g_deputy_drop_down.setNameArray(deputy_name_array);

    g_deputy_drop_down.setOnchangeFunctionName("eventSelectDeputyDropDown");

    g_deputy_drop_down.setLabelText("wählen");

    g_deputy_drop_down.setLabelTextPositionRight();

    g_deputy_drop_down.setTitle("Stellvertreter zum Editieren wählen. \nBevor eine neue Stellvertreter gewählt wird, \nbitte zuerst Name speichern, wenn Text \ngeändert/zugefügt wurde.");

} // createDeputyDropdown

// Recreate the dropdown after append and delete of jazz task
function reCreateTaskDropdown(i_active_task_number)
{
    g_record_active_number = i_active_task_number;

    createTaskDropdown();

    g_task_drop_down.setSelectOptionNumber(g_record_active_number);

    g_record_active_task = g_table.getJazzTaskRecord(g_record_active_number);

    setControlValues();

} // reCreateTaskDropdown

// Creates the save button control
function createTaskDeleteButton()
{
    g_task_delete_button = new JazzButton("id_button_delete", getIdDivElementButtonDelete());

    g_task_delete_button.setOnclickFunctionName("eventClickButtonDelete");

    g_task_delete_button.setCaption("Löschen");

    g_task_delete_button.setLabelText("");

    g_task_delete_button.setTitle("Aufgabe löschen");

} // createTaskDeleteButton

// Creates the save button control
function createTaskSaveButton()
{
    g_task_save_button = new JazzButton("id_button_save", getIdDivElementButtonSave());

    g_task_save_button.setOnclickFunctionName("eventClickButtonSave");

    g_task_save_button.setCaption("Speichern");

    g_task_save_button.setLabelText("");

    g_task_save_button.setTitle("Aufgabedaten kontrollieren und speichern");

} // createTaskSaveButton

// Creates the upload doc button control
function createUploadDocButton()
{
    g_upload_doc_button = new JazzButton("id_button_upload_doc", getIdDivElementUploadDocButton());

    g_upload_doc_button.setOnclickFunctionName("eventClickUploadDoc");

    g_upload_doc_button.setCaption("Upload");

    g_upload_doc_button.setTitle("Eine DOC Datei hochladen");

} // createUploadDocButton

// Creates the upload pdf button control
function createUploadPdfButton()
{
    g_upload_pdf_button = new JazzButton("id_button_upload_pdf", getIdDivElementUploadPdfButton());

    g_upload_pdf_button.setOnclickFunctionName("eventClickUploadPdf");

    g_upload_pdf_button.setCaption("Upload");

    g_upload_pdf_button.setTitle("Eine PDF Datei hochladen");

} // createUploadPdfButton

// Creates the download doc button control
function createDownloadDocButton()
{
    g_download_doc_button = new JazzButton("id_button_download_doc", getIdDivElementDownloadDocButton());

    g_download_doc_button.setOnclickFunctionName("eventClickDownloadDoc");

    g_download_doc_button.setCaption("Download");

    g_download_doc_button.setTitle("Eine DOC Datei herunterladen");

} // createDownloadDocButton

// Creates the download pdf button control
function createDownloadPdfButton()
{
    g_download_pdf_button = new JazzButton("id_button_download_pdf", getIdDivElementDownloadPdfButton());

    g_download_pdf_button.setOnclickFunctionName("eventClickDownloadPdf");

    g_download_pdf_button.setCaption("Öffnen");

    g_download_pdf_button.setTitle("Die PDF Datei öffnen");

} // createDownloadPdfButton

// Create the title text box
function createTextBoxTitle()
{
    g_title_text_box = new JazzTextBox("id_title_text_box", getIdDivElementTitle());

    g_title_text_box.setLabelText("Titel");

    g_title_text_box.setSize("50");

    g_title_text_box.setLabelTextPositionAbove();

    g_title_text_box.setTitle("Titel für die Aufgabe.");

    g_title_text_box.setOninputFunctionName("oninputTitle");
  
} // createTextBoxTitle

// Create the registration number text box
function createTextBoxRegNumber()
{
    g_reg_number_text_box = new JazzTextBox("id_reg_number_text_box", 'id_div_reg_number');

    g_reg_number_text_box.setLabelText("Nummer");

    g_reg_number_text_box.setLabelTextPositionAbove();

    g_reg_number_text_box.setSize("5");

    g_reg_number_text_box.setReadOnlyFlag(true);

    g_reg_number_text_box.setTitle("Registrierungsnummer. Diese Nummer kan nicht geändert werden.");

} // createTextBoxRegNumber

// Create the description text box
function createTextBoxDescription()
{
    g_description_text_box = new JazzTextBox("id_description_text_box", getIdDivElementDescription());

    g_description_text_box.setLabelText("Beschreibung/Suchwörter");

    g_description_text_box.setLabelTextPositionAbove();

    g_description_text_box.setSize("60");

    g_description_text_box.setTitle("Hier kann eine zusätzliche Beschreibung über und \nSuchwörter für die Aufgabe eingegeben werden");

    g_description_text_box.setOninputFunctionName("oninputDescription");
  
} // createTextBoxDescription

// Create the responsible text box
function createTextBoxResponsible()
{
    g_responsible_text_box = new JazzTextBox("id_responsible_text_box", getIdDivElementResponsible());

    g_responsible_text_box.setLabelText("Verantwortlich");

    g_responsible_text_box.setLabelTextPositionAbove();

    g_responsible_text_box.setSize("22");

    g_responsible_text_box.setTitle("Verantwortlich für die Aufgabe");

    g_responsible_text_box.setOninputFunctionName("oninputResponsible");
  
} // createTextBoxResponsible

// Create the description text box
function createTextBoxDeputyName()
{
    g_deputy_name_text_box = new JazzTextBox("id_deputy_text_box", getIdDivElementDeputyText());

    // No label g_deputy_name_text_box.setLabelText("");

    g_deputy_name_text_box.setLabelTextPositionAbove();

    g_deputy_name_text_box.setSize("22");

    g_deputy_name_text_box.setTitle("Der Name des Stellvertreters");

    g_deputy_name_text_box.setOninputFunctionName("oninputDescription");
  
} // createTextBoxDeputyName

// Create the remark text box
function createTextBoxRemark()
{
    g_remark_text_box = new JazzTextBox("id_remark_text_box", getIdDivElementRemark());

    g_remark_text_box.setLabelText("Bemerkung");

    g_remark_text_box.setLabelTextPositionAbove();

    g_remark_text_box.setSize("60");

    g_remark_text_box.setTitle("Hier kann eine Bemerkung über die Aufgabe eingegeben werden");

    g_remark_text_box.setOninputFunctionName("oninputRemark");
  
} // createTextBoxRemark

// Create the DOC text box
function createTextBoxDoc()
{
    g_doc_text_box = new JazzTextBox("id_doc_text_box", getIdDivElementDoc());

    g_doc_text_box.setLabelText("DOC");

    g_doc_text_box.setLabelTextPositionAbove();

    g_doc_text_box.setSize("40");

    g_doc_text_box.setTitle("Link zu einem Word Dokument, das die Aufgabe beschreibt.");

    g_doc_text_box.setOninputFunctionName("oninputDoc");
  
} // createTextBoxDoc

// Create the PDF text box
function createTextBoxPdf()
{
    g_pdf_text_box = new JazzTextBox("id_pdf_text_box", getIdDivElementPdf());

    g_pdf_text_box.setLabelText("PDF");

    g_pdf_text_box.setLabelTextPositionAbove();

    g_pdf_text_box.setSize("40");

    g_pdf_text_box.setTitle("Link zu einem PDF Dokument, das die Aufgabe beschreibt.");

    g_pdf_text_box.setOninputFunctionName("oninputPdf");
  
} // createTextBoxPdf

// Create control for uploading of a DOC file
function createUploadDocControl()
{
    g_doc_upload = new JazzUploadFile(getIdUploadDoc(), getIdDivUploadDoc());

    g_doc_upload.setLabelText("DOC");

    g_doc_upload.setOnchangeFunctionName("eventUserSelectedDoc");

    g_doc_upload.setButtonCaption("Datei hochladen");

    g_doc_upload.setExtensions(".doc,.docx");

    g_doc_upload.hideUploadDiv(true);

} // createUploadDocControl

// Create control for uploading of a PDF file
function createUploadPdfControl()
{
    g_pdf_upload = new JazzUploadFile(getIdUploadPdf(), getIdDivUploadPdf());

    g_pdf_upload.setLabelText("PDF");

    g_pdf_upload.setOnchangeFunctionName("eventUserSelectedPdf");

    g_pdf_upload.setButtonCaption("Datei hochladen");

    g_pdf_upload.setExtensions(".pdf");

    g_pdf_upload.hideUploadDiv(true);

} // createUploadPdfControl

// Create the remind date control
function createRemindDatePickerControl()
{
    g_remind_date_text_box = new JazzDatePicker('id_remind_date', getIdDivElementRemindDate());

    g_remind_date_text_box.setLabelText("Remind date");

    g_remind_date_text_box.setSize("10");

    g_remind_date_text_box.setLabelTextPositionAbove();

    g_remind_date_text_box.setTitle("Kommende Datum wird gezeigt. Nur Monat und Tag werden gespeichert.");

    g_remind_date_text_box.startDatePicker();
  
} // createRemindDatePickerControl

// Create the due date control
function createDueDatePickerControl()
{
    g_due_date_text_box = new JazzDatePicker('id_due_date', getIdDivElementDueDate());

    g_due_date_text_box.setLabelText("Due date");

    g_due_date_text_box.setSize("10");

    g_due_date_text_box.setLabelTextPositionAbove();

    g_due_date_text_box.setTitle("Kommende Datum wird gezeigt. Nur Monat und Tag werden gespeichert.");

    g_due_date_text_box.startDatePicker();
  
} // createDueDatePickerControl

// Create the reference link text box
function createTextBoxReferenceLink()
{
    g_ref_link_text_box = new JazzTextBox(getIdElementRefLink(), getIdDivElementRefLink());

    g_ref_link_text_box.setLabelText("Link Referenz");

    g_ref_link_text_box.setSize("60");

    g_ref_link_text_box.setLabelTextPositionAbove();

    g_ref_link_text_box.setTitle("Link zur Referenz Webseite oder Dokument.");
  
} // createTextBoxReferenceLink

// Create the reference description text box
function createTextBoxReferenceDescription()
{
    g_ref_descr_text_box = new JazzTextBox(getIdElementRefDescr(), getIdDivElementRefDescr());

    g_ref_descr_text_box.setLabelText("Beschreibung Referenz");

    g_ref_descr_text_box.setSize("60");

    g_ref_descr_text_box.setLabelTextPositionAbove();

    g_ref_descr_text_box.setTitle("Referenz Beschreibung.");
  
} // createTextBoxReferenceDescription

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

