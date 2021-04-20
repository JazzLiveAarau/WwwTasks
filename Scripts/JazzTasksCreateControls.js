// File: JazzTasksCreateControls.js
// Date: 2021-04-20
// Author: Gunnar Lidén

// Inhalt
// ======
//
// Functions creating the controls of the application
//
// All labels and tooltips are defined in this file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

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

// The button cancel changes made to task
var g_task_cancel_button = null;

// The help button
var g_task_help_button = null;

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

    createTaskCancelButton();

    cl_tasks_help_button();

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

// Creates the cancel changes button control
function createTaskCancelButton()
{
    g_task_cancel_button = new JazzButton("id_button_cancel", getIdDivElementButtonCancel());

    g_task_cancel_button.setOnclickFunctionName("eventClickButtonCancel");

    g_task_cancel_button.setCaption("Änderungen verwerfen");

    g_task_cancel_button.setLabelText("");

    g_task_cancel_button.setTitle("Die ursprüngliche Daten zurückholen");

} // createTaskCancelButton

// Hides the test button
function hideCancelButton()
{
    g_task_cancel_button.hideButton();

} // hideCancelButton

// Hides the cancel button
function showCancelButton()
{
    g_task_cancel_button.showButton();

} // showCancelButton

// Creates the help button control
function cl_tasks_help_button()
{
    g_task_help_button = new JazzButton("id_button_help", getIdDivElementButtonHelp());

    g_task_help_button.setOnclickFunctionName("onClickOfHelpButton");

    g_task_help_button.setCaption("Help");

    g_task_help_button.setLabelText("");

    g_task_help_button.setTitle("Information über diese Applikation");

} // cl_tasks_help_button

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

    g_description_text_box.setLabelText("Inhalt (Suchwörter)");

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

    g_remind_date_text_box.setOnchangeFunctionName("eventUserSelectedRemindDate");

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

    g_due_date_text_box.setOnchangeFunctionName("eventUserSelectedDueDate");

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

    g_ref_link_text_box.setOninputFunctionName("oninputReferenceUrl");
  
} // createTextBoxReferenceLink

// Create the reference description text box
function createTextBoxReferenceDescription()
{
    g_ref_descr_text_box = new JazzTextBox(getIdElementRefDescr(), getIdDivElementRefDescr());

    g_ref_descr_text_box.setLabelText("Beschreibung Referenz");

    g_ref_descr_text_box.setSize("60");

    g_ref_descr_text_box.setLabelTextPositionAbove();

    g_ref_descr_text_box.setTitle("Referenz Beschreibung.");

    g_ref_descr_text_box.setOninputFunctionName("oninputReferenceDescription");
  
} // createTextBoxReferenceDescription

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////