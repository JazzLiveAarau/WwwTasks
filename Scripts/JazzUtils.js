// File: JazzUtils.js
// Date: 2021-04-18
// Author: Gunnar Lidén

// File content
// =============
//
// Utility functions for jazz applications
//

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Load XML Function  ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML file. The XML object is returned as argument for the call back function
// https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
function jazzUtilLoadXml(i_path_file_name_xml, i_callback_function_name)
{
  // Request server object for the XML file
  var jazz_xmlhttp = new XMLHttpRequest();
  
  // Event function: The server will return state and status 
  // from object functions open and send.
  jazz_xmlhttp.onreadystatechange = function() 
  {
    if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
	  {
        var object_xml = jazz_xmlhttp.responseXML;
        
        i_callback_function_name(object_xml);
    }
    else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
	  {
      alert("Error 404: File " + i_path_file_name_xml + " not found" );
    }	
  };
  
  // Open the file
  jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
  
  jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
	
  jazz_xmlhttp.send();	

} // jazzUtilLoadXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Load XML Function  //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Basic Save File Function  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


// Function copied from FlyerSave.js

// Save a file with the JQuery function "post"
// Please refer to SaveFileOnServer.php for a detailed description of "post"
// Input parameter i_file_name is the server file name
// Input parameter i_content_string is the content of the file
// The function returns false for failure
function saveFileWithJQueryPostFunction(i_file_name, i_content_string)
{
    $.post
      ('SaveFileOnServer.php',
        {
          file_content: i_content_string,
          file_name: i_file_name
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of SaveFileOnServer.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // saveFileWithJQueryPostFunction


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Basic Save File Function  ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Basic Backup File Function  ///////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Backup a file with the JQuery function "post"
// Please refer to BackupFileOnServer.php for a detailed description of "post"
// Input parameter i_url_file_to_copy is the url for server file name that shall be copied
// Input parameter i_url_file_backup is the url for server file name for the backup copy
// The function returns false for failure
function backupFileWithJQueryPostFunction(i_url_file_to_copy, i_url_file_backup)
{
    if (!execApplicationOnServer())
    {
        alert("backupFileWithJQueryPostFunction BackupFileOnServer.php cannot be executed on the local (live) server");

        return false;
    }

    $.post
      ('BackupFileOnServer.php',
        {
          file_to_copy: i_url_file_to_copy,
          file_backup: i_url_file_backup
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of BackupFileOnServer.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // backupFileWithJQueryPostFunction

// Backup a file an then delete it with the JQuery function "post"
// Please refer to BackupFileDelete.php for a detailed description of "post"
// Input parameter i_url_file_copy_delete is the url for server file name that shall be copied
// Input parameter i_url_file_backup is the url for server file name for the backup copy
// The function returns false for failure
function backupFileAndDeleteWithJQueryPostFunction(i_url_file_copy_delete, i_url_file_backup)
{
    if (!execApplicationOnServer())
    {
        alert("backupFileAndDeleteWithJQueryPostFunction BackupFileDelete.php cannot be executed on the local (live) server");

        return false;
    }

    $.post
      ('BackupFileDelete.php',
        {
          file_to_copy_delete: i_url_file_copy_delete,
          file_backup: i_url_file_backup
        },
        function(data_save,status_save)
		{
            if (status_save == "success")
            {
                // alert(data_save);
            }
            else
            {
				alert("Execution of BackupFileDelete.php failed");
				return false;
            }          
        } // function
      ); // post
	  
    return true;	  
	
} // backupFileAndDeleteWithJQueryPostFunction

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Basic Backup File Function  /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Date/Time Functions ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Copied from H:\Jazz\MyWeb\Homepage\Scripts\Utility.js
// Returns true if date is passed
function DateIsPassed(i_concert_year, i_concert_month, i_concert_day)
{
	var ret_boolean = true;
	
	var i_concert_year_int = parseInt(i_concert_year);
	var i_concert_month_int = parseInt(i_concert_month);
	var i_concert_day_int = parseInt(i_concert_day);
	
	var current_date = new Date();
  var current_year = current_date.getFullYear();
	var current_month = current_date.getMonth() + 1;
  var current_day = current_date.getDate();
    
	if (current_year >  i_concert_year_int )
	{
		return ret_boolean;
	}
	else if (current_year ==  i_concert_year_int && current_month > i_concert_month_int)
	{
		return ret_boolean;
	}
	else if (current_year ==  i_concert_year_int && current_month == i_concert_month_int && current_day > i_concert_day_int)
	{
		return ret_boolean;
	}
	
	ret_boolean = false;
	
	return ret_boolean;
	
}  // DateIsPassed

// Get ISO standard date string
function getIsoDateString(i_year, i_month, i_day)
{
    var ret_iso_date_str = '';

    var month_formatted = getFormattedTenNumber(i_month);

    var day_formatted = getFormattedTenNumber(i_day);

    ret_iso_date_str = ret_iso_date_str + i_year.toString() + '-';

    ret_iso_date_str = ret_iso_date_str + month_formatted.toString() + '-';

    ret_iso_date_str = ret_iso_date_str + day_formatted.toString();

    return ret_iso_date_str;

} // getIsoDateString

// Get formatted number, i.e. starting with '0' for numbers 1 to 9
function getFormattedTenNumber(i_number)
{
    var ret_number = '';

    if (i_number >= 100)
    {
        //alert('getFormattedTenNumber Input number greater than or equal 100');

        // Should not occur

        return  i_number.toString();
    }
 
    if (i_number <= 9)
    {
        ret_number = '0' + i_number.toString();
    }
    else
    {
        ret_number = i_number.toString();
    }
 
    return ret_number;

} // getFormattedTenNumber

// Returns the current date and time as string
function getCurrentDateTimeString()
{
  var current_date = new Date();

  var current_year = current_date.getFullYear().toString();

  var current_month = addZeroDateTime(current_date.getMonth() + 1); // 0, 1, ...

  var current_day = addZeroDateTime(current_date.getDate());

  var current_hour = addZeroDateTime(current_date.getHours());

  var current_minutes = addZeroDateTime(current_date.getMinutes());

  var current_seconds = addZeroDateTime(current_date.getSeconds());

  var ret_date_time = current_year + current_month + current_day + '_' + 
                      current_hour + '_' + current_minutes + '_' + current_seconds;  

  return ret_date_time;

} // getCurrentDateTimeString

// Add zero if date or time is less than ten
function addZeroDateTime(i_time)
{
    var ret_time = i_time.toString();

    if (ret_time.length == 1)
    {
      ret_time = '0' + ret_time;
    }

    return ret_time;

} // addZeroDateTime

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Date/Time Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

