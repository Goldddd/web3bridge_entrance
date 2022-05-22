let leaderboard = [];
let participants = [];

let submissionForm = document.getElementById("submissionForm");

submissionForm.addEventListener("submit", function (e) {
	e.preventDefault();

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
			// throw error
		}
		updateLeaderBoard();
	} else {
		let currentSteps = participant.currentSteps;
		// let totalSteps = (participant.currentSteps += steps);

		if (iteration <= participant.currentIteration) {
			// throw error
		} else if (iteration > participant.currentIteration + 2) {
			// throw error;
		} else {
			// validate new iteration step
			let lowerlimit = participant.currentSteps * 2;
			let upperlimit = participant.currentSteps * 3;

			if (steps < lowerlimit && steps > upperlimit) {
				// throw error
			} else {
				participant.currentIteration + 1;
			}
			participant.currentSteps += steps;
		}


		updateParticipant(participant);
		updateLeaderBoard();
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

	console.log(leaderboard);

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
					<td>${i + 1}</td>
					<td>${participantsList[i].id}</td>
					<td>${participantsList[i].name}</td>
					<td>${participantsList[i].currentSteps}</td>
					<td>${participantsList[i].currentIteration}</td>
				</tr>
				`;
			records += row;
		}
	}

	console.log(records);

	document.getElementById("participantsListList").innerHTML = records;
}
