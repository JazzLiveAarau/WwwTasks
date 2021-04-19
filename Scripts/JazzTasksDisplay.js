// File: JazzTasksDisplay.js
// Date: 2021-04-19
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Hauptfunktionen der Applikation Aufgaben Display

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// XML object corresponding to XML file JazzTasks.xml
var g_display_xml = null;

// JazzTasksTable object that hold all JazzTask records 
var g_display_table = null;

// Active jazz task record number
var g_display_number = -12345;

// Active jazz task
var g_active_record = null;

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Load the XML object for XML file JazzTasks.xml and call initJazzTasksDisplayAfterLoadOfXml
function initJazzTasksDisplay()
{
    g_display_xml = new JazzTasksXml(initJazzTasksDisplayAfterLoadOfXml);

} // initJazzTasksDisplay

// Initialization after load of the XML object for the XML file JazzTask.xml
// 1. Creation of the JazzTasksTable object.
function initJazzTasksDisplayAfterLoadOfXml()
{
    g_display_table = new JazzTasksTable(g_display_xml);

    g_display_number = 43;

    g_active_record = g_display_table.getJazzTaskRecord(g_display_number);

    setActiveRecordDiv();

} // initJazzTasksDisplayAfterLoadOfXml

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// User klicked the button close the display of the active record
function onClickCloseActiveRecord()
{
    closeActiveRecord();

} // onClickCloseActiveRecord

// Download the DOC document
function onClickDownloadDoc()
{
    alert("onClickDownloadDoc Enter");

} // onClickDownloadDoc

// Download the DOC document
function onClickDownloadPdf()
{
    alert("onClickDownloadPdf Enter");

} // onClickDownloadPdf

// Open reference one URL
function onClickOpenUrlOne()
{
    alert("onClickOpenUrlOne Enter");

} // onClickOpenUrlOne

// Open reference two URL
function onClickOpenUrlTwo()
{
    alert("onClickOpenUrlTwo Enter");

} // onClickOpenUrlTwo

// Open reference three URL
function onClickOpenUrlThree()
{
    alert("onClickOpenUrlThree Enter");

} // onClickOpenUrlThree

// Open reference four URL
function onClickOpenUrlFour()
{
    alert("onClickOpenUrlFour Enter");

} // onClickOpenUrlFour

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Active Record Functions ///////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Sets the text of the active record <div> element
function setActiveRecordDiv()
{
    setActiveRecordDivTitle();

    setActiveRecordDivNumber();

    setActiveRecordDivDescription();

    setActiveRecordDivRemark();

    setActiveRecordDivDocument();

    setActiveRecordDivReferenceOneUrl();

    setActiveRecordDivReferenceTwoUrl();

    setActiveRecordDivReferenceThreeUrl();

    setActiveRecordDivReferenceFourUrl();

    setActiveRecordDivReferenceOneDescription();

    setActiveRecordDivReferenceTwoDescription();

    setActiveRecordDivReferenceThreeDescription();

    setActiveRecordDivReferenceFourDescription();

} // setActiveRecordDiv

// Sets the text of the active record title <div> element
function setActiveRecordDivTitle()
{
    var el_div_title = getDivElementActiveRecordTitle();

    var title_str = '';

    title_str = title_str + '<b>' + 'Titel' + '</b>' + '<br>';

    title_str = title_str + g_active_record.getJazzTaskTitle();

    el_div_title.innerHTML = title_str;

} // setActiveRecordDivTitle

// Sets the text of the active record number <div> element
function setActiveRecordDivNumber()
{
    var el_div_number = getDivElementActiveRecordNumber();

    var number_str = '';

    number_str = number_str + '<b>' + 'Nummer' + '</b>' + '<br>';

    number_str = number_str + g_active_record.getJazzTaskRegNumber();

    el_div_number.innerHTML = number_str;

} // setActiveRecordDivNumber

// Sets the text of the active record description <div> element
function setActiveRecordDivDescription()
{
    var el_div_description = getDivElementActiveRecordDescription();

    var description_str = '';

    description_str = description_str + '<b>' + 'Beschreibung/Suchwörter' + '</b>' + '<br>';

    description_str = description_str + g_active_record.getJazzTaskDescription();

    el_div_description.innerHTML = description_str;

} // setActiveRecordDivDescription

// Sets the text of the active record remark <div> element
function setActiveRecordDivRemark()
{
    var el_div_remark = getDivElementActiveRecordRemark();

    var remark_str = '';

    remark_str = remark_str + '<b>' + 'Bemerkung' + '</b>' + '<br>';

    remark_str = remark_str + g_active_record.getJazzTaskRemark();

    el_div_remark.innerHTML = remark_str;

} // setActiveRecordDivRemark

