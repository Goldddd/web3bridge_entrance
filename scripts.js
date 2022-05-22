let leaderboard = [];
let participants = [];

let submissionForm = document.getElementById("submissionForm");

submissionForm.addEventListener("submit", function (e) {
	e.preventDefault();

	try {
		let name = submissionForm.name.value;
		let id = submissionForm.id.value;
		let steps = Number(submissionForm.steps.value);
		let iteration = Number(submissionForm.iteration.value);

		let participant = getParticipant(id);
		if (!participant) {
			const newParticipant = {
				name,
				id,
				currentSteps: steps,
				currentIteration: iteration,
			};

			if (participants.length < 20) {
				participants.push(newParticipant);
			} else {
				setTimeout(
					showErrorMessage("Maximum number of participants reached"),
					3000
				);
			}

			// updateParticipant(participant);
		} else {
			let currentSteps = participant.currentSteps;
			// let totalSteps = (participant.currentSteps += steps);

			if (iteration <= participant.currentIteration) {
				setTimeout(showErrorMessage("Invalid Iteraction Selected"), 3000);
			} else if (iteration > participant.currentIteration + 2) {
				setTimeout(showErrorMessage("Invalid Iteration Selected"), 3000);
			} else {
				// validate new iteration step
				let lowerlimit = participant.currentSteps * 2;
				let upperlimit = participant.currentSteps * 3;

				if (steps < lowerlimit && steps > upperlimit) {
					setTimeout(showErrorMessage("Invalid Step Value"), 3000);
				} else {
					participant.currentIteration + 1;
				}
				participant.currentSteps += steps;
			}
		}
		updateLeaderBoard();
		updateParticipants();
	} catch (e) {
		setTimeout(showErrorMessage(e), 3000);
	}
});

function getParticipant(id) {
	let participant;

	console.log(participants);
	participants.forEach((pt) => {
		if (pt.id === id) {
			participant = pt;
		}
	});

	return participant;
}
function updateParticipant(participant) {
	participants = participants.map((pt) => {
		if (pt.id == participant.id) {
			pt.currentSteps = participant.currentSteps;
			pt.currentIteration = participant.currentIteration;
		}
	});
}
function updateLeaderBoard() {
	leaderboard = participants.sort(function (a, b) {
		return b.currentSteps - a.currentSteps;
	});

	let records = "";

	for (let i = 0; i < leaderboard.length; i++) {
		if (i < 10) {
			console.log(leaderboard[i]);
			let row = `
				<tr>
					<td>${i + 1}</td>
					<td>${leaderboard[i].id}</td>
					<td>${leaderboard[i].name}</td>
					<td>${leaderboard[i].currentSteps}</td>
				</tr>
				`;
			records += row;
		}
	}

	document.getElementById("leaderboardList").innerHTML = records;
}
function updateParticipants() {
	let participantsList = participants.sort(function (a, b) {
		return b.id - a.id;
	});

	let records = "";

	for (let i = 0; i < participantsList.length; i++) {
		if (i < 10) {
			let row = `
				<tr>
					<td>${participantsList[i].id}</td>
					<td>${participantsList[i].name}</td>
					<td>${participantsList[i].currentSteps}</td>
					<td>${participantsList[i].currentIteration}</td>
				</tr>
				`;
			records += row;
		}
	}

	document.getElementById("participantsList").innerHTML = records;
}

function showErrorMessage(message) {
	document.getElementById("errorMessage").innerHTML = message;
	document.getElementById("errorMessageDiv").style.display = "block";
}
