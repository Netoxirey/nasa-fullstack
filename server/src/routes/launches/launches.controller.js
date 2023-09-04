const {getAllLaunches, existLaunchWidthId, abortLaunchById, scheduleNewLaunch} = require('../../models/launches.model');
const {getPagination} = require('../../services/query');

async function httpGetAllLaunches(req, res) {
    const {skip, limit} = getPagination(req.query);
    const launches = await getAllLaunches(skip, limit)
    return res.status(200).json(launches);
};

async function httpAddNewLaunch(req, res) {
    const newLaunch = req.body;
    if (!newLaunch.mission || !newLaunch.launchDate || !newLaunch.rocket || !newLaunch.target) {
        return res.status(400).json({ error: 'Missing required data' });
    }
    newLaunch.launchDate = new Date(newLaunch.launchDate);
    if (isNaN(newLaunch.launchDate)) { 
        return res.status(400).json({ error: 'Invalid launch date' });
    }

    await scheduleNewLaunch(newLaunch);
    return res.status(201).json(newLaunch);
}

async function httpAbortLaunch(req, res) {
    const launchId = +req.params.id;

    const existLaunch = await existLaunchWidthId(launchId);
    if(!existLaunch) {
        return res.status(404).json({
            error: 'Launch not found'
        });
    }
    const aborted = await abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
};