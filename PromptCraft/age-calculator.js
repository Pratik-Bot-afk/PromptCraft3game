function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    const ageResult = document.getElementById('ageResult');

    if (!dobInput) {
        ageResult.innerText = 'Please enter a valid date of birth.';
        return;
    }

    const dob = new Date(dobInput);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    ageResult.innerText = `Your age is ${age} years.`;
}
