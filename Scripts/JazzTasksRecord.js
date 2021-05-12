// File: JazzTasksRecord.js
// Date: 2021-05-12
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

        // Flag telling if the description documents DOC and PDF are used
        // (or only a reference link to a document or a web page)
        this.m_jazz_task_use_description = 'TRUE';

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

    // Returns the jazz task flag 'use description' (TRUE or FALSE)
    getJazzTaskUseDescription() 
    {
      return this.m_jazz_task_use_description;

    } // getJazzTaskUseDescription

    // Sets the jazz task flag 'use description'
    setJazzTaskUseDescription(i_jazz_task_flag_use_description) 
    {
        this.m_jazz_task_use_description = i_jazz_task_flag_use_description;

    } // setJazzTaskUseDescription

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

    // Returns a string with the responsible persons for a task
    // Input i_case is not yet used
    getJazzTaskResponsiblesString(i_case)
    {
        var ret_str = '';

        if (this.getJazzTaskResponsible().length > 0)
        {
            ret_str = ret_str + this.getJazzTaskResponsible();
        }
        else
        {
            ret_str = ret_str + 'Niemanden';
        }

        var deputy_abbrev_str = ' (StV)';

        for (var deputy_number = 1; deputy_number <= this.getNumberOfJazzTaskDeputies(); deputy_number++)
        {
            var deputy_name = this.getJazzTaskDeputyByNumber(deputy_number);

            if (deputy_name.length > 0)
            {
                ret_str = ret_str + '&nbsp;&nbsp;&nbsp;' + deputy_name + deputy_abbrev_str;
            }
        }

        return ret_str;

    } // getJazzTaskResponsiblesString

    // Returns a string with the deputy persons for a task
    getJazzTaskDeputiesString()
    {
        var ret_str = '';

        for (var deputy_number = 1; deputy_number <= this.getNumberOfJazzTaskDeputies(); deputy_number++)
        {
            var deputy_name = this.getJazzTaskDeputyByNumber(deputy_number);

            if (deputy_name.length > 0)
            {
                ret_str = ret_str + ' ' + deputy_name;
            }
        }

        return ret_str;

    } // getJazzTaskDeputiesString

    // Returns a string with link descriptions  
    getJazzTaskLinkDescriptionsString()
    {
        var ret_str = '';

        for (var link_number = 1; link_number <= this.getNumberOfJazzTaskReferences(); link_number++)
        {
            var link_description = this.getJazzTaskRefDescriptionByNumber(link_number);

            if (link_description.length > 0)
            {
                ret_str = ret_str + ' ' + link_description;
            }
        }

        return ret_str;

    } // getJazzTaskLinkDescriptionsString       
        
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

       // Sets a jazz task deputy name by number
       setJazzTaskDeputyByNumber(i_jazz_task_deputy_number, i_jazz_deputy_name) 
       {
           var n_deputies = this.m_jazz_task_deputies.length;
   
           if (i_jazz_task_deputy_number <= 0 || i_jazz_task_deputy_number > n_deputies)
           {
               return 'Error: Not a valid jazz task deputy number';
           }
   
           this.m_jazz_task_deputies[i_jazz_task_deputy_number - 1] = i_jazz_deputy_name;
   
           return '';
   
       } // setJazzTaskDeputyByNumber
    
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
    
    // Returns true if the jazz task flag use description document
    static checkJazzTaskUseDescription(i_jazz_task_flag_use_description) 
    {
        var ret_b_check = true;

        if (i_jazz_task_flag_use_description != "TRUE" && i_jazz_task_flag_use_description != "FALSE")
        {
            ret_b_check = false;

            alert("checkJazzTaskUseDescription Flag " + i_jazz_task_flag_use_description + " is not TRUE or FALSE");
        }
        
        return ret_b_check;

    } // checkJazzTaskUseDescription

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

        if (jazz_task_responsible.length == 0)
        {
            alert("Verantwortlich darf nicht leer sein");

            ret_b_check = false;      
        }        

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

