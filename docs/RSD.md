# Requirement Specification Document

## Problem Statement

> Write a few sentences that describes the problem you are trying to solve. In other words, justify why this software project is needed.

Choosing what courses to take for a coming semester and not knowing how to plan ahead for successful graduation can be stressful. The problem is further complicated by all kinds of restrictions on course scheduling, including considering different prerequisites and spring/fall offerings. Students need a personalized course planning system recommending which courses to take each semester that is tailored to his/her academic interests.


## Potential Clients
> Who are affected by this problem (and would benefit from the proposed solution)? I.e. the potential users of the software you are going to build.

Undergraduate students at Johns Hopkins University or newly enrolled students who are planning on completing a bachelor degree in computer science and want to explore various academic interests.

## Proposed Solution
> Write a few sentences that describes how a software solution will solve the problem described above.

A web-based application will be used to solve this problem. Our application takes inputs from users (e.g., major, year of study, courses already taken, areas of focus, expected graduation year) and aligns with the university’s graduation requirement and course offerings and information, and then it will use our built-in intelligence algorithm to find course schedules that fit best to the user's need and display each through a calendar view.

## Functional Requirements
> List the (functional) requirements that software needs to have in order to solve the problem stated above. It is useful to write the requirements in form of **User Stories** and group them into those that are essential (must have), and those which are non-essential (but nice to have).


### Must have
As a CS student, I want to specify my areas of focus/preference in my major, so that the relevant courses will be prioritized.
As a student, I want to input the courses I have taken so that the application knows my current progress.
As a student, I want to receive a schedule that fits into the school’s spring/fall course offerings, so that the schedule is correct and practical.
As a student, I want to receive a schedule that doesn’t contain time conflicts, so that I can directly use it as my plan.
As a student, I want to see multiple recommended schedules so that I get the flexibility to choose between them.
As a student, I want to view the recommended schedule broken into 8 semesters so that I understand the sequence to be followed.
As a student, I want to get my course recommendations displayed in calendar view to get better/more convenient user experience.
As a student, I want to view schedules planned out for different focus areas, so that I can compare, contrast and re-consider the focus area that fits me the most.
As a student, I want to see my progress in meeting the degree requirements, so that I know my current position in the entire plan.  

### Nice to have
As a student, I want to prioritize schedules with the greatest flexibility, so that I can safely graduate even if unexpected circumstances arise over my last semester.
As a student, I want to prioritize certain courses that I find particularly interesting in my final recommended schedules.
As a student who has taken many relevant courses, I want to get warnings on courses I might have missed inputting, so that my input is more accurate.
As a student, I want to see the degree requirements themselves in this application, so that I can be confident with the plans.
As a student, I want to log in/out of this application, so that I can save the previously input information.
As an admin, I want to monitor major graduation requirements, so that the software can modify schedules accordingly.
As an admin, I want to add/delete courses based on school offerings so that students can obtain correct schedules.  
As a student, I want to open a mode called "multiple major mode" so that I can get my recommendation if I decide to take the multiple major option.  
As a student, when getting course recommendations, I want to be able to rearrange/modify the recommended schedule in the application so that I can customize it based on my own preferences.  
As a student, I want to be able to import and extract course schedules as files so that I can easily share my schedule with my friends.

## Software Architecture
> Will this be a Web/desktop/mobile (all, or some other kind of) application? Would it conform to the Client-Server software architecture?

This will be a web application, and it would conform to the Client-Server software architecture. The client (student) sends his/her background information (major/minor, courses taken, focus areas) through the web interface (front end) to the server and the server sends responses (recommended course plans) to the client (student) based on information stored in the database (graduation requirement, course prerequisites, course availability and course history). 
