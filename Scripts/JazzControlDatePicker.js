// File: JazzControlDatePicker.js
// Date: 2021-04-14
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
        var ref_id_str = '#' + this.m_id_date_picker;

        $(function() { 
            $(ref_id_str).datepicker(
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
        return document.getElementById(this.m_id_date_picker);

    } // getHtmlElement

    // Returns the string that defines the HTML text box string
    // <input type="text" id="id_date_picker" value="" size="20" maxlength="30" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="text" id="' + this.m_id_date_picker + '" ';

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
                getHtmlElementLabelString(this.m_label_text, this.m_id_date_picker, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString


} // JazzDatePicker