// Sets the text of the active record document <div> element
function setActiveRecordDivDocument()
{
    var el_div_document_name = getDivElementActiveRecordDocumentName();

    var document_name_str = '';

    document_name_str = document_name_str + '<b>' + 'Dokument ' + '</b>';

    document_name_str = document_name_str + g_active_record.getJazzTaskRegNumber();

    el_div_document_name.innerHTML = document_name_str;

} // setActiveRecordDivDocument

// Sets the text of the active record reference one URL <div> element
function setActiveRecordDivReferenceOneUrl()
{
    var el_div_ref_one_url = getDivElementActiveRecordReferenceOneUrl();
	
	var reference_number = 1;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceOne();

        return;
    }
    else
    {
        displayActiveRecordReferenceOne();
    }

    var ref_one_url_str = '';

    ref_one_url_str = ref_one_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_one_url_str = ref_one_url_str + url_str;

    el_div_ref_one_url.innerHTML = ref_one_url_str;

} // setActiveRecordDivReferenceOneUrl

// Sets the text of the active record reference two URL <div> element
function setActiveRecordDivReferenceTwoUrl()
{
    var el_div_ref_two_url = getDivElementActiveRecordReferenceTwoUrl();
	
	var reference_number = 2;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceTwo();

        return;
    }
    else
    {
        displayActiveRecordReferenceTwo();
    }

    var ref_two_url_str = '';

    ref_two_url_str = ref_two_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_two_url_str = ref_two_url_str + url_str;

    el_div_ref_two_url.innerHTML = ref_two_url_str;

} // setActiveRecordDivReferenceTwoUrl

// Sets the text of the active record reference three URL <div> element
function setActiveRecordDivReferenceThreeUrl()
{
    var el_div_ref_three_url = getDivElementActiveRecordReferenceThreeUrl();
	
	var reference_number = 3;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceThree();

        return;
    }
    else
    {
        displayActiveRecordReferenceThree();
    }

    var ref_three_url_str = '';

    ref_three_url_str = ref_three_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_three_url_str = ref_three_url_str + url_str;

    el_div_ref_three_url.innerHTML = ref_three_url_str;

} // setActiveRecordDivReferenceThreeUrl

// Sets the text of the active record reference four URL <div> element
function setActiveRecordDivReferenceFourUrl()
{
    var el_div_ref_four_url = getDivElementActiveRecordReferenceFourUrl();
	
	var reference_number = 4;

    var url_str = g_active_record.getJazzTaskRefLink(reference_number);

    if (url_str.length == 0)
    {
        hideActiveRecordReferenceFour();

        return;
    }
    else
    {
        displayActiveRecordReferenceFour();
    }

    var ref_four_url_str = '';

    ref_four_url_str = ref_four_url_str + '<b>' + 'Referenz ' + reference_number.toString() + '</b>' + '<br>';

    ref_four_url_str = ref_four_url_str + url_str;

    el_div_ref_four_url.innerHTML = ref_four_url_str;

} // setActiveRecordDivReferenceFourUrl

// Sets the text of the active record reference one description <div> element
function setActiveRecordDivReferenceOneDescription()
{
    var el_div_ref_one_description = getDivElementActiveRecordReferenceOneDescription();
	
	var reference_number = 1;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_one_description_str = '';

    ref_one_description_str = ref_one_description_str + description_str;

    el_div_ref_one_description.innerHTML = ref_one_description_str;

} // setActiveRecordDivReferenceOneDescription

// Sets the text of the active record reference two description <div> element
function setActiveRecordDivReferenceTwoDescription()
{
    var el_div_ref_two_description = getDivElementActiveRecordReferenceTwoDescription();
	
	var reference_number = 2;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_two_description_str = '';

    ref_two_description_str = ref_two_description_str + description_str;

    el_div_ref_two_description.innerHTML = ref_two_description_str;

} // setActiveRecordDivReferenceTwoDescription

// Sets the text of the active record reference three description <div> element
function setActiveRecordDivReferenceThreeDescription()
{
    var el_div_ref_three_description = getDivElementActiveRecordReferenceThreeDescription();
	
	var reference_number = 3;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_three_description_str = '';

    ref_three_description_str = ref_three_description_str + description_str;

    el_div_ref_three_description.innerHTML = ref_three_description_str;

} // setActiveRecordDivReferenceThreeDescription

// Sets the text of the active record reference four description <div> element
function setActiveRecordDivReferenceFourDescription()
{
    var el_div_ref_four_description = getDivElementActiveRecordReferenceFourDescription();
	
	var reference_number = 4;

    var description_str = g_active_record.getJazzTaskRefDescription(reference_number);

    var ref_four_description_str = '';

    ref_four_description_str = ref_four_description_str + description_str;

    el_div_ref_four_description.innerHTML = ref_four_description_str;

} // setActiveRecordDivReferenceFourDescription

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Active Record Functions /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Element Functions /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Returns the active record <div> element
function getDivElementActiveRecord()
{
    return document.getElementById(getIdDivElementActiveRecord());

} // getDivElementTitle

