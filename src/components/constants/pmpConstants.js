const pmpConstants = (code) => {

  switch(code) {

    case 'processCounts':
      return([6,5,6,3,3,4,5,6,4]);
      break;

    case 'ProcessIndex':
      return ([0,6,11,17,20,23,27,32,38]);
      break;

    case 'processColour':
      return(['LightPink','LightPink','Gold','Bisque','Gold','Khaki','Gold','LightPink','LightPink','Bisque','SpringGreen','LightPink','LightPink','LightPink','LightPink','Gold','SpringGreen','LightPink','Gold','SpringGreen','LightPink','Gold','Gold','LightPink','Gold','Gold','Gold','Gold','LightPink','Gold','Gold','Bisque','LightPink','Gold','Gold','Gold','LightPink','Bisque','LightPink','Gold','Gold','Khaki']);
      break;

    case 'ProcessInput':
      return([[0,1,2,3,4],[3,4,5,6],[3,4,7,8],[3,4,7,9],[3,4,7,10,11],[4,7,12],[5,19],[5,6,20],[4,20,22],[7,20,23,24],[4,7,10,20,23],[3,4,27],[4,22,29,30,31],[3,4,29,30,32],[3,4,22,29,30,32,33],[3,4,22,29,30,32,33,34,35],[4,7,10,36],[3,4,27,36,40,41],[2,4,27,32,36,42],[4,7,10,43],[3,4,19,27,38,41,44],[7,10,46,47],[4,7,8,13,28,46,48],[3,4,33],[3,4,7],[7,32,53],[4,7,9,53,54],[3,4,5,56],[3,4,19,57],[4,7,9],[4,7,19,57,58,59],[4,7,10,28,45],[3,4,22,61,62,63],[3,4,19,27,35,42,49,62,63,64,65],[4,22,41,64],[4,41,62,63,64],[41,64],[7,9,10,41],[3,4,20,27,33,36,41,42,44,67,68],[4,7,56,65,68,69,70,71,72],[2,7,8,9,10,56],[7,77]]);
      break;

    case 'ProcessOutput':
      return([[5],[7],[10,11,13,14,15],[10,14,15],[14,15,16],[17,18],[20,21,23],[15,22],[15,25,26,27],[11,12,15],[11,14,15,18,28],[29,30,31],[15,34],[15,33,37],[15,35],[36,38,39],[11,14,15,18,28],[15,42,43,44],[15,43,44],[11,14,15,18,28,45],[15,46,48,49,50],[11,14,15,18],[11,14,15,18,24,47,51],[40],[14,32,53],[54,55],[11,14,18,55],[19,57],[15,61],[18],[11,14,15,18],[9,11,18],[21],[41],[66],[66],[14,15,66,67],[11,14,15,18,66],[11,69,72,73,74,77],[11,14,15,32,75,76],[11,14,18,77],[4,78]]);
      break;

    case 'ProcessTools':
      return([[0],[0],[0,1],[0,2],[0],[0],[3,4,5,6,7,8,9,10],[0,5,11,12],[13],[14],[15],[0,13,16,17],[18,19,20,21],[0,12,22,23,24],[0,25,26,27,28],[20,29,30,31,32,33,34,35],[15,24,32,33,34,35,36,37],[0,23,25,26,27,28,39,40],[0,28,41,42,43],[15,24,36,44,45,46],[38,47,48,49,50,51,52,53,54],[55,56,57],[14,48,51,52,58,59,60,61,62,63],[64,65,66],[67,68,69,70],[71,72,73,74,75,76],[71,77,78,79,80],[0,81],[82,83,84,85],[85,86],[71,85,87],[15,45,85,88],[0,89,90,91],[94,95,96,97,98],[0,99,100,101,102,103],[92,93],[0,104,105,106],[28,107,108,109,110,111],[0,112,113],[0,114,115,116,117,118,119],[120,121,122,123,124,125,126],[126,127,128]]);

    case 'InputByProcess':
      return([[0],[0],[0,18,40],[0,1,2,3,4,11,13,14,15,17,20,23,24,27,28,32,33,38],[0,1,2,3,4,5,8,10,11,12,13,14,15,16,17,18,19,20,22,23,24,26,27,28,29,30,31,32,33,34,35,38,39],[1,6,7,27],[1,7],[2,3,4,5,9,10,16,19,21,22,24,25,26,29,30,31,37,39,40,41],[2,22,40],[3,26,29,37,40],[4,10,16,19,21,31,37,40],[4],[5],[22],[],[],[],[],[],[6,20,28,30,33],[7,8,9,10,38],[],[8,12,14,15,32,34],[9,10],[9],[],[],[11,17,18,20,33,38],[22,31],[12,13,14,15],[12,13,14,15],[12],[13,14,15,18,25],[14,15,23,38],[15],[15,33],[16,17,18,38],[],[20],[],[17],[17,20,34,35,36,37,38],[18,33,38],[19],[20,38],[31],[21,22],[21],[22],[33],[],[],[],[25,26],[26],[],[27,39,40],[28,30],[30],[30],[],[32],[32,33,35],[32,33,35],[33,34,35,36],[33,39],[],[38],[38,39],[39],[39],[39],[39],[],[],[],[],[41],[]]);

    case 'OutputByProcess':
      return([[],[],[],[],[41],[0],[],[1],[],[31],[2,3],[2,9,10,16,19,21,22,26,30,31,37,38,39,40],[9],[2],[2,3,4,10,16,19,21,22,24,26,30,36,37,39,40],[2,3,4,7,8,9,10,12,13,14,16,17,18,19,20,21,22,28,30,36,37,39],[4],[5],[5,10,16,19,21,22,26,29,30,31,37,40],[27],[6],[6,32],[7],[6],[22],[8],[8],[8],[10,16,19],[11],[11],[11],[24,39],[13],[12],[14],[15],[13],[15],[15],[23],[33],[17],[17,18],[17,18],[19],[20],[22],[20],[20],[20],[22],[],[24],[25],[25,26],[],[27],[],[],[],[28],[],[],[],[],[34,35,36,37],[36],[],[38],[],[],[38],[38],[38],[39],[39],[38,40],[41]]);

    case 'ProcessArray':
      return(['Develop Project Charter','Develop Project Management Plan','Direct and Manage Project Execution','Monitor and Control Project Work','Perform Integrated Change Control','Close Project or Phase','Collect Requirements','Define Scope','Create WBS','Verfiy Scope','Control Scope','Define Activities','Sequence Activities','Estimate Activity Resources','Estimate Activity Durations','Develop Schedule','Control Schedule','Estimate Cost','Determine Budget','Control Costs','Plan Quality','Perform Quality Assurance','Perform Quality Control','Develop Human Resource Plan','Acquire Project Team','Develop Project Team','Manage Project Team','Identify Stakeholders','Plan Communications','Distribute Information','Manage Stakeholder Expectations','Report Performance','Plan Risk Management','Identify Risk','Perform Qualitative Risk Analysis','Perform Quantitative Risk Analysis','Plan Risk Response','Monitor and Control Risks','Plan Procurements','Conduct Procurements','Administer Procurements','Close Procurements']);
      break;

    case 'IONameList':
      return(['Project statement of work','Business case','Contract','Enterprise environmental factors','Organizational process assets','Project Charter','Outputs from planning processes','Project Management Plan','Approved change requests','Performance reports','Work performance information','Change requests','Accepted deliverables','Deliverables','Project Management Plan updates','Project document updates','Change request status updates','Final product, service or result transition','Organizational process assets updates','Stakeholder register','Requirements documentation','Requirements management plan','Project scope statement','Requirements traceability matrix','Validated deliverables','WBS','WBS Dictionary','Scope baseline','Work performance measurements','Activiy list','Activity Attributes','Milestone list','Resouce calendars','Activity resource requirements','Project schedule network diagrams','Activity duration estimates','Project schedule','Resouce breakdown structure','Schedule baseline','Schedule data','Human resource plan','Risk register','Activity cost estimates','Project funding requirements','Cost performance baseline','Budget forecasts','Quality metrics','Quality control measurements','Quality checklists','Quality management plan','Process improvement plan','Validated changes','Basis of estimates','Project staff assignments','Team performance assessments','Enterprise environmental factors updates','Procurement documents','Stakeholder management register','Issue log','Change log','Stakeholder management strategy','Communication management plan','Cost management plan','Schedule management plan','Risk management plan','Project documents','Risk register updates','Risk related contract decisions','Teaming agreements','Source selection criteria','Qualified seller list','Seller proposals','Make-or-buy decisions','Procurement management plan','Procurement statements of work','Selected sellers','Procurement contract award','Procurement documentation','Closed procurements']);
      break;

    case 'ToolsNameList':
      return(['Expert judgement','Project management information system','Change control meetings','Interviews','Focus groups','Facilitated workshops','Group creativity techniques','Group discussion making techniques','Questionaires and surveys','Observations','Prototypes','Product analysis','Alternatives identification','Decomposition','Inspection','Variance analysis','Rolling wave planning','Templates','Precedence diagramming method','Dependency determination','Applyling leads and lags','Schedule network templates','Published estimating data','Bottom-up estimating','Project management software','Analogous estimating','Parametric estimating','Three-point estimating','Reserve analysis','Schedule network analysis','Critical path method','Critical chain method','Resource leveling','What-if scenario analysis','Schedule compression','Scheduling tool','Performance reviews','Adjusting leads and lags','Cost of quality','Project manamgement estimating software','Vendor bid analysis','Cost aggregation','Historical relationships','Funding limit reconciliation','Earned value management','Forecasting','To-complete performance index','Cost-benefit analysis','Control charts','Benchmarking','Design of experiments','Statistical sampling','Flowcharting','Proprietary quality management methodologies','Additional quality planning tools','Plan quality and perform quality control tools and techniques','Quality audits','Process analysis','Cause and effect diagrams','Histogram','Pareto chart','Run chart','Scatter diagram','Approved change requests review','Organization charts and position descriptions','Networking','Organizational theory','Pre-assignment','Negotiation','Acquisition','Virtual teams','Interpersonal skills','Training','Team-building activities','Ground rules','Co-location','Recognition and rewards','Observation and coversation','Project performance appraisals','Conflict management','Issue log','Stakeholder analysis','Communication requirements analysis','Communication technology','Communication models','Communication methods','Information distribution tools','Management skills','Reporting systems','Data gathering and representation techniques','Planning meeting sand analysis','Quantitative risk analysis and modeling techniques','Documentation reviews','Information gathering techniques','Checklist analysis','Assumption analysis','Diagramming Techniques','SWOT analysis','Expert judgement','Risk probability and impact assessment','Probability and impact matrix','Risk data quality assessment','Risk categorization','Risk urgency assessment','Strategies for negative risks or threats','Strategies for positive risks and oppurtunities','Contingent response strategies','Risk reassessment','Risk audits','Variance and trend analysis','Technical performance measurement','Status meeting','Make-or-buy analysis','Contract types','Bidder conferences','Proposal evaluation techniques','Independent estimates','Advertising','Internet search','Procurement negotiations','Contract change control system','Procurement performance reviews','Inspections and audits','Performance reporting','Payment systems','Claims administration','Records management system','Procurement audits','Negotiated settlements']);
      break;

    case 'IODescriptions':
      return(["Statement of Work (SOW) is a narrative description of products, services, or results to be supplied as the outcome of the project.","Business case provides the necessary information from a business standpoint to determine whether or not a project is worth the required investment.","A contract is a mutual binding agreement that obligates the seller to provide the specified product or service or result and obligates the buyer to pay for it.","Any or all external environment factors and internal organizational environmental factors that surround or influence the project success. These factors are from any or all of the enterprises involved in the project, and include organizational culture and structure, infrastructure, existing resources, commercial databases, market conditions, and project management software.","Any or all process related assets, from any or all of the organizations involved in the project that are or can be used to influence the project's success. These process assets include formal and informal plans, policies, procedures, and guidelines.","A document issued by the project initiator or sponsor that formally authorizes the existence of a project, and provides the project manager with the authority to apply organizational resources to project activities","See outputs for processes involved in various planning activities.","A formal, approved document that defines how the project is executed, monitored and controlled. It may be a summary or detailed and may be composed of one or more subsidiary management plans and other planning documents","A change request that has been processed through the integrated change control process and approved","Documents and presentations that provide organized and summarized work performance information, earned value management parameters and calculations, and analysis of project work progress and status","Information and data, on the status of the project schedule activities being performed to accompalish the project work, collected as part of the direct and manage project execution process.","Requests to expand or reduce the project scope, modify policies, processes, plans, or procedures, modify costs or budget, or revise schedule","Deliverables accepted and signed off by the project stakeholders","Any unique or verified product, result, or capability to perform a service that must be produced to complete a process, phase or a project.","Updates to the Project management plan from various process groups and stages in the project lifecycle","Updates to project documents from various process groups and stages in the project lifecycle","Updates to change request status document from various process groups and stages in the project lifecycle","End product of the phase, project or program","Updates to various organizational process assets","Register that maintains details about persons and organizations such as customers, sponsors, performing organization and the public, that are actively involved in the project, or whose interests may be positively or negatively affected by execution or completion of the project.","A condition or capability that must be met or possessed by a system, product, service, result, or component to satisfy a contract, standard, specification, or other formally imposed documents. Requirements include the quantified and documented needs, wants, and expectations of the sponsor, customer, and other stakeholders","Document that lists out the plan to gather, maintain and manage the requirements from various stakeholders","The narrative description of the project scope, including major deliverables, project objectives, project assumptions, project constraints, and a statement of work, that provides a documented basis for making future project decisions and for confirming or developing a common understanding of project scope among the stakeholders. The definition of the project scope – what needs to be accomplished.","A table that links requirements to their origin and traces them throughout the project life cycle","Any unique or verified product, result, or capability to perform a service that must be produced to complete a process, phase or a project.","A deliverable-oriented hierarchical decomposition of the work to be executed by the project team to accomplish the project objectives and create the required deliverables. It organizes and defines the total scope of the project. Each descending level represents an increasingly detailed definition of the project work","A document that describes each component in the work breakdown structure (WBS). For each WBS component, the WBS dictionary includes a brief definition of the scope or statement of work, defined deliverable(s), a list of associated activities, and a list of milestones.","The approved time phased plan (for a project, a work breakdown structure component, a work package, or a schedule activity), plus or minus approved project scope, cost, schedule, and technical changes. Generally refers to the current baseline, but may refer to the original or some other baseline. Usually used with a modifier (e.g., cost baseline, schedule baseline, performance measurement baseline, technical baseline).","Work performance information is used to generate project activity metrics to evaluate actual progress compared to planned progress. These are called work performance measurements","A documented tabulation of schedule activities that shows the activity description, activity identifier, and a sufficiently detailed scope of work description so project team members understand what work is to be performed.","Multiple attributes associated with each schedule activity that can be included within the activity list. Activity attributes include activity codes, predecessor activities, successor activities, logical relationships, leads and lags, resource requirements, imposed dates, constraints, and assumptions.","A list of significant point or event in the project.","A calendar of working days and nonworking days that determines those dates on which each specific resource is idle or can be active. Typically defines resource specific holidays and resource availability periods","The process of estimating the types and quantities of resources required to perform each schedule activity","Any schematic display of the logical relationships among the project schedule activities. Always drawn from left to right to reflect project work chronology.","The process of estimating the number of work periods that will be needed to complete individual schedule activities","The planned dates for performing schedule activities and the planned dates for meeting schedule milestones","A hierarchical structure of resources by resource category and resource type used in resource leveling schedules and to develop resource limited schedules, and which may be used to identify and analyze project human resource assignments","The approved time phased plan (for a project, a work breakdown structure component, a work package, or a schedule activity), plus or minus approved project scope, cost, schedule, and technical changes. Generally refers to the current baseline, but may refer to the original or some other baseline. Usually used with a modifier (e.g., cost baseline, schedule baseline, performance measurement baseline, technical baseline).","The planned dates for performing schedule activities and the planned dates for meeting schedule milestones","The process of identifying and documenting project roles, responsibilities and reporting relationships, as well as creating the staffing management plan","The document containing the results of the qualitative risk analysis, quantitative risk analysis, and risk response planning. The risk register details all identified risks, including description, category, cause, probability of occurring, impact(s) on objectives, proposed responses, owners, and current status. The risk register is a component of the project management plan","The process of estimating the cost that will be incured to complete individual schedule activities","The funding needs of the project.","A measure of cost efficiency on a project. It is the ratio of earned value (EV) to actual costs (AC). CPI = EV divided by AC. A value equal to or greater than one indicates a favorable condition and a value less than one indicates an unfavorable condition.","Estimates or predictions of conditions and events in the project’s future based on information and knowledge available at the time of the forecast. Forecasts are updated and reissued based on work performance information provided as the project is executed.","A quality metric is an operational definition that describes, in very specific terms, a project or product attribute and how the quality control process will measure it.","Quality control measurements are the results of quality control activities. They are used to analyze and evaluate the quality standards and processes of the performing organization","Items listed together for convenience of comparison, or to ensure the actions associated with them are managed appropriately and not forgotten. An example is a list of items to be inspected that is created during quality planning and applied during quality control","The quality management plan describes how the project management team will implement the performing organization’s quality policy. The quality management plan is a component or a subsidiary plan of the project management plan. The quality management plan may be formal or informal, highly detailed, or broadly framed, based on the requirements of the project.","The process improvement plan is a subsidiary of the project management plan. It details the steps for analyzing processes to identify activities which enhance their value.","Any change or repaired items are inspected and will be either accepted or rejected before notification of the decision is provided. Rejected items may require rework","The supporting details for estimation.","The project is staffed when appropriate people have been assigned. The documentation of these assignments can include a project team directory, memos to team members, and names inserted into other parts of the project management plan.","Assessment of team members performance in the assigned project","Updates to Enterprise environmental factors","Those documents utilized in bid and proposal activities, which include buyer’s Invitation for Bid, Invitation for Negotiations, Request for Information, Request for Quotation, Request for Proposal and seller’s responses.","Register that maintains details about persons and organizations such as customers, sponsors, performing organization and the public, that are actively involved in the project, or whose interests may be positively or negatively affected by execution or completion of the project.","A document used to record and describe or denote selected items identified during execution of a process or activity. Usually used with a modifier, such as issue, quality control, action, or defect","A document used to record and describe or denote changes to selected items identified during execution of a process or activity.","The process of managing communications to satisfy the requirements of, and resolve issues with, project stakeholders","The document that describes: the communications needs and expectations for the project; how and in what format information will be communicated; when and where each communication will be made; and who is responsible for providing each type of communication.","The document that sets out the format and establishes the activities and criteria for planning, structuring, and controlling the project costs. A cost management plan can be formal or informal, highly detailed or broadly framed, based on the requirements of the project stakeholders.","The document that establishes criteria and the activities for developing and controlling the project schedule. It is contained in, or is a subsidiary plan of, the project management plan. The schedule management plan may be formal or informal, highly detailed or broadly framed, based on the needs of the project.","The document describing how project risk management will be structured and performed on the project. It is contained in or is a subsidiary plan of the project management plan. The risk management plan can be informal and broadly framed, or formal and highly detailed, based on the needs of the project.","Any document related to or managed within the project","Updates to Risk register","Decisions taken in the contracting process based on the associated risks","Teaming agreements are legal contractual agreements between two or more entities to form a partnership or joint venture or some other arrangement as defined by the parties.","Source selection criteria can include information on the supplier's required capabilities, capacity, delivery dates, product cost, life-cycle cost, technical expertise, and the approach to the contract","A listing of sellers who have been pre-screened for their qualifications and past experience, so that procurements are directed to only those sellers who can perform on any resulting contracts","Seller proposals prepared in response to a procurement document package from the basic set of information that will be used by an evaluation body to select one or more successful bidders","Make or buy decisions document the conclusions reached regarding what project products, services, or results will be acquired from outside the project organization, or will be performed internally by the project team.","The document that describes how procurement processes from developing procurement documentation through contract closure will be managed.","The SOW for each procurement is developed from the project scope baseline and defines only that portion of the project scope that is to be included within the related contract.","The selected sellers are those sellers who have been judged to be in a competitive range based upon the outcome of the proposal or bid evaluation","A procurement contract is awarded to each selected seller","Procurement documentation includes but is not limited to the procurement contract with all supporting schedules, requested unapproved contract changes,and approved change requests.","The buyer, usually through its authorized procurement administrator, provides the seller with formal written notice that the contract has been completed."]);
      break;

  }

}

export default pmpConstants;
