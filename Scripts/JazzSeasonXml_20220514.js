// File: JazzSeasonXml.js
// Date:2022-05-14
// Author: Gunnar Lidén
//
// Please note that this file is used in projects WwwTask and WwwQrCodes
// Plese make the same changes in both files
//
// Example how to create an instance of the this class JazzSeasonXml.
// Please nototice that the variables g_season_xml and i_season_xml is
// the same XML object, i.e. two alternative ways to get the resulting
// instance of class JazzSeasonXml.
//
//
// var g_season_xml = null;
//
// function loadExecuteSomething()
// {
//      g_season_xml = new JazzSeasonXml(2021, afterLoadoadExecuteSomething);
// }
//
// function afterLoadoadExecuteSomething(i_season_xml)
// {
//
// }
//
// Without i_season_xml also works
// function afterLoadoadExecuteSomething()
// {
//
// }

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

// Class for the retrieval of season data 
class JazzSeasonXml
{
    // Creates the instance of the class
    // i_callback_function_name: Function that shall be called after loading
    constructor(i_start_season_year, i_callback_function_name) 
    {
        // Member variables
        // ================

        // Path and name of XML file in the computer
        this.m_xml_file_name_local = 'XmlTestData/JazzSeasonTestData.xml';

        // Start year that will be set to the active season by the constructor
        this.m_start_season_year = i_start_season_year;

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The jazz season xml object
        this.m_active_file_xml = null;

        // Object holding the tags
        this.m_tags = new JazzSeasonTags();

        // Flag that a node value not have been set
        this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML object for the current season and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlSeasonFileName(this.m_start_season_year), this.m_callback_function_name);

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

            // Please note i_object als parameter. See above 
            i_callback_function_name(i_object_xml); 
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
    ///////////////////////// Start Season Data ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the autumn year of the season
    getYearAutumn()
    {
        var ret_autumn_year = '';
        
        if (!this.checkActiveSeasonXml()){ return ret_autumn_year;}
        
        var autumn_year_node = this.m_active_file_xml.getElementsByTagName(this.m_tags.getYearAutumn())[0];
        
        var autumn_year_node_value = this.getNodeValue(autumn_year_node);
        
        ret_autumn_year = autumn_year_node_value;
        
        return ret_autumn_year;
        
    } // getYearAutumn

    // Returns the autumn year of the season as integer
    getYearAutumnInt()
    {
        var ret_autumn_year_int = -12345;

        var autumn_year_str = this.getYearAutumn();

        if (autumn_year_str.length != 4)
        {
            ret_autumn_year_int = -1;

            return ret_autumn_year_int;
        }

        ret_autumn_year_int = parseInt(autumn_year_str);

        return ret_autumn_year_int;

    } // getYearAutumnInt


    // Returns the spring year of the season
    getYearSpring()
    {
        var ret_spring_year = '';
        
        if (!this.checkActiveSeasonXml()){ return ret_autumn_year;}
        
        var spring_year_node = this.m_active_file_xml.getElementsByTagName(this.m_tags.getYearSpring())[0];
        
        var spring_year_node_value = this.getNodeValue(spring_year_node);
        
        ret_spring_year = spring_year_node_value;
        
        return ret_spring_year;
        
    } // getYearSpring

    // Returns the flag (string TRUE or FALSE) telling if the concert program is published
    getPublishProgram()
    {
        var ret_publish_program = '';
        
        if (!this.checkActiveSeasonXml()){ return ret_publish_program;}
        
        var publish_program_node = this.m_active_file_xml.getElementsByTagName(this.m_tags.getPublishProgram())[0];
        
        var publish_program_node_value = this.getNodeValue(publish_program_node);
        
        ret_publish_program = publish_program_node_value;
        
        return ret_publish_program;
        
    } // getPublishProgram    
    
    // Returns the flag (boolean true or false) telling if the concert program is published
    getPublishProgramBool()
    {
        if ('TRUE' == this.getPublishProgram())
        {
            return true;
        }
        else
        {
            return false;
        }
        
    } // getPublishProgramBool

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Season Data /////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////   
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Concert Data //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////   

    // Returns true if the concert cancelled flag is defined in the season XML file
    ConcertCancelledFlagIsDefinedInXmlFile(i_concert_number)
    {
        var year_autumn_int = this.getYearAutumnInt();

        if (year_autumn_int < this.m_season_program_start_year_cancelled_tag)
        {
            return false;
        }
        else
        {
            return true;
        }

    } // ConcertCancelledFlagIsDefinedInXmlFile

