document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.getElementById('time');
    const patientInfo = document.querySelector('.patient-info');
    const vitals = document.querySelector('.vitals');

    function updateTime() {
        const now = new Date();
        timeElement.textContent = 'Time: ' + now.toLocaleTimeString();
    }

    setInterval(updateTime, 1000);
    updateTime();

    const powerButton = document.getElementById('powerButton');
    let isPowerOn = false;

    powerButton.addEventListener('click', function() {
        isPowerOn = !isPowerOn;
        powerButton.textContent = isPowerOn ? 'Power On' : 'Power Off';
        powerButton.style.backgroundColor = isPowerOn ? 'green' : 'red';

        if (isPowerOn) {
            const selectedPatient = JSON.parse(localStorage.getItem('selectedPatient'));
            if (selectedPatient) {
                patientInfo.innerHTML = `
                    <h2>Patient Info:</h2>
                    <p>Name: ${selectedPatient.name}</p>
                    <p>Gender: ${selectedPatient.gender}</p>
                    <p>Age: ${selectedPatient.age}</p>
                    <p>Prescription: ${selectedPatient.prescription || 'N/A'}</p>
                    <p>Incident: ${selectedPatient.incident || 'N/A'}</p>
                `;
                vitals.innerHTML = `
                    <h2>Vitals:</h2>
                    <p>Heart Rate: ${selectedPatient.heartRate || 'N/A'}</p>
                    <p>Blood Pressure: ${selectedPatient.bloodPressure || 'N/A'}</p>
                    <p>SP02: ${selectedPatient.sp02 || 'N/A'}</p>
                    ${selectedPatient.respiration ? `<p>Respiration: ${selectedPatient.respiration}</p>` : ''}
                    <p>Body Temp: ${selectedPatient.bodyTemp || 'N/A'}</p>
                `;
            } else {
                alert('No patient selected. Please select a patient from the list.');
            }
        } else {
            patientInfo.innerHTML = '';
            vitals.innerHTML = '';
        }
    });
});






