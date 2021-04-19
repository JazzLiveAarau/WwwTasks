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

    g_display_number = 42;

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

