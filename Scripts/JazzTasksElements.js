// File: JazzTasksElements.js
// Date: 2021-06-01
// Author: Hanni Heller / Gunnar Liden

// File content
// =============
//
// Funktionen die Identitäten für HTML Elemente und die Elementen (Objekte) in 
// der Datei JazzTasks.htm retournieren. 
// Get functions for all the HTML identities and elements (objects) that are
// defined in the HTML file JazzTasks.htm

// Hintergrund
// -----------
// Alle HTML Identitäten, die in JassTasks.htm sind, werden hier gelistet als Get-Funktionen.
// Die Idee ist, dass man im Code die Identitäts-Strings (wie id_tasks_task_title) verwenden 
// sollen, sondern Get-Funktionen für die Identitäten. 
// Im Code kann man es so machen:
// var element_div_title = document.getElementById("id_tasks_task_title");
// aber es ist besser (man macht weniger Fehler) wenn man es so macht:
// var element_div_title = document.getElementById(getIdDivElementTitle());

// HTML Elemente gibt man Identitäten so, dass man Zugang zu den Elementen (Objekten) 
// selber bekommen können. Deshalb ist es auch gut für jede Get-Identität-Funktion eine 
// Get-Element-Funktion zu implementieren, d.h. für getIdDivElementTitle() eine
// Funktion getDivElementTitle()

// Wenn man Text in dem Titel Div-Element zeigen möchte wird der Code kurz,
// gut lesbar und einfach zu verstehen
// var div_element_title = getDivElementTitle();
// div_element_title.innerHTML = "Some title text .....";


// Definition von Get-Funktionen
// -----------------------------

// Funktionsrückgabewert ist das Div-Element für den Titel
// Return value is <div> element that will be used to display the title of the task
function getDivElementTitle()
{
    return document.getElementById(getIdDivElementTitle());

} // getDivElementTitle

// Funktionsrückgabewert ist die Identität für das Beschreibung-Div-Element
// Return value is the identity of the <div> element for the task description 
function getIdDivElementDescription()
{
    return 'id_tasks_task_description';

} // getIdDivElementDescription

// Funktionsrückgabewert ist das Beschreibung-Div-Element
// Return value is the <div> element for the task description 
function getDivElementDescription()
{
    return document.getElementById(getIdDivElementDescription());

} // getDivElementDescription

// Return value is the identity of the <div> element for the check box use desription document
function getIdDivElementCheckboxUseDescription()
{
    return 'id_div_checkbox_use_description';

} // getIdDivElementCheckboxUseDescription

// Return value is the <div> element for the check box use desription document
function getDivElementCheckboxUseDescription()
{
    return document.getElementById(getIdDivElementCheckboxUseDescription());

} // getDivElementCheckboxUseDescription

// Funktionsrückgabewert ist die Identität für das Titel-Div-Element
// Return value is the identity of the <div> element displaying the title 
function getIdDivElementTitle()
{
    // Tip: Get this identity string with cut and paste from the file JazzTasks.htm
    return 'id_tasks_task_title';  

} // getIdDivElementTitle

// Funktionsrückgabewert ist die Identität des Div-Elements für die Bemerkung
// Return value is the identity of the div element that is used for the remark
function getIdDivElementRemark()
{
    return 'id_tasks_task_remark';

} // getIdDivElementRemark

// Funktionsrückgabewert ist die Identität des Div-Elements für das DOC Dokument
// Return value is the identity of the div element for the DOC document
function getIdDivElementDoc()
{
    return 'id_tasks_task_link_doc_file';

} // getIdDivElementDoc

// Funktionsrückgabewert ist die Identität des Div-Elements für das DOC Dokument
// Return value is the identity of the div element for the DOC document
function getIdDivElementPdf()
{
    return 'id_tasks_task_link_pdf_file';

} // getIdDivElementPdf

// Return value is the identity of the div element that is used for the dropdown
function getIdDivElementDropdown()
{
    return 'id_tasks_select_task';

} // getIdDivElementDropdown

// Return value is the identity of the div element that is used for the delete button
function getIdDivElementButtonDelete()
{
    return 'id_tasks_task_delete';

} // getIdDivElementButtonDelete

// Return value is the identity of the div element that is used for the save button
function getIdDivElementButtonSave()
{
    return 'id_tasks_task_saving';

} // getIdDivElementButtonSave


// Return value is the identity of the div element that is used for the cancel button
function getIdDivElementButtonCancel()
{
    return 'id_tasks_task_cancel';

} // getIdDivElementButtonCancel


// Return value is the identity of the div element that is used for the help button
function getIdDivElementButtonHelp()
{
    return 'id_tasks_help_button';

} // getIdDivElementButtonHelp

// Get the element of the input element for the doc document
function getElementInputDoc()
{
    return document.getElementById(getIdElementInputDoc());

} // getElementInputDoc

// Returns the identity of the input element for the doc document
function getIdElementInputDoc()
{
    return 'id_doc_file_input';

} // getIdElementInputDoc

