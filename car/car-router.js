const router = require('express').Router();
const Car = require('./car-model.js')

router.get('/', async (req, res) => {
    try {
        const cars = await Car.get()
        if(cars){
            res.status(200).json(cars)
        }
    }
    catch(error){
        res.status(500).json({message: `error in retrieving all cars`})
    }
})


router.post('/', validateCarPost, async (req, res) => {
    try{
        const addedCar = await Car.insert(req.body, 'id')
        if(addedCar){
            console.log(addedCar)
            res.status(201).json(addedCar)
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({ message: 'error adding new car' })
    }
})

router.get('/:id', async (req,res) => {
    const { id }  = req.params;

    try{
        const quque = await Car.get(id)
        if(quque){
            res.status(200).json(quque)
        }
        else{
            res.status(404).json({message: `error, car with that ID does not exist!`})
          }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: `error getting car!`})
    }
})

router.put('/:id', async (req,res) => {
    const { id } = req.params;
    const newInfo = req.body;
    try{
        const updating = await Car.update(id, newInfo)
        if(updating){
            //GET for updated car 
            const updatedCar = await Car.get(id)
            res.status(200).json(updatedCar)
        }
        else{
            res.status(404).json({message: `error in updating the car information!`})
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: `error in updating the car information!`})
    }
})

router.delete('/:id', async (req,res) => {
    const { id } = req.params;

    try{
        const deleting = await Car.remove(id)
        if(deleting) {
            res.status(200).json({messsage: `successfully deleted car with ID: ${id}`})
        }
        else{
            res.status(400).json({message: `Error with car ID`})
        }
    }
    catch(error){
        res.status(500).json({message: `error in deleting the car information!`})
    }
})

function validateCarPost(req, res, next){
    const { VIN } = req.body;
    const { make } = req.body;
    const { model } = req.body;
    const { mileage } = req.body;
    const { transmission } = req.body;
    const { title_status } = req.body;

    if(Object.keys(req.body).length === 0) {
        res.status(400).json({message: `Missing car data!`})
    }
    else if(!VIN){
        res.status(400).json({message: `Missing car VIN!`})
    }
    else if(!make){
        res.status(400).json({message: `Missing car MAKE!`})
    }
    else if(!model){
        res.status(400).json({message: `Missing car MODEL!`})
    }
    else if(!mileage){
        res.status(400).json({message: `Missing car MILEAGE!`})
    }
    else if(typeof VIN !== "string"){
        return res.status(400).json({error: `need STRING for VIN`});
    }
    else if(typeof make !== "string"){
        return res.status(400).json({error: `need STRING for make`});
    }
    else if(typeof model !== "string"){
        return res.status(400).json({error: `need STRING for model`});
    }
    else if(typeof mileage !== "number"){
        return res.status(400).json({error: `need STRING for mileage`});
    }
    //need to figure out how to enforce these non-required fields to be
    //strings IF present... 
    
    // else if(typeof transmission !== "string"){
    //     return res.status(400).json({error: `need STRING for transmission`});
    // }
    // else if(typeof title_status !== "string"){
    //     return res.status(400).json({error: `need STRING for title status`});
    // }
    req.body = {VIN, make, model, mileage, transmission, title_status}
    next();

}

module.exports = router;