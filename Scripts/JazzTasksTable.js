// File: JazzTasksTable.js
// Date: 2021-06-09
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

		// Two dimensional array mapping task number to registration number (Axxxx)
		this.m_map_number_task_registration = [];

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

		var index_map = 0;

        for (var task_number=1; task_number <= n_tasks; task_number++)
        {
            var current_task = this.getJazzTaskRecordXml(task_number);

            this.m_jazz_tasks_table[task_number - 1] = current_task;

			var reg_number = current_task.getJazzTaskRegNumber();

			this.m_map_number_task_registration[index_map, 0] = task_number;

			this.m_map_number_task_registration[index_map, 1] = reg_number;

			index_map = index_map + 1;

        } // task_number

    } // initJazzTasksTable

    // Get and set member functions for the member variables (fields)
    // ==============================================================

	// Returns the task number for a given registration number
	getTaskNumberFromRegistrationNumber(i_registration_number)
	{
		var ret_task_number = -1;

		var n_tasks = this.m_xml.getNumberOfJazzTasks();

		for (var task_number=1; task_number <= n_tasks; task_number++)
        {
            var current_task = this.getJazzTaskRecordXml(task_number);

            //QQ ???? this.m_jazz_tasks_table[task_number - 1] = current_task;

			var reg_number = current_task.getJazzTaskRegNumber();

			if (i_registration_number == reg_number)
			{
				ret_task_number = task_number;

				break;
			}

		}

		return ret_task_number;

	} // getTaskNumberFromRegistrationNumber

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
	// Case responsible: An array of responsibles
    getJazzTasksNameArray(i_jazz_tasks_name_array_case)
    {
        this.m_jazz_tasks_name_array = [];

        if (i_jazz_tasks_name_array_case == 'reg_number' || 
			i_jazz_tasks_name_array_case == 'reg_number_title' || 
			i_jazz_tasks_name_array_case == 'responsible' || 
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

			var responsible_name = current_task.getJazzTaskResponsible();

            if (this.m_jazz_tasks_name_array_case == 'reg_number')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = reg_number; 
            }
            else if (this.m_jazz_tasks_name_array_case == 'title')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = task_title; 
            }
            else if (this.m_jazz_tasks_name_array_case == 'reg_number_title')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = reg_number + '&nbsp;&nbsp;&nbsp;&nbsp;' + task_title; 
            }
			else if (this.m_jazz_tasks_name_array_case == 'responsible')
            {
                this.m_jazz_tasks_name_array[task_number - 1] = responsible_name; 
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

		var jazz_task_use_description = this.m_xml.getJazzTaskUseDescription(i_task_number);
		ret_jazz_task.setJazzTaskUseDescription(jazz_task_use_description);

		var jazz_task_remind_day = this.m_xml.getJazzTaskRemindDay(i_task_number);
		ret_jazz_task.setJazzTaskRemindDay(jazz_task_remind_day);

		var jazz_task_remind_month = this.m_xml.getJazzTaskRemindMonth(i_task_number);
		ret_jazz_task.setJazzTaskRemindMonth(jazz_task_remind_month);

		var jazz_task_finish_day = this.m_xml.getJazzTaskFinishDay(i_task_number);
		ret_jazz_task.setJazzTaskFinishDay(jazz_task_finish_day);

		var jazz_task_finish_month = this.m_xml.getJazzTaskFinishMonth(i_task_number);
		ret_jazz_task.setJazzTaskFinishMonth(jazz_task_finish_month);

		var jazz_task_before_concert = this.m_xml.getJazzTaskBeforeConcert(i_task_number);
		ret_jazz_task.setJazzTaskBeforeConcert(jazz_task_before_concert);

		var jazz_task_after_concert = this.m_xml.getJazzTaskAfterConcert(i_task_number);
		ret_jazz_task.setJazzTaskAfterConcert(jazz_task_after_concert);

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

		var jazz_task_use_description = i_jazz_task.getJazzTaskUseDescription();
		this.m_xml.setJazzTaskUseDescription(i_task_number, jazz_task_use_description);

		var jazz_task_remind_day = i_jazz_task.getJazzTaskRemindDay();
		this.m_xml.setJazzTaskRemindDay(i_task_number, jazz_task_remind_day);

		var jazz_task_remind_month = i_jazz_task.getJazzTaskRemindMonth();
		this.m_xml.setJazzTaskRemindMonth(i_task_number, jazz_task_remind_month);

		var jazz_task_finish_day = i_jazz_task.getJazzTaskFinishDay();
		this.m_xml.setJazzTaskFinishDay(i_task_number, jazz_task_finish_day);

		var jazz_task_finish_month = i_jazz_task.getJazzTaskFinishMonth();
		this.m_xml.setJazzTaskFinishMonth(i_task_number, jazz_task_finish_month);

		var jazz_task_before_concert = i_jazz_task.getJazzTaskBeforeConcert();
		this.m_xml.setJazzTaskBeforeConcert(i_task_number, jazz_task_before_concert);		

		var jazz_task_after_concert = i_jazz_task.getJazzTaskAfterConcert();
		this.m_xml.setJazzTaskAfterConcert(i_task_number, jazz_task_after_concert);		

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
