import React, { useState } from 'react';
import { STUDENTS } from '../studentsList'
import Error from './Error';
import ResidentsList from './ResidentsList';


function checkDateValidity(joiningDate, validityDate) {
	var joiningDate = Date.parse(joiningDate);
	var validityDate = Date.parse(validityDate);
	return (joiningDate > validityDate) ? false : true;
}

function getNameIfPresent(name) {
	let studentPresent = STUDENTS.find((student => student.name.toLowerCase() === name.toLowerCase()));
	return studentPresent;
}

function Search() {
	const [studentName, setStudentName] = useState('');
	const [joiningDate, setJoiningDate] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [residentList, setResidentList] = useState([]);

	const addStudent = () => {
		const student  = getNameIfPresent(studentName);
		if (!student) {
			setErrorMessage(`Sorry, ${studentName} is not a verified student!`);
		}
		else if (!checkDateValidity(joiningDate,student.validityDate)) {
			setErrorMessage(`Sorry, ${studentName}'s validity has Expired!`);
		}
		else {
			setResidentList([...residentList, studentName]);
			setStudentName('');
			setJoiningDate('');
			setErrorMessage('');
		}
	}
	return (
		<div className="layout-column justify-content-center align-items-center w-50 mx-auto">
			<div className="my-50 layout-row align-items-end justify-content-end">

				<label htmlFor="studentName">Student Name:
					<div>
						<input id="studentName" data-testid="studentName" value={studentName}
						 onChange={e => { setStudentName(e.target.value) }} type="text" className="mr-30 mt-10" />
					</div>
				</label>
				<label htmlFor="joiningDate">Joining Date:
					<div>
						<input id="joiningDate" data-testid="joiningDate" value={joiningDate}
						onChange={e => { setJoiningDate(e.target.value) }} type="date" className="mr-30 mt-10" />
					</div>
				</label>
				<button type="button" onClick={() => { addStudent() }} data-testid="addBtn" className="small mb-0">Add</button>

			</div>
			{errorMessage ? <Error  msg={errorMessage}/> : ''}
			<ResidentsList residentList={residentList}/>
		</div>


	);
}

export default Search;
