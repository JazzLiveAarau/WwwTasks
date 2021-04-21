// File: JazzTasksDisplayElements.js
// Date: 2021-04-20
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Element and identity functions for tasks display

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

// Hides the active reference one <div>
function hideActiveRecordRemark()
{
    var el_active_remark = getDivElementActiveRecordRemark();

    el_active_remark.style.display = 'none';

} // hideActiveRecordRemark

// Shows the active reference one <div>
function displayActiveRecordRemark()
{
    var el_active_remark = getDivElementActiveRecordRemark();

    el_active_remark.style.display = 'block';

} // displayActiveRecordRemark

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

// Returns the active record remind and due date <div> element
function getDivElementActiveRecordRemindDueDate()
{
    return document.getElementById(getIdDivElementActiveRecordRemindDueDate());

} // getDivElementActiveRecordRemindDueDate

//Returns the identity of the active record remind and due date <div> element
function getIdDivElementActiveRecordRemindDueDate()
{
    return 'id_active_record_remind_due_date';

} // getIdDivElementActiveRecordRemindDueDate

// Hides the active remind and due date <div>
function hideActiveRecordRemindDueDate()
{
    var el_active_remind_due_date = getDivElementActiveRecordRemindDueDate();

    el_active_remind_due_date.style.display = 'none';

} // hideActiveRecordRemindDueDate

// Shows the active remind and due date <div>
function displayActiveRecordRemindDueDate()
{
    var el_active_remind_due_date = getDivElementActiveRecordRemindDueDate();

    el_active_remind_due_date.style.display = 'block';

} // displayActiveRecordRemindDueDate

// Returns the active record responsibles <div> element
function getDivElementActiveRecordResponsibles()
{
    return document.getElementById(getIdDivElementActiveRecordResponsibles());

} // getDivElementActiveRecordResponsibles

//Returns the identity of the active record responsibles <div> element
function getIdDivElementActiveRecordResponsibles()
{
    return 'id_active_record_responsibles';

} // getIdDivElementActiveRecordResponsibles

// Returns the search task list <div> element
function getDivElementSearchTaskList()
{
    return document.getElementById(getIdDivElementSearchTaskList());

} // getDivElementSearchTaskList

//Returns the identity of the search task list <div> element
function getIdDivElementSearchTaskList()
{
    return 'id_search_task_list';

} // getIdDivElementSearchTaskList

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Element Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

