const chartDiv = document.querySelector('.chart__display');
const date = new Date();
(function () {
    fetch('./data.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((num, index) => {
            const {day, amount} = num
            const span = document.createElement('span');
            const spanDay = document.createElement('span');
            const spanGraph = document.createElement('span');
            const spanTooltip = document.createElement('span');
            spanDay.innerHTML = day;
            spanDay.style.fontSize = '.8rem';
            spanGraph.style.height = `${amount*3}px`;
            spanGraph.classList = `${date.getDay() -1 === index ? 'cyan-graph' : 'red-graph'}`;
            spanTooltip.classList = `chart__tooltip`;
            spanTooltip.innerHTML = `$${amount}`;
            span.append(spanDay, spanGraph, spanTooltip);
            span.classList = 'chart__data-points flex';
            chartDiv.appendChild(span)})
})
})();

