// File: JazzControlCheckBox.js
// Date: 2021-05-11
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Class for the standard control: Check box
//
// Reference: https://www.w3schools.com/js/js_classes.asp
//            https://www.w3schools.com/tags/att_input_type_checkbox.asp

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Control check box //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Class that creates a check box
// The code that will be generated is 
// <label for="id_check_box">Label text</label>
// <input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
// Compulsary input is the identity of the check box and the container 
// (normally a <div> element), where the check box shall be placed 
// Here is a sample how an object of the class can be created:
// var my_check_box = new JazzCheckBox("id_check_box", "i_id_container")
class JazzCheckBox 
{
    // Function that is executed when an object of this class is created
    constructor(i_id_check_box, i_id_div_container) 
    {
        // Member variables
        // ================

        // The identity of the check box
        this.m_id_check_box = i_id_check_box;

        // The identity of the container for the check box
        this.m_id_div_container = i_id_div_container;

        // The container element for the check box
        this.m_el_div_container = null;

        // The class for the check box
        this.m_class = '';
    
        // The name of the check box
        this.m_name = '';

        // The value of the check box
        this.m_value = '';

        // The oninput function name. Only the name is input
        this.m_oninput_function = '';     

        // Label text
        this.m_label_text = '';

        // Label position relative the check box
        // left: Left of box right: Right of box above: Above box
        // Default is left of the check box
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

    // Set and get functions
    // =====================


    // Sets the checkbox to checked or unchecked
    // Input is a string with the values TRUE or FALSE
    setCheck(i_check)
    {
        var element_html = this.getHtmlElement();

        if (i_check == "TRUE")
        {
            element_html.checked = true;
        }
        else if (i_check == "FALSE")
        {
            element_html.checked = false;
        }
        else
        {
            alert("JazzCheckBox.setCheck Input string " + i_check + " is not TRUE or FALSE");
        } 

    } // setCheck

    // Gets the checkbox state checked or unchecked
    // Output is a string with the values TRUE or FALSE
    getCheck()
    {
        var element_html = this.getHtmlElement();
        
        if( element_html.checked == true)
        {
            return "TRUE";
        }
        else
        {
            return "FALSE";
        }

    } // getCheck


    // Set functions for the PHP attributes 
    // =====================================

    // Sets the attribute name of the check box 
    setName(i_name) 
    {
      this.m_name = i_name;

      this.setControl();

    } // setName

    // Sets the attribute value of the check box 
    setValue(i_value) 
    {
      this.m_value = i_value;

      var element_html = this.getHtmlElement();

      this.setControl();

    } // setValue  
    
    // Set functions for the layout member variables
    // =============================================

    // Set the oninput function name. Only the name is input
    setOninputFunctionName(i_oninput_function)
    {
        this.m_oninput_function = i_oninput_function;

        this.setControl();

    } // setOninputFunctionName

    // Sets the class for the check box 
    // There will be no class attribute if this function not is called
    setClass(i_class) 
    {
      this.m_class = i_class;

      this.setControl();

    } // setClass

    // Sets the label text for the check box 
    // There will be no label if the text not is set
    setLabelText(i_label_text) 
    {
      this.m_label_text = i_label_text;

      this.setControl();

    } // setLabelText    

    // Sets the label text to the left of the check box
    setLabelTextPositionLeft(i_label_text) 
    {
        this.m_label_text_position = 'left'; 

        this.setControl();

    } // setLabelTextPositionLeft

    // Sets the label text to the right of the check box
    setLabelTextPositionRight() 
    {
        this.m_label_text_position = 'right'; 

        this.setControl();

    } // setLabelTextPositionRight
    
    // Sets the label text above the check box
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

    // Checks
    checkContainerElement()
    {
        var ret_b_check = true;

        if (null == this.m_el_div_container)
        {
            alert("JazzCheckBox error: HTML element with id= " + this.m_id_div_container + " does not exist.");

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

    // Returns the HTML check box element 
    getHtmlElement()
    {
        return document.getElementById(this.m_id_check_box);

    } // getHtmlElement

    // Returns the string that defines the HTML check box string
    //<input type="checkbox" id="id_check_box" value="NotUsed" name="NotUsed" oninput="myFunction()" title="Tip ...">  
    getHtmlString()
    {
        var ret_html_str = '';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'left')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'above')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title) + '<br>';
        }

        ret_html_str = ret_html_str + '<input type="checkbox" id="' + this.m_id_check_box + '" ';

        if (this.m_class.length > 0)
        {
            ret_html_str = ret_html_str + ' class="' + this.m_class + '" ';
        }        

        //QQQ ret_html_str = ret_html_str + ' value= "' + this.m_value + '" ';

        if (this.m_value.length > 0)
        {
            ret_html_str = ret_html_str + ' value="' + this.m_text_box_size + '" ';
        }

        if (this.m_name.length > 0)
        {
            ret_html_str = ret_html_str + ' name="' + this.m_name + '" ';
        }

        if (this.m_oninput_function.length > 0)
        {
            ret_html_str = ret_html_str + ' oninput="' + this.m_oninput_function + '()" ';
        }

        if (this.m_title.length > 0)
        {
            ret_html_str = ret_html_str + ' title="' + this.m_title + '" ';
        }

        ret_html_str = ret_html_str + '>';

        if (this.m_label_text.length > 0 && this.m_label_text_position == 'right')
        {
            ret_html_str = ret_html_str + 
                getHtmlElementLabelString(this.m_label_text, this.m_id_check_box, this.m_title);
        }

        return ret_html_str;

    } // getHtmlString

} // JazzCheckBox

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Control check box ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