    // Returns true if the concert was cancelled
    // Please note that for older seasonprograms the cancelled concert tag 
    // is not defined in the XML season program files 
    ConcertIsCancelled(i_concert_number)
    {
        var ret_value = false;

        if (!this.ConcertCancelledFlagIsDefinedInXmlFile(i_concert_number))
        {
            return ret_value;
        }

        var concert_cancelled_str = this.getConcertCancelled(i_concert_number);
        
        if (concert_cancelled_str == 'TRUE')
        {
            ret_value = true;
        }
        else
        {
            ret_value = false;
        }

        return ret_value;

    } // ConcertIsCancelled

    // Returns the concert cancelled flag for a given concert number
    // DO NOT CALL THIS FUNCTION DIRECTLY. ALWAYS CALL ConcertIsCancelled
    // For older seasonprograms the tag is not defined in the XML files 
    getConcertCancelled(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getConcertCancelled(), i_concert_number);
        
    } // getConcertCancelled

    // Returns true if the homepage flyer publish flag is defined in the season XML file
    HomepageFlyerPublishFlagIsDefinedInXmlFile(i_concert_number)
    {
        var year_autumn_int = this.getYearAutumnInt();

        if (year_autumn_int < this.m_season_program_start_year_homepage_flyer_publish_tag)
        {
            return false;
        }
        else
        {
            return true;
        }

    } // HomepageFlyerPublishFlagIsDefinedInXmlFile

    // Returns true if the flyer text can be published on the homepage
    // Please note that for older seasonprograms this tag 
    // is not defined in the XML season program files 
    FlyerTextCanBePublishedOnHomepage(i_concert_number)
    {
        var ret_value = false;

        if (!this.HomepageFlyerPublishFlagIsDefinedInXmlFile(i_concert_number))
        {
            return ret_value;
        }

        var concert_cancelled_str = this.getFlyerTextHomepagePublish(i_concert_number);
        
        if (concert_cancelled_str == 'TRUE')
        {
            ret_value = true;
        }
        else
        {
            ret_value = false;
        }

        return ret_value;

    } // FlyerTextCanBePublishedOnHomepage    

    // Returns the flag ( for a given concert number) that tells if the flyer text can be published on the homepage
    // DO NOT CALL THIS FUNCTION DIRECTLY. ALWAYS CALL FlyerTextCanBePublishedOnHomepage
    // For older seasonprograms the tag is not defined in the XML files 
    getFlyerTextHomepagePublish(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getFlyerTextHomepagePublish(), i_concert_number);
        
    } // getFlyerTextHomepagePublish    

    // Returns the band name for a given concert number
    getBandName(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getBandName(), i_concert_number);
        
    } // getBandName    

    // Returns the short text for a given concert number
    getConcertShortText(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getConcertShortText(), i_concert_number);
        
    } // getConcertShortText

    // Returns the additional text for a given concert number
    getConcertAdditionalText(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getConcertAdditionalText(), i_concert_number);
        
    } // getConcertAdditionalText    

    // Returns the band website for a given concert number
    getBandWebsite(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getBandWebsite(), i_concert_number);
        
    } // getBandWebsite 

    // Returns the a sound sample link for a given concert number
    getSoundSample(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getSoundSample(), i_concert_number);
        
    } // getSoundSample

    // Returns the concert year for a given concert number
    getConcertYear(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getConcertYear(), i_concert_number);
        
    } // getConcertYear

    // Returns the concert month for a given concert number
    getConcertMonth(i_concert_number)
    {
        return this.getConcertNodeValue(this.m_tags.getConcertMonth(), i_concert_number);
        
    } // getConcertMonth

    // Returns the concert day for a given concert number
    getConcertDay(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getConcertDay(), i_concert_number);
        
    } // getConcertDay

    // Returns the concert day name for a given concert number
    getConcertDayName(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getConcertDayName(), i_concert_number);
        
    } // getConcertDayName    

    // Returns the concert start hour for a given concert number
    getConcertStartHour(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getStartHour(), i_concert_number);
        
    } // getConcertStartHour

    // Returns the concert start minute for a given concert number
    getConcertStartMinute(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getStartMinute(), i_concert_number);
        
    } // getConcertStartMinute

    // Returns the concert end hour for a given concert number
    getConcertEndHour(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getEndHour(), i_concert_number);
        
    } // getConcertEndHour

    // Returns the concert end minute for a given concert number
    getConcertEndMinute(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getEndMinute(), i_concert_number);
        
    } // getConcertEndMinute

    // Returns the concert place (premises) for a given concert number
    getConcertPlace(i_concert_number)
    {  
        return this.getConcertNodeValue(this.m_tags.getPlace(), i_concert_number);
        
    } // getConcertPlace
    
    // Returns the musician contact person email for a given concert number
    getContactPerson(i_concert_number)
    {  
	    if (this.getYearAutumnInt() < 2016) return "";

	    return this.getConcertNodeValue(this.m_tags.getContactPerson(), i_concert_number);
	
    } // getContactPerson

    // Returns the musician contact person email for a given concert number
    getContactEmail(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactEmail(), i_concert_number);
        
    } // getContactEmail

    // Returns the musician contact person telephone for a given concert number
    getContactTelephone(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactTelephone(), i_concert_number);
        
    } // getContactTelephone

    // Returns the musician contact person street for a given concert number
    getContactStreet(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactStreet(), i_concert_number);
        
    } // getContactStreet

    // Returns the musician contact person post code for a given concert number
    getContactPostCode(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactPostCode(), i_concert_number);
        
    } // getContactPostCode

    // Returns the musician contact person city for a given concert number
    getContactCity(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactCity(), i_concert_number);
        
    } // getContactCity

    // Returns the musician contact person IBAN (bank account) number for a given concert number
    getContactIbanNumber(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactIbanNumber(), i_concert_number);
        
    } // getContactIbanNumber

    // Returns the musician contact person remark for a given concert number
    getContactRemark(i_concert_number)
    {  
        if (this.getYearAutumnInt() < 2016) return "";

        return this.getConcertNodeValue(this.m_tags.getContactRemark(), i_concert_number);
        
    } // getContactRemark

    // TODO Continue to copy from SeasonProgramXml.js in application WwwHomepage

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Concert Data ////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Musician Data /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////  
    
    // Returns the musician name for a given concert and a given musician number
    getMusicianName(i_concert_number, i_musician_number)
    {
        var ret_name = '';
        
        var musician_node_value = this.getMusicianNodeValue(this.m_tags.getMusicianName(), i_concert_number, i_musician_number);
        
        ret_name = musician_node_value;
        
        return ret_name;
        
    } // getMusicianName

    // Returns the musician instrument for a given concert and a given musician number
    getMusicianInstrument(i_concert_number, i_musician_number)
    {
        var ret_instrument = '';
        
        var musician_node_value = this.getMusicianNodeValue(this.m_tags.getMusicianInstrument(), i_concert_number, i_musician_number);
        
        ret_instrument = musician_node_value;
        
        return ret_instrument;
        
    } // getMusicianInstrument

    // Returns the musician text for a given concert and a given musician number
    getMusicianText(i_concert_number, i_musician_number)
    {
        var ret_text = '';
        
        var musician_node_value = this.getMusicianNodeValue(this.m_tags.getMusicianText(), i_concert_number, i_musician_number);
        
        ret_text = musician_node_value;
        
        return ret_text;
        
    } // getMusicianText    

    // Returns the musician gender for a given concert and a given musician number
    getMusicianGender(i_concert_number, i_musician_number)
    {
        var ret_gender = '';
        
        var gender_node_value = this.getMusicianNodeValue(this.m_tags.getMusicianGender(), i_concert_number, i_musician_number);
        
        ret_gender = gender_node_value;
        
        return ret_gender;
        
    } // getMusicianGender

    // Returns true if the musician is a male person
    maleMusician(i_concert_number, i_musician_number)
    {
        var musician_gender = this.getMusicianGender(i_concert_number, i_musician_number);

        if ('male' == musician_gender)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // maleMusician

    // Returns true if the musician is a female person
    femaleMusician(i_concert_number, i_musician_number)
    {
        var musician_gender = this.getMusicianGender(i_concert_number, i_musician_number);

        if ('female' == musician_gender)
        {
            return true;
        }
        else
        {
            return false;
        }

    } // femaleMusician

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Musician Data ///////////////////////////////
    ///////////////////////////////////////////////////////////////////////////  
    
    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start XML Node Values  ///////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End XML Node Values  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Concerts  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of concerts
    getNumberOfConcerts()
    {
        var ret_n_concerts = -12345;

        if (!this.checkActiveSeasonXml()){ return ret_n_concerts; }

        var concert_nodes = this.m_active_file_xml.getElementsByTagName(this.m_tags.getConcert());

        ret_n_concerts = concert_nodes.length;

        return ret_n_concerts;

    } // getNumberOfConcerts

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Concerts  ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Musicians  /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of musicians for a given concert number
    getNumberOfMusicians(i_concert_number)
    {
        var ret_number_musicians = -12345;
        
        if (!this.checkActiveSeasonXml()){ return ret_number_musicians; }

        var n_concerts = this.getNumberOfConcerts();
        
        if (i_concert_number < 1 || i_concert_number > n_concerts)
        {
            alert("JazzSeasonXml.getNumberOfMusicians Concert number not between 1 and " + n_concerts.toString());
            return ret_data;		
        }
        
        var concert_nodes = this.m_active_file_xml.getElementsByTagName(this.m_tags.getConcert());

        var concert_node = concert_nodes[i_concert_number-1];

        var musician_nodes = concert_node.getElementsByTagName(this.m_tags.getMusician());
        
        ret_number_musicians = musician_nodes.length;
        
        return ret_number_musicians;
        
    } // getNumberOfMusicians

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Musicians  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////   

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Concert Node Value  ///////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value for a given concert number and a tag name
    getConcertNodeValue(i_concert_tag, i_concert_number)
    {
        var ret_data = '';
        
        if (!this.checkActiveSeasonXml()){ return ret_data; }

        var n_concerts = this.getNumberOfConcerts();
        
        if (i_concert_number < 1 || i_concert_number > n_concerts)
        {
            alert("JazzSeasonXml.getConcertNodeValue Concert number is not between 1 and " + n_concerts.toString());
            return ret_data;		
        }
            
        var concert_nodes = this.m_active_file_xml.getElementsByTagName(this.m_tags.getConcert());

        var concert_node = concert_nodes[i_concert_number-1];
        
        var xml_node_value = this.getNodeValueTagName(concert_node, i_concert_tag);
        
        ret_data = this.removeFlagNodeValueNotSet(xml_node_value);
        
        return ret_data;
        
    } // getConcertNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Concert Node Value  /////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Musician Node Value  //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns a musician node value for a musician tag, musician number and concert number
    getMusicianNodeValue(i_musician_tag, i_concert_number, i_musician_number)
    {
        var ret_node_value = '';
        
        if (!this.checkActiveSeasonXml()){ return ret_node_value; }
        
        var n_concerts = this.getNumberOfConcerts();
        
        if (i_concert_number < 1 || i_concert_number > n_concerts)
        {
            alert("JazzSeasonXml.getMusicianNodeValue Concert number not between 1 and " + n_concerts.toString());
            return ret_data;		
        }
            
        var concert_nodes = this.m_active_file_xml.getElementsByTagName(this.m_tags.getConcert());

        var concert_node = concert_nodes[i_concert_number-1];
        
        var musician_nodes = concert_node.getElementsByTagName(this.m_tags.getMusician());
        
        if (i_musician_number < 1 || i_musician_number > musician_nodes.length)
        {
            alert("getMusicianNodeValue Musician number is not between 1 and " + musician_nodes.length.toString());
            return ret_node_value;
        }

        var musician_node = musician_nodes[i_musician_number - 1];
        
        var musician_node_value = this.getNodeValueTagName(musician_node, i_musician_tag);
        
        ret_node_value = this.removeFlagNodeValueNotSet(musician_node_value);
        
        return ret_node_value;
        
    } // getMusicianNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Musician Node Value  //////////////////////
    ///////////////////////////////////////////////////////////////////////////   

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Not Set Values  ///////////////////////////
    ///////////////////////////////////////////////////////////////////////////

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

    // Returns empty string if i_node_value is equal to m_not_yet_set_node_value
    removeFlagNodeValueNotSet(i_node_value)
    {
        if (!this.nodeValueIsSet(i_node_value))
        {
            return "";
        }
        
        return i_node_value; 
        
    } // removeFlagNodeValueNotSet

    // Return flag (string) m_not_yet_set_node_value if input string is empty
    setFlagNodeValueIsNotSetForEmptyString(i_node_value)
    {
        var trimmed_node_value = i_node_value.trim();
        
        if (trimmed_node_value.length == 0)
        {
            return this.m_not_yet_set_node_value;
        }
        
        return i_node_value;

    } // setFlagNodeValueIsNotSetForEmptyString

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Not Set Values  /////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the XML season file name and path for a given season start year
    getXmlSeasonFileName(i_start_year)
    {
        var ret_file_name = '';

        if (i_start_year < 1996 || i_start_year > 2040)
        {
            alert ("JazzSeasonXml.getXmlSeasonFileName Input year is not OK. i_start_year= " + i_start_year.toString());

            return ret_file_name;
        }

        ret_file_name = ret_file_name + '../XML/JazzProgramm_';

        ret_file_name = ret_file_name + i_start_year.toString() + '_';

        ret_file_name = ret_file_name + (i_start_year + 1).toString() + '.xml';

        if (!JazzSeasonXml.execApplicationOnServer())
        {
            return this.m_xml_file_name_local;
        }        

        return ret_file_name;

    } // getXmlSeasonFileName

    // Check that the season program XML object is set
    checkActiveSeasonXml()
    {      
        if (null == this.getActiveXmlObject())
        {
            alert("JazzSeasonXml.checkSeasonsXml Active season program XML object is null");

            return false;
        }	
        else
        {
            return true;
        }
        
    } // checkActiveSeasonXml

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

// Class defining the tags of the XML season files
class JazzSeasonTags 
{
    // Creates the instance of the class
    constructor() 
    {
        // Member variables
        // ================

		///////////////////////// Start Season Tags ///////////////////////////////////////

        this.m_tag_season_program_year_autumn = "YearAutum";
        this.m_tag_season_program_year_spring = "YearSpring";
        this.m_tag_season_program_publish_program = "PublishProgram";

		///////////////////////// End Season Tags /////////////////////////////////////////

		///////////////////////// Start Concert Tags /////////////////////////////////////

        this.m_season_program_start_year_cancelled_tag = 2019;
        this.m_season_program_start_year_homepage_flyer_publish_tag = 2019;

        this.m_tag_season_program_concert = "Concert";	
        this.m_tag_season_program_day_name = "DayName";
        this.m_tag_season_program_day = "Day";
        this.m_tag_season_program_month = "Month";
        this.m_tag_season_program_year = "Year";
        this.m_tag_season_program_start_hour = "TimeStartHour";
        this.m_tag_season_program_start_minute = "TimeStartMinute";
        this.m_tag_season_program_end_hour = "TimeEndHour";
        this.m_tag_season_program_end_minute = "TimeEndMinute";
        this.m_tag_season_program_place = "Place";
        this.m_tag_season_program_publish_flyer_text = "PublishFlyerText";
        this.m_tag_season_program_concert_cancelled = "ConcertCancelled";
        this.m_tag_season_program_band_name = "BandName";
        this.m_tag_season_program_short_text = "ShortText";
        this.m_tag_season_program_additional_text = "AdditionalText";
        this.m_tag_season_program_band_website = "BandWebsite";
        this.m_tag_season_program_band_sound_sample = "SoundSample";
        this.m_tag_season_program_label_additional_text = "LabelAdditionalText";
        this.m_tag_season_program_label_flyer_text = "LabelFlyerText";
        this.m_tag_season_program_flyer_text = "FlyerText";
        this.m_tag_season_program_flyer_text_homepage_publish = "FlyerTextHomepagePublish";

        this.m_tag_season_program_poster_mid_size = 'PosterMidSize';
        this.m_tag_season_program_poster_small_size = 'PosterSmallSize';
        this.m_tag_season_program_photo_gallery_one = 'PhotoGalleryOne';
        this.m_tag_season_program_photo_gallery_two = 'PhotoGalleryTwo';
        this.m_tag_season_program_photo_gallery_one_zip = 'PhotoGalleryOneZip';
        this.m_tag_season_program_photo_gallery_two_zip = 'PhotoGalleryTwoZip';

        this.m_tag_season_program_contact_person = "ContactPerson";
        this.m_tag_season_program_contact_email = "ContactEmail";
        this.m_tag_season_program_contact_telephone = "ContactTelephone";
        this.m_tag_season_program_contact_street = "ContactStreet";
        this.m_tag_season_program_contact_post_code = "ContactPostCode";
        this.m_tag_season_program_contact_city = "ContactCity";
        this.m_tag_season_program_contact_iban_number = "IbanNumber";
        this.m_tag_season_program_contact_remark = "ContactRemark";

		///////////////////////// End Concert Tags  ///////////////////////////////////////

		///////////////////////// Start Musician Tags /////////////////////////////////////

        this.m_tag_season_program_musician = "Musician";
        this.m_tag_season_program_musician_name = "Name";
        this.m_tag_season_program_musician_instrument = "Instrument";
        this.m_tag_season_program_musician_text = "Text";
        this.m_tag_season_program_musician_gender = "Gender";

		///////////////////////// End Musician Tags ///////////////////////////////////////

    } // constructor

    // Get member variable functions
    // =============================

	///////////////////////// Start Season Tags ///////////////////////////////////////

    getYearAutumn(){return this.m_tag_season_program_year_autumn;} 
    getYearSpring(){return this.m_tag_season_program_year_spring;} 
    getPublishProgram(){return this.m_tag_season_program_publish_program;} 
	
    ///////////////////////// End Season Tags /////////////////////////////////////////

	///////////////////////// Start Concert Tags //////////////////////////////////////

    getConcert(){return this.m_tag_season_program_concert;}
    getConcertDayName(){return this.m_tag_season_program_day_name;}
    getConcertDay(){return this.m_tag_season_program_day;}
    getConcertMonth(){return this.m_tag_season_program_month;}
    getConcertYear(){return this.m_tag_season_program_year;}
    getStartHour(){return this.m_tag_season_program_start_hour;}
    getStartMinute(){return this.m_tag_season_program_start_minute;}
    getEndHour(){return this.m_tag_season_program_end_hour;}
    getEndMinute(){return this.m_tag_season_program_end_minute;}
    getPlace(){return this.m_tag_season_program_place;}
    getPublishFlyer(){return this.m_tag_season_program_publish_flyer_text;}
    getConcertCancelled(){return this.m_tag_season_program_concert_cancelled;}
    getBandName(){return this.m_tag_season_program_band_name;}
    getConcertShortText(){return this.m_tag_season_program_short_text;}
    getConcertAdditionalText(){return this.m_tag_season_program_additional_text;}
    getBandWebsite(){return this.m_tag_season_program_band_website;}
    getSoundSample(){return this.m_tag_season_program_band_sound_sample;}
    getLabelAdditionalText(){return this.m_tag_season_program_label_additional_text;}
    getLabelFlyerText(){return this.m_tag_season_program_label_flyer_text;}
    getFlyerText(){return this.m_tag_season_program_flyer_text;}
    getFlyerTextHomepagePublish(){return this.m_tag_season_program_flyer_text_homepage_publish;}
    getPosterMidsize(){return this.m_tag_season_program_poster_mid_size;}
    getPosterSmallSize(){return this.m_tag_season_program_poster_small_size;}
    getPhotoGalleryOne(){return this.m_tag_season_program_photo_gallery_one;}
    getPhotoGalleryTwo(){return this.m_tag_season_program_photo_gallery_two;}
    getPhotoGalleryOneZip(){return this.m_tag_season_program_photo_gallery_one_zip;}
    getPhotoGalleryTwoZip(){return this.m_tag_season_program_photo_gallery_two_zip;}
    getContactPerson(){return this.m_tag_season_program_contact_person;}
    getContactEmail(){return this.m_tag_season_program_contact_email;}
    getContactTelephone(){return this.m_tag_season_program_contact_telephone;}
    getContactStreet(){return this.m_tag_season_program_contact_street;}
    getContactPostCode(){return this.m_tag_season_program_contact_post_code;}
    getContactCity(){return this.m_tag_season_program_contact_city;}
    getContactIbanNumber(){return this.m_tag_season_program_contact_iban_number;}
    getContactRemark(){return this.m_tag_season_program_contact_remark;}

	///////////////////////// End Concert Tags  ///////////////////////////////////////

	///////////////////////// Start Musician Tags /////////////////////////////////////

    getMusician(){return this.m_tag_season_program_musician;}
    getMusicianName(){return this.m_tag_season_program_musician_name;}
    getMusicianInstrument(){return this.m_tag_season_program_musician_instrument;}
    getMusicianText(){return this.m_tag_season_program_musician_text;}
    getMusicianGender(){return this.m_tag_season_program_musician_gender;}

	///////////////////////// End Musician Tags ///////////////////////////////////////

} // JazzSeasonTags

