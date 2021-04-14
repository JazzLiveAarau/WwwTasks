// File: JazzTasksUtility.js
// Date: 2021-04-14
// Author: Gunnar Lidén

// Content
// =======
//
// Utility functions

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Server Execution Mode /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns true if the jazz tasks application is running on the server
// Returns false if it is running on the Visual Studio Code Live Server
function execApplicationOnServer()
{
    var current_base = window.location.href;

    var server_url = 'https://www.jazzliveaarau.ch';

    var index_url = current_base.indexOf(server_url);

    if (index_url >= 0) // Actually 0
    {
        return true;
    }
    else
    {
        return false;
    }

} // execApplicationOnServer

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Server Execution Mode ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Display XML /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// For debug display XML as text
function debugDisplayXmlAsText()
{
    var b_execute_server = execApplicationOnServer();
    
    if (!b_execute_server)
    {
        var el_div_display_xml = getElementDivDisplayXml();

        el_div_display_xml.style.display = 'block';

        var el_display_xml_text_area = getElementDisplayXmlTextArea();

        displayJazzTasksXmlOnScreen(el_display_xml_text_area);
    }

} // debugDisplayXmlAsText

// Displays the XML file on the screen if the input control is set
function displayJazzTasksXmlOnScreen(i_el_display_ctrl)
{
  if (null == i_el_display_ctrl)
  {
    return;
  }

  var b_html = false;

  var xml_str = xmlToFormattedString(g_xml.getXmlObject(), b_html);
	
  if (null != xml_str)
  {
    i_el_display_ctrl.innerHTML = xml_str;
  }

} // displayJazzTasksXmlOnScreen

// Debug message to the console log
function debugExecuteServer()
{
  var b_execute_server = execApplicationOnServer();

  var execute_msg = '';

  if (b_execute_server)
  {
      execute_msg = 'Application is running on the server';
  }
  else
  {
      execute_msg = 'Application is running locally (in the Visual Studio Code Live Server)';
  }

  console.log(execute_msg);

} // debugExecuteServer

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Display XML ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Date Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Returns the next coming remind or finish date, i.e. month and day with the right year
function getRemindFinishDateWithYear(i_month, i_day)
{
  var ret_date_str = '';

  if (i_month.length == 0 || i_day.length == 0)
  {
    return ret_date_str;
  }

  var current_date = new Date();
  var current_year = current_date.getFullYear();

  var b_passed = DateIsPassed(current_year, i_month, i_day);

  if (b_passed)
  {
    ret_date_str = getIsoDateString(current_year + 1, i_month, i_day);
  }
  else
  {
    ret_date_str = getIsoDateString(current_year, i_month, i_day);
  }

  return ret_date_str;

} // getRemindFinishDateWithYear

// Returns the month from an iso-date string
function getMonthFromIsoDateString(i_iso_date_str)
{
    var ret_month = '';

    ret_month = i_iso_date_str.substring(5, 7);

    var first_char = ret_month.substring(0,1);

    if (first_char == '0')
    {
      ret_month = ret_month.substring(1);
    }

    return ret_month;

} // getMonthFromIsoDateString

// Returns the day from an iso-date string
function getDayFromIsoDateString(i_iso_date_str)
{
    var ret_day = '';

    ret_day = i_iso_date_str.substring(8);

    var first_char = ret_day.substring(0,1);

    if (first_char == '0')
    {
      ret_day = ret_day.substring(1);
    }

    return ret_day;

} // getMonthFromIsoDateString


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Date Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Backup File Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Creates a backup if file exists on the server
function createBackupIfFileExistsOnServer(i_case_str)
{
    var path_file_name = '';

    if ('DOC' == i_case_str)
    {
        path_file_name = g_record_active_task.getJazzTaskLinkDoc();
    }
    else if ('PDF' == i_case_str)
    {
        path_file_name = g_record_active_task.getJazzTaskLinkPdf();
    }
    else
    {
        return;
    }

    if (path_file_name.length == 0)
    {
        return;
    }

    var file_name = getFileBasename(path_file_name);

    var backup_file_name = getBackupFileName(file_name);

    var url_file_to_copy = "Documents/" + file_name;

    var url_file_backup = "Documents/Backups/" + backup_file_name;

    backupFileWithJQueryPostFunction(url_file_to_copy, url_file_backup);

} // createBackupIfFileExistsOnServer

// Returns a backup file name
function getBackupFileName(i_file_name)
{
    var ret_backup_name = '';

    var index_slash = i_file_name.indexOf("/");
    if (index_slash >= 0)
    {
        alert("getBackupFileName Input file with path is not allowed (" + i_file_name + ")");

        return ret_backup_name;
    }

    var index_pt = i_file_name.indexOf(".");
    
    if (index_pt < 0)
    {
        alert("getBackupFileName Input file with no extension is not allowed (" + i_file_name + ")");
        
        return ret_backup_name;
    }

    var file_name_without_ext = i_file_name.substring(0, index_pt);

    var file_ext = i_file_name.substring(index_pt);

    var current_date_time_str = getCurrentDateTimeString();

    ret_backup_name = file_name_without_ext + '_' + current_date_time_str;

    ret_backup_name = ret_backup_name + file_ext;
  
    return ret_backup_name;

} // getBackupFileName

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Backup File Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start File Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the basename, i.e the file name without path
// Input case is DOC or PDF
function getFileBasename(i_path_file)
{
    var index_last_slash = -1;

    for (var index_char = 0; index_char < i_path_file.length; index_char++)
    {
        var current_char = i_path_file.substring(index_char, index_char+1);

        if (current_char == "/")
        {
            index_last_slash = index_char;
        }

        if (current_char == ".")
        {
            break;
        }
    }

    if (index_last_slash < 0)
    {
        return i_path_file;
    }

    var ret_base_name = i_path_file.substring(index_last_slash + 1);

    return ret_base_name;

} // getFileBasename

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End File Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