//Returns the identity of the active record <div> element
function getIdDivElementActiveRecord()
{
    return 'id_display_active_record';

} // getIdDivElementActiveRecord

// Closes the active record <div>
function closeActiveRecord()
{
    var el_active_record = getDivElementActiveRecord();

    el_active_record.style.display = 'none';

} // closeActiveRecord

// Shows the active record <div>
function displayActiveRecord()
{
    var el_active_record = getDivElementActiveRecord();

    el_active_record.style.display = 'block';

} // displayActiveRecord

// Returns the active record title <div> element
function getDivElementActiveRecordTitle()
{
    return document.getElementById(getIdDivElementActiveRecordTitle());

} // getDivElementActiveRecordTitle

//Returns the identity of the active record title <div> element
function getIdDivElementActiveRecordTitle()
{
    return 'id_active_record_title';

} // getIdDivElementActiveRecordTitle

// Returns the active record number <div> element
function getDivElementActiveRecordNumber()
{
    return document.getElementById(getIdDivElementActiveRecordNumber());

} // getDivElementActiveRecordNumber

//Returns the identity of the active record number <div> element
function getIdDivElementActiveRecordNumber()
{
    return 'id_active_record_number';

} // getIdDivElementActiveRecordNumber

// Returns the active record description <div> element
function getDivElementActiveRecordDescription()
{
    return document.getElementById(getIdDivElementActiveRecordDescription());

} // getDivElementActiveRecordDescription

//Returns the identity of the active record description <div> element
function getIdDivElementActiveRecordDescription()
{
    return 'id_active_record_description';

} // getIdDivElementActiveRecordDescription

// Returns the active record remark <div> element
function getDivElementActiveRecordRemark()
{
    return document.getElementById(getIdDivElementActiveRecordRemark());

} // getDivElementActiveRecordRemark

//Returns the identity of the active record remark <div> element
function getIdDivElementActiveRecordRemark()
{
    return 'id_active_record_remark';

} // getIdDivElementActiveRecordRemark

// Returns the active record document name <div> element
function getDivElementActiveRecordDocumentName()
{
    return document.getElementById(getIdDivElementActiveRecordDocumentName());

} // getDivElementActiveRecordDocumentName

//Returns the identity of the active record document name <div> element
function getIdDivElementActiveRecordDocumentName()
{
    return 'id_active_record_document_name';

} // getIdDivElementActiveRecordDocumentName


// Returns the active record reference one <div> element
function getDivElementActiveRecordReferenceOne()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceOne());

} // getDivElementActiveRecordReferenceOne

//Returns the identity of the active record reference one <div> element
function getIdDivElementActiveRecordReferenceOne()
{
    return 'id_active_record_reference_one';

} // getIdDivElementActiveRecordReferenceOne

// Hides the active reference one <div>
function hideActiveRecordReferenceOne()
{
    var el_active_reference_one = getDivElementActiveRecordReferenceOne();

    el_active_reference_one.style.display = 'none';

} // hideActiveRecordReferenceOne

// Shows the active reference one <div>
function displayActiveRecordReferenceOne()
{
    var el_active_reference_one = getDivElementActiveRecordReferenceOne();

    el_active_reference_one.style.display = 'block';

} // displayActiveRecordReferenceOne

// Returns the active record reference one URL <div> element
function getDivElementActiveRecordReferenceOneUrl()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceOneUrl());

} // getDivElementActiveRecordReferenceOneUrl

//Returns the identity of the active record reference one <div> element
function getIdDivElementActiveRecordReferenceOneUrl()
{
    return 'id_active_record_reference_one_url';

} // getIdDivElementActiveRecordReferenceOneUrl

// Returns the active record reference two URL <div> element
function getDivElementActiveRecordReferenceTwoUrl()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceTwoUrl());

} // getDivElementActiveRecordReferenceTwoUrl

//Returns the identity of the active record reference two URL <div> element
function getIdDivElementActiveRecordReferenceTwoUrl()
{
    return 'id_active_record_reference_two_url';

} // getIdDivElementActiveRecordReferenceTwoUrl

// Returns the active record reference three URL <div> element
function getDivElementActiveRecordReferenceThreeUrl()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceThreeUrl());

} // getDivElementActiveRecordReferenceThreeUrl

//Returns the identity of the active record reference three URL <div> element
function getIdDivElementActiveRecordReferenceThreeUrl()
{
    return 'id_active_record_reference_three_url';

} // getIdDivElementActiveRecordReferenceThreeUrl

