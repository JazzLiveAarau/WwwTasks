// File: JazzTasksSetControls.js
// Date: 2021-04-15
// Author: Gunnar Lidén

// Inhalt
// ======
//
// Functions setting the controls of the application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Get User Form Input ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Gets, checks and sets the input data from the record form (the controls)
// Returns false for not valid input data
function getUserInputFromFormSetActiveRecord()
{
    if (!getUserInputFromFormSetActiveRecordTitle()) return false;

    if (!getUserInputFromFormSetActiveRecordDescription()) return false;

    if (!getUserInputFromFormSetActiveRecordRemark()) return false;

    if (!getUserInputFromFormSetActiveRecordRemindDay()) return false;

    if (!getUserInputFromFormSetActiveRecordFinishDay()) return false;

    if (!getUserInputFromFormSetActiveRecordRefLink()) return false;

    if (!getUserInputFromFormSetActiveRecordRefDescription()) return false;

    if (!getUserInputFromFormSetActiveRecordLinkDoc()) return false;

    if (!getUserInputFromFormSetActiveRecordResponsible()) return false;

    if (!getUserInputFromFormSetActiveRecordDeputyName()) return false;

    return true;

} // getUserInputFromFormSetActiveRecord

// Gets, checks and sets the input form data for the title
function getUserInputFromFormSetActiveRecordTitle()
{
    var task_title = g_title_text_box.getValue();

    if (!JazzTask.checkJazzTaskTitle(task_title))
    {
        alert("Title error");

        return false;
    }

    g_record_active_task.setJazzTaskTitle(task_title);

    return true;

} // getUserInputFromFormSetActiveRecordTitle

// Gets, checks and sets the input form data for the description
function getUserInputFromFormSetActiveRecordDescription()
{
     var task_description = g_description_text_box.getValue();

    if (!JazzTask.checkJazzTaskDescription(task_description))
    {
        alert("Description error");

        return false;
    }
	
	g_record_active_task.setJazzTaskDescription(task_description);

    return true;

} // getUserInputFromFormSetActiveRecordDescription

// Gets, checks and sets the input form data for the responsible
function getUserInputFromFormSetActiveRecordResponsible()
{
     var task_responible = g_responsible_text_box.getValue();

    if (!JazzTask.checkJazzTaskResponsible(task_responible))
    {
        alert("Responsible error");

        return false;
    }
	
	g_record_active_task.setJazzTaskResponsible(task_responible);

    return true;

} // getUserInputFromFormSetActiveRecordResponsible

// Gets, checks and sets the input form data for the remark
function getUserInputFromFormSetActiveRecordRemark()
{
    var task_remark = g_remark_text_box.getValue();

    if (!JazzTask.checkJazzTaskRemark(task_remark))
    {
        alert("Remark error");

        return false;
    }

    g_record_active_task.setJazzTaskRemark(task_remark);

    return true;

} // getUserInputFromFormSetActiveRecordRemark

// Gets, checks and sets the input form data for the remind day
function getUserInputFromFormSetActiveRecordRemindDay()
{
    var remind_date_str = g_remind_date_text_box.getValue();

    var remind_month = getMonthFromIsoDateString(remind_date_str);

    var remind_day = getDayFromIsoDateString(remind_date_str);

    g_record_active_task.setJazzTaskRemindMonth(remind_month);

    g_record_active_task.setJazzTaskRemindDay(remind_day);

    return true;

} // getUserInputFromFormSetActiveRecordRemindDay

// Gets, checks and sets the input form data for the finish (due) day
function getUserInputFromFormSetActiveRecordFinishDay()
{
    var finish_date_str = g_due_date_text_box.getValue();

    var finish_month = getMonthFromIsoDateString(finish_date_str);

    var finish_day = getDayFromIsoDateString(finish_date_str);

    g_record_active_task.setJazzTaskFinishMonth(finish_month);

    g_record_active_task.setJazzTaskFinishDay(finish_day);

    return true;

} // getUserInputFromFormSetActiveRecordFinishDay

