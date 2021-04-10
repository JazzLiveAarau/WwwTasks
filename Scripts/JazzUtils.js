// File: JazzUtils.js
// Date: 2020-06-24
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
///////////////////////// Start Date Functions ////////////////////////////////////////////
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

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Date Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

