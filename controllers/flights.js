const { render } = require('ejs');
const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    new: newFlight,
    create,
    index,
    show,
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({flight: flight._id}, function(err, tickets){
            res.render('flights/show', {
                title: `${flight.airline} Airlines Flight ${flight.flightNO}`,
                flight,
                tickets,
            });
        });
    }); 
}

function index(req, res) {
    Flight.find({}, function (err, flights) {
        res.render('flights', {title: 'All Flights', flights});
    });
}

function newFlight(req, res) {
    res.render('flights/new', {title: 'Add Flight'});
}

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        console.log(flight);
        res.redirect('/flights')
    });
}