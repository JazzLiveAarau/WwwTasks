// File: JazzTasksElements.js
// Date: 2020-05-28
// Author: Hanni Heller

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

// Funktionsrückgabewert ist die Identität für die Titel Div-Element
// Return value is the identity of the <div> element that will be used to display 
// the title of the task
function getIdDivElementTitle()
{
    // Tip: Get this identity string with cut and paste from the file JazzTasks.htm
    return 'id_tasks_task_title';  

} // getIdDivElementTitle


// Funktionsrückgabewert ist das Div-Element für den Titel
// Return value is <div> element that will be used to display the title of the task
function getDivElementTitle()
{
    return document.getElementById(getIdDivElementTitle());

} // getDivElementTitle

// TODO ...
function getIdDivElementDescription()
{
    return 'id_tasks_task_description';

} // getIdDivElementDescription

// TODO 
function getDivElementDescription()
{
    return document.getElementById(getIdDivElementDescription());

} // getDivElementDescription

// TODO

// Funktionsrückgabewert ist die Identität des Div-Elements für die Bemerkung
// Return value is the identity of the div element that is used for the remark
function getIdDivElementRemark()
{
    return 'id_tasks_task_remark';

} // getIdDivElementRemark

// Funktionsrückgabewert ist die Identität des Div-Elements für die Bemerkung
// Return value is the identity of the div element that is used for the remark
function getIdDivElementDoc()
{
    return 'id_tasks_task_link_doc_file';

} // getIdDivElementDoc

// id_tasks_select_task

// Return value is the identity of the div element that is used for the dropdown
function getIdDivElementDropdown()
{
    return 'id_tasks_select_task';

} // getIdDivElementDropdown

// Return value is the identity of the div element that is used for the save button
function getIdDivElementButtonSave()
{
    return 'id_tasks_task_saving';

} // getIdDivElementButtonSave


// TODO Funktionen für alle übrigen Elemente in der Datei JazzTasks.htm
//      zu definieren