/*QQQQ
// Returns the div element for the doc document input element
function getDivElementInputDoc()
{
    return document.getElementById(getIdDivElementInputDoc());

} // getDivElementInputDoc

// Returns the identity of the div for the doc document element
function getIdDivElementInputDoc()
{
    return 'id_ tasks_task_link_doc_file';

} // getIdDivElementInputDoc
QQQ*/

// Get the div for the display of the XML file
function getElementDivDisplayXml()
{
    return document.getElementById(getIdDivDisplayXml());

} // getElementDivDisplayXml

// Returns the identity of the div for the display of the XML file
function getIdDivDisplayXml()
{
    return 'id_display_xml';

} // getIdDivDisplayXml

// Returns the class of the div for the display of the XML file
function getClassDivDisplayXml()
{
    return 'cl_display_xml';

} // getClassDivDisplayXml

// Get the text area element for the display of the XML file
function getElementDisplayXmlTextArea()
{
    return document.getElementById(getIdDisplayXmlTextArea());

} // getElementDisplayXmlTextArea

// Returns the identity of the text area element for the display of the XML file
function getIdDisplayXmlTextArea()
{
    return 'id_display_xml_text_area';

} // getIdDisplayXmlTextArea

// Returns the identity of the div container for upload of the DOC file
function getIdDivUploadDoc()
{
    return 'id_div_upload_doc';

} // getIdDivUploadDoc

// Returns the identity of input element for upload of the DOC file
function getIdUploadDoc()
{
    return 'id_upload_doc';

} // getIdUploadDoc

// Returns the identity of the div container for upload of the PDF file
function getIdDivUploadPdf()
{
    return 'id_div_upload_pdf';

} // getIdDivUploadPdf

// Returns the identity of input element for upload of the PDF file
function getIdUploadPdf()
{
    return 'id_upload_pdf';

} // getIdUploadPdf

// Return value is the identity of the div element that is used for the reference dropdown
function getIdDivElementRefDropdown()
{
    return 'id_div_ref_dropdown';

} // getIdDivElementRefDropdown

// Return value is the identity of element reference dropdown
function getIdElementRefDropdown()
{
    return 'id_ref_dropdown';

} // getIdElementRefDropdown

// Return value is the identity of the div element that is used for the reference link
function getIdDivElementRefLink()
{
    return 'id_div_ref_link';

} // getIdDivElementRefLink

// Return value is the identity element reference link
function getIdElementRefLink()
{
    return 'id_ref_link';

} // getIdElementRefLink

// Return value is the identity of the div element that is used for the reference description
function getIdDivElementRefDescr()
{
    return 'id_div_ref_descr';

} // getIdDivElementRefDescr

// Return value is the identity of the element reference description
function getIdElementRefDescr()
{
    return 'id_ref_descr';

} // getIdElementRefDescr

// Return value is the identity of the div element upload DOC button
function getIdDivElementUploadDocButton()
{
    return 'id_div_upload_doc_button';

} // getIdDivElementUploadDocButton

// Return value is the identity of the div element upload PDF button
function getIdDivElementUploadPdfButton()
{
    return 'id_div_upload_pdf_button';

} // getIdDivElementUploadPdfButton

// Return value is the identity of the div element download DOC button
function getIdDivElementDownloadDocButton()
{
    return 'id_div_download_doc_button';

} // getIdDivElementDownloadDocButton

// Return value is the identity of the div element download PDF button
function getIdDivElementDownloadPdfButton()
{
    return 'id_div_download_pdf_button';

} // getIdDivElementDownloadPdfButton

// Return value is the identity of the div element remind date
function getIdDivElementRemindDate()
{
    return 'id_div_remind_date';

} // getIdDivElementDownloadPdfButton

// Return value is the identity of the div element finish (due) date
function getIdDivElementDueDate()
{
    return 'id_div_due_date';

} // getIdDivElementDueDate

// Return value is the identity of the div element responsible
function getIdDivElementResponsible()
{
    return 'id_div_responsible';

} // getIdDivElementResponsible

// Return value is the identity of the div element deputy dropdown
function getIdDivElementDeputyDropdown()
{
    return 'id_div_deputy_dropdown';

} // getIdDivElementDeputyDropdown

// Return value is the identity of the element deputy dropdown
function getIdElementDeputyDropdown()
{
    return 'id_deputy_dropdown';

} // getIdElementDeputyDropdown

// Return value is the identity of the div element deputy text
function getIdDivElementDeputyText()
{
    return 'id_div_deputy_text';

} // getIdDivElementDeputyText

// Returns the identity of the <div> element for the login and logout controls
function getIdDivLoginLogout()
{
    return 'id_div_login_logout';

} // getIdDivLoginLogout

// Returns the identity of the login and logout text box
function getIdLoginLogoutTextBox()
{
    return 'id_login_logout_text_box';

} // getIdLoginLogoutTextBox

// Returns the identity of the login and logout button
function getIdLoginLogoutButton()
{
    return 'id_login_logout_button';

} // getIdLoginLogoutButton