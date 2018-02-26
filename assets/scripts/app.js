function Table(table) {
    this.container = document.querySelector(table.container);
    this.head = table.head;
    this.rows = table.rows;
}

Table.prototype.printHead = function(table) {
    var head = document.createElement('thead');
    head.style.backgroundColor = 'purple';
    head.style.color = 'white';
    var tr = document.createElement('tr');
    for (let value in table.head) {
        let th = document.createElement('th');
        th.innerHTML = table.head[value];
        tr.appendChild(th);
    }
    head.appendChild(tr);
    table.container.appendChild(head);
}

Table.prototype.printBody = function(table) {
    var tbody = document.createElement('tbody');
    table.rows.forEach((row) => {
        var tr = document.createElement('tr');
        for (let value in row) {
            let td = document.createElement('td');
            td.innerHTML = row[value];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
    table.container.appendChild(tbody);
}

function TrainTable(trainTable) {
    Table.call(this, {
        container: '#train-table',
        head: {
            a: 'Nr',
            b: 'Avgång',
            c: 'Ankomst'
        },
        rows: trainTable.rows
    });
    this.status = trainTable.status;
}

function WeatherTable(info) {
    Table.call(this, {
        container: '#weather-table',
        head: {
            a: 'Klocka',
            b: 'Väder',
            c: 'Värme',
            d: 'Vind'
        },
        rows: info
    });
}

function pointPrototype(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
}

pointPrototype(TrainTable, Table);
pointPrototype(WeatherTable, Table);

TrainTable.prototype.printCaption = function() {
    var container = document.querySelector('#train-table');
    var caption = document.createElement('caption');
    container.innerHTML = '<caption class="ml-3">' + this.status + '</caption> ' + container.innerHTML;
}

function TrafficRow(nr, departs, arrives) {
    this.nr = nr;
    this.departs = departs;
    this.arrives = arrives;
}

function WeatherRow(time, weather, temperature, wind) {
    this.time = time;
    this.weather = weather;
    this.temperature = temperature;
    this.wind = wind;
}

var trafficInfo = [{
        location: 'Stockholm',
        rows: [new TrafficRow('42', '11:30', '12:15'),
            new TrafficRow('42', '12:30', '13:15'),
            new TrafficRow('42', '13:30', '14:15'),
            new TrafficRow('42', '14:30', '15:15'),
            new TrafficRow('42', '15:30', '16:15')
        ],
        status: 'Inga problem i trafiken'
    },
    {
        location: 'Norrköping',
        rows: [new TrafficRow('36', '09:10', '11:30'),
            new TrafficRow('36', '11:10', '13:30'),
            new TrafficRow('36', '13:10', '15:30')
        ],
        status: 'Förseningar p.g.a. vagnfel'
    },
    {
        location: 'Södertälje',
        rows: [new TrafficRow('21', '11:00', '11:20'),
            new TrafficRow('21', '12:00', '13:20'),
            new TrafficRow('21', '13:00', '14:20'),
            new TrafficRow('21', '14:00', '15:20')
        ],
        status: 'Inga problem i trafiken'
    }
];

var button = document.querySelector('#train-button');
button.addEventListener('click', (event) => {
    var container = document.querySelector('#train-table');
    container.innerHTML = '';
    var input = document.querySelector('#train-input');
    var inputText = input.value;
    input.value = '';
    var specificInfo = trafficInfo.filter((x) => x.location.toUpperCase() == inputText.toUpperCase());
    var p = document.querySelector('#train-table ~ p');;
    if (specificInfo.length > 0) {
        var tt = new TrainTable(specificInfo[0]);
        tt.printHead(tt);
        tt.printBody(tt);
        tt.printCaption();
        p.innerHTML = 'Åker från: ' + specificInfo[0].location;
    } else {
        p.innerHTML = '';
    }
    event.preventDefault();
});