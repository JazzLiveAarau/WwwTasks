// File: JazzSeasonXml.js
// Date: 2021-06-07
// Author: Gunnar Lidén

// File content
// =============
//
// Loading function
// ----------------
// The class JazzSeasonXml loads season XML files JazzProgramm_2021_2022.xml, ..
// Loading means that "XML file objects" will be created
// One of them is the "Active XML file object" that is stored in the class 
// member variable m_active_file_xml. 
//
// Get and set functions
// ---------------------
// The class JazzSeasonXml has member functions for get and set of values.
//
// Append function
// ---------------
// The class JazzSeasonXml also has functions for appending (adding) a concert. 

// Class corresponding to the XML element <JazzTask> in the file JazzTasks.xml
class JazzSeasonXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    constructor(i_callback_function_name) 
    {
        // Member variables
        // ================

        // Path and name of current season XML file on the server TODO Shall not be a fi
        this.m_current_xml_file_name_server = '../XML/JazzProgramm_2021_2022.xml';

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/JazzSeasonTestData.xml';

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jazz tasks xml object
        this.m_active_file_xml = null;

        // Object holding the tags
        this.m_tags = new JazzTasksTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for the current season and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getFileNameCurrentJazzSeasonXml(), this.m_callback_function_name);

    } // constructor

    // Sets the active XML object
    setActiveXmlObject(i_jazz_season_xml)
    {
        this.m_active_file_xml = i_jazz_season_xml;

    } // setActiveXmlObject

    // Returns the active XML object
    getActiveXmlObject()
    {
        return this.m_active_file_xml;

    } // getActiveXmlObject

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setActiveXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
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

            i_object_xml.setActiveXmlObject(xml_object);

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

    // Returns the name and path for the current season XML file
    getFileNameCurrentJazzSeasonXml()
    {
        if (JazzSeasonXml.execApplicationOnServer())
        {
            // TODO Determine which season that shall be loaded
            return this.m_current_xml_file_name_server;
        }
        else
        {
            return this.m_xml_file_name_local;
        }

    } // getFileNameCurrentJazzSeasonXml

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} // JazzSeasonXml
