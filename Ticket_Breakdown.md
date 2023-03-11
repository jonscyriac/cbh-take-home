# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Create feature for optionally setting aliend of an Agent.
    ##### Implementation:
    1. modify schema of Agents table
        - add alienId: NULLABLE, VARCHAR, UNIQUE (sparse)
    2. Create an api endpoint to set the alienId of an agent in agent table with signature `setAgentAlienId(agentId, alienId)`

    ##### Acceptance CRIETRIA:
    1. api should validate the alienId given
        - to be unique to an agent
        - doesnt include special characters or spaces
    2. unit tests on BE api. cases to include but not limited to:
        - invalid alienId with space/special chars
        - duplicate alienId
    3. the web page must show validation errors from BE API on the form.
    
    ##### Estimation:
    - BE API:
        - 4 hours for api development
        - 2 hours for test cases
    - FE:
        - 3 hours for form creation
        - 2 hours for api integration
        - 2 hours for test cases (if any)

2. Modify getShiftsByFacility(facilityId)
    ##### Implementation:
    1. add join on Agents table to attach alienId to shift's agent metadata. The join will be on Shifts.agentId = Agents.id. 
    2. Show alienId of agent in Web page if present. if not, display NA

    ##### Acceptance CRIETRIA:
    1. getShiftsByFacility should return Agent.alienId if alienId is present for an agent.
    2. unit tests on BE api. cases to include but not limited to:
        - get shifts for agents with alienId
        - get shifts for agents without alienId
    
    ##### Estimation:
    - BE API:
        - 4 hours for api development
        - 2 hours for test cases
    - FE:
        - 1 hour for result page modification
        - 1 hour for test cases (if any)

3. Modify generateReport(shiftIds?, alienId?)
    ##### Implementation:
    1. generateReport can take an optional param "alienId" OR just alienId.
        - atleast one argument should be mentioned.
        - if only shiftIds are mentioned, generate report as it is done now
        - if only alienIds are specified, generate report using joins on Agent.id = Shifts.agentId
        - if both shiftIds and agentIds are specified, filter out shifts with alienId. something like:
            ```
            select * from shifts s where id in SHIFT_IDS JOIN Agents ON a.id = s.agentId and a.alienId in ALIEN_IDS
            ```
    2. Web page mofication to pass in alienId as additional filter to get report.

    ##### Acceptance CRIETRIA:
    1. alienId filter must be applied on generateReport api.
    2. unit tests on BE api. cases to include but not limited to:
        - call with just aliendIds
        - call with just shiftIds
        - call with both shiftIds and alienIds
        - call with neither shiftIds, alienIds
    3. Web page must throw validation error if no filters are given to generate Report
    
    ##### Estimation:
    - BE API:
        - 5 hours for api development
        - 2 hours for test cases
    - FE:
        - 1 hour for form modification
        - 2 hour for test cases (if any)
