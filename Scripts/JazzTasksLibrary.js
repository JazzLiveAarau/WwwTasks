// This file was concatenated by the application AdminTasks
// ------------------------------------------------------- 


// File: JazzTasksTable.js
// Date: 2020-06-19
// Author: Gunnar Lidén

// File content
// =============
//
// Table with all records defined in JazzTasks.xml and table functions

// Class corresponding to all the XML elements <JazzTask> in the file JazzTasks.xml
class JazzTasksTable 
{
    // Creates the instance of the class
    constructor(i_jazz_tasks_object_xml) 
    {
        // Member variables (fields)
        // =========================

        // XML object that holds all the jazz tasks data defined in the XML 
        // file JazzTasks.xml and that has set, get, delete and append 
        // functions
        this.m_xml = i_jazz_tasks_object_xml;        

        // Array with all JazzTask records defined by the file JazzTasks.xml
        this.m_jazz_tasks_table = [];

        // Array of jazz task names or titles. 
        // An array that can be used for a dropdown control 
        this.m_jazz_tasks_name_array = [];

        // Case parameter telling if m_jazz_tasks_name_array is defined by  
        // registration numbers (= 'reg_number') or titles (= 'title')
        this.m_jazz_tasks_name_array_case = 'undefined';

        // Initialization of the JazzTasks table. Set array m_jazz_tasks_table.
        this.initJazzTasksTable();

    }

    // Initialization member functions
    // ===============================

    // Initialization of the jazz tasks table. Set array m_jazz_tasks_table
    // 1. Check that the input XML object is set
    // 2. Get the number of jazz tasks defined in the XML object. 
    //    Call of getNumberOfJazzTasks
    // 3. Loop for all jazz tasks records
    // 3.1 Get the JazzTask record for the current task number. 
    //     Call of getJazzTaskRecordXml
    // 3.2 Append the JazzTask record to the array
    initJazzTasksTable()
    {
        this.m_jazz_tasks_table = [];

        if (null == this.m_xml.getXmlObject())
        {
            alert("JazzTasksTable Error: The XML object corresponding to the file JazzTasks.xml is null");

            return;
        }
        
        var n_tasks = this.m_xml.getNumberOfJazzTasks();

        for (var task_number=1; task_number <= n_tasks; task_number++)
        {
            var current_task = this.getJazzTaskRecordXml(task_number);

            this.m_jazz_tasks_table[task_number - 1] = current_task;

        } // task_number

    } // initJazzTasksTable

    // Get and set member functions for the member variables (fields)
    // ==============================================================

    // Returns the array with all JazzTask records defined by the file JazzTasks.xml
    getJazzTasksTable()
    {
        return this.m_jazz_tasks_table;

    } // getJazzTasksTable

    // Sets the array with all JazzTask records defined by the file JazzTasks.xml
    setJazzTasksTable(i_jazz_tasks_table)
    {
        this.m_jazz_tasks_table = i_jazz_tasks_table;

    } // getJazzTasksTable

    // Returns the number of JazzTask records in the table
    getNumberOfJazzTaskRecords()
    {
        return this.m_jazz_tasks_table.length;

    } // getNumberOfJazzTaskRecords

    // Returns the jazz task record for a given jazz task number
    getJazzTaskRecord(i_jazz_task_number)
    {
        var ret_jazz_task = null;

        var n_records = this.getNumberOfJazzTaskRecords();

        if (i_jazz_task_number < 1 || i_jazz_task_number > n_records)
        {
            alert("JazzTasksTable.getJazzTaskRecord Input jazz task number " +
                         i_jazz_task_number.toString() + 
                        " is not between 1 and " + n_records.toString());

            return ret_jazz_task;
        }

        ret_jazz_task = this.m_jazz_tasks_table[i_jazz_task_number - 1];

        return ret_jazz_task;

    } // getJazzTaskRecord

