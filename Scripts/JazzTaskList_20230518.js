// File: JazzTaskList.js
// Date: 2023-05-18
// Author: Gunnar Lidén

// Content
// =======
//
// Functions to create a person - tasks lists 
// 
//

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object corresponding to XML file JazzTasks.xml
var g_task_list_xml = null;

// JazzTasksTable object that hold all JazzTask records 
var g_task_list_table = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML object for XML file JazzTasks.xml and call loadSeasonXml
function initJazzTasksList()
{
    g_task_list_xml = new JazzTasksXml(initJazzTasksListAfterLoadOfXml);

} // initJazzTasksList

// Initialization after load of the XML object for the XML file JazzTask.xml
// 1. Creation of the JazzTasksTable object.
function initJazzTasksListAfterLoadOfXml()
{
    g_task_list_table = new JazzTasksTable(g_task_list_xml);

    g_list = new JazzTasksList(g_task_list_table);

} // initJazzTasksListAfterLoadOfXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Get the div for the display of the task list
function getElementDivContentList()
{
    return document.getElementById(getIdDivContentList());

} // getElementDivContentList

// Returns the identity of the div for the task list
function getIdDivContentList()
{
    return 'id_content_list';

} // getIdDivContentList

// Returns the class of the div for the task list
function getClassDivContentList()
{
    return 'cl_content_list';

} // getClassDivContentList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Class JazzTasksList ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Class for listing tasks
class JazzTasksList 
{
    // Creates the instance of the class
    constructor(i_table) 
    {
        // Member variables
        // ===============

        // JazzTasksTable object that hold all JazzTask records 
        this.m_table = i_table;

        // Initialization function
        this.init();

    } // constructor

    // Execution functions
    // ===================

    // Creates the list as an array of HTML statements 
    create()
    {
        var html_array = [];

        var all_html_str = '';

        all_html_str = all_html_str + '<h1>Aufgaben JAZZ <i>live</i> AARAU</h1>';

        var html_index = 0;

        var name_list = this.getNameList();

        for (var i_name=0; i_name < name_list.length; i_name++)
        {
            var current_name = name_list[i_name];

            if (current_name != 'Information' && current_name != 'IT_Information' && current_name != 'Alle' && current_name != 'Termin' && current_name != 'Vakanz' )
            {
                html_array[html_index] = this.getResponsibilityDeputyHtml(current_name);

                all_html_str = all_html_str + html_array[html_index];

                html_index = html_index + 1;
            }

        } // i_name

        html_array[html_index] = this.getResponsibilityDeputyHtml('Alle');

        all_html_str = all_html_str + html_array[html_index];

        html_index = html_index + 1;

        html_array[html_index] = this.getResponsibilityDeputyHtml('Information');

        all_html_str = all_html_str + html_array[html_index];

        html_index = html_index + 1;

        html_array[html_index] = this.getResponsibilityDeputyHtml('IT_Information');

        all_html_str = all_html_str + html_array[html_index];

        html_index = html_index + 1;

        html_array[html_index] = this.getResponsibilityDeputyHtml('Vakanz');

        all_html_str = all_html_str + html_array[html_index];

        html_index = html_index + 1;

        var el_div_list = getElementDivContentList();

        el_div_list.innerHTML = all_html_str;

    } // create

    // Get and set functions for the member variables
    // ==============================================


    // Init functions
    // ==============

    // Initialization function
    init()
    {

        // Temporary: Always create the list
        this.create();

    } // init

