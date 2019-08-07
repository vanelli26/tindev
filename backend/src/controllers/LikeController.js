const Dev = require('../models/Dev');

module.exports = {
    async store(req, res){
        const { devId } = req.params;
        const targetDev = await Dev.findById(devId);

        const { user } = req.headers;
        const loggedDev = await Dev.findById(user);

        if (!targetDev){
            return res.status(400).json({error: 'Dev não encontrado!'});
        }

        if (targetDev.likes.includes(targetDev._id)){
            console.log('Deu math');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};