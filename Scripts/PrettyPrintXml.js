// File: PrettyPrintXml.js
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