    // Returns an HTML string defining tasks for one person
    getResponsibilityDeputyHtml(i_member_name)
    {
        var ret_html_str = '';

        ret_html_str = ret_html_str + '<table>';

        ret_html_str = ret_html_str + this.getTableRowHtml(' ');

        ret_html_str = ret_html_str + this.getTableRowHtml(' ');

        ret_html_str = ret_html_str + this.getTableRowHtml(' ');

        ret_html_str = ret_html_str + this.getTableRowHtml(' ');

        ret_html_str = ret_html_str + this.getTableRowHtml(' ');

        ret_html_str = ret_html_str + this.getTableRowHeaderHtml(i_member_name);

        var array_case = 'responsible';
    
        var task_responsibles = this.m_table.getJazzTasksNameArray(array_case); 

        array_case = 'reg_number_title';

        var registration_numbers_titles = this.m_table.getJazzTasksNameArray(array_case)

        for (var i_task=0; i_task < task_responsibles.length; i_task++)
        {
            var current_name = task_responsibles[i_task];

            if (i_member_name == current_name)
            {
                var reg_number_title = registration_numbers_titles[i_task];

                ret_html_str = ret_html_str + this.getTableRowHtml(reg_number_title);
            }

        } // i_task

        ret_html_str = ret_html_str + this.getDeputyHtml(i_member_name);

        ret_html_str = ret_html_str + '</table>';

        return ret_html_str;

    } // getResponsibilityDeputyHtml

    // Returns an HTML string defining deputy tasks for one person
    getDeputyHtml(i_member_name)
    {
        var ret_dep_html_str = '';

        if (i_member_name == 'Information' || i_member_name == 'IT_Information' )
        {
            return ret_dep_html_str;
        }

        ret_dep_html_str = ret_dep_html_str + this.getTableRowHeaderHtml('<i>Stellvertretung</i>');

        var array_case = 'deputies';
    
        var task_deputies = this.m_table.getJazzTasksNameArray(array_case); 

        array_case = 'reg_number_title';

        var registration_numbers_titles = this.m_table.getJazzTasksNameArray(array_case);

        for (var i_task=0; i_task < task_deputies.length; i_task++)
        {
            var deputy_names_str = task_deputies[i_task];

            var index_name = deputy_names_str.indexOf(i_member_name);

            if (index_name >= 0)
            {
                var reg_number_title = registration_numbers_titles[i_task];

                ret_dep_html_str = ret_dep_html_str + this.getTableRowHtml(reg_number_title);

            }

        } // i_task

        return ret_dep_html_str;

    } // getDeputyHtml

    // Returns one table row
    getTableRowHtml(i_content)
    {
        var row_ret_html_str = '';

        row_ret_html_str = row_ret_html_str + '<tr>';

        row_ret_html_str = row_ret_html_str + '<td>';

        row_ret_html_str = row_ret_html_str + i_content;

        row_ret_html_str = row_ret_html_str + '</td>';

        row_ret_html_str = row_ret_html_str + '</tr>';

        return row_ret_html_str;

    } // getTableRowHtml

    // Returns one table row
    getTableRowHeaderHtml(i_content)
    {
        var row_ret_html_str = '';

        row_ret_html_str = row_ret_html_str + '<tr>';

        row_ret_html_str = row_ret_html_str + '<th>';

        row_ret_html_str = row_ret_html_str + i_content;

        row_ret_html_str = row_ret_html_str + '</th>';

        row_ret_html_str = row_ret_html_str + '</tr>';

        return row_ret_html_str;

    } // getTableRowHeaderHtml


    // Get names 
    getNameList()
    {
        var ret_name_list = [];

        var array_case = 'responsible';
    
        var task_responsibles = this.m_table.getJazzTasksNameArray(array_case);  

        var name_number = 0;

        for (var i_task=0; i_task < task_responsibles.length; i_task++)
        {
            var current_name = task_responsibles[i_task];

            var b_in_list = this.inNameList(ret_name_list, current_name);

            if (!b_in_list)
            {
                ret_name_list[name_number] = current_name;

                name_number = name_number + 1;
            }
        }

        return ret_name_list;

    } // getNameList

    // Returns true if the name is in the input list
    inNameList(i_name_list, i_test_name)
    {
        var b_in_list = false;

        for (var i_name=0; i_name < i_name_list.length; i_name++)
        {
            var current_name = i_name_list[i_name];

            if (current_name == i_test_name)
            {
                b_in_list = true;

                break;
            }
        }

        return b_in_list;

    } // inNameList


} // JazzTasksList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Class JazzTasksList /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
