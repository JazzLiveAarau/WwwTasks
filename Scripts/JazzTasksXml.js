// File: JazzTasksXml.js
// Date: 2021-04-18
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
        this.m_xml_file_name_server = 'Xml/JazzTasks.xml';
        // this.m_xml_file_name_server = '../XML/JazzTasks.xml';

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/JazzTasksTestData.xml';

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
