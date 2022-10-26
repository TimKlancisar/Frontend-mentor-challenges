const currentDate = new Date();
const constants = {
    inputs: {
        ...document.querySelectorAll('.form__input')
    },
    warnings: {
        ...document.querySelectorAll('.form__warning')
    },
    display: {
        cname: document.getElementById('display-name'),
        cnumber: document.getElementById('display-number'),
        expMonth: document.getElementById('display-month'),
        expYear: document.getElementById('display-year'),
        cvc: document.getElementById('display-cvc')
    },
    defaultValues: {
        cnumber: '0000 0000 0000 0000',
        expDate: '00',
        cvc: '000',
    }
}
const listeners = () => {
    Object.values(constants.inputs).forEach(query => {
        query.addEventListener('keyup', (e) => processInput(e));
    });
};
const processInput = (input) => {    
    const input_value = input.target.value;
    const changeText = (text) => constants.display[input.target.id].innerText = text;
    switch (input.target.id) {
        case 'cname':
            changeText(input_value);
            break;
        case 'cnumber':
            let tempNum = input_value.split(' ').join('').slice(0, 16);
            input.target.value = tempNum !== '' ? tempNum.match(/.{1,4}/g).join(' ') : '';
            tempNum = tempNum !== '' ? tempNum + '0000000000000000' : '0000000000000000';
            tempNum = tempNum.slice(0, 16);
            changeText(tempNum.match(/.{1,4}/g).join(' '));
            break;
        case 'expMonth':
            const mNumber = input_value.length === 1 ? `0${input_value}` : input_value.length === 0 ? constants.defaultValues.expDate : input_value
            changeText(mNumber);
            break;
        case 'expYear':
            const yNumber = input_value.length === 1 ? `0${input_value}` : input_value.length === 0 ? constants.defaultValues.expDate : input_value
            changeText(yNumber);
            break;
        case 'cvc':
            const cvcNumber = input_value.length === 2 ? `0${input_value}` : input_value.length === 1 ? `00${input_value}` : input_value.length === 0 ? constants.defaultValues.cvc : input_value
            changeText(cvcNumber);
            break;
        default:
            console.log('Something went wrong');
    }    
};
const finalCheck = (e) => {
    const form = document.getElementById('form');
    const success = document.getElementById('success');
    e.preventDefault(form);    
    Object.values(constants.warnings).forEach((warning) => {
        warning.textContent = "warning"
        warning.style.visibility = "hidden"
    })
    if (constants.inputs[0].value === "") {
        constants.warnings[0].textContent = "Can't leave empty!";
        constants.warnings[0].style.visibility = "visible";
    }    
    else if (/[^\d\s]+/g.test(constants.inputs[1].value)) {
        constants.warnings[1].textContent = "Wrong format, number only!";
        constants.warnings[1].style.visibility = "visible";
    }
    else if (constants.inputs[1].value === "" || constants.inputs[1].value.length < 19) {
        constants.warnings[1].textContent = "Enter your full card number!";
        constants.warnings[1].style.visibility = "visible";
    }
    else if (constants.inputs[2].value === "" || constants.inputs[3].value === "") {
        constants.warnings[2].textContent = "Can't leave empty!";
        constants.warnings[2].style.visibility = "visible";
    }
    else if (constants.inputs[2].value > 12 || constants.inputs[3].value < 23) {
        constants.warnings[2].textContent = "Invalid date!";
        constants.warnings[2].style.visibility = "visible";
    }
    else if (constants.inputs[4].value === "") {
        constants.warnings[3].textContent = "Can't leave empty!";
        constants.warnings[3].style.visibility = "visible";
    } 
    else {
        form.style.display= 'none';
        success.style.display= 'flex';
    }
}