// File: JazzTasksTests.js
// Date: 2020-06-19
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Test-Funktionen

// Beschreibung wann die Funktion angerufen wird und was die Funktion macht
function onClickOfTestButton()
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

} // onClickOfTestButton

// Returns the HTML code for <label> und <input> for the title
function getStringForTheElementInputTitle()
{
    var ret_html_str = '';

    ret_html_str = ret_html_str + 
     '<label for="id_title_text_box" title="Titel für die Aufgabe.">Titel</label>';

    ret_html_str = ret_html_str + 
     '<input type="text" id="id_title_text_box" value="" size="50" title="Titel für die Aufgabe.">';

     console.log(ret_html_str);

    return ret_html_str;
}

class JazzTextBoxHanni 
{
    constructor(i_id_text_box, i_id_div_container) 
    {
        this.m_id_text_box = i_id_text_box;
        this.m_id_div_container = i_id_div_container;
        this.m_value = '';

        this.setControl();

     } // constructor

     setValue(i_value) 
     {
       this.m_value = i_value;

       this.setControl();
     }

     setControl()
     {
         var el_div_container = document.getElementById(this.m_id_div_container);

        var html_str = this.getHtmlString();

        el_div_container.innerHTML = html_str;
    
     }

    getHtmlString()
    {
        var ret_html_str = '';

        ret_html_str = ret_html_str + '<label for="';

        ret_html_str = ret_html_str + this.m_id_text_box + '" ';

        ret_html_str = ret_html_str + ' title="Titel für die Aufgabe.">Titel</label>';

        ret_html_str = ret_html_str + '<input type="text" id="';

        ret_html_str = ret_html_str + this.m_id_text_box + '" ';

        ret_html_str = ret_html_str + ' value="' + this.m_value + '"'; 
        
        ret_html_str = ret_html_str + 'size="50" title="Titel für die Aufgabe.">';

        console.log(ret_html_str);

        return ret_html_str;
    }

} // JazzTextBoxHanni