    // Sets the jazz task record for a given jazz task number
    // Returns false for failure
    setJazzTaskRecord(i_jazz_task_number, i_jazz_task)
    {
        if (null == i_jazz_task)
        {
            alert("JazzTasksTable.setJazzTaskRecord Input jazz task record is null");

            return false;
        }

        var n_records = this.getNumberOfJazzTaskRecords();

        if (i_jazz_task_number < 1 || i_jazz_task_number > n_records)
        {
            alert("JazzTasksTable.setJazzTaskRecord Input jazz task number " + 
                        i_jazz_task_number.toString() + 
                        " is not between 1 and " + n_records.toString());

            return false;
        }

        this.m_jazz_tasks_table[i_jazz_task_number - 1] = i_jazz_task;

        return true;

    } // setJazzTaskRecord

/*
    this.m_jazz_tasks_name_array = [];

        // Case parameter telling if m_jazz_tasks_name_array is defined by  
        // registration numbers (= 'reg_number') or titles (= 'title')
        this.m_jazz_tasks_name_array_case = 'undefined';
*/
    // Returns an array with names that can be used for a dropdown control
    // Case reg_number: An array with registration numbers
    // Case titles: An array with titles
    getJazzTasksNameArray(i_jazz_tasks_name_array_case)
    {
        this.m_jazz_tasks_name_array = [];

        if (i_jazz_tasks_name_array_case == 'reg_number' || 
            i_jazz_tasks_name_array_case == 'title'         )
        {
            this.m_jazz_tasks_name_array_case = i_jazz_tasks_name_array_case;
        }
        else
        {
            alert("JazzTasksTable.getJazzTasksNameArray Case is not reg_number or title")

            return this.m_jazz_tasks_name_array;
        }

        var n_records = this.getNumberOfJazzTaskRecords();

        for (var task_number=1; task_number <= n_records; task_number++)
        {
            var current_task = this.getJazzTaskRecord(task_number);

            var reg_number = current_task.getJazzTaskRegNumber();

            var task_title = current_task.getJazzTaskTitle();

            if (this.m_jazz_tasks_name_array_case == 'reg_number')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = reg_number; 
            }
            else if (this.m_jazz_tasks_name_array_case == 'title')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = task_title; 
            }

        } // task_number

        return this.m_jazz_tasks_name_array;

    } // getJazzTasksNameArray    

    // Append JazzTask record member function
    // ======================================

    // Appends the input jazz task record to the table, i.e. adds the iput record at 
    // the end of the array g_jazz_tasks_table 
    // Returns false for failure
    appendJazzTaskRecord(i_jazz_task)
    {
        if (null == i_jazz_task)
        {
            alert("JazzTasksTable.appendJazzTaskRecord Input jazz task record is null");

            return false;
        }

        var n_records = this.getNumberOfJazzTaskRecords();

        this.m_jazz_tasks_table[n_records] = i_jazz_task;

        return true;

	} // appendJazzTaskRecord
	
	// Returns the registration number (string) for a task record that shall be added
	getAppendRegistrationNumber()
	{
		var ret_reg_number_str = '';

		var name_array = this.getJazzTasksNameArray('reg_number');

		var max_reg_number = -12345;

		for (var index_reg=0; index_reg < name_array.length; index_reg++)
		{
			var reg_number = name_array[index_reg];

			var number_int = this.getRegNumberInt(reg_number);

			if (number_int > max_reg_number)
			{
				max_reg_number = number_int;
			}

		}

		ret_reg_number_str = this.regNumberIntToString(max_reg_number + 1);

		return ret_reg_number_str;

	} // getAppendRegistrationNumber

	// Returns the number of the registration number string
	getRegNumberInt(i_reg_number)
	{
		var ret_number_int = -12345;

		var number_str = '';

		for (var index_char=0; index_char < i_reg_number.length; index_char++)
		{
			var current_char = i_reg_number.substring(index_char, index_char + 1);
			if (current_char != 'A' && current_char != '0')
			{
				number_str = i_reg_number.substring(index_char);

				break;
			}
		}

		ret_number_int = parseInt(number_str);

		return ret_number_int;

	} // getRegNumberInt

	// Returns the registration number as string
	regNumberIntToString(i_reg_number_int)
	{
		var ret_reg_number_str = '';

		ret_reg_number_str = ret_reg_number_str + 'A';

		var reg_number_str = i_reg_number_int.toString();

		if (reg_number_str.length == 1)
		{
			ret_reg_number_str = ret_reg_number_str + '000';
		}
		else if (reg_number_str.length == 2)
		{
			ret_reg_number_str = ret_reg_number_str + '00';
		}
		else if (reg_number_str.length == 3)
		{
			ret_reg_number_str = ret_reg_number_str + '0';
		}
		else if (reg_number_str.length == 4)
		{
			ret_reg_number_str = ret_reg_number_str + '';
		}
		else
		{
			alert("JazzTasksTable.regNumberIntToString Error");

			return ret_reg_number_str;
		}

		ret_reg_number_str = ret_reg_number_str + reg_number_str;

		return ret_reg_number_str;

	} // regNumberIntToString

    // Delete JazzTask record member function
    // ======================================

    // Deletes the jazz task record for a given jazz task number
    // Returns false for failure
    deleteJazzTaskRecord(i_jazz_task_number)
    {
		var output_array = [];

        var n_records = this.getNumberOfJazzTaskRecords();

        if (i_jazz_task_number < 1 || i_jazz_task_number > n_records)
        {
            alert("JazzTasksTable.deleteJazzTaskRecord Input jazz task number " + 
                        i_jazz_task_number.toString() + 
                        " is not between 1 and " + n_records.toString());

            return false;
        }
		
		var index_out = 0;

		for (var task_number=1; task_number <= n_records; task_number++)
		{
			var current_task = this.m_jazz_tasks_table[task_number-1];

			if (task_number != i_jazz_task_number)
			{
				output_array[index_out] = current_task;

				index_out = index_out + 1;
			}
		}
		
		this.m_jazz_tasks_table = [];

		this.m_jazz_tasks_table = output_array;

        return true;

    } // deleteJazzTaskRecord

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Get And Set Record Xml ////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns a jazz record with data from the XML object corresponding to JazzTasks.xml
	// Input data is a task number 1, 2, 3, ...
	getJazzTaskRecordXml(i_task_number)
	{
		var ret_jazz_task = null;
		
		var n_tasks = this.m_xml.getNumberOfJazzTasks();

		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("getJazzTaskRecordXml Input task number " + i_task_number.toString() + 
						" is not between 1 and " + n_tasks.toString());

			return ret_jazz_task;
		}

		ret_jazz_task = new JazzTask();

		var jazz_task_reg_number = this.m_xml.getJazzTaskRegNumber(i_task_number);
		ret_jazz_task.setJazzTaskRegNumber(jazz_task_reg_number);

		var jazz_task_title = this.m_xml.getJazzTaskTitle(i_task_number);
		ret_jazz_task.setJazzTaskTitle(jazz_task_title);

		var jazz_task_description =  this.m_xml.getJazzTaskDescription(i_task_number);
		ret_jazz_task.setJazzTaskDescription(jazz_task_description);

		var jazz_task_remark = this.m_xml.getJazzTaskRemark(i_task_number);
		ret_jazz_task.setJazzTaskRemark(jazz_task_remark);

		var jazz_task_link_doc = this.m_xml.getJazzTaskLinkDoc(i_task_number);
		ret_jazz_task.setJazzTaskLinkDoc(jazz_task_link_doc);

		var jazz_task_link_pdf = this.m_xml.getJazzTaskLinkPdf(i_task_number);
		ret_jazz_task.setJazzTaskLinkPdf(jazz_task_link_pdf);

		var jazz_task_link_html = this.m_xml.getJazzTaskLinkHtml(i_task_number);
		ret_jazz_task.setJazzTaskLinkHtml(jazz_task_link_html);

		var jazz_task_remind_day = this.m_xml.getJazzTaskRemindDay(i_task_number);
		ret_jazz_task.setJazzTaskRemindDay(jazz_task_remind_day);

		var jazz_task_remind_month = this.m_xml.getJazzTaskRemindMonth(i_task_number);
		ret_jazz_task.setJazzTaskRemindMonth(jazz_task_remind_month);

		var jazz_task_finish_day = this.m_xml.getJazzTaskFinishDay(i_task_number);
		ret_jazz_task.setJazzTaskFinishDay(jazz_task_finish_day);

		var jazz_task_finish_month = this.m_xml.getJazzTaskFinishMonth(i_task_number);
		ret_jazz_task.setJazzTaskFinishMonth(jazz_task_finish_month);

		var jazz_task_responsible = this.m_xml.getJazzTaskResponsible(i_task_number);
		ret_jazz_task.setJazzTaskResponsible(jazz_task_responsible);

		var n_references = this.m_xml.getNumberOfJazzTaskReferences(i_task_number);

		for (var reference_number=1; reference_number <= n_references; reference_number++)
		{
			var jazz_task_ref_link =  this.m_xml.getJazzTaskRefLink(i_task_number, reference_number);
			ret_jazz_task.setJazzTaskRefLink(reference_number, jazz_task_ref_link);

			var jazz_task_ref_description = this.m_xml.getJazzTaskRefDescription(i_task_number, reference_number);
			ret_jazz_task.setJazzTaskRefDescription(reference_number, jazz_task_ref_description);
			
		} // reference_number

		var n_deputies = this.m_xml.getNumberOfJazzTaskDeputies(i_task_number);

		var jazz_task_deputies = [];

		for (var deputy_number=1; deputy_number <= n_deputies; deputy_number++)
		{
			var deputy_name =  this.m_xml.getJazzTaskDeputy(i_task_number, deputy_number);

			jazz_task_deputies[deputy_number - 1] = deputy_name;

		} // deputy_number

		ret_jazz_task.setJazzTaskDeputies(jazz_task_deputies);

		return ret_jazz_task;

	} // getJazzTaskRecordXml


	// Sets the XML object (corresponding to JazzTasks.xml) with a jazz task record 
	// Input data is a task number 1, 2, 3, ...
	// Returns false for error
	setJazzTaskRecordXml(i_task_number, i_jazz_task)
	{   
		// Check the number records that the XML object has
		// The number of records of JazzTaskTable (the array) is the same 
		var n_tasks = this.m_xml.getNumberOfJazzTasks();

		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("setJazzTaskRecordXml Input task number " + i_task_number.toString() + 
						" is not between 1 and " + n_tasks.toString());

			return false;
		}

		var jazz_task_reg_number = i_jazz_task.getJazzTaskRegNumber();
		this.m_xml.setJazzTaskRegNumber(i_task_number, jazz_task_reg_number);

		var jazz_task_title = i_jazz_task.getJazzTaskTitle();
		this.m_xml.setJazzTaskTitle(i_task_number, jazz_task_title);
		
		var jazz_task_description =  i_jazz_task.getJazzTaskDescription();
		this.m_xml.setJazzTaskDescription(i_task_number, jazz_task_description);

		var jazz_task_remark = i_jazz_task.getJazzTaskRemark();
		this.m_xml.setJazzTaskRemark(i_task_number, jazz_task_remark);

		var jazz_task_link_doc = i_jazz_task.getJazzTaskLinkDoc();
		this.m_xml.setJazzTaskLinkDoc(i_task_number, jazz_task_link_doc);

		var jazz_task_link_pdf = i_jazz_task.getJazzTaskLinkPdf();
		this.m_xml.setJazzTaskLinkPdf(i_task_number, jazz_task_link_pdf);

		var jazz_task_link_html = i_jazz_task.getJazzTaskLinkHtml();
		this.m_xml.setJazzTaskLinkHtml(i_task_number, jazz_task_link_html);

		var jazz_task_remind_day = i_jazz_task.getJazzTaskRemindDay();
		this.m_xml.setJazzTaskRemindDay(i_task_number, jazz_task_remind_day);

		var jazz_task_remind_month = i_jazz_task.getJazzTaskRemindMonth();
		this.m_xml.setJazzTaskRemindMonth(i_task_number, jazz_task_remind_month);

		var jazz_task_finish_day = i_jazz_task.getJazzTaskFinishDay();
		this.m_xml.setJazzTaskFinishDay(i_task_number, jazz_task_finish_day);

		var jazz_task_finish_month = i_jazz_task.getJazzTaskFinishMonth();
		this.m_xml.setJazzTaskFinishMonth(i_task_number, jazz_task_finish_month);

		var jazz_task_responsible = i_jazz_task.getJazzTaskResponsible();
		this.m_xml.setJazzTaskResponsible(i_task_number, jazz_task_responsible);
		
		var n_references = i_jazz_task.getNumberOfJazzTaskReferences();

		for (var reference_number=1; reference_number <= n_references; reference_number++)
		{
			var jazz_task_ref_link = i_jazz_task.getJazzTaskRefLink(reference_number);
			this.m_xml.setJazzTaskRefLink(i_task_number, reference_number, jazz_task_ref_link);

			var jazz_task_ref_description = i_jazz_task.getJazzTaskRefDescription(reference_number);
			this.m_xml.setJazzTaskRefDescription(i_task_number, reference_number, jazz_task_ref_description);
		
		} // reference_number

		var n_deputies = i_jazz_task.getNumberOfJazzTaskDeputies();

		var jazz_task_deputies = i_jazz_task.getJazzTaskDeputies();

		for (var deputy_number=1; deputy_number <= n_deputies; deputy_number++)
		{
			var deputy_name = jazz_task_deputies[deputy_number - 1];
			this.m_xml.setJazzTaskDeputy(i_task_number, deputy_number, deputy_name);

		} // deputy_number
		
		return true;

	} // setJazzTaskRecordXml

	////////////////////////////////////////////////////////////////////////////
	///////////////////////// End Get And Set Record Xml ///////////////////////
	////////////////////////////////////////////////////////////////////////////
	     
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Append And Save XML Table Functions ///////
	///////////////////////////////////////////////////////////////////////////

	// Appends a jazz task record to the XML object. Input is a jazz task record
	// (normally the active record) for which the user has set values
	// 1. Get the number of references. Call of JazzTask.getNumberOfJazzTaskReferences
	// 2. Get the number of deputies. Call of JazzTask.getNumberOfJazzTaskDeputies
	// 3. Append the jazz task record to the XML object (without any values)
	//    Call of JazzTasksXml.appendJazzTaskNode
	// 4. Get the task record number that is equal to the total number of tasks
	//    Call JazzTasksXml.getNumberOfJazzTasks
	// 5. Set the XML values with data defined by the input jazz task record
	//    Call of setJazzTaskRecord. 
	appendJazzTaskRecordXml(i_record)
	{
		var n_references = i_record.getNumberOfJazzTaskReferences();

		if (n_references < 4) // TODO Confirm
		{
			n_references = 4;
		}

		var n_deputies = i_record.getNumberOfJazzTaskDeputies();
		
		if (n_deputies < 4) // TODO Confirm
		{
			n_deputies = 4;
		}		

		this.m_xml.appendJazzTaskNode(n_references, n_deputies);

		var record_number = this.m_xml.getNumberOfJazzTasks();


		this.setJazzTaskRecordXml(record_number, i_record);

	} // appendJazzTaskRecordXml
	
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Append And Save XML Table Functions /////////
	///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Delete And Save XML Table Functions ///////
	///////////////////////////////////////////////////////////////////////////

	// Deletes the jazz task record for a given jazz task number and 
	// deletes the XML node 
	// Returns false for failure
	deleteJazzTaskRecordXml(i_jazz_task_number)
	{
		var b_del_xml = this.m_xml.deleteJazzTaskNode(i_jazz_task_number);

		if (!b_del_xml)
		{
			return false;
		}
		
		return true;

	} // deleteJazzTaskRecord

	// Deletes the jazz task record for a given jazz task number, deletes the XML 
	// node and saves the xml file 
	// Returns false for failure
	deleteJazzTaskRecordSaveXmlFile(i_jazz_task_number)
	{
		var b_del_table_xml = this.deleteJazzTaskRecordXml(i_jazz_task_number);

		if (!b_del_table_xml)
		{
			return false;
		}

		this.saveJazzTasksXmlOnServer();

		return true;

	} // deleteJazzTaskRecordSaveXmlFile

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Delete And Save XML Table Functions /////////
	///////////////////////////////////////////////////////////////////////////
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Save XML Functions ////////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Saves the XML as a (an updated) file JazzTasks.xml on the server.
	// For the case that the application executes locally and the input display element is set
	// the updated XML file will be displayed. 
	saveJazzTasksXmlOnServer()
	{
	  var b_execute_server = execApplicationOnServer();
	 
	  if (!b_execute_server)
	  {
		return;
	  }

	  var b_html = false;

	  var xml_content_str = xmlToFormattedString(g_xml.getXmlObject(), b_html);
		
	  var file_name_path = g_xml.getFileNameJazzTasksXml();
		
	  if (!saveFileWithJQueryPostFunction(file_name_path, xml_content_str))
		{
			alert("JazzTasksTable.saveJazzTasksXmlOnServer Saving jazz tasks XML file failed");
		}
		
	} // saveJazzTasksXmlOnServer

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Save XML Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
} // JazzTasksTable
// File: JazzTasksRecord.js
// Date: 2020-06-21
// Author: Gunnar Lidén

// File content
// =============
//
// Record (class) corresponding to one JazzTask in JazzTasks.xml 
//
// Reference: https://www.w3schools.com/js/js_classes.asp


// Class corresponding to the XML element <JazzTask> in the file JazzTasks.xml
class JazzTask 
{
    // Creates the instance of the class
    constructor() 
    {
        // Member variables (fields)
        // =========================

        // The registration number is a string starting with an A followed by a 
        // number that has four figures. Example: A0002
        // The registration number must be unique. The number is increasing for
        // new tasks. A registration number is never re-used, i.e. if a task
        // is deleted a new task will not get a previously used number.
        this.m_jazz_task_reg_number = '';

        // The task title is used for lists that are displayed on computer
        // and smartphone screens. Therefore the number of characters are
        // limited to TODO
        this.m_jazz_task_title = '';

        // The short description of the task can be used as "more" information
        // about the task. It can for instance be implemented with a hamburger
        // icon or as a tooltip.
        // The size of the description is limited to TODO characters 
        this.m_jazz_task_description = '';

        //
        this.m_jazz_task_remark = '';

        // A task is normally defined in a Word document. The name of the 
        // file is normally RegistrationNumber.doc (or .docx), but it is
        // allowed to use any name. The document is stored on the server
        // and this field (member variable) holds the URL (server address)
        // to the document. 
        // Example /www/Administration/Aufgaben/A0002.docx
        this.m_jazz_task_link_doc = '';

        // For the display of a task in Intranet there should always be a 
        // a PDF copy of the Word document. The PDF copy should be stored
        // together with Word document on the server. This member variable
        // holds the server URL. 
        // Example /www/Administration/Aufgaben/A0002.pdf
        this.m_jazz_task_link_pdf = '';

        // The task may also be defined by a web page in Intranet. The 
        // member variable holds the absolute (full) URL to the web page
        // Example: http://jazzliveaarau.ch/Administration/Finanzen/Finanzen.htm
        this.m_jazz_task_link_html = '';

        //
        this.m_jazz_task_remind_day = '';

        //
        this.m_jazz_task_remind_month = '';

        //
        this.m_jazz_task_finish_day = '';

        //
        this.m_jazz_task_finish_month = '';

        // Reference links
        this.m_jazz_task_ref_links = [];

        // Reference descriptions
        this.m_jazz_task_ref_descriptions = [];

        //
        this.m_jazz_task_responsible = '';

        //
        this.m_jazz_task_deputies = [];

        // Always four 
        this.m_jazz_task_ref_links[0] = '';
        this.m_jazz_task_ref_links[1] = '';
        this.m_jazz_task_ref_links[2] = '';
        this.m_jazz_task_ref_links[3] = '';

        this.m_jazz_task_ref_descriptions[0] = '';
        this.m_jazz_task_ref_descriptions[1] = '';
        this.m_jazz_task_ref_descriptions[2] = '';
        this.m_jazz_task_ref_descriptions[3] = '';

        // Always four
        this.m_jazz_task_deputies[0] = '';
        this.m_jazz_task_deputies[1] = '';
        this.m_jazz_task_deputies[2] = '';
        this.m_jazz_task_deputies[3] = '';

    } // constructor

