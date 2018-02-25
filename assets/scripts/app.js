function Table(table) {
    this.container = document.querySelector(table.container);
    this.head = table.head;
    this.rows = table.rows;

    function printHead(table) {
        var head = document.createElement('thead');
        head.style.backgroundColor = 'purple';
        head.style.color = 'white';
        var tr = document.createElement('tr');
        for(let value in table.head) {
            let th = document.createElement('th');
            th.innerHTML = table.head[value];
            tr.appendChild(th);
        }
        head.appendChild(tr);
        table.container.appendChild(head);
    };

    function printBody(table) {
        var tbody = document.createElement('tbody');
        table.rows.forEach((row) => {
            var tr = document.createElement('tr');
            for(let value in row) {
                let td = document.createElement('td');
                td.innerHTML = row[value];
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        });
        table.container.appendChild(tbody);
    };
    printHead(this);
    printBody(this);
};

function TrainTable(trainTable) {
    Table.call(this, {
        container: '#traffic-table',
        head: {a: 'Nr', b: 'Avgång', c: 'Ankomst'},
        rows: trainTable.rows
    });

    this.status = trainTable.status;
    
    function printCaption(table) {
        var container = document.querySelector('#traffic-table');
        var caption = document.createElement('caption');
        container.innerHTML = '<caption class="ml-3">' + table.status + '</caption> ' + container.innerHTML;
    }
    printCaption(this);
};

function WeatherTable(weatherTable) {
    Table.call(this, {
        container: document.querySelector('#traffic-table')
    })
};

function pointPrototype(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
}

pointPrototype(TrainTable, Table);
pointPrototype(WeatherTable, Table);

function TrafficRow(nr, departs, arrives) {
    this.nr = nr;
    this.departs = departs;
    this.arrives = arrives;
};

var trafficData = [
   {location: 'Stockholm',
    rows: [new TrafficRow('42', '11:30', '12:15'),
           new TrafficRow('42', '12:30', '13:15'),
           new TrafficRow('42', '13:30', '14:15'),
           new TrafficRow('42', '14:30', '15:15'),
           new TrafficRow('42', '15:30', '16:15')],
    status: 'Inga problem i trafiken'
}, 
   {location: 'Norrköping',
    rows: [new TrafficRow('36', '09:10', '11:30'),
           new TrafficRow('36', '11:10', '13:30'),
           new TrafficRow('36', '13:10', '15:30')],
    status: 'Förseningar pga vagnfel'
}, 
   {location: 'Södertälje',
    rows: [new TrafficRow('21', '11:00', '11:20'),
           new TrafficRow('21', '12:00', '13:20'),
           new TrafficRow('21', '13:00', '14:20'),
           new TrafficRow('21', '14:00', '15:20')],
    status: 'Inga problem i trafiken'
}];

var button = document.querySelector('#traffic-button');

button.addEventListener('click', (event) => {
    var container = document.querySelector('#traffic-table');
    container.innerHTML = '';
    var input = document.querySelector('#traffic-input');
    var inputText = input.value;
    input.value = '';
    var specificData = trafficData.filter((x) => x.location.toUpperCase() == inputText.toUpperCase());
    var span = document.querySelector('#departure-info');
    if (specificData.length > 0) {
        var tt = new TrainTable(specificData[0]);
        span.innerHTML = ' ' + specificData[0].location;
        event.preventDefault();
    }
    else {
        span.innerHTML = '';
    }
    event.preventDefault();
});