// Gets, checks and sets the input form data for the reference link
function getUserInputFromFormSetActiveRecordRefLink()
{
    var ref_link_str = g_ref_link_text_box.getValue();

    g_record_active_task.setJazzTaskRefLink(g_active_reference_number, ref_link_str);

    return true;

} // getUserInputFromFormSetActiveRecordRefLink

// Gets, checks and sets the input form data for the reference description
function getUserInputFromFormSetActiveRecordRefDescription()
{
    var ref_descr_str = g_ref_descr_text_box.getValue();

    g_record_active_task.setJazzTaskRefDescription(g_active_reference_number, ref_descr_str);

    return true;

} // getUserInputFromFormSetActiveRecordRefDescription

// Gets, checks and sets the input form data for the link DOC document
function getUserInputFromFormSetActiveRecordLinkDoc()
{
    var link_doc_str = g_doc_text_box.getValue();

    g_record_active_task.setJazzTaskLinkDoc(link_doc_str);

    return true;

} // getUserInputFromFormSetActiveRecordLinkDoc

// Gets, checks and sets the input form data for the link DOC document
function getUserInputFromFormSetActiveRecordLinkPdf()
{
    var link_pdf_str = g_pdf_text_box.getValue();

    g_record_active_task.setJazzTaskLinkPdf(link_pdf_str);

    return true;

} // getUserInputFromFormSetActiveRecordLinkPdf

// Gets, checks and sets the input form data for the deputy name
function getUserInputFromFormSetActiveRecordDeputyName()
{
    var deputy_name = g_deputy_name_text_box.getValue();

    g_record_active_task.setJazzTaskDeputyByNumber(g_active_deputy_number, deputy_name);

    return true;

} // getUserInputFromFormSetActiveRecordDeputyName	

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Get User Form Input /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Control Values ////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set all control values with data from the input active record 
function setControlValues()
{
    var task_reg_number = g_record_active_task.getJazzTaskRegNumber();

    g_reg_number_text_box.setValue(task_reg_number);

    var task_title = g_record_active_task.getJazzTaskTitle();

    g_title_text_box.setValue(task_title);

    var task_description = g_record_active_task.getJazzTaskDescription();

    g_description_text_box.setValue(task_description);

    var task_responsible = g_record_active_task.getJazzTaskResponsible();

    g_responsible_text_box.setValue(task_responsible);   

    var task_remark = g_record_active_task.getJazzTaskRemark();

    g_remark_text_box.setValue(task_remark);

    var task_doc = g_record_active_task.getJazzTaskLinkDoc();

    g_doc_text_box.setValue(task_doc);

    var task_pdf = g_record_active_task.getJazzTaskLinkPdf();

    g_pdf_text_box.setValue(task_pdf);

    var remind_day = g_record_active_task.getJazzTaskRemindDay();

    var remind_month = g_record_active_task.getJazzTaskRemindMonth();

    var date_remind_str = getRemindFinishDateWithYear(remind_month, remind_day);

    g_remind_date_text_box.setValue(date_remind_str);

    var finish_day = g_record_active_task.getJazzTaskFinishDay();

    var finish_month = g_record_active_task.getJazzTaskFinishMonth();

    var date_finish_str = getRemindFinishDateWithYear(finish_month, finish_day);

    g_due_date_text_box.setValue(date_finish_str);
	
    var ref_link_str = g_record_active_task.getJazzTaskRefLink(g_active_reference_number);

    g_ref_link_text_box.setValue(ref_link_str);

    var ref_descr_str = g_record_active_task.getJazzTaskRefDescription(g_active_reference_number);

    g_ref_descr_text_box.setValue(ref_descr_str);

    var deputy_name = g_record_active_task.getJazzTaskDeputyByNumber(g_active_deputy_number);

    g_deputy_name_text_box.setValue(deputy_name);

} // setControlValues

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Control Values //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////