    // Get and set functions for the member variables (fields)
    // =======================================================

    // Returns the jazz task registration number 
    getJazzTaskRegNumber() 
    {
      return this.m_jazz_task_reg_number;

    } // getJazzTaskRegNumber

    // Sets the jazz task registration number
    setJazzTaskRegNumber(i_jazz_task_reg_number) 
    {
        this.m_jazz_task_reg_number = i_jazz_task_reg_number;

    } // setJazzTaskRegNumber

    // Returns the jazz task title 
    getJazzTaskTitle() 
    {
        return this.m_jazz_task_title;

    } // getJazzTaskTitle

    // Sets the jazz task title
    setJazzTaskTitle(i_jazz_task_title) 
    {
        this.m_jazz_task_title = i_jazz_task_title;

    } // setJazzTaskTitle

    // Returns the jazz task description 
    getJazzTaskDescription() 
    {
      return this.m_jazz_task_description;

    } // getJazzTaskDescription

    // Sets the jazz task description
    setJazzTaskDescription(i_jazz_task_description) 
    {
        this.m_jazz_task_description = i_jazz_task_description;

    } // setJazzTaskDescription
    
    // Returns the jazz task remark 
    getJazzTaskRemark() 
    {
      return this.m_jazz_task_remark;

    } // getJazzTaskRemark

    // Sets the jazz task remark
    setJazzTaskRemark(i_jazz_task_remark) 
    {
        this.m_jazz_task_remark = i_jazz_task_remark;

    } // setJazzTaskRemark
    
    // Returns the jazz task link doc 
    getJazzTaskLinkDoc() 
    {
      return this.m_jazz_task_link_doc;

    } // getJazzTaskLinkDoc

    // Sets the jazz task link doc 
    setJazzTaskLinkDoc(i_jazz_task_link_doc) 
    {
        this.m_jazz_task_link_doc = i_jazz_task_link_doc;

    } // setJazzTaskLinkDoc

    // Returns the jazz task link pdf 
    getJazzTaskLinkPdf() 
    {
      return this.m_jazz_task_link_pdf;

    } // getJazzTaskLinkPdf

    // Sets the jazz task link pdf 
    setJazzTaskLinkPdf(i_jazz_task_link_pdf) 
    {
        this.m_jazz_task_link_pdf = i_jazz_task_link_pdf;

    } // setJazzTaskLinkPdf

    // Returns the jazz task link html 
    getJazzTaskLinkHtml() 
    {
      return this.m_jazz_task_link_html;

    } // getJazzTaskLinkHtml

    // Sets the jazz task link html 
    setJazzTaskLinkHtml(i_jazz_task_link_html) 
    {
        this.m_jazz_task_link_html = i_jazz_task_link_html;

    } // setJazzTaskLinkHtml

    // Returns the jazz task remind day 
    getJazzTaskRemindDay() 
    {
      return this.m_jazz_task_remind_day;

    } // getJazzTaskRemindDay

    // Sets the jazz task remind day 
    setJazzTaskRemindDay(i_jazz_task_remind_day) 
    {
        this.m_jazz_task_remind_day = i_jazz_task_remind_day;

    } // setJazzTaskRemindDay

    // Returns the jazz task remind month 
    getJazzTaskRemindMonth() 
    {
      return this.m_jazz_task_remind_month;

    } // getJazzTaskRemindMonth

    // Sets the jazz task remind month 
    setJazzTaskRemindMonth(i_jazz_task_remind_month) 
    {
        this.m_jazz_task_remind_month = i_jazz_task_remind_month;

    } // setJazzTaskRemindMonth

    // Returns the jazz task finish day 
    getJazzTaskFinishDay() 
    {
      return this.m_jazz_task_finish_day;

    } // getJazzTaskFinishDay

    // Sets the jazz task finish day
    setJazzTaskFinishDay(i_jazz_task_finish_day) 
    {
        this.m_jazz_task_finish_day = i_jazz_task_finish_day;

    } // setJazzTaskFinishDay

    // Returns the jazz task finish month 
    getJazzTaskFinishMonth() 
    {
      return this.m_jazz_task_finish_month;

    } // getJazzTaskFinishMonth

    // Sets the jazz task finish month
    setJazzTaskFinishMonth(i_jazz_task_finish_month) 
    {
        this.m_jazz_task_finish_month = i_jazz_task_finish_month;

    } // setJazzTaskFinishMonth 

    // Returns the jazz task responsible person
    getJazzTaskResponsible() 
    {
      return this.m_jazz_task_responsible;

    } // getJazzTaskResponsible

    // Sets the jazz task responsible person
    setJazzTaskResponsible(i_jazz_task_responsible) 
    {
        this.m_jazz_task_responsible = i_jazz_task_responsible;

    } // setJazzTaskResponsible

	// Returns the number of jazz task references
	getNumberOfJazzTaskReferences()
	{
        if (this.m_jazz_task_ref_links.length != this.m_jazz_task_ref_descriptions.length)
        {
            alert("JazzTask.getNumberOfJazzTaskReferences Number of reference links and descriptions is not equal");

            return 0;
        }

        return this.m_jazz_task_ref_links.length;
        
    } // getNumberOfJazzTaskReferences

    // Returns a jazz task reference link for a given reference number
    getJazzTaskRefLink(i_reference_number)
    {
        if (i_reference_number < 1 || i_reference_number > this.m_jazz_task_ref_links.length)
        {
            alert("JazzTask.getJazzTaskRefLink Input reference number is not between 1 and " + this.m_jazz_task_ref_links.length.toString());

            return ('Ref. link error');
        }

        return this.m_jazz_task_ref_links[i_reference_number - 1];

    } // getJazzTaskRefLink

    // Sets a jazz task reference link for a given reference number
    setJazzTaskRefLink(i_reference_number, i_ref_link)
    {
        if (i_reference_number < 1 || i_reference_number > this.m_jazz_task_ref_links.length)
        {
            alert("JazzTask.setJazzTaskRefLink Input reference number is not between 1 and " + this.m_jazz_task_ref_links.length.toString());

			return;
        }

        this.m_jazz_task_ref_links[i_reference_number - 1] = i_ref_link;

    } // setJazzTaskRefLink    

    // Returns a jazz task reference description for a given reference number
    getJazzTaskRefDescription(i_reference_number)
    {
        if (i_reference_number < 1 || i_reference_number > this.m_jazz_task_ref_descriptions.length)
        {
            alert("JazzTask.getJazzTaskRefDescription Input reference number is not between 1 and " + this.m_jazz_task_ref_descriptions.length.toString());

            return ('Ref. link error');
        }

        return this.m_jazz_task_ref_descriptions[i_reference_number - 1];

    } // getJazzTaskRefDescription
        
     // Sets a jazz task reference description for a given reference number
     setJazzTaskRefDescription(i_reference_number, i_ref_description)
     {
         if (i_reference_number < 1 || i_reference_number > this.m_jazz_task_ref_descriptions.length)
         {
             alert("JazzTask.setJazzTaskRefDescription Input reference number is not between 1 and " + this.m_jazz_task_ref_descriptions.length.toString());
 
             return;
         }
 
         this.m_jazz_task_ref_descriptions[i_reference_number - 1] = i_ref_description;
 
     } // setJazzTaskRefDescription

	// Returns the number of jazz task deputies
	getNumberOfJazzTaskDeputies()
	{
        return this.m_jazz_task_deputies.length;
        
    } // getNumberOfJazzTaskDeputies
    
    // Returns the jazz task deputies
    getJazzTaskDeputies()
    {
        return this.m_jazz_task_deputies;

    } // getJazzTaskDeputies

    // Sets the jazz task deputies
    setJazzTaskDeputies(i_jazz_task_deputies)
    {
        this.m_jazz_task_deputies = i_jazz_task_deputies;

    } // setJazzTaskDeputies

    // Returns a jazz task reference link by number
    // TODO Remove this function
    getJazzTaskRefLinkByNumber(i_reference_number) 
    {
        return this.getJazzTaskRefLink(i_reference_number);

    } // getJazzTaskRefLinkByNumber

    // Returns a jazz task reference description by number
    // TODO Remove this function
    getJazzTaskRefDescriptionByNumber(i_reference_number) 
    {
        return this.getJazzTaskRefDescription(i_reference_number);

    } // getJazzTaskRefDescriptionByNumber 

    // Returns a jazz task reference deputy by number
    getJazzTaskDeputyByNumber(i_jazz_task_deputy_number) 
    {
        var n_deputies = this.m_jazz_task_deputies.length;

        if (i_jazz_task_deputy_number <= 0 || i_jazz_task_deputy_number > n_deputies)
        {
            return 'Error: Not a valid jazz task deputy number';
        }

        var ret_deputy = this.m_jazz_task_deputies[i_jazz_task_deputy_number - 1];

        return ret_deputy;

    } // getJazzTaskDeputyByNumber    
    
    // Check functions for the member variables (the record fields)
    // ============================================================
    //
    // A check function is defined for one of the member variables (fields)
    // of this class. The check function is defined as static functions with 
    // the member variable as input data. The check function is returning
    // true if the value of variable is OK and false if not.
    // The check function is called this way - a typical example:  
    // var reg_number = 'A0010';
    // if (!JazzTask.checkJazzTaskRegNumber(reg_number))
    // {
    //    alert("Registration number is not OK");
    //    ... do something e.g. return
    // }
    
    // Returns true if the registration number is OK
    static checkJazzTaskRegNumber(i_jazz_task_reg_number) 
    {
        var ret_b_check = true;

        var reg_number_length = i_jazz_task_reg_number.length;

        if (reg_number_length != 5)
        {
            ret_b_check = false;
        }

        var first_char = i_jazz_task_reg_number.substring(0, 1);

        if (first_char != 'A')
        {
            ret_b_check = false;
        }

        // TODO Check if the number only consists of figures
      
        return ret_b_check;

    } // checkJazzTaskRegNumber

    // Returns true if the jazz task title is OK
    static checkJazzTaskTitle(i_jazz_task_title) 
    {
        var ret_b_check = true;

        var jazz_task_title = i_jazz_task_title.trim();

        if (jazz_task_title.length == 0)
        {
            alert("Titel darf nicht leer sein");

            ret_b_check = false;      
        }

        if (jazz_task_title.length > 50)
        {
            alert("Anzahl Zeichen im Titel ist " + 
                jazz_task_title.length.toString() + 
                ". Der Titel darf höchstens 50 Zeichen haben.");

            ret_b_check = false;      
        }

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_title, "im Titel.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }

        return ret_b_check;

    } // checkJazzTaskTitle