// Returns the active record reference four URL <div> element
function getDivElementActiveRecordReferenceFourUrl()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceFourUrl());

} // getDivElementActiveRecordReferenceFourUrl

//Returns the identity of the active record reference four URL <div> element
function getIdDivElementActiveRecordReferenceFourUrl()
{
    return 'id_active_record_reference_four_url';

} // getIdDivElementActiveRecordReferenceFourUrl

// Returns the active record reference one description <div> element
function getDivElementActiveRecordReferenceOneDescription()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceOneDescription());

} // getDivElementActiveRecordReferenceOneDescription

//Returns the identity of the active record reference one <div> element
function getIdDivElementActiveRecordReferenceOneDescription()
{
    return 'id_active_record_reference_one_description';

} // getIdDivElementActiveRecordReferenceOneDescription

// Returns the active record reference two description <div> element
function getDivElementActiveRecordReferenceTwoDescription()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceTwoDescription());

} // getDivElementActiveRecordReferenceTwoDescription

//Returns the identity of the active record reference two <div> element
function getIdDivElementActiveRecordReferenceTwoDescription()
{
    return 'id_active_record_reference_two_description';

} // getIdDivElementActiveRecordReferenceTwoDescription

// Returns the active record reference two description <div> element
function getDivElementActiveRecordReferenceThreeDescription()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceThreeDescription());

} // getDivElementActiveRecordReferenceThreeDescription

//Returns the identity of the active record reference three <div> element
function getIdDivElementActiveRecordReferenceThreeDescription()
{
    return 'id_active_record_reference_three_description';

} // getIdDivElementActiveRecordReferenceThreeDescription

// Returns the active record reference four <div> element
function getDivElementActiveRecordReferenceFourDescription()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceFourDescription());

} // getDivElementActiveRecordReferenceFourDescription

//Returns the identity of the active record reference four <div> element
function getIdDivElementActiveRecordReferenceFourDescription()
{
    return 'id_active_record_reference_four_description';

} // getIdDivElementActiveRecordReferenceFourDescription

// Returns the active record reference two <div> element
function getDivElementActiveRecordReferenceTwo()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceTwo());

} // getDivElementActiveRecordReferenceTwo

//Returns the identity of the active record reference two <div> element
function getIdDivElementActiveRecordReferenceTwo()
{
    return 'id_active_record_reference_two';

} // getIdDivElementActiveRecordReferenceTwo

// Hides the active reference two <div>
function hideActiveRecordReferenceTwo()
{
    var el_active_reference_two = getDivElementActiveRecordReferenceTwo();

    el_active_reference_two.style.display = 'none';

} // hideActiveRecordReferenceTwo

// Shows the active reference two <div>
function displayActiveRecordReferenceTwo()
{
    var el_active_reference_two = getDivElementActiveRecordReferenceTwo();

    el_active_reference_two.style.display = 'block';

} // displayActiveRecordReferenceTwo


// Returns the active record reference three <div> element
function getDivElementActiveRecordReferenceThree()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceThree());

} // getDivElementActiveRecordReferenceThree

//Returns the identity of the active record reference three <div> element
function getIdDivElementActiveRecordReferenceThree()
{
    return 'id_active_record_reference_three';

} // getIdDivElementActiveRecordReferenceThree

// Hides the active reference three <div>
function hideActiveRecordReferenceThree()
{
    var el_active_reference_three = getDivElementActiveRecordReferenceThree();

    el_active_reference_three.style.display = 'none';

} // hideActiveRecordReferenceThree

// Shows the active reference three <div>
function displayActiveRecordReferenceThree()
{
    var el_active_reference_three = getDivElementActiveRecordReferenceThree();

    el_active_reference_three.style.display = 'block';

} // displayActiveRecordReferenceThree

// Returns the active record reference four <div> element
function getDivElementActiveRecordReferenceFour()
{
    return document.getElementById(getIdDivElementActiveRecordReferenceFour());

} // getDivElementActiveRecordReferenceFour

//Returns the identity of the active record reference four <div> element
function getIdDivElementActiveRecordReferenceFour()
{
    return 'id_active_record_reference_four';

} // getIdDivElementActiveRecordReferenceFour

// Hides the active reference four <div>
function hideActiveRecordReferenceFour()
{
    var el_active_reference_four = getDivElementActiveRecordReferenceFour();

    el_active_reference_four.style.display = 'none';

} // hideActiveRecordReferenceFour

// Shows the active reference four <div>
function displayActiveRecordReferenceFour()
{
    var el_active_reference_four = getDivElementActiveRecordReferenceFour();

    el_active_reference_four.style.display = 'block';

} // displayActiveRecordReferenceFour

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

