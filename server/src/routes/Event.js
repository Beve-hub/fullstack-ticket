const { Router } = require('express');
const Event = require('../models/CreateEvent');

const router = Router();

// Route to create a new event
router.post('/', async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();

        const {createEvent} = event;
        if (createEvent) {
            const {item} = event
            item.push(event);
            req.session.book.item = item;
        }
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Route to get a single event by ID
router.get('/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json({ event });
    } catch (error) {
        res.status(500).json({ message: 'Error getting event', error: error.message });
    }
});

// Route to get all events
router.get('/all', async (req, res) => {
    try {
        const events = await Event.find().sort({ startDate: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error getting events', error: error.message });
    }
});

// Route to update an event by ID
router.put('/update/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { eventName, description, location, startDate, endDate, time, price } = req.body;

        // Find and update the event
        const event = await Event.findByIdAndUpdate(
            eventId,
            { eventName, description, location, startDate, endDate, time, price },
            { new: true } // Return the updated document
        );

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event updated successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error updating event', error: error.message });
    }
});

// Route to delete an event by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const eventId = req.params.id;

        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json({ message: 'Event deleted successfully', event });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});

module.exports = router;
