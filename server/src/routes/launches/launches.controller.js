const {getAllLaunches, addNewLaunch, existLaunchWidthId, abortLaunchById} = require('../../models/launches.model');

function httpGetAllLaunches(req, res) {
    return res.status(200).json(getAllLaunches());
};

function httpAddNewLaunch(req, res) {
    const newLaunch = req.body;
    if (!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket || !newLaunch.target) {
        return res.status(400).json({ error: 'Missing required data' });
    }
    newLaunch.launchDate = new Date(newLaunch.launchDate);
    if (isNaN(newLaunch.launchDate)) { 
        return res.status(400).json({ error: 'Invalid launch date' });
    }

    addNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
}

function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;
    if(!existLaunchWidthId(launchId)) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};