    // Returns true if the jazz task description is OK
    static checkJazzTaskDescription(i_jazz_task_descr) 
    {
        var ret_b_check = true;

        var jazz_task_descr = i_jazz_task_descr.trim();

        if (jazz_task_descr.length > 300)
        {
            alert("Anzahl Zeichen in der Beschreibung ist " + 
                jazz_task_descr.length.toString() + 
                ". Die Beschreibung darf höchstens 300 Zeichen haben.");

            ret_b_check = false;      
        }

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_descr, "in der Beschreibung.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskDescription

    // Returns true if the jazz task remark is OK
    static checkJazzTaskRemark(i_jazz_task_remark) 
    {
        var ret_b_check = true;

        var jazz_task_remark = i_jazz_task_remark.trim();

        if (jazz_task_remark.length > 200)
        {
            alert("Anzahl Zeichen in der Bemerkung ist " + 
                jazz_task_remark.length.toString() + 
                ". Die Bemerkung darf höchstens 200 Zeichen haben.");

            ret_b_check = false;      
        }

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_remark, "in der Bemerkung.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskRemark

    // Returns true if the jazz task link doc is OK
    static checkJazzTaskLinkDoc(i_jazz_task_link_doc) 
    {
        var ret_b_check = true;

        var jazz_task_link_doc = i_jazz_task_link_doc.trim();

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_link_doc, "im Link DOC.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskLinkDoc
    
    // Returns true if the jazz task link pdf is OK
    static checkJazzTaskLinkPdf(i_jazz_task_link_pdf) 
    {
        var ret_b_check = true;

        var jazz_task_link_pdf = i_jazz_task_link_pdf.trim();

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_link_pdf, "im Link PDF.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskLinkPdf
    
    // Returns true if the jazz task link pdf is OK
    static checkJazzTaskLinkHtml(i_jazz_task_link_html) 
    {
        var ret_b_check = true;

        var jazz_task_link_html = i_jazz_task_link_html.trim();

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_link_html, "im Link HTML.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskLinkHtml

    // Returns true if the jazz task remind day is OK
    static checkJazzTaskRemindDay(i_jazz_task_remind_day) 
    {
        var ret_b_check = true;

        var jazz_task_remind_day = i_jazz_task_remind_day.trim();
		
		if (jazz_task_remind_day.length == 0)
		{
			return true;
		}

		var jazz_task_remind_day_int = parseInt(jazz_task_remind_day);
		
		if (jazz_task_remind_day_int < 1 || jazz_task_remind_day_int > 31)
		{
			alert("Remind day " + jazz_task_remind_day + " is not between 1 and 31");
			
			ret_b_check = false;
		}
        
        return ret_b_check;

    } // checkJazzTaskRemindDay
    
     // Returns true if the jazz task remind month is OK
     static checkJazzTaskRemindMonth(i_jazz_task_remind_month) 
     {
         var ret_b_check = true;
 
         var jazz_task_remind_month = i_jazz_task_remind_month.trim();
         
         if (jazz_task_remind_month.length == 0)
         {
             return true;
         }
 
         var jazz_task_remind_month_int = parseInt(jazz_task_remind_month);
         
         if (jazz_task_remind_month_int < 1 || jazz_task_remind_month_int > 12)
         {
             alert("Remind month " + jazz_task_remind_month + " is not between 1 and 12");
             
             ret_b_check = false;
         }
         
         return ret_b_check;
 
     } // checkJazzTaskRemindMonth

    // Returns true if the jazz task finish day is OK
    static checkJazzTaskFinishDay(i_jazz_task_finish_day) 
    {
        var ret_b_check = true;

        var jazz_task_finish_day = i_jazz_task_finish_day.trim();
		
		if (jazz_task_finish_day.length == 0)
		{
			return true;
		}

		var jazz_task_finish_day_int = parseInt(jazz_task_finish_day);
		
		if (jazz_task_finish_day_int < 1 || jazz_task_finish_day_int > 12)
		{
			alert("Finish day " + jazz_task_finish_day + " is not between 1 and 12");
			
			ret_b_check = false;
		}
        
        return ret_b_check;

    } // checkJazzTaskFinishDay
         
    // Returns true if the jazz task finish month is OK
    static checkJazzTaskFinishMonth(i_jazz_task_finish_month) 
    {
        var ret_b_check = true;

        var jazz_task_finish_month = i_jazz_task_finish_month.trim();
		
		if (jazz_task_finish_month.length == 0)
		{
			return true;
		}

		var jazz_task_finish_month_int = parseInt(jazz_task_finish_month);
		
		if (jazz_task_finish_month_int < 1 || jazz_task_finish_month_int > 12)
		{
			alert("Finish month " + jazz_task_finish_month + " is not between 1 and 12");
			
			ret_b_check = false;
		}
        
        return ret_b_check;

    } // checkJazzTaskFinishMonth     
    
    // Returns true if the jazz task link pdf is OK
    static checkJazzTaskResponsible(i_jazz_task_responsible) 
    {
        var ret_b_check = true;

        var jazz_task_responsible = i_jazz_task_responsible.trim();

        var msg_illegal_xml_chars = this.stringContainsIllegalXmlCharacter(jazz_task_responsible, "im Name des Verantwortliches.");
        if (msg_illegal_xml_chars.length > 0)
        {
            alert(msg_illegal_xml_chars);

            ret_b_check = false;
        }
        
        return ret_b_check;

    } // checkJazzTaskResponsible    

    // Returns error message if the input string contains illegal XML characters
    static stringContainsIllegalXmlCharacter(i_string, i_string_beschreibung)
    {
        var ret_error_msg = '';
        
        var illegal_chars = [];
        illegal_chars[0] = '&';
        illegal_chars[1] = '<';
        illegal_chars[2] = '>';
        
        for (var index_illegal=0; index_illegal<illegal_chars.length; index_illegal++)
        {
            var current_illegal_char = illegal_chars[index_illegal];
            
            var index_pos_illegal = i_string.indexOf(current_illegal_char);
            if (index_pos_illegal >= 0)
            {
                ret_error_msg = current_illegal_char + ' ist nicht erlaubt ' + i_string_beschreibung;
                break;
            }
            
        }
        
        return ret_error_msg;
        
    } // stringContainsIllegalXmlCharacter

} // JazzTask

// File: JazzTasksXml.js
// Date: 2020-06-19
// Author: Gunnar Lidén

// File content
// =============
//
// Loading function
// ----------------
// The class JazzTasksXml loads the XML file JazzXml.xml. Loading means that an 
// XML object will be created that holds all the data in the file JazzXml.xml.
// This "XML file object" is stored in the class member variable m_file_xml. 
//
// Get and set functions
// ---------------------
// The class JazzTasksXml has member functions for get and set of values, like
// for instance get and set the title of a task. Input parameter for these 
// functions are always the task number. For the title example: 
// getJazzTaskTitle(task_number) and setJazzTaskTitle(task_number, i_title)
//
// Append function
// ---------------
// The class JazzTasksXml also has functions for appending (adding) a task. 





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
// Class corresponding to the XML file JazzTasks.xml
//

// Class corresponding to the XML element <JazzTask> in the file JazzTasks.xml
class JazzTasksXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    constructor(i_callback_function_name) 
    {
        // Member variables
        // ================

        // Path and name of XML file on the server
        this.m_xml_file_name_server = '../XML/JazzTasks.xml';

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'Xml/JazzTasksTestData.xml';

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jazz tasks xml object
        this.m_file_xml = null;

        // Object holding the tags
        this.m_tags = new JazzTasksTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object and calls the function m_callback_function_name
        this.loadXmlFile(this, this.getFileNameJazzTasksXml(), this.m_callback_function_name);

    } // constructor

    // Sets the XML object
    setXmlObject(i_jazz_tasks_xml)
    {
        this.m_file_xml = i_jazz_tasks_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_file_xml;

    } // getXmlObject

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Get Jazz Task Data ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the jazz task registration number for a given task number
    getJazzTaskRegNumber(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskRegNumber(), i_task_number);
        
    } // getJazzTaskRegNumber

    // Returns the jazz task title for a given task number
    getJazzTaskTitle(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskTitle(), i_task_number);
        
    } // getJazzTaskTitle

    // Returns the jazz task description for a given task number
    getJazzTaskDescription(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskDescription(), i_task_number);
        
    } // getJazzTaskDescription

    // Returns the jazz task remark for a given task number
    getJazzTaskRemark(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskRemark(), i_task_number);
        
    } // getJazzTaskRemark

    // Returns the jazz task link to doc for a given task number
    getJazzTaskLinkDoc(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskLinkDoc(), i_task_number);
        
    } // getJazzTaskLinkDoc

    // Returns the jazz task link to pdf for a given task number
    getJazzTaskLinkPdf(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskLinkPdf(), i_task_number);
        
    } // getJazzTaskLinkPdf

    // Returns the jazz task link to html for a given task number
    getJazzTaskLinkHtml(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskLinkHtml(), i_task_number);
        
    } // getJazzTaskLinkHtml

    // Returns the jazz task remind day for a given task number
    getJazzTaskRemindDay(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskRemindDay(), i_task_number);
        
    } // getJazzTaskRemindDay

    // Returns the jazz task remind month for a given task number
    getJazzTaskRemindMonth(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskRemindMonth(), i_task_number);
        
    } // getJazzTaskRemindMonth

    // Returns the jazz task finish day for a given task number
    getJazzTaskFinishDay(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskFinishDay(), i_task_number);
        
    } // getJazzTaskFinishDay

    // Returns the jazz task finish month for a given task number
    getJazzTaskFinishMonth(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskFinishMonth(), i_task_number);
        
    } // getJazzTaskFinishMonth

    // Returns the jazz task responsible for a given task number
    getJazzTaskResponsible(i_task_number)
    {
        return this.getNodeValue(this.m_tags.getJazzTaskResponsible(), i_task_number);
        
    } // getJazzTaskResponsible

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Get Jazz Task Data //////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Set Jazz Task Data ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the jazz task registration number for a given task number
    setJazzTaskRegNumber(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskRegNumber(), i_task_number, i_node_value);
        
    } // setJazzTaskRegNumber

    // Sets the jazz task title for a given task number
    setJazzTaskTitle(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskTitle(), i_task_number, i_node_value);
        
    } // setJazzTaskTitle

    // Sets the jazz task description for a given task number
    setJazzTaskDescription(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskDescription(), i_task_number, i_node_value);
        
    } // setJazzTaskDescription

    // Sets the jazz task remark for a given task number
    setJazzTaskRemark(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskRemark(), i_task_number, i_node_value);
        
    } // setJazzTaskRemark

    // Sets the jazz task link to doc for a given task number
    setJazzTaskLinkDoc(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskLinkDoc(), i_task_number, i_node_value);
        
    } // setJazzTaskLinkDoc

    // Sets the jazz task link to pdf for a given task number
    setJazzTaskLinkPdf(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskLinkPdf(), i_task_number, i_node_value);
        
    } // setJazzTaskLinkPdf

    // Sets the jazz task link to html for a given task number
    setJazzTaskLinkHtml(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskLinkHtml(), i_task_number, i_node_value);
        
    } // setJazzTaskLinkHtml

    // Sets the jazz task remind day for a given task number
    setJazzTaskRemindDay(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskRemindDay(), i_task_number, i_node_value);
        
    } // setJazzTaskRemindDay

    // Sets the jazz task remind month for a given task number
    setJazzTaskRemindMonth(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskRemindMonth(), i_task_number, i_node_value);
        
    } // setJazzTaskRemindMonth

    // Sets the jazz task finish day for a given task number
    setJazzTaskFinishDay(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskFinishDay(), i_task_number, i_node_value);
        
    } // setJazzTaskFinishDay

    // Sets the jazz task finish month for a given task number
    setJazzTaskFinishMonth(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskFinishMonth(), i_task_number, i_node_value);
        
    } // setJazzTaskFinishMonth

    // Sets the jazz task responsible for a given task number
    setJazzTaskResponsible(i_task_number, i_node_value)
    {
        return this.setJazzTaskNodeValue(this.m_tags.getJazzTaskResponsible(), i_task_number, i_node_value);
        
    } // setJazzTaskResponsible

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Set Jazz Task Data //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Get Jazz Task Reference Data //////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns the reference link for a given task number and a given reference number
	getJazzTaskRefLink(i_task_number, i_reference_number)
	{
		return this.getReferenceNodeValue(this.m_tags.getJazzTaskRefLink(), i_task_number, i_reference_number);
		
	} // getJazzTaskRefLink

	// Returns the reference description for a given task number and a given reference number
	getJazzTaskRefDescription(i_task_number, i_reference_number)
	{
		return this.getReferenceNodeValue(this.m_tags.getJazzTaskRefDescription(), i_task_number, i_reference_number);
		
	} // getJazzTaskRefDescription

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Get Jazz Task Reference Data ////////////////
	///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Set Jazz Task Reference Data //////////////
	///////////////////////////////////////////////////////////////////////////

	// Sets the reference link for a given task number and a given reference number
	setJazzTaskRefLink(i_task_number, i_reference_number, i_reference_value)
	{
		return this.setReferenceNodeValue(this.m_tags.getJazzTaskRefLink(), i_task_number, i_reference_number, i_reference_value);
		
	} // setJazzTaskRefLink

	// Sets the reference description for a given task number and a given reference number
	setJazzTaskRefDescription(i_task_number, i_reference_number, i_reference_value)
	{
		return this.setReferenceNodeValue(this.m_tags.getJazzTaskRefDescription(), i_task_number, i_reference_number, i_reference_value);
		
	} // setJazzTaskRefDescription

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Set Jazz Task Reference Data ////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Tasks References Deputies  /////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of jazz tasks
    getNumberOfJazzTasks()
    {
        var ret_n_tasks = -12345;

        if (!this.checkXmlObject()){ return ret_n_tasks; }

        var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

        ret_n_tasks = task_nodes.length;

        return ret_n_tasks;

    } // getNumberOfJazzTasks 

	// Returns the number of jazz task references for a given task number
	getNumberOfJazzTaskReferences(i_task_number)
	{
		var ret_number_references = -12345;
		
		if (!this.checkXmlObject()){ return ret_number_references; }

		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.getNumberOfJazzTaskReferences Task number is not between 1 and " + n_tasks.toString());
			
			return ret_data;		
		}
		
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];

		var reference_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskReference());
		
		ret_number_references = reference_nodes.length;
		
		return ret_number_references;
		
	} // getNumberOfJazzTaskReferences

	// Returns the number of jazz task deputies for a given task number
	getNumberOfJazzTaskDeputies(i_task_number)
	{
		var ret_number_deputies = -12345;
		
		if (!this.checkXmlObject()){ return ret_number_deputies; }

		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.getNumberOfJazzTaskDeputies Task number is not between 1 and " + n_tasks.toString());
			
			return ret_data;		
		}
		
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];

		var deputy_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskDeputy());
		
		ret_number_deputies = deputy_nodes.length;
		
		return ret_number_deputies;
		
	} // getNumberOfJazzTaskDeputies

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Tasks References Deputies  ///////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Jazz Task Node Value  /////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns the node value for a given jazz task number and a tag name
	getJazzTaskNodeValue(i_jazz_task_tag, i_jazz_task_number)
	{
		var ret_data = '';
		
		if (!this.checkXmlObject()){ return ret_data; }

		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_jazz_task_number < 1 || i_jazz_task_number > n_tasks)
		{
			alert("JazzTasksXml.getJazzTaskNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
			
			return ret_data;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_jazz_task_number-1];
		
		var xml_node_value = this.getNodeValueTagName(task_node, i_jazz_task_tag);
		
		ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
		
		return ret_data;
		
	} // getJazzTaskNodeValue


	// Sets the node value for a given jazz task number and a tag name
	setJazzTaskNodeValue(i_jazz_task_tag, i_jazz_task_number, i_jazz_task_node_value)
	{	
		if (!this.checkXmlObject()){ return; }

		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_jazz_task_number < 1 || i_jazz_task_number > n_tasks)
		{
			alert("JazzTasksXml.setJazzTaskNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
			
			return;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_jazz_task_number-1];
		
		var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_jazz_task_node_value);
		
		this.setNodeValue(task_node, i_jazz_task_tag, node_value);
		
	} // setJazzTaskNodeValue

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Jazz Task Node Value  ///////////////////////
    ///////////////////////////////////////////////////////////////////////////
            
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Reference Node Value  /////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns a reference node value for a reference tag, jazz task number and reference number
	getReferenceNodeValue(i_reference_tag, i_task_number, i_reference_number)
	{
		var ret_node_value = '';
		
		if (!this.checkXmlObject()){ return ret_node_value; }
		
		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.getReferenceNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
			return ret_data;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];
		
		var reference_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskReference());
		
		if (i_reference_number < 1 || i_reference_number > reference_nodes.length)
		{
			alert("JazzTasksXml.getReferenceNodeValue Reference number is not between 1 and " + reference_nodes.length.toString());
			return ret_node_value;
		}

		var reference_node = reference_nodes[i_reference_number - 1];
		
		var reference_node_value = this.getNodeValueTagName(reference_node, i_reference_tag);
		
		ret_node_value = this.removeFlagNodeValueNotSet(reference_node_value);
		
		return ret_node_value;
		
	} // getReferenceNodeValue

	// Sets a reference node value for a reference tag, jazz task number and reference number
	setReferenceNodeValue(i_reference_tag, i_task_number, i_reference_number, i_reference_value)
	{	
		if (!this.checkXmlObject()){ return; }
		
		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.setReferenceNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
			
			return;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];
		
		var reference_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskReference());
		
		if (i_reference_number < 1 || i_reference_number > reference_nodes.length)
		{
			alert("JazzTasksXml.setReferenceNodeValue Reference number is not between 1 and " + reference_nodes.length.toString());
			
			return;
		}

		var reference_node = reference_nodes[i_reference_number - 1];
		
		var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_reference_value);
		
		this.setNodeValue(reference_node, i_reference_tag, node_value);
		
	} // setReferenceNodeValue

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Reference Node Value  ///////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Get Deputy Name  //////////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Returns a deputy name for a given task number and deputy number
	getJazzTaskDeputy(i_task_number, i_deputy_number)
	{
		var ret_node_value = '';
		
		if (!this.checkXmlObject()){ return ret_node_value; }
		
		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.getJazzTaskDeputy Jazz task number is not between 1 and " + n_tasks.toString());
			return ret_data;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];
		
		var deputy_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskDeputy());
		
		if (i_deputy_number < 1 || i_deputy_number > deputy_nodes.length)
		{
			alert("JazzTasksXml.getJazzTaskDeputy Deputy number is not between 1 and " + deputy_nodes.length.toString());
			return ret_node_value;
		}

		var deputy_node = deputy_nodes[i_deputy_number - 1];

		var deputy_inner_html = deputy_node.innerHTML;
		
		ret_node_value = this.removeFlagNodeValueNotSet(deputy_inner_html);
		
		return ret_node_value;
		
	} // getJazzTaskDeputy

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Get Deputy Name  ////////////////////////////
	///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Set Deputy Name  //////////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Sets a deputy name for a given task number and deputy number
	setJazzTaskDeputy(i_task_number, i_deputy_number, i_deputy_name)
	{
		if (!this.checkXmlObject()){ return ret_node_value; }
		
		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_task_number < 1 || i_task_number > n_tasks)
		{
			alert("JazzTasksXml.setJazzTaskDeputy Jazz task number is not between 1 and " + n_tasks.toString());
			
			return;		
		}
			
		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_task_number-1];
		
		var deputy_nodes = task_node.getElementsByTagName(this.m_tags.getJazzTaskDeputy());
		
		if (i_deputy_number < 1 || i_deputy_number > deputy_nodes.length)
		{
			alert("JazzTasksXml.setJazzTaskDeputy Deputy number is not between 1 and " + deputy_nodes.length.toString());
			
			return;
		}

		var deputy_node = deputy_nodes[i_deputy_number - 1];
		
		var deputy_inner_html = this.setFlagNodeValueIsNotSetForEmptyString(i_deputy_name);

		deputy_node.innerHTML = deputy_inner_html;
				
	} // setJazzTaskDeputy

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Set Deputy Name  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Append Jazz Task Node  ////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
	// Appends a jazz task node to the XML object
	appendJazzTaskNode(i_n_references, i_n_deputies)
	{
	   // See also function appendReservation in file ReservationConcerts.js
	   // https://www.webdeveloper.com/forum/d/231973-append-xml-node-in-javascript/3
	   
	   var new_jazz_task = this.m_file_xml.createElement(this.m_tags.getJazzTask());
	   
	   var reg_number_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRegNumber());
	   var reg_number_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   reg_number_node.appendChild(reg_number_text);
	   new_jazz_task.appendChild(reg_number_node);
	   
	   var task_title_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskTitle());
	   var task_title_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_title_node.appendChild(task_title_text);
	   new_jazz_task.appendChild(task_title_node);
	   
	   var task_descr_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskDescription());
	   var task_descr_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_descr_node.appendChild(task_descr_text);
	   new_jazz_task.appendChild(task_descr_node);

	   var task_remark_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRemark());
	   var task_remark_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_remark_node.appendChild(task_remark_text);
	   new_jazz_task.appendChild(task_remark_node);
	   
	   var task_link_doc_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskLinkDoc());
	   var task_link_doc_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_link_doc_node.appendChild(task_link_doc_text);
	   new_jazz_task.appendChild(task_link_doc_node);

	   var task_link_pdf_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskLinkPdf());
	   var task_link_pdf_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_link_pdf_node.appendChild(task_link_pdf_text);
	   new_jazz_task.appendChild(task_link_pdf_node);
	   
	   var task_link_html_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskLinkHtml());
	   var task_link_html_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_link_html_node.appendChild(task_link_html_text);
	   new_jazz_task.appendChild(task_link_html_node);
	   
	   var task_remind_day_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRemindDay());
	   var task_remind_day_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_remind_day_node.appendChild(task_remind_day_text);
	   new_jazz_task.appendChild(task_remind_day_node);
	 
	   var task_remind_month_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRemindMonth());
	   var task_remind_month_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_remind_month_node.appendChild(task_remind_month_text);
	   new_jazz_task.appendChild(task_remind_month_node);
		  
	   var task_finish_day_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskFinishDay());
	   var task_finish_day_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_finish_day_node.appendChild(task_finish_day_text);
	   new_jazz_task.appendChild(task_finish_day_node);

	   var task_finish_month_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskFinishMonth());
	   var task_finish_month_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_finish_month_node.appendChild(task_finish_month_text);
	   new_jazz_task.appendChild(task_finish_month_node);

	   for (var reference_number=1; reference_number <= i_n_references; reference_number++)
	   {
			var reference_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskReference());

			var task_ref_link_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRefLink());
			var task_ref_link_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
			task_ref_link_node.appendChild(task_ref_link_text);

			var task_ref_descr_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskRefDescription());
			var task_ref_descr_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
			task_ref_descr_node.appendChild(task_ref_descr_text);

			new_jazz_task.appendChild(reference_node);
			reference_node.appendChild(task_ref_link_node);
			reference_node.appendChild(task_ref_descr_node);
			 
	   } // reference_number

	   var task_responsible_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskResponsible());
	   var task_responsible_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
	   task_responsible_node.appendChild(task_responsible_text);
	   new_jazz_task.appendChild(task_responsible_node);

	   for (var deputy_number=1; deputy_number <= i_n_deputies; deputy_number++)
	   {
			var task_deputy_node = this.m_file_xml.createElement(this.m_tags.getJazzTaskDeputy());
			var task_deputy_text = this.m_file_xml.createTextNode(this.m_not_yet_set_node_value);
			task_deputy_node.appendChild(task_deputy_text);
			new_jazz_task.appendChild(task_deputy_node);	   
	   }
	  

	   this.m_file_xml.documentElement.appendChild(new_jazz_task);	
	   
	} // appendJazzTaskNode
   
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Append Jazz Task Node  //////////////////////
	///////////////////////////////////////////////////////////////////////////
    
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// Start Delete Jazz Task Node  ////////////////////
	///////////////////////////////////////////////////////////////////////////

	// Deletes the node defined by the jazz task number
	deleteJazzTaskNode(i_jazz_task_number)
	{
		if (!this.checkXmlObject()){ return false; }

		var n_tasks = this.getNumberOfJazzTasks();
		
		if (i_jazz_task_number < 1 || i_jazz_task_number > n_tasks)
		{
			alert("JazzTasksXml.deleteJazzTaskNode Jazz task number is not between 1 and " + n_tasks.toString());
			
			return false;		
		}

		var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

		var task_node = task_nodes[i_jazz_task_number-1];

		task_node.parentNode.removeChild(task_node);	

		return true;

	} // deleteJazzTaskNode
			
	///////////////////////////////////////////////////////////////////////////
	///////////////////////// End Delete Jazz Task Node  //////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////
    /////// Start Node Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value for a given jazz task number and a tag name
    getNodeValue(i_jazz_task_tag, i_jazz_task_number)
    {
        var ret_data = '';
        
        if (!this.checkXmlObject()){ return ret_data; }

        var n_tasks = this.getNumberOfJazzTasks();
        
        if (i_jazz_task_number < 1 || i_jazz_task_number > n_tasks)
        {
            alert("JazzTasksXml.getNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
            
            return ret_data;		
        }
            
        var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());
        
        var task_node = task_nodes[i_jazz_task_number-1];
        
        var xml_node_value = this.getNodeValueTagName(task_node, i_jazz_task_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getNodeValue    

    // Sets the node value for a given jazz task number and a tag name
    setJazzTaskNodeValue(i_jazz_task_tag, i_jazz_task_number, i_jazz_task_node_value)
    {	
        if (!this.checkXmlObject()){ return; }

        var n_tasks = this.getNumberOfJazzTasks();
        
        if (i_jazz_task_number < 1 || i_jazz_task_number > n_tasks)
        {
            alert("JazzTasksXml.setJazzTaskNodeValue Jazz task number is not between 1 and " + n_tasks.toString());
            
            return;		
        }
            
        var task_nodes = this.m_file_xml.getElementsByTagName(this.m_tags.getJazzTask());

        var task_node = task_nodes[i_jazz_task_number-1];
        
        var node_value = this.setFlagNodeValueIsNotSetForEmptyString(i_jazz_task_node_value);
        
        this.setNodeValue(task_node, i_jazz_task_tag, node_value);
        
    } // setJazzTaskNodeValue

    ///////////////////////////////////////////////////////////////////////////
    /////// End Node Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////    

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
    // Request server object for the XML file
    var jazz_xmlhttp = new XMLHttpRequest();
    
    // Event function: The server will return state and status 
    // from object functions open and send.
    jazz_xmlhttp.onreadystatechange = function() 
    {
        if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
        {
            var xml_object = jazz_xmlhttp.responseXML;

            i_object_xml.setXmlObject(xml_object);

            i_callback_function_name();    
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

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the name and path for jazz tasks XML file
    getFileNameJazzTasksXml()
    {
        if (execApplicationOnServer())
        {
            return this.m_xml_file_name_server;
        }
        else
        {
            return this.m_xml_file_name_local;
        }

    } // getFileNameJazzTasksXml

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Sets a node value. Input is an XML node, the tag name and the node value
    // Copied from FlyerXml.js
    setNodeValue(i_node, i_xml_tag, i_node_value)
    {	
        i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue = i_node_value;
        
    } // setNodeValue

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Returns true if the node value is set
    nodeValueIsSet(i_node_value)
    {
        if (i_node_value == this.m_not_yet_set_node_value)
        {
            return false;
        }
        else
        {
            return true;
        }
        
    } // nodeValueIsSet

    // Return flag (string) this.m_not_yet_set_node_value if input string is empty
    // Copied from FlyerXml.js
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString    

    // Same as function above. Just a shorter name
    modNodeValue(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // modNodeValue


    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Check Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Check that the jazz tasks XML object is set
    checkXmlObject()
    {
        if (null == this.m_file_xml)
        {
            alert("JazzTasksXml.checkXmlObject Jazz tasks XML object m_file_xml is null");
            
            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkXmlObject

    ///////////////////////////////////////////////////////////////////////////
    /////// End Check Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // JazzTasksXml


// Class defining the tags of the XML file JazzTasks.xml
class JazzTasksTags 
{
    // Creates the instance of the class
    constructor() 
    {
        // Member variables
        // ================

        this.m_tag_jazz_task = "JazzTask";
        this.m_tag_jazz_task_reg_number = "JazzTaskRegNumber";
        this.m_tag_jazz_task_title = "JazzTaskTitle";
        this.m_tag_jazz_task_description = "JazzTaskDescription";
        this.m_tag_jazz_task_remark = "JazzTaskRemark";
        this.m_tag_jazz_task_link_doc = "JazzTaskLinkDoc";
        this.m_tag_jazz_task_link_pdf = "JazzTaskLinkPdf";
        this.m_tag_jazz_task_link_html = "JazzTaskLinkHtml";
        this.m_tag_jazz_task_remind_day = "JazzTaskRemindDay";
        this.m_tag_jazz_task_remind_month = "JazzTaskRemindMonth";
        this.m_tag_jazz_task_finish_day = "JazzTaskFinishDay";
        this.m_tag_jazz_task_finish_month = "JazzTaskFinishMonth";
        this.m_tag_jazz_task_reference = "JazzTaskReference";
        this.m_tag_jazz_task_ref_link = "JazzTaskRefLink";
        this.m_tag_jazz_task_ref_description = "JazzTaskRefDescription";
        this.m_tag_jazz_task_responsible = "JazzTaskResponsible";
        this.m_tag_jazz_task_deputy = "JazzTaskDeputy";        

    } // constructor

    // Get member variable functions
    // =============================

    getJazzTask(){return this.m_tag_jazz_task;} 
    getJazzTaskRegNumber(){return this.m_tag_jazz_task_reg_number;} 
    getJazzTaskTitle(){return this.m_tag_jazz_task_title;} 
    getJazzTaskDescription(){return this.m_tag_jazz_task_description;} 
    getJazzTaskRemark(){return this.m_tag_jazz_task_remark;} 
    getJazzTaskLinkDoc(){return this.m_tag_jazz_task_link_doc;} 
    getJazzTaskLinkPdf(){return this.m_tag_jazz_task_link_pdf;} 
    getJazzTaskLinkHtml(){return this.m_tag_jazz_task_link_html;} 
    getJazzTaskRemindDay(){return this.m_tag_jazz_task_remind_day;}
    getJazzTaskRemindMonth(){return this.m_tag_jazz_task_remind_month;}
    getJazzTaskFinishDay(){return this.m_tag_jazz_task_finish_day;}
    getJazzTaskFinishMonth(){return this.m_tag_jazz_task_finish_month;}
    getJazzTaskReference(){return this.m_tag_jazz_task_reference;}
    getJazzTaskRefLink(){return this.m_tag_jazz_task_ref_link;}
    getJazzTaskRefDescription(){return this.m_tag_jazz_task_ref_description;}
    getJazzTaskResponsible(){return this.m_tag_jazz_task_responsible;}
    getJazzTaskDeputy(){return this.m_tag_jazz_task_deputy;}

} // JazzTasksTags
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

// File: JazzTasksUtility.js
// Date: 2020-06-24
// Author: Gunnar Lidén

// Content
// =======
//
// Utility functions

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Server Execution Mode /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

//  http://www.jazzliveaarau.ch/GunnarTask

// Returns true if the jazz tasks application is running on the server
// Returns false if it is running on the Visual Studio Code Live Server
function execApplicationOnServer()
{
    var current_base = window.location.href;

    var server_url = 'http://www.jazzliveaarau.ch';

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
///////////////////////////////////////////////////////////////////////////////////////////// File: PrettyPrintXml.js
// Date: 2020-05-27
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Create a pretty print (formatted) string of an XML object
//
// References:
// https://www.w3schools.com/xml/tryit.asp?filename=try_dom_loop

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// The input XML object for function xmlToFormattedString
var g_xml_object_pretty_print = null;

// Flag telling if the the output string is to be displayed as HTML or Windows
var g_pretty_print_b_html = true;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Function /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the XML object as a formatted (pretty print) string
function xmlToFormattedString(i_xml_object, i_b_html)
{
    var ret_xml_str = '';

    g_xml_object_pretty_print = null;

    if (null == i_xml_object)
    {
        return i_xml_object;
    }

    g_xml_object_pretty_print = i_xml_object;

    g_pretty_print_b_html = i_b_html;

    ret_xml_str = ret_xml_str + declarationLinePrettyPrint() + newLinePrettyPrint();

    ret_xml_str = ret_xml_str + addCommentsPrettyPrint();

    var root_name = g_xml_object_pretty_print.documentElement.nodeName;

    ret_xml_str = ret_xml_str +  '<'  + root_name + '>';

    var nodes_level_one = g_xml_object_pretty_print.documentElement.childNodes;

    var n_tabs = 1;
    for (var index_node=0; index_node < nodes_level_one.length; index_node++)
    {
        var current_node = nodes_level_one[index_node];

        if (current_node.nodeType == 1)
        {
            var tag_name = current_node.nodeName;

            ret_xml_str = ret_xml_str + 
                    newLinePrettyPrint() + tabsLinePrettyPrint(n_tabs) + '<'  + tag_name + '>';

            if (current_node.childElementCount > 0)
            {
                ret_xml_str = ret_xml_str + getNodePrettyPrint(current_node, n_tabs + 1);
            }        
                    
            ret_xml_str = ret_xml_str +         
                    newLinePrettyPrint() + tabsLinePrettyPrint(n_tabs) + '</' + tag_name + '>';
        }
    }

    ret_xml_str = ret_xml_str +  newLinePrettyPrint() + '</'  + root_name + '>';

    debugPrettyPrintToConsoleLog(ret_xml_str);

    return ret_xml_str;

} // xmlToFormattedString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Function ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Help Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that wiil be called recursivly
function getNodePrettyPrint(i_node, i_n_tabs)
{
    var ret_node_str = '';

    var child_nodes = i_node.childNodes;

    for (var index_node=0; index_node < child_nodes.length; index_node++)
    {
        var current_node = child_nodes[index_node];

        if (current_node.nodeType == 1)
        {
            var tag_name = current_node.nodeName;

            ret_node_str = ret_node_str + newLinePrettyPrint() + tabsLinePrettyPrint(i_n_tabs) + '<'  + tag_name + '>';

            if (current_node.childElementCount > 0)
            {
                ret_node_str = ret_node_str + getNodePrettyPrint(current_node, i_n_tabs + 1);

                ret_node_str = ret_node_str + newLinePrettyPrint() + tabsLinePrettyPrint(i_n_tabs) + '</'  + tag_name + '>';
            }
            else
            {
                ret_node_str = ret_node_str + current_node.innerHTML;

                ret_node_str = ret_node_str + '</'  + tag_name + '>';
            }    

            
        }
    }

    return ret_node_str;

} // getNodePrettyPrint

// Returns the first lines (nodes) of comment
// Does not work, and is actually not requested
// Just kept as something to look at later in order to understand
function getCommentsPrettyPrint()
{
    var ret_xml_comments_str = '';

    var nodes_level_one = g_xml_object_pretty_print.documentElement.childNodes;


    for (var index_node=0; index_node < nodes_level_one.length; index_node++)
    {
        var current_node = nodes_level_one[index_node];

        if (current_node.nodeType == 8)
        {
            ret_xml_comments_str = ret_xml_comments_str + startCommentPrettyPrint();

            ret_xml_comments_str = ret_xml_comments_str + 'Retrieved comment text';

            ret_xml_comments_str = ret_xml_comments_str + endCommentPrettyPrint();

            ret_xml_comments_str = ret_xml_comments_str + newLinePrettyPrint();
        }
    }


    return ret_xml_comments_str;

} // getCommentsPrettyPrint

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Help Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the start declaration line for the XML file
function declarationLinePrettyPrint()
{
    return '<?xml version= "1.0" encoding="utf-8"?>';

} // declarationLinePrettyPrint

// Comments to add to the output XML file
function addCommentsPrettyPrint()
{
    return '<!-- This XML file is created from an XML object by the function xmlToFormattedString -->'  + newLinePrettyPrint();

} // addCommentsPrettyPrint

// Returns end of line
function newLinePrettyPrint()
{
    if(g_pretty_print_b_html)
    {
        return '<br>';
    }
    else
    {
        return '\n';
    }

} // newLinePrettyPrint

// Returns tabs
function tabsLinePrettyPrint(i_n_tabs)
{
    var ret_windows_spaces = '';
    
    for (var tab_number=1; tab_number <= i_n_tabs; tab_number++)
    {
        if(g_pretty_print_b_html)
        {
            ret_windows_spaces = ret_windows_spaces + '&nbsp;&nbsp;&nbsp;&nbsp;';
        }
        else
        {
            ret_windows_spaces = ret_windows_spaces + '    ';
        }
    }

    return ret_windows_spaces;

} // tabsLinePrettyPrint

// Returns start of a comment
function startCommentPrettyPrint()
{
    return '<!--  ';

} // startCommentPrettyPrint

// Returns end of a comment
function endCommentPrettyPrint()
{
    return ' -->';
    
} // endCommentPrettyPrint

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugPrettyPrintToConsoleLog(i_xml_str)
{
    console.log(i_xml_str);

} // debugPrettyPrintToConsoleLog

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start XML To Unformatted String /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Copied from H:\Jazz\MyWeb\FlyerDevelopment\scripts\FlyerSave.js

// Convert XML object to string
function xmlToString(i_xml_object)
{
	// https://www.dotnettricks.com/learn/javascript/convert-string-to-xml-and-xml-to-string-using-javascript
	
    //code for IE
    if (window.ActiveXObject) 
    {
       var out_xml_str = i_xml_object.xml; return out_xml_str;
    } 
    // code for Chrome, Safari, Firefox, Opera, etc.
    else 
    {
       return (new XMLSerializer()).serializeToString(i_xml_object);
    }
	
 } // xmlToString

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End XML To Unformatted String ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzControls.js
// Date: 2020-06-09
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Classes for standard controls: Text box, button and dropdown 
//
// Reference: https://www.w3schools.com/js/js_classes.asp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Text Box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a text box
// The code that will be generated is 
// <label for="id_text_box">Label text</label>
// <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the text box and the container 
// (normally a <div> element), where the text box shall be placed 
// Here is a sample how an object of the class can be created:
// var remark_text_box = new JazzTextBox("id_remark_text_box", "i_id_container")
class JazzTextBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_text_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_text_box = i_id_text_box;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';

        // Flag telling if the text box shall be read only
        this.m_read_only_flag = false;        

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================

    // Sets the value for the text box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

      // Not necessary this.setControl();

    } // setValue

    // Returns the value of the text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove
    
    // Sets the text box size. The size is the number of characters
    setSize(i_text_box_size) 
    {
        this.m_text_box_size = i_text_box_size;
        
        this.setControl();

    } // setSize

    // Sets the maximum length of the input string. 
    // The maximum length value is the number of characters
    setMaxlength(i_maxlength) 
    {
        this.m_maxlength = i_maxlength; 

        this.setControl();

    } // setMaxlength

    // Set read only flag to false or true
    setReadOnlyFlag(i_read_only_flag)
    {
        this.m_read_only_flag = i_read_only_flag; 

        this.setControl();

    } // setReadOnlyFlag

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzTextBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_text_box);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_text_box" value="My remark" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="text" id="' + this.m_id_text_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_text_box_size.length > 0)
        {
            ret_html_str = ret_html_str + ' size="' + this.m_text_box_size + '" ';
        }

        if (this.m_maxlength.length > 0)
        {
            ret_html_str = ret_html_str + ' maxlength="' + this.m_maxlength + '" ';
        }


        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        if (this.m_read_only_flag)
        {
            ret_html_str = ret_html_str + ' readonly';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzTextBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Text Box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Button ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a button control
class JazzButton 
{
    // Creates the instance of the class
    constructor(i_id_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the button control
        this.m_id_button = i_id_button;

        // The identity of the container for the button control
        this.m_id_div_container = i_id_div_container;

        // The container element for the button control
        this.m_el_div_container = null;

        // The class for the button control
        this.m_class = '';

        // The onclick function name. Only the name is input
        this.m_onclick_function = '';

        // The caption for the button
        this.m_caption = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';
        
        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();

    } // constructor

    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the button control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button control 
    // There will be no caption if this function not is called
    setCaption(i_caption) 
    {
      this.m_caption = i_caption;

      this.setControl();

    } // setCaption    

    // Sets the label text for the button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
     // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle
    
    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the button element
    getButtonElement()
    {
        return document.getElementById(this.m_id_button);

    } // getButtonElement

    // Sets the onchange function name. Only the name is input
    setOnclickFunctionName(i_onclick_function) 
    {
      this.m_onclick_function = i_onclick_function;

      this.setControl();

    } // setOnchangeFunctionName     

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzButton error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl
        
    // Returns the string that defines the HTML button string
    // <button id="id_button" class="cl_button" onclick= "eventXyz" title="Tip ...">Click me</button>  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<button  id="' + this.m_id_button + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onclick_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onclick="' + this.m_onclick_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>'; 

        if (this.m_caption.length > 0)
        {
            ret_html_str = ret_html_str + this.m_caption;
        }
        
        ret_html_str = ret_html_str + '</button>'; 

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_button, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Button //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Dropdown //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// // Class that creates a dropdown control
class JazzDropdown 
{
    // Creates the instance of the class
    constructor(i_id_drop_down, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the dropdown control
        this.m_id_drop_down = i_id_drop_down;

        // The identity of the container for the dropdown control
        this.m_id_div_container = i_id_div_container;

        // The container element for the dropdown control
        this.m_el_div_container = null;

        // The class for the dropdown control
        this.m_class = '';        

        // The input dropdown name array
        this.m_drop_down_name_array = [];

        // The corresponding number array
        this.m_drop_down_number_array = [];

        // Append string that is added to the dropdown name array
        this.m_append_str = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left';         

        // The dropdown (select element) option number 
        this.m_select_option_number = -12345;

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';        

        // Initialization
        // ==============

        this.setDivContainerElement();

        this.setControl();        
    
    } // constructor

    // Set and get functions
    // ======================

    // Sets the member variable and also the the dropdown element
    setSelectOptionNumber(i_select_option_number) 
    {

        this.m_select_option_number = i_select_option_number;

        var element_dropdown = this.getSelectionElement();

        element_dropdown.value = this.m_select_option_number;

    } // setSelectOptionNumber

   // Gets the select option number from the dropdown (select) element.
   // (Also the member variable m_select_option_number is set)
   getSelectOptionNumber() 
   {
        var element_dropdown = this.getSelectionElement();
        
        this.m_select_option_number =  element_dropdown.value;

        return this.m_select_option_number;

   } // setSelectOptionNumber
   
   // Returns true if the selected option number is for the append item
   selectedOptionNumberIsAppendItem(i_select_option_number)
   {
       var b_append = false;

       if (this.m_append_str.length == 0)
       {
           return b_append;
       }

       var name_array_input_length = this.m_drop_down_name_array.length;

       if (i_select_option_number == name_array_input_length + 1)
       {
            b_append = true;
       }
    
       return b_append;

   } // selectedOptionNumberIsAppendItem
        
    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the dropdown control 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the name array for the dropdown control 
    setNameArray(i_drop_down_name_array) 
    {
      this.m_drop_down_name_array = i_drop_down_name_array;

      this.setNumberArray();

      this.setControl();

    } // setNameArray

    // Sets the append string that is added to the dropdown name array
    setAppendString(i_append_str)
    {
        this.m_append_str = i_append_str;

        this.setControl();

    } // setAppendString

    // Sets the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function) 
    {
      this.m_onchange_function = i_onchange_function;

      this.setControl();

    } // setOnchangeFunctionName 

    // Sets the label text for the dropdown control
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the dropdown control
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the dropdown control
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove    
    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Returns the selection element
    getSelectionElement()
    {
        return document.getElementById(this.m_id_drop_down);

    } // getSelectionElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzDropdown error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;        

    } // setControl
    
    // Sets the number array 
    setNumberArray()
    {
        this.m_drop_down_number_array = [];

        var array_number = 0;
        
        for (var index_name=0; index_name < this.m_drop_down_name_array.length; index_name++)
        {
            array_number = array_number + 1;

            this.m_drop_down_number_array[index_name] = array_number;
        }

    } // setNumberArray

    // Returns the string that defines the HTML dropdown string
    // <select id="id_drop_down" class="cl_drop_down" onchange= "eventNewTask" title="Tip ...">  
    // <option value="1" >A0001</option>
    // <option value="2" >A0002</option>    
    // </select>
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str +  '<select  id="' + this.m_id_drop_down + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '><br>'; 

        var n_options = this.m_drop_down_name_array.length;

        if (this.m_append_str.length > 0)
        {
            n_options = n_options + 1;
        }

        for (var index_name=0; index_name < n_options; index_name++)
        {
            var current_name = '';

            var current_number_str = '';

            if (index_name < this.m_drop_down_name_array.length)
            {
                current_name = this.m_drop_down_name_array[index_name];

                current_number_str = this.m_drop_down_number_array[index_name].toString();
            }
            else
            {
                current_name = this.m_append_str;

                current_number_str = n_options.toString();
            }

            var option_str = '<option value="' + current_number_str + '">' +
                                    current_name + '</option><br>';

            ret_html_str = ret_html_str + option_str;  
        }        

        ret_html_str = ret_html_str + '</select>';
        
        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_drop_down, this.m_title);
        } 
        
        return ret_html_str;

    } // getHtmlString

} // JazzDropdown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Dropdown ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Utility Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

    // Returns the label string. Sample string:
    // <label for="id_text_box" title= "Tooltip for the control ..." >Label text</label>
    function getHtmlElementLabelString(i_label_str, i_id_control, i_title)
    {
        var ret_label_str = '';

        if (i_label_str == 0)
        {
            alert("getHtmlElementLabelString Input label string is not set");

            return ret_label_str;
        }

        if (i_id_control == 0)
        {
            alert("getHtmlElementLabelString Input control identity string must be set");

            return ret_label_str;
        }

        ret_label_str = ret_label_str + '<label for= "' + i_id_control + '" ';

        if (i_title.length > 0)
        {
            ret_label_str = ret_label_str + ' title="' + i_title + '" ';
        }

        ret_label_str = ret_label_str + '>';

        ret_label_str = ret_label_str + i_label_str;

        ret_label_str = ret_label_str + '</label>';

        return ret_label_str;

    } // getHtmlElementLabelString
    
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Utility Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// File: JazzControlUploadFile.js
// Date: 2020-06-25
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the upload of a file

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Upload File ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// References
// Multiple files: https://www.w3schools.com/jsref/prop_fileupload_files.asp
//        Example: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_fileupload_files
// One File: https://www.w3schools.com/tags/att_input_type_file.asp
//  Example: https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_file
//  Filter: https://www.w3schools.com/tags/att_input_accept.asp
// Example: http://www.htmlcodes.ws/html-tags/input_accept.cfm
// PHP Upload: https://www.w3schools.com/php/php_file_upload.asp
// https://stackoverflow.com/questions/16616250/form-submit-with-ajax-passing-form-data-to-php-without-page-refresh
// http://jquery.malsup.com/form/ (plugin upload form with Ajax)
// https://github.com/jquery-form/form (plugin upload form with Ajax)

// Class for a button that uploads a file to the server
class JazzUploadFile 
{
    // Function that is executed when an object of this class is created
    // 1. Member variables are set
    // 2. 
    constructor(i_id_upload_button, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_upload_button = i_id_upload_button;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The identity of the form
        this.m_id_upload_form = '';

        // The identity of the submit button
        this.m_id_upload_submit_button = '';        

        // Selected file name (without path)
        this.m_selected_file_name = '';

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';

        // The onchange function name. Only the name is input
        this.m_onchange_function = '';

        // Filter for file types (extensions), for instance '.docx,.doc"
        this.m_accept_extensions = '';
        
        // Caption for the button
        this.m_button_caption = '';

        // Value that is the selected file name
        this.m_value = '';
        
        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';

        // Initialization
        // ==============        

        this.setDivContainerElement();

        this.m_id_upload_form = this.m_id_upload_button + '_form';

        this.m_id_upload_submit_button  = this.m_id_upload_button + '_submit_button';

        this.setControl();

    } // constructor

    // Set and get functions
    // =====================
 
    // Get the selected file name
    getSelectedFileName()
    {
        var el_upload = this.getHtmlElement();

        var path_file_name = el_upload.value;

        this.m_selected_file_name = this.getOnlyFileName(path_file_name);

        this.upLoadFileWithAjax();

        return this.m_selected_file_name;

    } // getSelectedFileName

    // Get the server URL (address) for the selected file.
    getSelectedFileServerUrl()
    {
        var ret_url = '';

        ret_url = ret_url + '/www/JazzTasks/Documents/' + this.getSelectedFileName();

        return ret_url;

    } // getSelectedFileServerUrl

    // Initialize selected file name
    initSelectedFileName()
    {
        var el_upload = this.getHtmlElement();

        el_upload.value = '';

    } // initSelectedFileName

    // Checks the selected file name
    checkSelectedFileName(i_reg_number)
    {
        if (this.m_selected_file_name.length == 0)
        {
            alert("JazzUploadFile.checkSelectedFileName Selected file name is not set");

            return false;
        }

        var index_point = this.m_selected_file_name.indexOf('.');

        var name_without_ext =  this.m_selected_file_name.substring(0, index_point);

        var file_ext = this.m_selected_file_name.substring(index_point);

        if (i_reg_number == name_without_ext)
        {
            return true;
        }
        else
        {
            alert("Bitte der Dateiname " + this.m_selected_file_name + " zu " + i_reg_number + file_ext + " ändern.");

            this.initSelectedFileName();

            return false;
        }


    } // checkSelectedFileName

    // TODO Make this to a utility function
    getOnlyFileName(i_path_file_name)
    {
        var ret_file_name = '';
/*
https://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript
var substringTest = function (str) {
    return str.substring(str.lastIndexOf('/')+1);
}
function replaceAll(txt, replace, with_this) {
            return txt.replace(new RegExp(replace, 'g'),with_this);
        }
 var correctPath = replaceAll(path,"%20"," ");
*/      
        // In the example is '/' used. 
        // In some browsers may only the file name be returned in value
        var index_last_slash = i_path_file_name.lastIndexOf('\\');

        if (index_last_slash < 0)
        {
            return ret_file_name;
        }

        ret_file_name = i_path_file_name.substring(index_last_slash + 1);

        return ret_file_name;

    } // getOnlyFileName
    
    // Set functions for the layout member variables
    // =============================================

    // Set the onchange function name. Only the name is input
    setOnchangeFunctionName(i_onchange_function)
    {
        this.m_onchange_function = i_onchange_function;

        this.setControl();

    } // setOnchangeFunctionName

    // Sets the class for the upload file button
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the caption for the button
    setButtonCaption(i_button_caption) 
    {
      this.m_button_caption = i_button_caption;

      this.setControl();

    } // setButtonCaption 

    // Display the submit button caption
    displayButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = this.m_button_caption;
        }   

    } // displayButtonCaption

    // Hide the submit button caption
    hideButtonCaption()
    {
        var el_submit_button = this.getElementSubmitButton();

        if (el_submit_button != null)
        {
            el_submit_button.value = '';
        }

    } // hideButtonCaption    

    // Set filter for file types (extensions), for instance '.docx,.doc"
    setExtensions(i_accept_extensions)
    {
        this.m_accept_extensions = i_accept_extensions;

        this.setControl();
    }

    // Sets the label text for the upload file button
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the upload file button
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the upload file button
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the upload file button
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove

    // Hides or displays the upload div
    hideUploadDiv(i_b_hide)
    {
        if (i_b_hide)
        {
            this.m_el_div_container.style.display = 'none';
        }
        else
        {
            this.m_el_div_container.style.display = 'block';
        }

    } // hideUploadDiv

    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle

    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzUploadFile error: HTML element with id= " + this.m_id_div_container + " does not exist.");

            ret_b_check = false;
        }   
        
        return ret_b_check;

    } // checkContainerElement

    upLoadFileWithAjax()
    {
    //$(document).ready(function() { 
        $('#' + this.m_id_upload_form).ajaxForm(function() { 
           //???? undefined ????? alert(this.m_selected_file_name + ' ist hochgeladen');
           alert('Datei ist hochgeladen');
        }); 
    //});

    } // upLoadFileWithAjax

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

        this.hideButtonCaption();

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_upload_button);

    } // getHtmlElement

    // this.m_id_upload_form
    // Returns the string that defines the HTML upload file button string
    // <form action="UploadFileToServer.php" method="post" enctype="multipart/form-data">
    // <input type="file" id="id_upload_button" onchange="eventFileSelected" accept=".doc,.docx" title="Tip ...">  
    // <input type="submit" value="Upload file" name="submit">
    // </form>
    getHtmlString()
    {
        var ret_html_str = '';

        ret_html_str = ret_html_str + 
            '<form id= "' + this.m_id_upload_form + '" ';

            ret_html_str = ret_html_str + 
            ' action="UploadFileToServer.php" method="post" enctype="multipart/form-data">';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_upload_button, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="file" id="' + this.m_id_upload_button + '" ';

        ret_html_str = ret_html_str + 'name="name_file_to_upload" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        if (this.m_onchange_function.length > 0)
        {
            ret_html_str = ret_html_str + ' onchange="' + this.m_onchange_function + '()" ';
        }

        if (this.m_accept_extensions.length > 0)
        {
            ret_html_str = ret_html_str + ' accept="' + this.m_accept_extensions + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        ret_html_str = ret_html_str + '<input id="' + this.m_id_upload_submit_button + '" ';

        ret_html_str = ret_html_str + ' type="submit" value="';
        
        ret_html_str = ret_html_str + this.m_button_caption + '" name="name_submit">';

        ret_html_str = ret_html_str + '</form>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

    // Returns the submit butto element
    getElementSubmitButton()
    {
        return  document.getElementById(this.m_id_upload_submit_button);

    } // getElementSubmitButton

} // JazzUploadFile


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control Upload File /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////// File: JazzControlDatePicker.js
// Date: 2020-06-24
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for a date picker

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control Date Picker ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Referrences
// https://www.jquery-az.com/learn-use-jquery-ui-datepicker-calendar-widget-examples-free-code/
// https://www.geeksforgeeks.org/jquery-ui-date-picker/
// 

// Class for a button that uploads a file to the server
class JazzDatePicker 
{
    // Function that is executed when an object of this class is created
    // 1. Member variables are set
    // 2. 
    constructor(i_id_date_picker, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the text box
        this.m_id_date_picker = i_id_date_picker;

        // The identity of the container for the text box
        this.m_id_div_container = i_id_div_container;

        // The container element for the text box
        this.m_el_div_container = null;

        // The class for the text box
        this.m_class = '';
    
        // The value of the text box
        this.m_value = '';

        // Label text
        this.m_label_text = '';

        // Label position relative the text box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the text box
        this.m_label_text_position = 'left'; 

        // Size of the text box. Size is the number of characters
        // If size not is set there will be no attribute size= "20"
        // Then the default value for the browser application will be the size
        this.m_text_box_size = '';

        // Maximum length (number of characters) of the input string 
        // If the maximum length not is defined there will be no attribute maxlength= "30"
        // Then the default value for the browser application will be the maximum length
        this.m_maxlength = '';

        // The title attribute specifies extra information about an element.
        // The information is most often shown as a tooltip text when the mouse 
        // moves over the element.
        this.m_title = '';    
        
        this.setDivContainerElement();

        this.setControl();        

    } // constructor

    // Start the date picker
    startDatePicker()
    {
        $(function() { 
            $( '#' + this.m_id_date_picker).datepicker(
                { 
                dateFormat: 'yy-mm-dd'
            }); 
        }); 

    } // startDatePicker

    // Set and get functions
    // =====================

    // Sets the value for the date picker text box
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      element_html.value = this.m_value;

      // Not necessary this.setControl();

    } // setValue

    // Returns the value of the date picker text box
    getValue()
    {
        var element_html = this.getHtmlElement();

        var value = element_html.value;

        this.setValue(value);

        return this.m_value;

    } // getValue    

    // Set functions for the layout member variables
    // =============================================

    // Sets the class for the text box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the text box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the text box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the text box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the text box
    setLabelTextPositionAbove() 
    {
        this.m_label_text_position = 'above'; 

        this.setControl();

    } // setLabelTextPositionAbove
    
    // Sets the text box size. The size is the number of characters
    setSize(i_text_box_size) 
    {
        this.m_text_box_size = i_text_box_size;
        
        this.setControl();

    } // setSize

    // Sets the maximum length of the input string. 
    // The maximum length value is the number of characters
    setMaxlength(i_maxlength) 
    {
        this.m_maxlength = i_maxlength; 

        this.setControl();

    } // setMaxlength
   
    // Sets the title of this HTML element. The title can be a tool tip
    // In a desktop computer the title is displayed when the mouse is
    // over the HTML element
    setTitle(i_title) 
    {
        this.m_title = i_title; 

        this.setControl();

    } // setTitle
    
    // Utility functions
    // =================

    // Sets the div element container
    setDivContainerElement()
    {
        this.m_el_div_container = document.getElementById(this.m_id_div_container);

    } // setDivContainerElement

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
        alert("JazzDatePicker error: HTML element with id= " + this.m_id_div_container + " does not exist.");

        ret_b_check = false;
        }   
    
        return ret_b_check;

    } // checkContainerElement

    // Sets the control
    setControl()
    {
        if (!this.checkContainerElement())
        {
            return;
        }

        var html_str = this.getHtmlString();

        this.m_el_div_container.innerHTML = html_str;

    } // setControl

    // Returns the HTML text box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_text_box);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_date_picker" value="" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="text" id="' + this.m_id_text_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_text_box_size.length > 0)
        {
            ret_html_str = ret_html_str + ' size="' + this.m_text_box_size + '" ';
        }

        if (this.m_maxlength.length > 0)
        {
            ret_html_str = ret_html_str + ' maxlength="' + this.m_maxlength + '" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_text_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString


} // JazzDatePicker
